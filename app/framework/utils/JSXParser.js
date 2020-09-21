import * as acorn from "acorn";
import acornJsx from "acorn-jsx";
import globalState from "../GlobalState";
import appEnv from "../AppEnv";

const parser = acorn.Parser.extend(acornJsx());

class JSXParser {
  constructor() {}

  parse(jsx) {
    const wrappedJsx = `<root>${jsx}</root>`;
    let parsed = [];
    try {
      parsed = parser.parse(wrappedJsx);
      parsed = parsed.body[0].expression.children || [];
    } catch (error) {
      console.log("JSX parse error:" + error + " for component:" + jsx);
      return null;
    }
    const layoutDef = parsed.map(this.parseExpression).filter(Boolean);
    if (layoutDef) {
      const compDef = {};
      const childCompDefs = [];
      layoutDef.map(element => {
        if (element.type) {
          if (element.type == "import") {
            compDef.import = {};
            if (element.params) {
              compDef.import.model = element.params.model;
              compDef.import.label = element.params.label;
              compDef.import.style = element.params.style;
              compDef.import.content = element.params.content;
            }
          } else if (element.type == "ChildDef") {
            const childElements = element.children;
            if (childElements) {
              childElements.map(child => {
                if (child.type) {
                  const childCompDef = {};
                  childCompDef.type = element.params.type;
                  childCompDef.layout = child;
                  childCompDefs.push(childCompDef);
                }
              });
            }
          } else {
            compDef.layout = element;
          }
        }
      });
      if (childCompDefs.length > 0) {
        compDef.childDefs = childCompDefs;
      }
      // console.log(
      //   "Parsed JSX: " +
      //     JSON.stringify(compDef) +
      //     " param keys:" +
      //     (compDef.layout.params ? Object.keys(compDef.layout.params) : null)
      // );
      return compDef;
    }
  }

  // eslint-disable-next-line complexity
  parseExpression = expression => {
    switch (expression.type) {
      case "JSXAttribute":
        if (expression.value === null) return true;
        return this.parseExpression(expression.value);
      case "JSXElement":
        return this.parseElement(expression);
      case "JSXExpressionContainer":
        return this.parseExpression(expression.expression);
      case "JSXText":
        //console.log("JSXTXT::" + expression.value);
        //const key = this.props.disableKeyGeneration ? undefined : randomHash()
        return true ? (
          expression.value
        ) : (
          <Fragment key={key}>{expression.value}</Fragment>
        );
      case "ArrayExpression":
        return this.arrayExpr(expression.elements.map(this.parseExpression));
      case "BinaryExpression":
        /* eslint-disable eqeqeq,max-len */
        return this.binaryExpr(
          this.parseExpression(expression.left),
          this.parseExpression(expression.right),
          expression.operator
        );
      case "CallExpression":
        const parsedCallee = this.parseExpression(expression.callee);
        return this.callExpr(
          parsedCallee,
          expression.arguments.map(this.parseExpression)
        );
      //return parsedCallee(...expression.arguments.map(this.parseExpression))
      case "ConditionalExpression":
        return this.conditionalExpr(
          this.parseExpression(expression.test),
          this.parseExpression(expression.consequent),
          this.parseExpression(expression.alternate)
        );
      case "Identifier":
        //console.log("Got Identifier:" + expression.name);
        if (expression.name == "labels") {
          return this.labelExpr();
        } else if (expression.name == "styles") {
          return this.styleExpr();
        } else if (expression.name == "contents") {
          return this.contentExpr();
        }
        return this.identifierExpr(expression.name);
      case "Literal":
        return expression.value;
      case "LogicalExpression":
        const left = this.parseExpression(expression.left);
        const right = this.parseExpression(expression.right);
        return this.logicalExpr(left, right, expression.operator);
      case "MemberExpression":
        //console.log("Got member:" + expression.property.name);
        const thisObj = this.parseExpression(expression.object) || {};
        //const member = (thisObj)[expression.property.name]
        return this.memberExpr(expression.property.name, thisObj);
      //if (typeof member === 'function') return member.bind(thisObj)
      //return member
      case "ObjectExpression":
        const object = {};
        expression.properties.forEach(prop => {
          object[prop.key.name || prop.key.value] = this.parseExpression(
            prop.value
          );
        });
        //console.log("ObjectExpr:" + Object.keys(object));
        return this.objectExpr(object);
      case "UnaryExpression":
        return this.unaryExpr(expression.argument.value, expression.operator);
    }
  };

  identifierExpr(identifier) {
    return function(comp) {
      if (identifier == "appEnv") {
        return appEnv;
      }
      if (identifier == "props") {
        return comp.props;
      }
      const model = comp.state.model;
      let identifierVal;
      if (model) identifierVal = model[identifier];
      return identifierVal;
    };
  }

  memberExpr(memberName, objInstanceFunc) {
    return function(comp) {
      const obj =
        typeof objInstanceFunc == "function"
          ? objInstanceFunc(comp)
          : objInstanceFunc;
      let member;
      if (obj) member = obj[memberName];
      if (typeof member === "function") return member.bind(obj);
      return member;
    };
  }

  labelExpr() {
    return function(comp) {
      const labelDefs = comp.state.componentDef.labelDefs;
      if (labelDefs) {
        const lang = globalState.lang;
        return labelDefs[lang];
      }
    };
  }

  styleExpr() {
    return function(comp) {
      const styleDefs = comp.state.componentDef.styleDefs;
      if (styleDefs) {
        const theme = globalState.theme;
        return styleDefs[theme];
      }
      return {};
    };
  }

  contentExpr() {
    return function(comp) {
      const contentDefs = comp.state.componentDef.contentDefs;
      if (contentDefs) {
        const lang = globalState.lang;
        return contentDefs[lang];
      }
      return {};
    };
  }

  arrayExpr(arrayItems) {
    return function(comp) {
      return arrayItems.map(item => {
        let itemVal = item;
        if (typeof item == "function") {
          itemVal = item(comp);
        }
        return itemVal;
      });
    };
  }

  objectExpr(obj) {
    return function(comp) {
      const object = {};
      Object.keys(obj).forEach(prop => {
        let objVal = obj[prop];
        if (typeof objVal == "function") objVal = objVal(comp);
        object[prop] = objVal;
      });
      return object;
    };
  }

  conditionalExpr(test, consequent, alternate) {
    return function(comp) {
      let testVal = test;
      if (typeof test == "function") testVal = test(comp);
      let consequentVal = consequent;
      if (typeof consequent == "function") consequentVal = consequent(comp);
      let alternateVal = alternate;
      if (typeof alternate == "function") alternateVal = alternate(comp);
      return testVal ? consequentVal : alternateVal;
    };
  }

  logicalExpr(left, right, operator) {
    // eslint-disable-next-line complexity
    return function(comp) {
      left = typeof left == "function" ? left(comp) : left;
      right = typeof right == "function" ? right(comp) : right;
      if (operator === "||" && left) return left;
      if ((operator === "&&" && left) || (operator === "||" && !left)) {
        return right;
      }
      return false;
    };
  }

  binaryExpr(left, right, operator) {
    // eslint-disable-next-line complexity
    return function(comp) {
      left = typeof left == "function" ? left(comp) : left;
      right = typeof right == "function" ? right(comp) : right;
      switch (operator) {
        case "-":
          return left - right;
        case "!=":
          return left != right;
        case "!==":
          return left !== right;
        case "*":
          return left * right;
        case "**":
          return left ** right;
        case "/":
          return left / right;
        case "%":
          return left % right;
        case "+":
          return left + right;
        case "==":
          return left == right;
        case "===":
          return left === right;
        /* eslint-enable eqeqeq,max-len */
      }
      return undefined;
    };
  }

  unaryExpr(value, operator) {
    return function(comp) {
      value = typeof value == "function" ? value(comp) : value;
      switch (operator) {
        case "+":
          return value;
        case "-":
          return -1 * value;
        case "!":
          return !value;
      }
      return undefined;
    };
  }

  callExpr(callee, args) {
    return function(comp) {
      if (!callee) return null;
      const newCallee = callee(comp);
      return (
        newCallee &&
        newCallee(
          ...args.map(item => {
            return typeof item == "function" ? item(comp) : item;
          })
        )
      );
    };
  }

  parseName = element => {
    switch (element.type) {
      case "JSXIdentifier":
        return element.name;
      case "JSXMemberExpression":
        return `${this.parseName(element.object)}.${this.parseName(
          element.property
        )}`;
    }
  };

  parseElement = element => {
    const { children: childNodes = [], openingElement } = element;
    const { attributes = [] } = openingElement;
    const name = this.parseName(openingElement.name);
    if (!name) {
      console.log(
        `The <${openingElement.name}> tag could not be parsed, and will not be rendered.`
      );
      return undefined;
    }
    //console.log("Parsing element:" + name);
    let children = childNodes.map(this.parseExpression);

    if (children.length === 0) {
      children = undefined;
    } else if (children.length === 1) {
      [children] = children;
    }
    const props = {
      //key: this.props.disableKeyGeneration ? undefined : randomHash(),
      //key: undefined
    };
    attributes.forEach(expr => {
      if (expr.type === "JSXAttribute") {
        const rawName = expr.name.name;
        // if the value is null, this is an implicitly "true" prop, such as readOnly
        const value = this.parseExpression(expr);
        if (value === "true" || value === "false") {
          props[rawName] = value === "true";
        } else {
          props[rawName] = value;
        }
      } else if (
        (expr.type === "JSXSpreadAttribute" &&
          expr.argument.type === "Identifier") ||
        expr.argument.type === "MemberExpression"
      ) {
        const value = this.parseExpression(expr.argument);
        if (typeof value === "object") {
          Object.keys(value).forEach(rawName => {
            props[rawName] = value[rawName];
          });
        }
      }
    });
    /*if (typeof props.style === 'string') {
          props.style = parseStyle(props.style)
      }*/
    //if (children) props.children = children
    const layoutDef = {};
    layoutDef.type = name;
    if (Object.keys(props).length > 0) layoutDef.params = props;
    layoutDef.children = children;
    return layoutDef;
  };

  resolvePath = (object, path) =>
    resolveArrayPath(object, pathToArrayPath(path));

  pathToArrayPath = path => {
    if (path == null || path === "") return [];
    return path.split(".");
  };

  resolveArrayPath = (object, path) => {
    const [property, ...subPath] = path;
    if (object == null || property == null) {
      return undefined;
    }
    return subPath.length === 0
      ? object[property]
      : resolveArrayPath(object[property], subPath);
  };

  /*parseStyle(style) {
      switch (typeof style) {
        case 'string':
          return style.split(';').filter(r => r)
            .reduce((map, rule) => {
              const name = rule.slice(0, rule.indexOf(':')).trim()
              const value = rule.slice(rule.indexOf(':') + 1).trim()
    
              return {
                ...map,
                [camelCase(name)]: value,
              }
            }, {})
        case 'object':
          return style
    
        default:
          return undefined
      }
    }*/

  camelCase(string) {
    return string
      .replace(/([A-Z])([A-Z])/g, "$1 $2")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[^a-zA-Z\u00C0-\u00ff]/g, " ")
      .toLowerCase()
      .split(" ")
      .filter(value => value)
      .map((s, i) => (i > 0 ? s[0].toUpperCase() + s.slice(1) : s))
      .join("");
  }
}

export default jsxParser = new JSXParser();
