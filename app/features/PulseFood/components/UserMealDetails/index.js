
import React from 'react';
import { View, TouchableOpacity, Text, Image, Platform } from "react-native";
import { pathOr } from 'ramda';
import ImagePicker from "react-native-image-crop-picker";
import OpenSettings from "react-native-open-settings";

//  styles
import { styles } from "./styles";
import { metaLabelFinder } from "../../../../utils/meta-utils";

// custom
import Meta from "../../meta";
import PruCustomAlert from "../../../../components/PruCustomAlert";

const handleOnRemove = (id, mealType, onRemove, metaConstants) => {
    // ask for confirmation
    PruCustomAlert.show(metaConstants.areYouSure, "", {
        positiveText: metaConstants.remove,
        onPositivePress: () => {
            onRemove(id, mealType)
        },
        negativeText: metaConstants.cancel,
    })
}

const showCamera = (props, metaConstants) => {
    const cameraPermission = metaLabelFinder(
        "manageprofile",
        "cameraPermission"
    );


    ImagePicker.openCamera({
        width: 200,
        height: 200,
        compressImageMaxWidth: 200,
        compressImageMaxHeight: 200,
        includeBase64: true,
        useFrontCamera: true,
        compressImageQuality: 0.8,
        photo: "photo",
    })
        .then(image => {
            const imageSource = image.data;
            console.log("navgating now")
            props.navigation.navigate("PulseFoodDetect", {
                selectedDate: props.selectedDate,
                mealType: props.mealType,
                imageSource
            })
        })
        .catch(error => {
            if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
                PruCustomAlert.show(
                    "",
                    cameraPermission,
                    {
                        positiveText: metaConstants.ok,
                        onPositivePress: () => {
                            OpenSettings.openSettings();
                        },
                    },
                    {
                        negativeText: metaConstants.cancel,
                        onNegativePress: () => { },
                    }
                );
            }
        });
};

export default UserMealDetails = (props) => {

    const metaConstants = { ...Meta.initializeScreenMeta() }

    const mealData = pathOr([], ["mealPlanData", "foodItems", props.mealType], props);
    const selectedDate = props.selectedDate;
    if (mealData.length !== 0) {
        return (
            <View style={styles.container}>
                <View style={styles.pointerCircle} />

                <View style={styles.mealDetailsHeaderContainer}>
                    {/* HEADER TEXT - MEAL TYPE */}
                    <Text style={styles.mealDetailsHeaderText}>{props.mealName}</Text>
                    <TouchableOpacity onPress={() => {
                        showCamera(props,metaConstants);
                    }}>
                        <Text>+ {metaConstants.add}</Text>
                    </TouchableOpacity>

                </View>


                {/* MEAL DETAILS - ITEMS */}
                <View style={styles.mealItemsContainer}>
                    {
                        mealData.map((meal, i) => {
                            const data = meal.foodItem;
                            const id = meal.id;
                            const mealType = props.mealType;
                            const weightUnit = pathOr("grams", ["tags", 0], data)
                            return (
                                <View style={styles.mealItemContainer}>
                                    {/* ITEM IMAGE */}
                                    <Image source={{ uri: `data:image/gif;base64,${meal.imageSource}` }} style={styles.mealItemImg}></Image>
                                    <View style={styles.mealItemDetailsContainer}>
                                        {/* ITEM DETAILS */}
                                        <View style={styles.mealItemDetailsRow1}>
                                            <Text style={styles.mealItemNameText}>{data.name}</Text>
                                            <Text>{  parseFloat(data.calories).toFixed(2) } {metaConstants.kcal}</Text>
                                        </View>
                                        <View style={styles.mealItemDetailsRow2}>
                                            <Text>{parseFloat(data.weight).toFixed(2)} {weightUnit}</Text>
                                            {/* ACTION BUTTONS */}
                                            <View style={styles.mealItemActionsContainer}>
                                                <Text onPress={
                                                    () => { handleOnRemove(id, mealType, props.onRemove, metaConstants) }
                                                } style={styles.removeActionText}>
                                                    {metaConstants.remove}
                                                </Text>
                                                <Text onPress={
                                                    () => { props.onEdit(id, mealType) }
                                                } style={styles.editActionText}>
                                                    {metaConstants.edit}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
    else {
        return (
            <TouchableOpacity style={styles.emptyMealContainer}
                onPress={() => {
                    showCamera(props,metaConstants);
                }}>
                <Text>
                    {props.mealName}
                </Text>
                <View style={styles.emptyCalDetailsContainer}>
                    <View style={styles.addBtnContainer}>
                        <Text style={styles.addIcon}>+</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

