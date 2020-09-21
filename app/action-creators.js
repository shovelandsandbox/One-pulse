import {
  CoreActionTypes,
  CoreConfig,
} from "@pru-rt-internal/pulse-common";

const { pageKeys } = CoreConfig;

export const changeLanguage = selectedLanguage => ({
  context: pageKeys.CHANGE_LANGUAGE_PAGE,
  type: CoreActionTypes.FETCH_META,
  payload: { languageId: selectedLanguage },
});
