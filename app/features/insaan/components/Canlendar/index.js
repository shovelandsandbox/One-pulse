/* eslint-disable */
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ScrollView} from "react-native";
import { BACK } from "../../../../config/images";
import CanlendarItem from "../CalendarItem";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { CalendarStyle as styles } from "./styles";


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkId: 0,
            dates: [

            ]
        }
    }
    componentDidMount() {
        this.getmyDate();
    }
    getmyDate = () => {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        let days = new Date().getDay().toString();
        let moths = new Date().getMonth()
        let day = "";
        let { language } = this.props.userPreferences

        let dates = [];
        for (let i = 0; i < 7; i++) {
            switch (date.toString().split(' ')[0]) {
                case "Sun": day = language == "BM" ? "Aha" : "Sun"; break;
                case "Mon": day = language == "BM" ? "Isn" : "Mon"; break;
                case "Tue": day = language == "BM" ? "Sel" : "Tue"; break;
                case "Wed": day = language == "BM" ? "Rab" : "Wed"; break;
                case "Thu": day = language == "BM" ? "Kha" : "Thu"; break;
                case "Fri": day = language == "BM" ? "Jum" : "Fri"; break;
                case "Sat": day = language == "BM" ? "Sab" : "Sat"; break;
            }
            dates.push({
                cid: i,
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: day,
                daynumber: date.toString().split(' ')[2],
                count: 23,
            })
            date.setHours(date.getHours() + 24)
        }
        this.setState({
            dates
        })
        return;
    }


    render() {

        return (
            <View>
                <TouchableOpacity style={styles.touchable}
                    onPress={() => { this.props.onBackPress() }}>

                    <Image
                        resizeMode='contain'
                        style={styles.imageColor}
                        source={BACK}
                    />

                </TouchableOpacity>

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {
                        this.state.dates.map((item, k) => {
                            return <CanlendarItem
                                year={item.year}
                                month={item.month}
                                day={item.day}
                                daynumber={item.daynumber}
                                cid={item.cid}
                                count={item.count}
                                checkId={this.state.checkId}
                                changeitem={this.handlechangeitem} />
                        })
                    }
                </ScrollView>
            </View>
        )
    }
    handlechangeitem = (id, currentTime) => {
        const { onItemSelectAction } = this.props
        this.setState({
            checkId: id
        })
        onItemSelectAction && onItemSelectAction(id, currentTime)
    }

}

Calendar.propTypes = {
    onItemSelectAction: PropTypes.func,
    onBackPress: PropTypes.func
}

const mapStateToProps = state => {
    return {
        userPreferences: state.userPreferences
    };
};
export default connect(mapStateToProps)(Calendar)