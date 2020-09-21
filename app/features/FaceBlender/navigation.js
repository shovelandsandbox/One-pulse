import DadScreen from "./screens/DadScreen";
import MumScreen from "./screens/MumScreen";
import BabyScreen from "./screens/BabyScreen";
import ResultScreen from "./screens/ResultScreen";

const FaceBlenderScreenConfig = {
    DadScreen: {
        screen: DadScreen,
        navigationOptions: {
            header: null,
        },
    },
    MumScreen: {
        screen: MumScreen,
        navigationOptions: {
            header: null,
        },
    },
    BabyScreen: {
        screen: BabyScreen,
        navigationOptions: {
            header: null,
        },
    },
    ResultScreen: {
        screen: ResultScreen,
        navigationOptions: {
            header: null,
        },
    },
};

export default FaceBlenderScreenConfig;
