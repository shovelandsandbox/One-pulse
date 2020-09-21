import React, { Component } from "react";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import CardView from "react-native-cardview";
import { INSURANCE_CONSULTATION } from "../../../../config/images";
import { PruBackHeader } from "../../../../components";
import chatStyles from "./styles";
import ScreenNames from "../../configs/screenNames";
import { goTo } from "../../actions";

import { CoreComponents } from "@pru-rt-internal/pulse-common";
const { AppButton } = CoreComponents;
import MetaConstants from "../../meta";
class ChatConsultation extends Component {
  constructor(props) {
    super(props);
    this.metaConstants = { ...MetaConstants.screenMeta() };
    this.state = {};
  }

  render() {
    const book_consult_desc = this.metaConstants.book_consult_desc;
    const speak_to_agent = this.metaConstants.speak_to_agent;
    const Book = this.metaConstants.book_button_text;
    const previous_chat_agent = this.metaConstants.previous_chat_agent;
    const Open = this.metaConstants.open_button_text;
    const Explore_All = this.metaConstants.explore_all_option;
    const View_Insurance_Catalog = this.metaConstants.view_insurance_cat;
    const Total_Multi_Crisis = this.metaConstants.total_multi_crisis;

    return (
      <View style={chatStyles.All}>
        <ImageBackground
          style={{ height: 320 }}
          resizeMode={"stretch"}
          imageStyle={{}}
          source={INSURANCE_CONSULTATION}
        >
          <PruBackHeader
            title={"Protection"}
            customStyles={chatStyles.customStyles}
            inverse={true}
          />
        </ImageBackground>
        <View style={chatStyles.bookConsultation}>
          <View style={{ flex: 0.6 }}>
            <Text style={{ fontWeight: "500", color: "white" }}>
              {book_consult_desc}
            </Text>
            <Text style={{ color: "white" }}>{speak_to_agent}</Text>
          </View>

          <View
            style={[
              chatStyles.cardBtn,
              chatStyles.whiteBgColor,
              chatStyles.btnShadowContainer,
            ]}
          >
            <AppButton
              title={Book}
              type={{}}
              textStyle={{
                color: "#ec1c2e",
                fontWeight: "500",
              }}
            />
          </View>
        </View>
        <ScrollView>
          <View style={chatStyles.scrollableCardView}>
            <CardView
              cardElevation={0}
              cardMaxElevation={0}
              cornerRadius={10}
              style={chatStyles.cardViewStyle}
            >
              <View style={chatStyles.flexStyle}>
                <View style={{ flex: 0.6 }}>
                  <Text style={{ fontWeight: "500", color: "#707070" }}>
                    Consultation Chat History
                  </Text>
                  <Text style={{ color: "#858c94" }}>
                    {previous_chat_agent}
                  </Text>
                </View>

                <View
                  style={[
                    chatStyles.cardBtn,
                    chatStyles.whiteBgColor,
                    chatStyles.btnShadowContainer,
                  ]}
                >
                  <AppButton
                    title={Open}
                    type={{}}
                    textStyle={{
                      color: "#707070",
                    }}
                    press={() => this.props.goTo(ScreenNames.CHAT_CONTACTS)}
                  />
                </View>
              </View>
            </CardView>
            <CardView
              cardElevation={0}
              cardMaxElevation={0}
              cornerRadius={10}
              style={chatStyles.cardViewStyle}
            >
              <View style={chatStyles.flexStyle}>
                <View style={{ flex: 0.6 }}>
                  <Text style={{ fontWeight: "500", color: "#707070" }}>
                    {View_Insurance_Catalog}
                  </Text>
                  <Text style={{ color: "#858c94" }}>{Explore_All}</Text>
                </View>

                <View
                  style={[
                    chatStyles.cardBtn,
                    chatStyles.whiteBgColor,
                    chatStyles.btnShadowContainer,
                  ]}
                >
                  <AppButton
                    title={Open}
                    type={{}}
                    textStyle={{
                      color: "#707070",
                    }}
                    press={() => this.props.goTo(ScreenNames.CHAT_CONTACTS)}
                  />
                </View>
              </View>
            </CardView>
            <CardView
              cardElevation={0}
              cardMaxElevation={0}
              cornerRadius={10}
              style={[chatStyles.cardViewStyle, chatStyles.lastCardStyle]}
            >
              <View style={chatStyles.flexStyle}>
                <View style={{ flex: 0.6 }}>
                  <Text style={{ fontWeight: "500", color: "#707070" }}>
                    {Total_Multi_Crisis}
                  </Text>
                  <Text style={{ color: "#858c94" }}>Lorem Ipsum</Text>
                </View>

                <View
                  style={[
                    chatStyles.cardBtn,
                    chatStyles.whiteBgColor,
                    chatStyles.btnShadowContainer,
                  ]}
                >
                  <AppButton
                    title={Open}
                    type={{}}
                    textStyle={{
                      color: "#707070",
                    }}
                    press={() => this.props.goTo(ScreenNames.CHAT_CONTACTS)}
                  />
                </View>
              </View>
            </CardView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  goTo,
})(ChatConsultation);
