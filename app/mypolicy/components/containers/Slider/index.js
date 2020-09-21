import React, { useState } from "react";
import { View, Modal, Image, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./styles";
import IMAGES from "../../../configs/Images"
import { myPolicyMetaKeys, default as lang } from "../../../screens/MyPolicy/lang";
import { connect } from "react-redux";
import { pathOr, path, pick } from "ramda";
import {
    CoreUtils,
    CoreServices,
} from "@pru-rt-internal/pulse-common";
const { isNilOrEmpty } = CoreUtils;
const { NavigationService } = CoreServices;
import myPolicyScreens from "../../../configs/screenNames"
import { myPolicyActions } from "../../../configs/myPolicyActions"
import Meta from "../../../screens/MyPolicy/UserTransactionLinks/meta";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";

const Slider = ({
    state: {
        endorsementRequired,
        enableUpdatePolicySection,
        policiesViewMode,
        updateBeneficiaryRequired,
        enableClaimsJourney,
        enablePrudence,
        policyDetails,
        enablePruCash
    },
    dispatch: {
        linkToBeneficiary,
        linkToClaim,
        loadMyPolicyDetailForEndorsements,
        dispatchTransaction,
        resetCommonCodeMeta,
        loadMyPolicyDetailForTransaction,
        goToPruCash
    },
    policyData,
    transactionLink,
    profile,
    requiredLinksMeta

}) => {
    const [isFullView, setFullView] = React.useState(false);
    const [MetaConstants] = useState({
        ...Meta.getElementsForTransaction(),
        getRequiredLink: Meta.getRequiredLink(), // to get the required list from one pulse meta
        showLinkInDetailInfo: Meta.showLinkInDetailInfo(), //updateBeneficiaryRequired from common meta
    });
    const getMetaObject = item => {
        return !!item && MetaConstants ? MetaConstants[item.transaction] : {};
    };
    const lifeAssured = pathOr([], ["lifeAssured"], policyData);
    let isLife = lifeAssured.find(
        item =>
            pathOr("", ["contactDetails", "EMAIL", "value"], item).toLowerCase() ==
            pathOr(" ", ["email"], profile).toLowerCase()
    );
    isLife = isLife ? "PH" : "BENEFICARY";

    const checkRoles = (isLife, item) => item.transactionRole.toLowerCase() == "any"
        ? true
        : isLife == item.transactionRole;

    const { status, productOptions = [], beneficiaries } = policyData;
    const productOptionArr = productOptions.map(
        item => item.productComponentOptions
    );
    const claimantRole = isNilOrEmpty(productOptionArr);

    const getTransactionLink = () => {
        const code = pathOr("", ["product", "code"], policyData);
        const validProduct = pathOr([], ["products"], transactionLink);
        const productData = code && Array.isArray(validProduct) && validProduct[0];
        const validLinks =
            productData && !isNilOrEmpty(productData.tables)
                ? productData.tables.find(d => d["transactions"])
                : [];
        return (validLinks && validLinks["transactions"]) || [];
    };

    const control = {
        isVisible: true,
        showSliderIcon: true
    }

    const validTransactions = getTransactionLink();
    const filteredTransactions =
        validTransactions.filter(
            eT => eT.transactionRole && checkRoles(isLife, eT) && getMetaObject(eT)
        ) || [];

    const transformConfig = filteredTransactions.map(eT => {
        const meta = MetaConstants[eT.transaction];
        return {
            isVisible: true,
            imageKey: eT.transaction,
            displayName: (meta && meta.label) || item.transaction,
            onClick: () => {
                dispatchTransaction(meta && meta.action);
            },
            iconUrl: meta && meta.iconUrl
        }
    });

    const isBeneficiaryLinkEnabled = () => {
        let showBeneficiaryLink = false;
        if (!isNilOrEmpty(transactionLink)) {
            const validLinks = pathOr([], ["products"], transactionLink);
            if (
                enableUpdatePolicySection &&
                !isNilOrEmpty(validLinks) &&
                !isNilOrEmpty(validLinks[0].tables)
            ) {
                const tranLinks = validLinks[0].tables.find(d => d["transactions"]);
                showBeneficiaryLink =
                    !isNilOrEmpty(tranLinks) &&
                    tranLinks.transactions.find(
                        e => e.transaction == "CHANGEBENEFICIARY"
                    );
            }
        }
        return !!showBeneficiaryLink;
    };

    gotoChatScreen = () => {
        NavigationService.navigate("ChatBot");
    };

    const isBeneficiaryRequired = enableUpdatePolicySection
        ? updateBeneficiaryRequired && isBeneficiaryLinkEnabled()
        : updateBeneficiaryRequired
        ;


    const hasPruCash = () => {
        const productComponentOptions = pathOr(
            [],
            ["productOptions", 0, "productComponentOptions"],
            policyData
        );
        const product = productComponentOptions.find((component) => component.riderFlag === "CASHOUT");
        return product && product.cashOut;
    };

    const showTransactions = lang.showTransaction() == 'true' && policiesViewMode === 'owner';
    const isSourceLegacy = pathOr(undefined, ["sourceOfBusiness"], policyDetails) != 'DIGITAL';

    const legacyConfig = [
        {
            isVisible: enablePrudence && !enableUpdatePolicySection,
            displayName: lang.askMissPrudence(),
            imageKey: myPolicyMetaKeys.askPrudence,
            onClick: () => gotoChatScreen(),
            iconUrl: ""
        },

        {
            isVisible: isBeneficiaryRequired,
            displayName: lang.updateBeneficiary(),
            imageKey: myPolicyMetaKeys.updateBeneficiary,
            onClick: () => linkToBeneficiary(),
            iconUrl: ""
        },
        {
            isVisible: endorsementRequired && !enableUpdatePolicySection,
            displayName: lang.updateContactInfo(),
            imageKey: myPolicyMetaKeys.updateContactInfo,
            onClick: () => loadMyPolicyDetailForEndorsements(),
            iconUrl: ""
        },
        {
            isVisible: showTransactions,
            displayName: lang.viewTransaction() ? lang.viewTransaction().label : "",
            imageKey: lang.viewTransaction() ? lang.viewTransaction().label : "",
            onClick: () => {
                resetCommonCodeMeta();
                loadMyPolicyDetailForTransaction();
            },
            iconUrl: ""
        },
        {
            isVisible: false,
            displayName: lang.sliderMetas(myPolicyMetaKeys.contactUs),
            imageKey: myPolicyMetaKeys.contactUs,
            iconUrl: ""
        },
        {
            isVisible:
                enableClaimsJourney &&
                !enableUpdatePolicySection &&
                !isNilOrEmpty(claimantRole),
            displayName: lang.claimPolicy(),
            imageKey: "MINORCLAIMS",
            onClick: () => linkToClaim(),
            iconUrl: ""
        },
        {
            isVisible: enablePruCash && hasPruCash(),
            displayName: lang.pruCash(),
            imageKey: myPolicyMetaKeys.pruCash,
            onClick: () => goToPruCash(),
            iconUrl: ""
        },
    ];

    const sliderConfig = isSourceLegacy ? legacyConfig : transformConfig;

    const getIconByKey = key => {
        switch (key) {
            case myPolicyMetaKeys.myPrudential:
            case myPolicyMetaKeys.pruCash:
                return IMAGES.illustration.my_policy.ic_my_prudential;
            case "RENEW":
                return IMAGES.illustration.my_policy.ic_renew;
            case myPolicyMetaKeys.cancelAutoDebit:
                return IMAGES.illustration.my_policy.ic_pay_premium;
            case myPolicyMetaKeys.updateContactInfo:
            case "CHANGECONTACTDETAILS":
                return IMAGES.illustration.my_policy.ic_update_contact;
            case myPolicyMetaKeys.updateBeneficiary:
            case "CHANGEBENEFICIARY":
                return IMAGES.illustration.my_policy.ic_update_beneficiary;
            case "CANCEL":
                return IMAGES.illustration.my_policy.ic_cancel;
            case myPolicyMetaKeys.contactUs:
                return IMAGES.illustration.my_policy.ic_contact;
            case "MAJORCLAIMS":
            case "MINORCLAIMS":
                return IMAGES.illustration.my_policy.ic_claim
            case myPolicyMetaKeys.askPrudence:
            case "PRUDENCE":
                return IMAGES.illustration.my_policy.ic_ask_prudence;
            default:
                return IMAGES.illustration.my_policy.ic_pay_premium;
        }
    }
    const eachRow = (item, index) => {
        const { isVisible, showSliderIcon, displayName, imageKey, iconUrl, onClick = () => {
            console.log("Add functionality");
        } } = item
        if (isVisible) {
            if (showSliderIcon) {
                return (
                    <TouchableOpacity key={`item-${index}`} style={[styles.iconContainer, styles.control]}
                        onPress={() => setFullView(!isFullView)}>
                        <View style={{ paddingVertical: 26 }}>
                            <Image source={isFullView ? IMAGES.illustration.my_policy.ic_arrow_right : IMAGES.illustration.my_policy.ic_arrow_left} width={13} height={13.5} />
                        </View>
                    </TouchableOpacity>
                )
            }
            return (
                <TouchableOpacity key={`item-${index}`} disabled={!isVisible} onPress={() => onClick()}>
                    <View styles={{ alignItems: 'center' }}>
                        <View style={[styles.iconContainer, styles.minPadding, isFullView && styles.fullViewWidth]}>
                            {iconUrl ? <Image source={{ uri: iconUrl }} style={{ width: 27, height: 27 }} resizeMode="contain" />
                                : <Image source={getIconByKey(imageKey)} width={7.5} height={13.5} />}
                            <Text numberOfLines={2} style={{ ...styles.displayName, ...configureLineHeight("12") }}>{displayName}</Text>
                        </View>
                        <View style={[styles.dividerStyle, !isFullView && { width: '100%' }]} />
                    </View>
                </TouchableOpacity>
            )
        }
    }
    const visibleConfig = sliderConfig.filter(it => it.isVisible);
    // if (!visibleConfig.length) {
    //     return null;
    // }
    const showControl = visibleConfig.length > 4;
    return (
        <View style={[styles.gridContainer, isFullView && styles.fullContainer]}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.75 }}>
                    {isFullView ? <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={visibleConfig}
                        numColumns={2}
                        renderItem={({ item, index }) => eachRow(item, index)}
                    /> : (visibleConfig.slice(0, visibleConfig.length > 4 ? 3 : visibleConfig.length).map((item, index) => eachRow(item, index)))
                    }
                </View>
                {showControl && <View style={{ flex: 0.25 }}>
                    {eachRow(control)}
                </View>}
            </View>
        </View >
    )
}

const mapStateToProps = state => {
    return {
        state: {
            updateBeneficiaryRequired: path(
                ["meta", "countryCommonMeta", "updateBeneficiaryRequired"],
                state),
            enableUpdatePolicySection: path(
                ["meta", "countryCommonMeta", "enableUpdatePolicySection"],
                state
            ),
            endorsementRequired: path(
                ["meta", "countryCommonMeta", "endorsementRequired"],
                state
            ),
            policiesViewMode: path(["myPolicy", "policiesViewMode"], state),
            enableClaimsJourney: path(
                ["meta", "countryCommonMeta", "enableClaimsJourney"],
                state
            ),
            enablePrudence: path(
                ["meta", "countryCommonMeta", "enablePrudence"],
                state
            ),
            enablePruCash: path(
                ["meta", "countryCommonMeta", "enablePruCash"],
                state
            ),
            policyDetails: pathOr({}, ["myPolicy", "currentSelectedPolicy"], state),
        }
    }
};

const mapDispatchToProps = dispatch => ({
    dispatch: {
        linkToBeneficiary: () => dispatch({
            context: "PRODUCT_JOURNEYS",
            type: "product-journeys/add-beneficiary-for-existing-policy",
        }),
        linkToClaim: () => dispatch({
            context: "myClaims",
            type: "registerClaimfsm",
        }),
        loadMyPolicyDetailForEndorsements: () => dispatch({
            context: "UPDATE_INFO_SCREEN",
            type: myPolicyActions.getPolicyDetails,
        }),
        resetCommonCodeMeta: () => dispatch({
            type: "product-journeys/reset-common-code-meta",
        }),
        loadMyPolicyDetailForTransaction: () => dispatch({
            context: myPolicyScreens.POLICY_TRANSACTIONS,
            type: myPolicyActions.getPolicyDetails,
        }),
        dispatchTransaction: action => dispatch(action),
        goToPruCash: () => dispatch({
            context: "PRU_CASH",
            type: myPolicyActions.goToPruCash,
        })
    }
})

const mappedSlider = connect(mapStateToProps, mapDispatchToProps)(Slider);
export default mappedSlider;
