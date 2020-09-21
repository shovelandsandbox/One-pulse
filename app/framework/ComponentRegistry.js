/* eslint-disable max-depth */
/* eslint-disable complexity */
import globalState from "./GlobalState";
//import localComponentDefs from '../resources/componentDefs';
//import localModels from '../resources/models';
import {
  observable,
  computed,
  autorun,
  action,
  flow,
  extendObservable,
} from "mobx";
import appEnv from "./AppEnv";
import { pathOr } from "ramda";
import jsxParser from "./utils/JSXParser";
//import RNSimpleCrypto from "react-native-simple-crypto";
//import sha256 from 'crypto-js/sha256';

class ComponentRegistry {
  constructor() {
    this.mountedComponentDefs = new Map();
    this.componentDefs = {};
    this.noContentUrl = "";
  }

  getComponentDef(screenName) {
    let compDef = this.mountedComponentDefs.get(screenName);
    if (compDef) return compDef;
    compDef = this.componentDefs[screenName];
    /*if(compDef == null){
            compDef = this.loadLocalComponentDef(screenName);
        }*/
    if (compDef) this.mountedComponentDefs.set(screenName, compDef);
    return compDef;
  }

  //Return compDef only when its modified in the backend
  async loadComponentDef(screenName) {
    const compDef = await this.loadComponentDefFromServer(screenName);
    return compDef;
  }

  getContentUri(compDef, name) {
    const contentRelpath = compDef.getContentRelativeUri(name);
    if (contentRelpath) {
      const cmsRootUrl = appEnv.getCachedPackageDef().cmsRootUrl;
      return cmsRootUrl + contentRelpath;
    }
    return this.noContentUrl;
  }

  unmountComponent(screenName) {
    this.mountedComponentDefs.delete(screenName);
    delete this.componentDefs[screenName];
  }

  /**TODO */
  /*loadLocalComponentDef(screenName){
        let compLocalDef = localComponentDefs[screenName];

        if(compLocalDef){
            console.log("Loaded " + screenName + " from local bundle");
            //return this.createComponentDef(screenName,compLocalDef);
        }
        return null;
    }*/

  async createModel(modelDef) {
    if (modelDef) {
      console.log("creating model from modelDef");
      const verify = true;
      if (verify) {
        //const sha256Hash = sha256(modelDef);
        //const sha256Hash = await RNSimpleCrypto.SHA.sha1(modeDef);
        //console.log("sha256Hash:" + sha256Hash);
      }
      //let Model = eval("(" + modelDef  + ")");
      //let model = eval("model = " + modelDef);
      const model = eval(modelDef + "; model");
      return model;
    }
  }

  async loadComponentDefFromServer(screenName) {
    console.log("Loading component def from platform:" + screenName);
    const packageRootDef = await appEnv.getPackageDef();
    if (!packageRootDef) return null;
    const rootUrl = packageRootDef.rootUrl;
    const screensRootUrl = rootUrl + "/screens";
    const componentRootUrl =
      screensRootUrl + "/" + screenName.replace(".", "/") + ".jsx";
    let compDef = this.componentDefs[screenName];
    if (compDef == null) {
      compDef = new ComponentDefinition(screenName);
    } else {
      const newCompDef = new ComponentDefinition(screenName);
      Object.assign(newCompDef, compDef);
      compDef = newCompDef;
    }
    const response = await appEnv.httpClient().getAsText(componentRootUrl);
    const etags = appEnv.httpClient().getLastModified(response);
    let componentDefJson = response ? response.data : null;
    let isModified = false;
    if (componentDefJson) {
      compDef.lastupdated = Date.now();
      // if (!compDef.compEtags && compDef.compEtags != etags) {
      if (typeof componentDefJson == "string") {
        componentDefJson = jsxParser.parse(response.data);
      }
      //console.log("Loaded component def:" + screenName + " " + JSON.stringify(componentDefJson));
      if (componentDefJson.layout) {
        compDef.layout = componentDefJson.layout;
      }
      isModified = true;
      if (etags != null) compDef.compEtags = etags;
      // }
      const styleFetchPromise = this.updateStyleDefinition(
        compDef,
        componentDefJson,
        screensRootUrl
      );
      const labelFetchPromise = this.updateLabelDefinition(
        compDef,
        componentDefJson,
        screensRootUrl
      );
      const contentFetchPromise = this.updateContentDefinition(
        compDef,
        componentDefJson,
        screensRootUrl
      );
      const modelFetchPromise = this.updateModelDefinition(
        compDef,
        componentDefJson,
        screensRootUrl
      );
      const values = await Promise.all([
        styleFetchPromise,
        labelFetchPromise,
        contentFetchPromise,
        modelFetchPromise,
      ]);
      values.map(isValueModified => {
        isModified = isValueModified || isModified;
      });

      this.createChildComponentDefs(componentDefJson.childDefs, compDef);
      if (isModified) {
        console.log("component def modified:" + screenName);
        this.registerComponent(compDef);
        return compDef;
      }
    } else {
      console.log("Failed to load component def for screen:" + screenName);
    }
    return null;
  }

  async createComponentDef(componentDefJson) {
    if (typeof componentDefJson == "string") {
      componentDefJson = jsxParser.parse(componentDefJson);
    }
    const compDef = new ComponentDefinition();
    if (componentDefJson.layout) {
      compDef.setLayout(componentDefJson.layout);
    }
    if (componentDefJson && componentDefJson.import) {
      const packageRootDef = await appEnv.getPackageDef();
      if (packageRootDef) {
        const rootUrl = packageRootDef.rootUrl;
        const screensRootUrl = rootUrl + "/screens";
        const styleFetchPromise = this.updateStyleDefinition(
          compDef,
          componentDefJson,
          screensRootUrl
        );
        const labelFetchPromise = this.updateLabelDefinition(
          compDef,
          componentDefJson,
          screensRootUrl
        );
        const contentFetchPromise = this.updateContentDefinition(
          compDef,
          componentDefJson,
          screensRootUrl
        );
        const modelFetchPromise = this.updateModelDefinition(
          compDef,
          componentDefJson,
          screensRootUrl
        );
        await Promise.all([
          styleFetchPromise,
          labelFetchPromise,
          contentFetchPromise,
          modelFetchPromise,
        ]);
        this.createChildComponentDefs(componentDefJson.childDefs, compDef);
      }
    }
    return compDef;
  }

  createChildComponentDefs(childCompDefJsons, parentCompDef) {
    if (childCompDefJsons) {
      childCompDefJsons.map(value => {
        const childCompDef = new ComponentDefinition(value.type);
        childCompDef.isDependent = true;
        childCompDef.layout = value.layout;
        childCompDef.labelDefs = parentCompDef.labelDefs;
        childCompDef.styleDefs = parentCompDef.styleDefs;
        childCompDef.contentDefs = parentCompDef.contentDefs;
        this.registerComponent(childCompDef);
      });
    }
  }

  async updateStyleDefinition(compDef, compDefJson, screensRootUrl) {
    const stylesName = compDefJson.import ? compDefJson.import.style : null;
    let isModified = false;
    if (stylesName) {
      const styleUrl = screensRootUrl + "/styles/" + stylesName + ".json";
      const response = await appEnv.httpClient().getAsJson(styleUrl);
      if (response && response.data) {
        const etags = appEnv.httpClient().getLastModified(response);
        console.log("Style:" + etags + " " + compDef.styleEtags);
        // if (!compDef.styleEtags && compDef.styleEtags !== etags) {
        const styleDefs = response.data;
        if (styleDefs) {
          isModified = true;
          compDef.styleDefs = styleDefs;
          if (etags != null) compDef.styleEtags = etags;
          console.log("Styles Modified:" + stylesName);
        }
        // }
      }
    }
    return isModified;
  }

  async updateLabelDefinition(compDef, compDefJson, screensRootUrl) {
    const labelName = compDefJson.import ? compDefJson.import.label : null;
    let isModified = false;
    if (labelName) {
      const lang = globalState.lang;
      const labelUrl =
        screensRootUrl + "/labels/" + lang + "/" + labelName + ".json";
      const response = await appEnv.httpClient().getAsJson(labelUrl);
      if (response && response.data) {
        const etags = appEnv.httpClient().getLastModified(response);
        const oldEtags = compDef.labelEtags[lang];
        // if (oldEtags == null || oldEtags !== etags) {
        const labelDefs = response.data;
        if (labelDefs) {
          isModified = true;
          compDef.registerLabel(lang, labelDefs);
          if (etags != null) compDef.labelEtags[lang] = etags;
          console.log("Labels Modified:" + labelName);
        }
        // }
      }
    }
    return isModified;
  }

  async updateModelDefinition(compDef, compDefJson, screensRootUrl) {
    const modelName = compDefJson.import ? compDefJson.import.model : null;
    let isModified = false;
    if (modelName) {
      const modelUrl = screensRootUrl + "/models/" + modelName + ".js";
      const response = await appEnv.httpClient().getAsText(modelUrl);
      if (response && response.data) {
        const etags = appEnv.httpClient().getLastModified(response);
        // if (!compDef.modelEtags && compDef.modelEtags != etags) {
        const modelDef = response.data;
        if (modelDef) {
          isModified = true;
          const model = await this.createModel(modelDef);
          compDef.setModel(model);
          if (etags != null) compDef.modelEtags = etags;
          console.log("Model modified:" + modelName);
        }
        // }
      }
    }
    return isModified;
  }

  async updateContentDefinition(compDef, compDefJson, screensRootUrl) {
    const contentName = compDefJson.import ? compDefJson.import.content : null;
    let isModified = false;
    if (contentName) {
      const contentDefUrl =
        screensRootUrl + "/contents/" + contentName + ".json";
      const response = await appEnv.httpClient().getAsJson(contentDefUrl);
      if (response && response.data) {
        const etags = appEnv.httpClient().getLastModified(response);
        // if (!compDef.contentEtags && compDef.contentEtags != etags) {
        const contentDefs = response.data;
        if (contentDefs) {
          isModified = true;
          compDef.registerContentDef(contentDefs);
          if (etags != null) compDef.contentEtags = etags;
          console.log("Content Modified:" + contentName);
        }
        // }
      }
    }
    return isModified;
  }

  registerComponent(componentDef) {
    this.componentDefs[componentDef.type] = componentDef;
  }
}

export class ComponentDefinition {
  constructor(type) {
    this.type = type;
    this.styleDefs = {};
    this.labelDefs = {};
    this.contentDefs = {};
    this.layout = {};
    this.compEtags = "";
    this.styleEtags = "";
    this.labelEtags = {}; //per lan
    this.modelEtags = "";
    this.contentEtags = "";
    this.isDependent = false;
    this.lastupdated = Date.now();

    extendObservable(this, {
      styleDefs: this.styleDefs,
      labelDefs: this.labelDefs,
      contentDefs: this.contentDefs,
      layout: this.layout,
    });
  }

  getStyles(styleNames) {
    if (styleNames) {
      const styles = [];
      for (let i = 0; i < styles.length; i++) {
        const style = this.getStyle(styleNames[i]);
        if (style) {
          styles.push(style);
        }
      }
      return styles;
    }
    return null;
  }

  getStyle(styleName) {
    const theme = globalState.theme;
    if (this.styleDefs[theme] && this.styleDefs[theme][styleName])
      return this.styleDefs[theme][styleName];
    return null;
  }

  registerStyle(theme, styleDef) {
    this.styleDefs[theme] = styleDef;
    if (theme != "default") {
      styleDef.prototype = this.styleDefs["default"];
    } else {
      styleDef.prototype = {};
    }
  }

  registerContentDef(contentDefMap) {
    this.contentDefs = {};
    if (contentDefMap) {
      const authStore = globalState.auth;
      const region = pathOr("", ["userAgent", "region"], authStore);

      for (langkey in contentDefMap) {
        const contents = contentDefMap[langkey];
        const contentObj = {};
        for (const contentKey in contents) {
          Object.defineProperty(contentObj, contentKey, {
            get() {
              const url =
                appEnv.getCachedPackageDef().cmsRootUrl +
                "/" +
                contents[contentKey];
              return `${url}?namespace=${region}`;
            },
            enumerable: true,
          });
        }
        this.contentDefs[langkey] = contentObj;
      }
    }
  }

  setLayout(layout) {
    this.layout = layout;
  }

  registerLabel(locale, labelDef) {
    this.labelDefs[locale] = labelDef;
    if (locale != "en") {
      labelDef.prototype = this.labelDefs["en"];
    } else {
      labelDef.prototype = {};
    }
  }

  setModel(Model) {
    this.Model = Model;
    this.Model.appEnv = appEnv;
    this.decorators = {};
    for (prop in this.Model) {
      if (typeof this.Model[prop] === "function") {
        if (prop.startsWith("run")) {
          this.decorators[prop] = autorun;
          this.Model[prop] = autorun(this.Model[prop]);
        } else if (prop.startsWith("action")) {
          //this.Model[prop] = this.actionWrapper(this.Model[prop]);
          this.decorators[prop] = action.bound;
        }
      } else {
        const descriptor = Object.getOwnPropertyDescriptor(this.Model, prop);
        if (descriptor.get) {
          this.decorators[prop] = computed;
        } else if (descriptor.set) {
          this.decorators[prop] = action.bound;
        } else {
          this.decorators[prop] = observable;
        }
      }
    }
  }

  getLabel(name) {
    const lang = globalState.lang;
    if (this.labelDefs[lang] && this.labelDefs[lang][name])
      return this.labelDefs[lang][name];
    return this.labelDefs["en"][name];
  }

  getContentRelativeUri(name) {
    const lang = globalState.lang;
    if (this.contentDefs[lang] && this.contentDefs[lang][name])
      return this.contentDefs[lang][name];
    if (this.contentDefs["default"] && this.contentDefs["default"][name])
      return this.contentDefs["default"][name];
    return null;
  }

  getLayout() {
    return this.layout;
  }

  createModel() {
    if (this.Model) {
      try {
        const objRef = observable.object(this.Model, this.decorators);
        const keys = Object.getOwnPropertyNames(objRef);
        keys.map(key => {
          const val = objRef[key];
          if (typeof val == "function") {
            objRef[key] = val.bind(objRef);
          }
        });
        return objRef;
        //return this.Model;
      } catch (err) {
        console.log(err);
      }
    } else {
      const model = appEnv.createRegisteredModel(this.type);
      return model;
    }
    return null;
  }
}

export const componentRegistry = new ComponentRegistry();
