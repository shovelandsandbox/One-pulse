import React, { PureComponent } from "react";
import { View, Linking, Text } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { path, pathOr } from "ramda";
import { convertToCapitalCase } from "../../../utils";
import lang from "../lang";
import { Colors } from "../../../configs";
import { Padder as PadderContainer } from "../../../components/containers";
import {
  RowMenu as RowMenuCard,
  SimpleDataRow as SimpleDataRowCard,
  Accordion,
} from "../../../components/cards";
import Styles from "./style";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";
class MyPolicyAgentInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.handlingEmail = this.handlingEmail.bind(this);
    this.handlingPhone = this.handlingPhone.bind(this);
  }

  renderDoubleRow = ({
    firstLabel,
    firstValue,
    firstNote = null,
    secondLabel,
    secondValue,
    secondNote = null,
  }) => {
    return (
      // <PadderContainer style={Styles.doubleRow.grouper}>
      //   <View style={Styles.doubleRow.container}>
      //     <SimpleDataRowCard
      //       label={firstLabel}
      //       value={firstValue}
      //       note={firstNote}
      //       noPadding
      //       noBorder
      //     />
      //   </View>

      //   <View style={Styles.doubleRow.container}>
      //     <SimpleDataRowCard
      //       label={secondLabel}
      //       value={secondValue}
      //       note={secondNote}
      //       noPadding
      //       noBorder
      //     />
      //   </View>
      // </PadderContainer>
      <View style={[Styles.containerMainStyle, { paddingTop: 10 }]}>
        <View style={Styles.agentInfo}>
          <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{firstLabel}</Text>
          <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{firstValue}</Text>
        </View>
        <View style={Styles.agentInfo}>
          <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{secondLabel}</Text>
          <Text style={{...Styles.mainValue, ...configureLineHeight("18")}}>{secondValue}</Text>
        </View>
      </View>
    );
  };

  renderContactRow = (icon, label, onPress) => {
    return (
      <View style={Styles.rowContainer}>
        <RowMenuCard
          label={label}
          onPress={onPress}
          icon={icon}
          color={Colors.main.baseRed}
          noArrow
        />
      </View>
    );
  };

  renderContact(data) {
    const agentObj = pathOr({}, ["servingAgents", "agent"], data);
    const NA = lang.getNA();
    const agentDetailData = {
      firstLabel: lang.agentName(),
      firstValue: agentObj.name
        ? convertToCapitalCase(agentObj.name, false)
        : NA,
      secondLabel: lang.marketingOffice(),
      secondValue:
        typeof agentObj.office === "undefined"
          ? NA
          : convertToCapitalCase(agentObj.office, false),
    };

    let email = path(["contactDetails", "email", "value"], agentObj);

    if (!email) {
      email = pathOr(NA, ["contactDetails", "EMAIL", "value"], agentObj);
    }

    let phone = path(["contactDetails", "phone", "value"], agentObj);

    if (!phone) {
      phone = pathOr(NA, ["contactDetails", "PHONE", "value"], agentObj);
    }

    return (
      <Accordion title={lang.myAgent()} showAllContent={true}>
        {this.renderDoubleRow(agentDetailData)}
        {/* {this.renderContactRow("message", email, () => {
          this.handlingEmail(data);
        })}
        {this.renderContactRow("contact", phone, () => {
          this.handlingPhone(data);
        })} */}
        <View style={[Styles.containerMainStyle, Styles.contactContainer]}>
          <View style={Styles.agentInfo}>
            <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{lang.email()}</Text>
            <Text
              style={{...Styles.mainValue, ...configureLineHeight("18")}}
              onPress={() => this.handlingEmail(data)}
            >
              {email}
            </Text>
          </View>
          <View style={Styles.agentInfo}>
            <Text style={{...Styles.mainLabel, ...configureLineHeight("18")}}>{lang.phone()}</Text>
            <Text
              style={{...Styles.mainValue, ...configureLineHeight("18")}}
              onPress={() => this.handlingPhone(data)}
            >
              {phone}
            </Text>
          </View>
        </View>
      </Accordion>
    );
  }

  handlingEmail(data) {
    let email = path(
      ["servingAgents", "agent", "contactDetails", "email", "value"],
      data
    );

    if (!email) {
      email = path(
        ["servingAgents", "agent", "contactDetails", "EMAIL", "value"],
        data
      );
    }

    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  }

  handlingPhone(data) {
    let phone = path(
      ["servingAgents", "agent", "contactDetails", "phone", "value"],
      data
    );
    if (!phone) {
      phone = path(
        ["servingAgents", "agent", "contactDetails", "PHONE", "value"],
        data
      );
    }

    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  }

  render() {
    const { policyData } = this.props;
    return policyData && this.renderContact(policyData);
  }
}

MyPolicyAgentInfo.propTypes = {
  policyData: PropTypes.object,
};

export default connect()(MyPolicyAgentInfo);
