import {
    Text,
    View,
    FlatList,
} from "react-native";
import React, { PureComponent } from "react";
import Styles from "./styles";
import {
    gotoWithParams
} from "../../../actions";
import {
    CoreActionTypes,
    CoreConfig,
    CoreActions,
    events
} from "@pru-rt-internal/pulse-common";
const {
    getChatMessages,
} = CoreActions;
const { pageKeys } = CoreConfig;
const { MY_DOC_CHAT_SCREEN } = pageKeys;
import { connect } from "react-redux";
import Accordion from "../TeleConsultationCollapsible";
import { CONCIERGE_HISTORY } from "../../../actions/Types";
import MetaConstants from "./meta";
import { dispatchEvent } from "../../../actions";

class ConsultationHistoryScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            filename: "",
            image64: "",
            imageFiles: []
        };
        this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }

    componentDidMount() {
        this.props.getList(this.props.token);
        this.props.dispatchEvent(events.MyDocConsultationHistoryScreen)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userLanguagePreference !== nextProps.userLanguagePreference) {
            this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
        }
    }

    render() {
        return (
            <View style={Styles.All}>
                <View style={Styles.medicalTitle}>
                    <Text style={Styles.medicalText}>
                        {this.metaConstants.consultationHistoryLabel}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.props.consultationItems}
                        renderItem={({ item }) =>
                            <Accordion
                                {...this.props}
                                accordion={item}
                                metaConstants={this.metaConstants}
                                dispatchEvent={this.props.dispatchEvent}>
                            </Accordion>
                        }
                    />
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        consultationItems: state.consultationHistory.response,
        userLanguagePreference: state.userPreferences.language,
        token: state.auth.token,
    }
};
export default connect(
    mapStateToProps,
    {
        dispatchEvent,
        getChatMessages,
        getList: payload => ({
            context: pageKeys.CONSULTATION_HISTORY,
            type: CONCIERGE_HISTORY,
            payload: {
                access_token: payload,
            },
        }),
        goChatHistory: payload => ({
            context: CoreActionTypes.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS,
            type: CoreActionTypes.MY_DOC_CHAT_SCREEN
        }),
        gotoWithParams
    }
)(ConsultationHistoryScreen);
