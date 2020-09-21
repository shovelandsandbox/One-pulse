import React from "react";
import { StyleSheet, Dimensions, View, Image,TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Pdf from "react-native-pdf";
const RNFS = require("react-native-fs");
import { BACK, History_Icon, VIDEO, TIMG, FEEDBACK, DOC_INLINE_LOGO } from "../../../../config/images";

class PdfViewer extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let { consulationImage } = this.props

        let content = consulationImage.content ? consulationImage.content : ""
        const source = { uri: "data:application/pdf;base64," + content };

        return (
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    height: 54,
                    justifyContent: 'space-between',
                    // borderBottomWidth: 1,
                    // borderBottomColor: '#D9D9D9',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    backgroundColor: "#fff"
                }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()
                        }
                        accesible
                    >
                        <Image style={{ width: 20, height: 15 }} source={BACK} />
                    </TouchableOpacity>
                    <View>
                        <Image
                          style={{
                              width: 60,
                              height: 35,
                              resizeMode: 'contain',
                          }}
                          source={DOC_INLINE_LOGO}
                        />
                    </View>
                </View>
                <Pdf
                    source={source}
                    // source={{uri:consulationImage.content}	}

                    onLoadComplete={(numberOfPages, filePath) => {
                        // console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        // console.log(`current page: ${page}`);
                    }}
                    onError={(error) => {
                        // console.log(error);
                    }}
                    // style={{width:"100%",height:5000}}
                    style={styles.pdf}

                />
            </View>
        );
    }
}
const mapStateToProps = state => ({
    // file: state.doctorServices.file,
    // file: state.doctorOnCallService.consulationImage,
    consulationImage: state.doctorOnCallService.consulationImage
});
export default connect(
    mapStateToProps,
    null
)(PdfViewer);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get("window").width,
    },
});