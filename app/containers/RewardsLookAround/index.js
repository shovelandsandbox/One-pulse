import React, { Component } from "react";
import RewardsNotice from "./components/RewardsNotice"
import { connect } from "react-redux";
import {
    CoreActionTypes,
    CoreConfig,
    metaHelpers,
} from "@pru-rt-internal/pulse-common";
import MetaConstants from "./meta";

console.log("MetaConstants",MetaConstants)

class RewardsLookAround extends Component {

    constructor(props){
        super(props);
        this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
    }

    _closeAction() {
       // this.props.getCustomerVouchers();
        this.props.navigation.popToTop()
    }

    render() {
        return <RewardsNotice
            LableText={this.MetaConstants.takelookAroundLabel}
            InfoText={this.MetaConstants.watchoutforLabel}
            ButtonText={this.MetaConstants.willdoLabel}
            onPress={() => {
                this._closeAction()
            }}
            onCloseAction={() => {
                this._closeAction()
            }}
        ></RewardsNotice>
    }
}
const mapStateToProps = state => {
    return {
        userProfile: state.profile,
        redeem: state.redeem,
    }
}
export default connect(mapStateToProps, {
    getCustomerVouchers: () => ({
        context: pageKeys.REWARD,
        type: CoreActionTypes.GET_CUSTOMER_VOUCHERS
    })
})(RewardsLookAround);
