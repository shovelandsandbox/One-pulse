import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

export default StyleSheet.create({
    connect:{
        width:295,
        height:70,
        borderColor:"#D9DCDE",
        borderBottomWidth:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    left:{
        width:179,
        height:22,
        color:"#515B61",
        fontFamily: "Avenir",
        fontSize:16,
        fontWeight:"900",
        lineHeight: 22
    },
    rightcheked:{
        width:100,
        height:36,
        color:"#FFFFFF",
        backgroundColor:"#ED1B2E",
        fontSize:14,
        fontWeight:"500",
        textAlign:"center",
        borderRadius:18,
        overflow:"hidden",
        // lineHeight:36,
        alignItems:"center",
        justifyContent:"center"
       
        
    },
    rightunchecked:{
        


        width:100,
        height:36,
        color:"#FFFFFF",
        backgroundColor:"#BDBEC0",
        fontSize:14,
        fontWeight:"500",
        textAlign:"center",
        borderRadius:18,
        overflow:"hidden",
        // lineHeight:36,
        alignItems:"center",
        justifyContent:"center"
        
    }
})