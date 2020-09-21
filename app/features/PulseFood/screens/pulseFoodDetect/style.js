import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    modalContainer: {
        // height: 800,
        width: 500,
        flex: 1

    },
    headerView: {
        margin: 16,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    recogniseText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#393939",
    },
    shareView: {
        // alignSelf:"flex-end",
        flexDirection: 'row',
        marginLeft: '40%',
        marginBottom: '5%',
    },
    shareImage: {
        height: 25,
        width: 25,
        marginLeft: 10,
        marginRight: 10
    },
    shareText: {
        fontSize: 18,
        fontWeight: '400'
    },
    addImageTextView: {
        marginHorizontal:16
    },
    addImageText: {
        fontSize: 12,
        color:"#4d4d4d"
    },
    imageView: {
        height: 400,
        width: '100%'
    },
    imgFull: {
        height: 400,
        width: '100%'
    },
    squareView: {
        borderColor: 'gray',
        height: 120,
        width: 120,
        borderWidth: 1,
        marginTop: '15%',
        marginLeft: '5%'
    },
    squareView1: {
        borderColor: 'gray',
        height: 60,
        width: 100,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '10%'
    },
    tryView: {
        flexDirection: 'row',
        marginTop: 16,
        alignItems: 'flex-end',
        justifyContent:"center",
        marginBottom:16
    },
    tryText: {
        fontSize: 14,
        color: 'red',
        flex: 1,

        // marginLeft:'10%',

    },
    continueText: {
        fontSize: 18,
        fontWeight: '400',

    },

    middleView: {
        flexDirection: 'row',
        // marginTop:16
    },
    AvacadoView: {
        width: 125,
        marginLeft: 16,
        borderRadius: 16,
        // borderWidth:1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 4,
        backgroundColor: "#fff",

    },
    servingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    buttonView: {
        borderRadius: 15,
        borderColor: 'gray',
        flexDirection: 'row',
    },
    nameInput: {
        
        height: 40,
        paddingVertical: 8,
        // marginTop: 16,
        borderRadius:8,
        // flex:1,
        width:"100%"
    },
    buttonStyle: {
        height: 30,
        width
    },
    whiteView: {
        padding: 16,
        paddingVertical: 8,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15

    }
});
