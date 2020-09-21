import React, { Component } from "react";
import {
    Picker,
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView
} from "react-native";
import DatePicker from "react-native-date-picker";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import ConsulationHistoryItems from "../../components/ConsulationHistoryItems"
import { BACK, History_Icon, DOC_INLINE_LOGO } from "../../../../config/images";
import {
    CoreActionTypes,
    CoreConfig,
    CoreUtils,
} from "@pru-rt-internal/pulse-common";
import actions from "../../configs/actionNames";
import screens from "../../configs/ScreenNames";
const { pageKeys } = CoreConfig;
const {
    SCREEN_CONSULTATION_HISTORY,
    CONSULTATION_HISTORY_TITLE,
} = CoreConfig
const { metaHelpers } = CoreUtils
// const mockData = require('../../mockResponse/consulationHistory.json')
// const realMockData = require('../../mockResponse/consulationHistoryReal.json')



class ConsulationHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySource: []
        }
    }

    componentWillMount() {
        // this._prepareMockDisplaySource()
    }

    _prepareMockDisplaySource() {
        // const response = realMockData
        // const displayArray = response.body
        // this.setState({
        //     displaySource: displayArray
        // })
    }

    componentDidMount() {
        this.props.getAllConsultationshistory({
            startDate: "",
            endDate: "",
            pageSize: 1,
            pageNumber: 1
        })
    }
    handleGoBack = () => {
        this.props.navigation.goBack()
    }
    showFilter = () => {
        this.props.navigation.navigate(screens.DOC_CONSULTATION_FILTER)
    }
    gotoDetail = (history) => {
        this.props.navigation.navigate(screens.DOC_CONSULTATION_DETAIL, {
            consulationItem: history
        })
    }

    _buildListItem = (tuple) => {

        const item = tuple.item

        // console.log('Will Render Item', item);
        const date = item.consultationTime.startTime
        const doctorName = item.doctor.name
        const type = item.type
        return (
            <ConsulationHistoryItems
                name={doctorName}
                times={date}
                type={type}
                // times={""}
                // type={""}
                onPress={() => {
                    this.gotoDetail(item)
                }}
            />
        )
    }

    render() {
        let  historyList  = this.props.historyList ? this.props.historyList : [];
        console.log(historyList,"======")
        let displayArray = historyList.filter((item) => {
            return item.status == "complete"
        })
        return <View style={{
            width: "100%",
            flex: 1,
        }}>
            <View style={{
                flexDirection: 'row',
                height: 54,
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                backgroundColor: "#fff"
            }}>
                <TouchableOpacity
                    onPress={() => this.handleGoBack()}
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
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
            }}>
                <View
                    style={{
                        alignSelf: "center",
                        flex: 0.25,
                    }}
                />
                <Text style={{
                    color: "#515B61",
                    textAlign: "center",
                    paddingTop: 20,
                    paddingBottom: 20,
                    backgroundColor: "#fff",
                    fontFamily: "Avenir-Heavy",
                    fontSize: 22,
                    flex: 1,
                }}>
                    {metaHelpers.findElement(SCREEN_CONSULTATION_HISTORY, CONSULTATION_HISTORY_TITLE).label}
                </Text>
                <TouchableOpacity
                    style={{
                        alignSelf: "center",
                        flex: 0.25,
                        backgroundColor: '#fff',
                    }}
                    // onPress={() => this.showFilter()}
                    accessibilityLabel="home"
                    accesible
                >
                    {/* <Image style={{ width: 21, height: 20, alignSelf: 'center' }} source={History_Icon} /> */}
                </TouchableOpacity>
            </View>
            <View style={{
                flex: 1,
                backgroudColor: "#F7F7F7"
            }}>
                <FlatList
                    //  data={this.state.displaySource}
                    data={displayArray}
                    renderItem={this._buildListItem}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

        </View >
    }
}
const mapStateToProps = state => {

    return {
        historyList: state.doctorOnCallService.historyList
    };
};
export default connect(mapStateToProps, {
    getAllConsultationshistory: payload => ({
        context: screens.DOC_CONSULTATION_HISTORY,
        type: actions.FETCH_CONSULATION_HISTORY,
        payload: payload
    }),
})(ConsulationHistory);