import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, BackHandler } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { pathOr } from 'ramda';

import { CoreServices } from "@pru-rt-internal/pulse-common";
const { NavigationService } = CoreServices;
// styles
import { styles } from "./styles";

// custom
import DonutChart from "../../components/DonutChart";
import { PruBackHeader } from "../../../../components";
import UserMealDetails from "../../components/UserMealDetails";
import MetaConstants from "../../meta";
import { getCustomerMealPlan, updateCustomerMealPlan } from "../../actions";


// const NutrientDetails = (props) => (
//     <View style={styles.nutrientContainer}>
//         <View style={{
//             ...styles.nutrientIconContainer,
//             backgroundColor: props.color
//         }}></View>
//         <View style={styles.nutrientDetailsContainer}>
//             {/* calorie label */}
//             <Text style={{
//                 ...styles.nutrientlabel,
//                 color: props.color
//             }}>
//                 {props.label}
//             </Text>
//             {/* Progress bar */}
//             <View style={{
//                 ...styles.progressbarContainer,
//                 backgroundColor: props.subColor,
//             }}>
//                 <View style={{
//                     ...styles.progressbar,
//                     backgroundColor: props.color,
//                     width: `${((props.value / props.totalvalue) * 100)}%`
//                     // width:20
//                 }}></View>
//             </View>
//             {/* Calorie Count */}
//             <Text>
//                 0
//             </Text>
//         </View>
//     </View>
// )

class FoodDairy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: moment().format('YYYY-MM-DD')
        }
        this.days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        this.weekStartDate = moment().startOf('isoweek').format('YYYY-MM-DD');
        this.currMonth = moment().format("MMMM");
        this.currYear = moment().format("YYYY");
        this.currDate = moment().format('YYYY-MM-DD');
        this.metaConstants = { ...MetaConstants.initializeScreenMeta() }
    }

    onHardwareBack = () => {
        NavigationService.goBack("MainPage");
        return true;
    };

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onHardwareBack);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onHardwareBack);
        // get Customer meal plan for todays date
        const paylaodObj = { params: { "mealPlanId": this.state.selectedDate }, body: {} }
        this.props.getCustomerMealPlan(paylaodObj);

    }

    componentDidUpdate(prevProps, prevState) {
        // if date is changed get mealplan for that particular date
        if (prevState.selectedDate !== this.state.selectedDate) {
            const paylaodObj = { params: { "mealPlanId": this.state.selectedDate }, body: {} }
            this.props.getCustomerMealPlan(paylaodObj)
        }
    }

    setSelectedDay = (date) => {
        console.log("setSelectedDate", date)
        this.setState({ selectedDate: date })
    }

    onRemove = (id, mealType) => {
        const { selectedDate } = this.state;
        const { userMealPlanData } = this.props;

        // get selected date FoodItems
        const selectedDateMealPlanDataFoodItems = pathOr({}, [selectedDate, "foodItems"], userMealPlanData);
        // get selected date mealType Data
        const mealTypeData = pathOr([], [selectedDate, "foodItems", mealType], userMealPlanData);
        const updatedMealTypeData = mealTypeData.filter((meal) => {
            return meal.id !== id
        });

        // construct payload;
        const payload = {
            params: { mealPlanId: selectedDate },
            body: {
                foodItems: {
                    ...selectedDateMealPlanDataFoodItems,
                    [mealType]: updatedMealTypeData,
                }
            },
        };

        this.props.updateCustomerMealPlan(payload);
    }

    onEdit = (id, mealType) => {
        const { selectedDate } = this.state;
        const { userMealPlanData } = this.props;
        const mealTypeData = pathOr([], [selectedDate, "foodItems", mealType], userMealPlanData);
        const editingMealTypeData = mealTypeData.filter((meal) => {
            return meal.id === id
        });

        console.log("editingMealTypeData", editingMealTypeData)

        this.props.navigation.navigate('PulseFoodDetect', {
            editView: true,
            mealData: editingMealTypeData[0],
            selectedDate: selectedDate,
            mealType: mealType
        })
    }


    render() {
        const { selectedDate } = this.state;
        const { userMealPlanData, navigation } = this.props;
        const selectedDateMealPlanData = userMealPlanData[selectedDate];
        console.log('selectedDateMealPlanData', selectedDateMealPlanData)
        const currMonth = this.currMonth;

        return (
            <View style={styles.container}>
                <PruBackHeader
                    previousPage={"MainPage"}
                    title={this.metaConstants.foodDiary}
                ></PruBackHeader>

                {/* CALORIE CHART */}
                <DonutChart mealPlanData={selectedDateMealPlanData} />

                {/* CONSULT NOW BANNER */}
                {/* <View style={styles.consultnowBannerContainer}>
                    <Text style={styles.consultnowBannerText}>
                        {this.metaConstants.consultnowBannerText}
                    </Text>

                    <TouchableOpacity style={styles.consultnowBannerBtn}>
                        <Text style={styles.consultnowBannerBtnText}>{this.metaConstants.consultNow}</Text>
                    </TouchableOpacity>
                </View> */}

                {/* DAY SELECTION */}
                <View style={styles.dateSelectionContainer}>
            <Text style={styles.currentMonthText}>{currMonth} {this.currYear}</Text>
                    <View style={styles.daysConatiner}>
                        {
                            this.days.map((dayName, i) => {
                                const date = moment(this.weekStartDate, 'YYYY-MM-DD')
                                    .add(i, 'days')
                                    .format('YYYY-MM-DD');
                                const day = moment(date, 'YYYY-MM-DD')
                                    .format('DD');
                                const currDay = moment(this.currDate, 'YYYY-MM-DD')
                                    .format('DD');

                                return (
                                    <TouchableOpacity
                                        // donot allow selection future days
                                        disabled={day > currDay}
                                        onPress={() => {
                                            this.setSelectedDay(date)
                                        }} >
                                        <View style={{
                                            ...styles.DateContainer,
                                            backgroundColor: date === selectedDate ? "#41496a" : "#fff"
                                        }}>
                                            <Text style={{
                                                ...styles.dayNameText,
                                                color: date === selectedDate ? "#fff" : "#747474"
                                            }}>{dayName}</Text>
                                            <Text style={{
                                                ...styles.dayValueText,
                                                color: date === selectedDate ? "#fff" : "#cccccc"
                                            }}>
                                                {day}
                                            </Text>
                                        </View>

                                    </TouchableOpacity>
                                )

                            })
                        }

                    </View>

                </View>

                {/* Food details */}
                <View style={styles.mealDetailsContainer}>
                    {/* HEADER */}
                    <View style={styles.mealDetailsHeaderContainer}>
                        <Text style={styles.mealDetailsHeaderText}>
                            {this.metaConstants.food}
                        </Text>
                        {/* <Text style={styles.mealDetailsCalorieText}>
                            1,020 kcal
                        </Text> */}
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true} style={{ flex: 1 }}>
                        <View style={styles.mealDetailsBodyContainer}>
                            <UserMealDetails navigation={navigation} onEdit={this.onEdit} onRemove={this.onRemove} selectedDate={selectedDate} mealPlanData={selectedDateMealPlanData} mealName="Breakfast" mealType="BREAKFAST" />
                            <UserMealDetails navigation={navigation} onEdit={this.onEdit} onRemove={this.onRemove} selectedDate={selectedDate} mealPlanData={selectedDateMealPlanData} mealName="Lunch" mealType="LUNCH" />
                            <UserMealDetails navigation={navigation} onEdit={this.onEdit} onRemove={this.onRemove} selectedDate={selectedDate} mealPlanData={selectedDateMealPlanData} mealName="Evening Snack" mealType="EVENINGSNACK" />
                            <UserMealDetails navigation={navigation} onEdit={this.onEdit} onRemove={this.onRemove} selectedDate={selectedDate} mealPlanData={selectedDateMealPlanData} mealName="Dinner" mealType="DINNER" />
                        </View>
                    </ScrollView>
                </View>

            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userMealPlanData: state.pulsefood.userMealPlanData,
        // isUpdateCustomerError : state.pulsefood.isUpdateCustomerError
    };
};

export default connect((mapStateToProps), {
    getCustomerMealPlan,
    updateCustomerMealPlan
})(FoodDairy);
