
import UserInformation from "../screens/UserInformation";
import FoodDairyLanding from "../screens/FoodDairyLanding";
import PulseFoodDetect from "../screens/pulseFoodDetect";


export const PulseFoodScreenConfig = {
  UserInformation: {
    screen: UserInformation,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  FoodDairyLanding:{
    screen: FoodDairyLanding,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  PulseFoodDetect: {
    screen: PulseFoodDetect,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
};
