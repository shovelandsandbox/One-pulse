import {
  CoreConfig,
  metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";

const {
  SCREEN_KEY_BRIEFING,
  ELEMENT_KEY_PRODUCT_DISCLOSURE_TITLE,
  ELEMENT_KEY_PRODUCT_DISCLOSURE_MESSAGE,
  ELEMENT_KEY_DENGUE_PRODUCT_DISCLOSURE,
  ELEMENT_KEY_LIMITED_OFFER,
  ELEMENT_KEY_PRUDENTIAL_EMP,
  ELEMENT_KEY_PARTICIPATE,
  ELEMENT_KEY_PLEASE_REFER,
  ELEMENT_KEY_PRODUCT_DISCLOSURE_SHEET,
  ELEMENT_KEY_MORE_DETAIL,
  ELEMENT_KEY_LETS_PROCEED,
  ELEMENT_KEY_DENGUE_CASE
} = CoreConfig;

const fetchLabel = (value, defaultValue) =>
  value.label ? value.label : defaultValue;

const initializeAIMEScreenMeta = () => {
  return {
    productDisclosureTitle: fetchLabel(
      helpers.findElement(SCREEN_KEY_BRIEFING, ELEMENT_KEY_PRODUCT_DISCLOSURE_TITLE),
      "productDisclosureTitle"
    ),
    productDisclosureMessage: fetchLabel(
      helpers.findElement(SCREEN_KEY_BRIEFING, ELEMENT_KEY_PRODUCT_DISCLOSURE_MESSAGE),
      "productDisclosureMessage"
    ),
    productDisclosureDengueProduct: fetchLabel(
      helpers.findElement(SCREEN_KEY_BRIEFING, ELEMENT_KEY_DENGUE_PRODUCT_DISCLOSURE),
      "productDisclosureDengueProduct"
    ),
    limitedOffer: fetchLabel(
      helpers.findElement(SCREEN_KEY_BRIEFING, ELEMENT_KEY_LIMITED_OFFER),
      "limitedOffer"
    ),
    PrudentialEmpText: fetchLabel(
      helpers.findElement(SCREEN_KEY_BRIEFING, ELEMENT_KEY_PRUDENTIAL_EMP),
      "PrudentialEmpText"
    ),
    participateText: fetchLabel(
      helpers.findElement(SCREEN_KEY_BRIEFING, ELEMENT_KEY_PARTICIPATE),
      "participateText"
    ),
    pleaseRefertext: fetchLabel(
      helpers.findElement(SCREEN_KEY_BRIEFING, ELEMENT_KEY_PLEASE_REFER),
      "pleaseRefertext"
    ),
    productDiscloserText: fetchLabel(
      helpers.findElement(SCREEN_KEY_BRIEFING, ELEMENT_KEY_PRODUCT_DISCLOSURE_SHEET),
      "productDiscloserText"
    ),
    moreDetailText: fetchLabel(
      helpers.findElement(SCREEN_KEY_BRIEFING, ELEMENT_KEY_MORE_DETAIL),
      "moreDetailText"
    ),
    letsProceedText: fetchLabel(
      helpers.findElement(SCREEN_KEY_BRIEFING, ELEMENT_KEY_LETS_PROCEED),
      "letsProceedText"
    ),
    dengueCaseText: fetchLabel(
      helpers.findElement(SCREEN_KEY_BRIEFING, ELEMENT_KEY_DENGUE_CASE),
      "dengueCaseText"
    ),
  };
};

export default {
  initializeAIMEScreenMeta,
};
