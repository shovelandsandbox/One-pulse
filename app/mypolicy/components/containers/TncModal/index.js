import React, { Component } from "react";
import { View, Image } from "react-native";
import { Colors } from "../../../configs";
import Styles from "./style";
import {
  TextLX,
  TextM,
  TextS,
  TextXS
} from "../../../components/derivatives/Text";
import { BottomButtonGroup as BottomButtonGroupCard } from "../../../components/cards";
import { Padder as PadderContainer, Modal as ModalContainer } from "../index";
import TNCModal from "../../../modals/TNC";
import { connect } from "react-redux";

// eslint-disable-next-line react/require-optimization
class TncModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTnc: false
    };

    this.showTnc = this.showTnc.bind(this);
    this.closeTnc = this.closeTnc.bind(this);
  }

  showTnc() {
    // alert('show tnc')
    this.setState({
      showTnc: true
    });
  }
  renderBottom() {
    return (
      <BottomButtonGroupCard
        transparentBackground
        inverse={this.props.inverse}
        submitLabel={
          this.props.language === "ID" ? this.props.buttonLabel : "Next"
        }
        cancelLabel={this.props.cancelLabel}
        onSubmit={this.props.onSubmit}
        onCancel={this.props.onCancel}
      />
    );
  }

  renderBottomPadding() {
    if (!this.props.cancelLabel || !this.props.onCancel) {
      return false;
    }

    return <View style={Styles.bottomPadder} />;
  }

  closeTnc() {
    this.setState({
      showTnc: false
    });
  }
  render() {
    const { meta, language } = this.props;
    // const { goBack } = this.props.navigation;
    console.log("render", this.props);
    return (
      <ModalContainer
        isActive={this.props.isActive}
        bottomContent={this.renderBottom()}
        backgroundColor={
          this.props.inverse ? Colors.main.baseOrange : Colors.main.baseWhite
        }
        inverse={this.props.inverse}
        onClosePress={this.props.onClosePress}
        floatingHeader={this.props.floatingHeader}
        scrollable={this.props.scrollable}
      >
        <PadderContainer style={Styles.container}>
          <View style={Styles.top.container}>
            <View style={Styles.top.image.container}>
              <Image resizeMode={"contain"} source={this.props.image} />
            </View>
          </View>
          <View style={Styles.container}>
            <TextLX
              align={"center"}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ marginBottom: 24 }}
              color={
                this.props.inverse
                  ? Colors.main.baseWhite
                  : Colors.main.fontGray
              }
            >
              {this.props.header}
            </TextLX>
            <TextM
              align={"center"}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ marginBottom: 24 }}
              color={
                this.props.inverse
                  ? Colors.main.baseWhite
                  : Colors.main.fontGray
              }
            >
              {language === "ID"
                ? this.props.title
                : "Get your policy information here. You can submit a claim, track it and do many more"}
            </TextM>
          </View>
          <View style={Styles.bottom}>
            <TextXS onPress={() => this.showTnc()} align={"center"}>
              {language === "ID"
                ? this.props.message
                : "By pressing the Next button below, you have read and agreed "}
              <TextXS underline align={"center"}>
                {language === "ID"
                  ? this.props.underline
                  : "term and condition"}
              </TextXS>
              <TextXS align={"center"}>
                {language === "ID" ? this.props.message2 : " From Prudential."}
              </TextXS>
            </TextXS>

            <TNCModal
              language={language}
              isActive={this.state.showTnc}
              type={"pruService"}
              meta={meta}
              onClose={() => this.closeTnc()}
              onClosePress={() => this.closeTnc()}
            />

            {this.renderBottomPadding()}
          </View>
        </PadderContainer>
      </ModalContainer>
    );
  }
}

const mapStateToProps = state => ({
  action: state.mpolicyMyPolicy.action,
  meta: state.meta,
  language: state.userPreferences.language,
});

export default connect(mapStateToProps, null)(TncModal);
