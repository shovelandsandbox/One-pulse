import { StyleSheet, Dimensions, Platform } from "react-native";

import { CoreConfig } from "@pru-rt-internal/pulse-common";

const { colors } = CoreConfig;

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    modal:{
        flex:1,
        margin:0
    },
    container:{
        flex:1,
        backgroundColor:"#fff",
    },
    test:{
        height:height
    },
    searchContainer:{
        paddingHorizontal:16,
        paddingVertical:16,
        flexDirection:"row",
        alignItems:"center"
    },
    backIcon:{
        height:16,
        width:20
    },
    clearTextIcon:{
        fontSize:18,
        fontWeight:"bold",
        position:"absolute",
        right: 12,
        top:8,
        color:"#cccccc",
    },
    searchtextContainer:{
        paddingHorizontal:16,
        backgroundColor:"#fff",
        height: 40, 
        borderWidth:0.5,
        borderColor:"silver",
        elevation:3,
        borderRadius:8,
    },
    searchtextInput:{
        width: "90%",
        backgroundColor:"#fff",
        height: 38, 
    },
    pulseSearchContainer:{
        padding:16,
        position:"relative",
        
    },
    pulseSearchCategoriesContainer:{
        flexDirection:"row",
        flexWrap:"wrap"
    },
    pulseSearchText:{
        fontSize:14,
        fontWeight:"700",
        color:"#2f2f2f"
    },
    searchSuggestionsContainer:{
        position:"absolute",
        top:60,
        width: width - 42 - 16,
        backgroundColor:"#fff",
        marginLeft:42,
        zIndex:9999,
        elevation:2
    },
    searchResultText:{
        // fontSize:12,
        paddingHorizontal:16,
        paddingVertical:10,
        color:"#707070"
    },
    searchResultDivider:{
        borderWidth:0.2,
        borderColor:"#fcfdff"
    },
    divider:{
        height:4,
        backgroundColor:"#e9f0f8"
    },

    searchCategoryContainer:{
        // borderWidth:1,
        width:"25%",
        marginVertical:10,
        alignItems:"center",
        justifyContent:"center"
    },
    categoryImageContainer:{
        height:60,
        width:60,
        borderWidth:1,
        borderRadius: 60,
        borderColor:"#ec1c2e",
        alignItems:"center",
        justifyContent:"center"
    },
    categoryIcon:{
        height: 45,
        width:45
    },
    categoryText:{
        fontSize:12,
        color:"#707070",
        marginTop:8
    },
    recentSearchContainer:{
        paddingHorizontal:16,
    },
    recentSearchTextContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    recentSearchIcon:{
        height:20,
        width:20
    },
    recentSearchHeaderText:{
        fontSize:14,
        fontWeight:"700",
        color:"#2f2f2f",
        marginBottom:10,
    },
    recentSearchText:{
        fontSize:12,
        color:"#707070",
        marginLeft:10,
        flex:1
    },
    recentSearchDivider:{
        borderWidth:0.5,
        borderColor:"#fcfdff",
        marginVertical:10
    }
})