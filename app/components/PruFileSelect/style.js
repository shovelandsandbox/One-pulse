
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 65,
        backgroundColor: "#F01525",
        flexDirection: 'row',
        color: "#fff",
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 10,

    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1,

    },
    title: {
        fontSize:18,
        color: '#616161',
        fontWeight: "600",
        marginBottom: 15,
    }
    ,
    boxContent:{
        width:"100%"
    }
    ,
    box:{
        borderRadius: 3,
        borderWidth:1,
        borderColor:'#fff',
        width:"100%",
        borderRadius: 8,
        shadowColor:'#000',
        shadowOffset:{h:1,w:0},
        shadowRadius:2,
        shadowOpacity:0.3,
        backgroundColor:"#fff",
        minHeight:60,
        alignItems:'center',
        justifyContent:"flex-start",
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 20,
        paddingVertical: 10,
    }
   
});

export default styles;