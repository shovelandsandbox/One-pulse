// import { links } from "react-native-firebase";
import { URL, URLSearchParams } from 'whatwg-url';
import { Buffer } from 'buffer';
global.Buffer = Buffer;
global.URL = URL;
global.URLSearchParams = URLSearchParams;

let userAgentLocal = {};

export const createDynamicLink = ({
    link = "https://onepulse.page.link/GMQ7/",
    domainURIPrefix = "https://onepulse.page.link",
    desc,
    imageUrl = "https://i.ibb.co/Gt96G0h/Pulse.png",
    title,
    queryParams}) => {
  // const urlQueryParams = new URLSearchParams(queryParams);
  // const dynamicLinkObject = new links.DynamicLink(link + "?" + escape(urlQueryParams.toString()), domainURIPrefix);
  // dynamicLinkObject.android.setFallbackUrl("");
  // dynamicLinkObject.android.setPackageName(userAgentLocal.appBundle);

  // dynamicLinkObject.ios.setAppStoreId("1498404821");
  // dynamicLinkObject.ios.setBundleId(userAgentLocal.appBundle);
  // dynamicLinkObject.ios.setCustomScheme("");
  // dynamicLinkObject.ios.setFallbackUrl("");
  // dynamicLinkObject.ios.setIPadBundleId(userAgentLocal.appBundle);

  // dynamicLinkObject.social.setDescriptionText(desc);
  // dynamicLinkObject.social.setImageUrl(imageUrl);
  // dynamicLinkObject.social.setTitle(title);

  // return links().createShortDynamicLink(dynamicLinkObject);
}

export const initializeDynamicLink = userAgent => {
  userAgentLocal = userAgent;
}

export const testDeepLink = async (userAgent) => {
  initializeDynamicLink(userAgent);
  const queryParams = {
    screenId: "PruWizardScreen",
    screenParams: "",
  };
  const deeplinkUrl = await createDynamicLink({
    title: "Test Pru Wizard",
    desc: "Testing PruWizard dynamic link",
    queryParams,
  });
  console.log(deeplinkUrl);
}
