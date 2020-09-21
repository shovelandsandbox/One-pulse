import { StyleSheet } from "react-native";

export default StyleSheet.create({
	headerImagecontainer:{
	    resizeMode: "cover",
	    justifyContent: "space-between",
	    width:'100%',
	    height:150,
	    overflow:'visible'
	},
	backButtonStyle: {
	    backgroundColor:'rgba(0,0,0,0)'
	},
	headerTitle:{
		color:"#fff",
		marginHorizontal:20,
		marginVertical:15,
		fontWeight:'900',
		fontSize: 22,
		fontFamily: "Avenir",
	},
	boxContainer:{
	    justifyContent: "center",
	    alignItems:"center",
	    width:132,
	    height:124,
	    borderColor:'#c7c7c755',
	    borderWidth:1,
		borderRadius:8,
		backgroundColor: "#FFF",
		elevation:3
	},
	profilePic:{
		width:45,
		height:45
	},
	nameText:{
		color:"#393939",
		fontSize:14,
		fontWeight:'500',
		fontFamily: "Avenir-Roman",
	},
	normalText:{
		color:"#393939",
		fontSize:11,
		fontFamily: "Avenir-Roman",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.3)"
	},
	bottomView: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.3)"
	},
	modalView: {
		margin: 10,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "flex-start",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	popupView:{
		margin: 10,
		borderLeftColor:"#ec1c2e",
		borderLeftWidth:10,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "flex-start",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	reminderModalView: {
		margin: 5,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		alignItems: "flex-start",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		width:"90%"
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 6,
		padding: 10,
		elevation: 2
	},
	cancelLink: {
		padding: 10,
		elevation: 2
	},
	cancelText: {
		color: "#ec1c2e",
		fontWeight: "bold",
		textAlign: "center",
		fontFamily: "Avenir",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
		fontFamily: "Avenir",
	},
	modalText: {
		marginBottom: 10,
		color: "#212529",
		fontSize: 16,
		fontFamily: "Avenir",
	},
	bottomRow: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "flex-end",
		marginTop:20
	},
	rowView: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems:"center",
		marginTop: 5
	},
	inputView: {
		marginTop: 5,
		width :"100%",
	},
	inputBox: {
		height: 40,
		fontSize: 16,
		color: "#212529",
		fontWeight: "300",
		fontFamily: "Avenir",
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "#707070",
		justifyContent:"center",
		paddingHorizontal: 10,
		width :"100%",
	},
	monthsButton: {
		borderRadius: 10,
		padding: 10,
		borderWidth:1,
		borderColor:'#707070'
	},
	vaccineText:{
		color:"#424c57"
	},
	oneVaccineView:{
		marginTop:4
	},
	inputTitle:{
		color:"#212529"
	}
});
