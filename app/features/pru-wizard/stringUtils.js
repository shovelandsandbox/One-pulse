import { safeMetaLabelFinder } from "../../utils/meta-utils";
import metaKeys from "./screenMetaKeys";

export const metaFinder = key => 
  safeMetaLabelFinder(metaKeys.screenName, key);

export const metaFinderBabylon = key => 
  safeMetaLabelFinder("pruWizardBabylon", key);
