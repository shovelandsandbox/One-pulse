import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ImageBackground, TextInput, BackHandler, Linking } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { gotoCCAAssessmentResult, getAssessmentDetail } from "../../actions"
import { AssessmentDetailStyle as styles } from "./styles";
import { Header } from "../../components/Header"
import { ccaImages } from "../../images";
import MetaConstants from "../../meta";
import { isNil, isEmpty } from "ramda";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Theme } from "../../../../themes";
const { Colors } = Theme;

class AssessmentDetail extends Component {
    constructor(props) {
        super(props);
        this.MetaConstants = { ...MetaConstants.initializeCCAScreenMeta() };
        this.state = {
            showDetails: []
        };
    }

    componentDidMount = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleDeviceBackButton);

        const { memberUuid, navigation } = this.props
        const assessId = navigation.state.params.assessId
        this.props.getAssessmentDetail({ assessId, memberUuid });
        this.props.dispatchEvent(events.AssessmentDetail)
    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleDeviceBackButton);
    }

    handleDeviceBackButton = () => {
        this.props.gotoCCAAssessmentResult()
        return true;
    }

    toggleState = (item, index) => {
        var showSubView = this.state.showDetails
        var newIndex = showSubView.indexOf(index);
        if (newIndex > -1) {
            showSubView.splice(newIndex, 1)
            this.setState({ showDetails: showSubView })
        } else {
            if (showSubView.length === 0) {
                var addIndex = showSubView.concat(index)
            } else {
                showSubView.length = 0
                var addIndex = showSubView.concat(index)
            }
            this.setState({ showDetails: addIndex })
        }
    }


    toggleBgStyle = (item, index) => {
        var showSubView = this.state.showDetails
        var newIndex = showSubView.indexOf(index);
        if (newIndex > -1) {
            return styles.grayBgViewElevated
        }
        else {
            return styles.grayBgView;
        }
    }

    renderTabIcons = (item, index) => {
        if (!isNil(item.icon) && !isEmpty(item.icon.trim) && item.icon.includes("http")) {
            return item.icon
        }
        else if (!isNil(item.icon) && !isEmpty(item.icon.trim) && !item.icon.includes("http")) {
            return ccaImages.detailIcons[item.icon]
        }
        else {
            if (index === 0) return ccaImages.book
            if (index === 1) return ccaImages.mouth
            if (index === 2) return ccaImages.bodyStanding
            if (index === 3) return ccaImages.bowl
            if (index === 4) return ccaImages.yellowCalendar
        }
    }

    renderAdviceIcons = (item, index) => {
        if (!isNil(item.icon) && !isEmpty(item.icon.trim) && item.icon.includes("http")) {
            return item.icon
        }
        else if (!isNil(item.icon) && !isEmpty(item.icon.trim) && !item.icon.includes("http")) {
            return ccaImages.adviceIcons[item.icon]
        }
        else if (!isNil(item.icon)) {
            if (index === 0) return ccaImages.bodyRelaxing
            if (index === 1) return ccaImages.forkKnife
            if (index === 2) return ccaImages.bodyRunning
            if (index === 3) return ccaImages.accupoint
            if (index === 4) return ccaImages.clock
        }
    }

    renderFirstLevel = (item1, index1) => {
        return (
            <>
                {(item1.items && !isEmpty(item1.items)) &&
                    <TouchableOpacity
                        style={this.toggleBgStyle(item1, index1)}
                        onPress={() => {
                            this.toggleState(item1, index1)
                            this.props.dispatchEvent(events.DetailTabsInfoClick)
                        }} >
                        <View style={styles.imgStyle}>
                            <Image style={styles.image} resizeMode="contain" source={{ uri: this.renderTabIcons(item1, index1) }} />
                        </View>
                        <View style={styles.textStyle} >
                            <Text style={styles.infoHeadingText}>
                                {item1.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
            </>
        )

    }

    renderSecondLevel = (item2, index2) => {
        return (
            <>
                <View style={styles.titleIconView}>
                    <Icon name="circle" size={12} color={Colors.warmGray} />
                    <Text style={styles.bulletTextGray}>
                        {item2.title}
                    </Text>
                    <Image style={styles.adviceIcon} resizeMode="contain" source={{ uri: this.renderAdviceIcons(item2, index2) }} />
                </View>

                {
                    !isNil(item2.content) && !isEmpty(item2.content)
                        ? <View style={styles.contentView}>
                            <Text style={styles.bulletTextGray}>{item2.content}</Text>
                        </View> : null
                }
            </>
        )
    }

    renderThirdLevel = (item3, index3) => {
        return (
            <>
                {!isNil(item3.title) && !isEmpty(item3.title)
                    ? <View style={styles.hollowBulletView}>
                        <Icon name="circle-o" size={12} color={Colors.warmGray} />
                        <Text style={styles.bulletTextGray}>
                            {item3.title}
                        </Text>
                    </View>
                    : null
                }
            </>
        )
    }

    renderFourthLevel = (item4, index4) => {
        var imageURI = `${ccaImages.ccaBaseURL}${item4.filename}${"?namespace=TW"}`
        return (
            <View style={styles.adviceImageView}>
                {!isNil(item4.desc) && !isEmpty(item4.desc) &&
                    <Text style={styles.bulletTextGray}>
                        {item4.desc}
                    </Text>}
                {!isNil(item4.filename) && !isEmpty(item4.filename) &&
                    <Image style={styles.subImage} resizeMode="contain" source={{ uri: imageURI }} />}
            </View>
        )
    }

    renderFifthLevel = (item5, index5) => {
        return (
            <>
                {!isNil(item5.name) && !isEmpty(item5.name) &&
                    <View style={styles.hollowBulletView}>
                        <Icon name="circle-o" size={12} color={Colors.warmGray} />
                        <TouchableOpacity onPress={() => {
                            !isNil(item5.url) && !isEmpty(item5.url) ? Linking.openURL(item5.url) : null
                            this.props.dispatchEvent(events.DetailClinicReservationLinkClick)
                        }}>
                            <Text style={styles.bulletTextYellow} >{item5.name}</Text>
                        </TouchableOpacity>
                    </View>

                }
            </>
        )
    }

    renderWarning = (item1) => {
        return (
            <>
                {
                    !isNil(item1.attributes.warning) && !isEmpty(item1.attributes.warning)
                        ? <View style={styles.warnDecView}>
                            <Icon name="circle" size={12} color={Colors.warmGray} />
                            <Text style={styles.bulletTextRed}>
                                {item1.attributes.warning}
                            </Text>
                        </View>
                        : null
                }
            </>
        )
    }

    renderDeclaration = (item1) => {
        return (
            <>
                {!isNil(item1.attributes.declaration) && !isEmpty(item1.attributes.declaration)
                    ? <View style={styles.warnDecView}>
                        <Text style={styles.bulletTextGray}>
                            {item1.attributes.declaration}
                        </Text>
                    </View>
                    : null}
            </>
        )
    }

    render() {

        const DetailInfo = this.MetaConstants.DetailInfo;
        const Back = this.MetaConstants.Back;

        const { assessmentDetail } = this.props
        const detailCheck = !isEmpty(assessmentDetail)

        return (
            <SafeAreaView style={styles.safeView}>

                <Header
                    onPressIcon={() => {
                        this.props.gotoCCAAssessmentResult()
                        this.props.dispatchEvent(events.BackLMHResultScreenClick)
                    }}
                />

                <View style={styles.mainView}>
                    <Text style={styles.detailHeadingText}>
                        {DetailInfo}
                    </Text>

                    {detailCheck
                        ? <ScrollView showsVerticalScrollIndicator={false}>


                            {assessmentDetail.map((item1, index1) => {
                                return (
                                    <>
                                        {this.renderFirstLevel(item1, index1)}

                                        {this.state.showDetails.indexOf(index1) !== -1 &&
                                            <View style={styles.subView}>
                                                {item1.items && item1.items.map((item2, index2) => {
                                                    return (
                                                        <>
                                                            {this.renderSecondLevel(item2, index2)}

                                                            {item2.items && item2.items.map((item3, index3) => {
                                                                return (
                                                                    <>
                                                                        {this.renderThirdLevel(item3, index3)}
                                                                    </>
                                                                )
                                                            })}

                                                            {item2.images && item2.images.map((item4, index4) => {
                                                                return (
                                                                    <>
                                                                        {this.renderFourthLevel(item4, index4)}
                                                                    </>
                                                                )
                                                            })}

                                                            {item2.urls && item2.urls.map((item5, index5) => {
                                                                return (
                                                                    <>
                                                                        {this.renderFifthLevel(item5, index5)}
                                                                    </>
                                                                )
                                                            })}

                                                            {item2.urls && <View style={styles.underline} />}

                                                        </>
                                                    )
                                                })}


                                                {item1.attributes &&
                                                    <>
                                                        {this.renderWarning(item1)}
                                                    </>
                                                }

                                                {item1.attributes &&
                                                    <>
                                                        {this.renderDeclaration(item1)}
                                                    </>
                                                }


                                            </View>
                                        }
                                    </>
                                )
                            })
                            }


                        </ScrollView>
                        : null}
                </View>
            </SafeAreaView>
        );
    }
}

AssessmentDetail.PropTypes = {
    navigation: PropTypes.object,
    assessId: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        assessmentDetail: state.cca.assessmentDetail,
        assessmentId: state.cca.assessmentStatus.recordId,
        memberUuid: state.profile.id,
    };
};
export default connect(
    mapStateToProps,
    {
        gotoCCAAssessmentResult,
        getAssessmentDetail,
        dispatchEvent
    }
)(AssessmentDetail);



