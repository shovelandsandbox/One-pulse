import { Sizes,Colors } from "../../../configs";
import {Dimensions} from "react-native";
export default {
  title: {
    container: {
      marginBottom: 40,
    },
  },

  subTitle: {
    marginTop: 16,
  },

  background: {
    container: {
      flex: -1,
      position: "absolute",
      left: 0,
      top: 0,
      right:0,
      width: Sizes.screen.width,
      height:125,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },

    content: {
      width: '100%',
    },
  },

  bottomPadding: {
    height: 120,
  },

  step: {
    marginBottom: 8,
  },
  container:{
    flex:1,
    backgroundColor:Colors.main.baseWhite
  },
  imageStyle:{
    width:Dimensions.get("screen").width*1.2 ,
    height: 145,
    marginStart:-12
  },
  backContainer:{
    paddingTop: 18,
    paddingLeft: 22.5
    }
};
