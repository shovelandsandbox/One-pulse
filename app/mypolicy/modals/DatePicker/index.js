/* eslint-disable react-native/no-raw-text */
/* eslint-disable complexity */
import React, { Component } from "react";
import moment from "moment";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Colors, Sizes } from "../../configs";
import Styles from "./style";
import { InputString } from "../../components/derivatives/Input";
import { TextMX, TextM } from "../../components/derivatives/Text";
import Icon from "../../components/generics/Icon";
import {
  Padder as PadderContainer,
  ModalPicker as ModalPickerContainer,
} from "../../components/containers";
import { Calendar as CalendarCard } from "../../components/cards";
import { metaHelpers } from "@pru-rt-internal/pulse-common";

const helpers = metaHelpers;

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_CONTINUE = "step_1_datepicker_continue";
const KEY_CLAIM_OUTPATIENT_DATE = "step_1_datepicker_outpatient";
const KEY_CLAIM_TREATMENT_DATE = "step_1_datepicker_title";
const KEY_CLAIM_IN = "step_1_datepicker_in";
const KEY_CLAIM_OUT = "step_1_datepicker_out";
const KEY_CLAIM_INFO = "step_1_datepicker_info";
const KEY_CLAIM_LIFE_ASSURED_SELECT = "select";

export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    const value = this.getValueProperties(props.value);

    let today = moment(value.active);
    let monthList = [];

    for (
      let i = 0;
      i <= this.props.pastScrollRange + this.props.futureScrollRange;
      i++
    ) {
      const rangeDate = today
        .clone()
        .add(i - this.props.pastScrollRange, "month"); // create moment object date for active month
      const rangeDateStr = rangeDate.format("YYYYMMDD"); // create string date for inactive month

      if (
        (this.props.pastScrollRange - 1 <= i &&
          i <= this.props.pastScrollRange + 1) ||
        (!this.props.pastScrollRange && i <= this.props.pastScrollRange + 2)
      ) {
        monthList.push(rangeDate);
      } else {
        monthList.push(rangeDateStr);
      }
    }

    this.state = {
      start: value.start,
      end: value.end,
      active: value.active,
      stepIndex: 0, // saved active screen index at ScrollView in this.state
      offset: 0, // define ScrollView offset
      today: moment(new Date()).format("YYYYMMDD"), // need for calculate monthList,
      monthList, // list of month available (-n month from the past, present, +n month in the future)
    };

    this.isSwipe = true;
    this.isScrolling = true;
    this._dayScroll = null;
  }

  static defaultProps = {
    calendarWidth: Sizes.screen.width,
    calendarHeight: Sizes.screen.width,
    pastScrollRange: 50,
    futureScrollRange: 50,
    labelOut: "End Date",
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state != nextState) {
      return true;
    }

    if (this.props != nextProps) {
      if (!this.props.isActive && nextProps.isActive) {
        this.initCalendar();
      }

      if (this.props.isActive && !nextProps.isActive) {
        this.setState({
          active:
            nextState.star !== null
              ? moment(nextState.start).format("YYYYMMDD")
              : moment(new Date()).format("YYYYMMDD"),
        });
      }

      const value = this.getValueProperties(nextProps);

      this.setState({
        end: value.end,
        start: value.start,
        active: value.active,
      });

      return true;
    }

    return true;
  }

  onScrollBeginDrag() {
    this.isSwipe = true;
    this.isScrolling = true;
  }

  postScrollHandler(value, isSwipe) {
    this.isSwipe = isSwipe;
    this.isScrolling = false;

    let state = JSON.parse(JSON.stringify(this.state));

    let monthList = state.monthList;
    let stepIndex = state.stepIndex;
    let active = moment(state.active, "YYYYMMDD")
      .add(value, "month")
      .format("YYYYMMDD");
    let offset = state.offset;
    let newList = [];

    let monthIndex = monthList.findIndex(
      e => moment(e).format("YYYYMM") == moment(active).format("YYYYMM")
    );

    if (monthIndex == -1) {
      if (stepIndex == 0) {
        monthList.unshift(active);
        monthList.pop();
      } else if (stepIndex == this.state.monthList.length - 1) {
        monthList.push(active);
        monthList.shift();
      }
    } else {
      stepIndex = monthIndex;
      offset = Sizes.screen.width * monthIndex;
    }

    if (isSwipe == false) {
      this._dayScroll.scrollTo({
        x: offset,
        y: 0,
        animated: true,
      });
    }

    for (let i = 0; i < monthList.length; i++) {
      let val = monthList[i];
      if (i == stepIndex || i == stepIndex + 1 || i == stepIndex - 1) {
        val = moment(val);
      } else {
        val = moment(val).format("YYYYMMDD");
      }
      newList.push(val);
    }

    this.setState({
      active,
      offset,
      monthList: newList,
      stepIndex,
    });
  }

  onScrollComplete(e) {
    if (Sizes.isAndroid || this.isSwipe == true) {
      let contentOffset = e.nativeEvent.contentOffset.x;
      let index = Math.round(contentOffset / Sizes.screen.width);

      if (this.state.stepIndex != index) {
        let modifier = this.state.stepIndex > index ? -1 : 1;
        this.postScrollHandler(modifier, true);
      }
    }

    this.isSwipe = true;
    this.isScrolling = true;
  }

  scrollMonth(value) {
    this.postScrollHandler(value, false);
  }

  initCalendar() {
    let active =
      this.state.start == null
        ? moment(this.state.active.toString())
        : moment(this.state.start.toString()).add(1, "day");
    let monthList = [];
    let diffMonths =
      moment(this.state.active)
        .clone()
        .diff(moment(this.state.active), "month") + this.props.pastScrollRange;
    let offset = diffMonths * Sizes.screen.width;
    let stepIndex = diffMonths;

    for (
      let i = 0;
      i <= this.props.pastScrollRange + this.props.futureScrollRange;
      i++
    ) {
      const rangeDate = active
        .clone()
        .add(i - this.props.pastScrollRange, "month"); // create moment object date for active month
      const rangeDateStr = rangeDate.format("YYYYMMDD"); // create string date for inactive month

      if (
        (this.props.pastScrollRange - 1 <= i &&
          i <= this.props.pastScrollRange + 1) ||
        (!this.props.pastScrollRange && i <= this.props.pastScrollRange + 2)
      ) {
        monthList.push(rangeDate);
      } else {
        monthList.push(rangeDateStr);
      }
    }

    this.setState(
      {
        active: active.format("YYYYMMDD"),
        offset,
        monthList,
        stepIndex,
      },
      () => {
        const _this = this;
        setTimeout(function() {
          _this._dayScroll.scrollTo({
            x: offset,
            y: 0,
            animated: false,
          });
        }, 100);
      }
    );
  }

  onSubmit() {
    let start = this.getDateObj(this.state.start);
    let value = "";

    if (this.props.lang === "ID") {
      value = start ? start.day + " " + start.monthId + " " + start.year : "";
    } else {
      value = start ? start.day + " " + start.month + " " + start.year : "";
    }

    if (this.props.range) {
      const end = this.getDateObj(this.state.end);
      if (this.props.lang === "ID") {
        value =
          start && end
            ? value + (" - " + end.day + " " + end.monthId + " " + end.year)
            : "";
      } else {
        value =
          start && end
            ? value + (" - " + end.day + " " + end.month + " " + end.year)
            : "";
      }
    }

    this.props.onSubmit(value);
  }

  getValueProperties(data) {
    const value = data.value ? data.value.trim().split(" - ") : null;

    const monthsId = {
      Jan: "Jan",
      Feb: "Feb",
      Mar: "Mar",
      Apr: "Apr",
      Mei: "May",
      Jun: "Jun",
      Jul: "Jul",
      Agu: "Aug",
      Sep: "Sep",
      Okt: "Oct",
      Nov: "Nov",
      Des: "Dec",
    };

    if (this.props.lang === "ID") {
      const startDate = value && value[0] ? value[0].split(" ") : null;
      const endDate = value && value[1] ? value[1].split(" ") : null;

      return {
        start: startDate
          ? this.getDate(
              `${startDate[0]} ${monthsId[startDate[1]]} ${startDate[2]}`
            )
          : null,
        end:
          startDate && endDate
            ? this.getDate(
                `${endDate[0]} ${monthsId[endDate[1]]} ${endDate[2]}`
              )
            : null,
        active:
          startDate && endDate
            ? this.getDate(
                `${endDate[0]} ${monthsId[endDate[1]]} ${endDate[2]}`
              )
            : moment(new Date()).format("YYYYMMDD"),
      };
    }

    return {
      start: value ? this.getDate(value[0]) : null,
      end: value && value[1] ? this.getDate(value[1]) : null,
      active:
        value && value[1]
          ? this.getDate(value[1])
          : moment(new Date()).format("YYYYMMDD"),
    };
  }

  getDateObj(date) {
    if (!date) {
      return null;
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthsId = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    return {
      day: (date + "").slice(6),
      month: months[(date + "").slice(4, 6) * 1 - 1],
      monthId: monthsId[(date + "").slice(4, 6) * 1 - 1],
      year: (date + "").slice(0, 4),
    };
  }

  getDate(date) {
    if (!date) {
      return null;
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateSplit = date.split(" ");

    return (
      dateSplit[2] * 10000 +
      (months.indexOf(dateSplit[1]) + 1) * 100 +
      dateSplit[0] * 1
    );
  }

  selectDate(date) {
    if (!this.props.range) {
      this.setState({
        start: date,
        end: null,
      });

      return null;
    }

    if (
      this.state.start !== null &&
      this.state.end === null &&
      date > this.state.start
    ) {
      this.setState({ end: date });
    } else if (
      this.state.start === null ||
      this.state.end !== null ||
      date < this.state.start
    ) {
      this.setState({
        start: date,
        end: null,
      });
    }
  }

  renderMonth() {
    const dateObj = this.getDateObj(this.state.active);

    const month = dateObj.month;
    const monthId = dateObj.monthId;
    const year = dateObj.year;

    return (
      <View style={Styles.month.container}>
        <TouchableOpacity
          style={Styles.month.button.container}
          onPress={() => this.scrollMonth(-1)}
        >
          <Icon name="prev" color={Colors.main.inactiveGray} />
        </TouchableOpacity>

        <View style={Styles.month.label.container}>
          <TextMX>
            {this.props.lang === "EN" ? month : monthId} {year}
          </TextMX>
        </View>

        <TouchableOpacity
          style={[Styles.month.button.container, { alignItems: "flex-end" }]}
          onPress={() => this.scrollMonth(1)}
        >
          <Icon name="next" color={Colors.main.inactiveGray} />
        </TouchableOpacity>
      </View>
    );
  }

  renderWeekDaysItem(label) {
    return (
      <View style={Styles.weekDay.container}>
        <TextM color={Colors.main.baseGray}>{label}</TextM>
      </View>
    );
  }

  renderWeekDays() {
    if (this.props.lang === "EN")
      return (
        <View style={Styles.weekDay.grouper}>
          {this.renderWeekDaysItem("Mon")}
          {this.renderWeekDaysItem("Tue")}
          {this.renderWeekDaysItem("Wed")}
          {this.renderWeekDaysItem("Thu")}
          {this.renderWeekDaysItem("Fri")}
          {this.renderWeekDaysItem("Sat")}
          {this.renderWeekDaysItem("Sun")}
        </View>
      );
    return (
      <View style={Styles.weekDay.grouper}>
        {this.renderWeekDaysItem("Sen")}
        {this.renderWeekDaysItem("Sel")}
        {this.renderWeekDaysItem("Rab")}
        {this.renderWeekDaysItem("Kam")}
        {this.renderWeekDaysItem("Jum")}
        {this.renderWeekDaysItem("Sab")}
        {this.renderWeekDaysItem("Min")}
      </View>
    );
  }

  renderDays() {
    return (
      <ScrollView
        ref={c => (this._dayScroll = c)}
        bounces={false}
        horizontal
        pagingEnabled
        onScrollBeginDrag={() => this.onScrollBeginDrag()}
        onMomentumScrollEnd={e => this.onScrollComplete(e)}
        contentContainerStyle={Styles.dayScroll.grouper}
        showsHorizontalScrollIndicator={false}
      >
        {this.state.monthList.map((date, index) => {
          return (
            <CalendarCard
              key={index}
              date={date}
              end={this.state.end}
              start={this.state.start}
              today={this.state.today}
              active={this.state.active}
              selectDate={e => this.selectDate(e)}
            />
          );
        })}
      </ScrollView>
    );
  }

  renderForms() {
    const start = this.getDateObj(this.state.start);
    const end = this.getDateObj(this.state.end);
    let outForm = null;
    if (this.props.range) {
      outForm = (
        <View style={Styles.form.container}>
          {this.props.lang === "EN" ? (
            <InputString
              label={this.props.labelOut}
              editable={false}
              paddingTop={end ? 0 : 5}
              value={end ? end.day + " " + end.month + " " + end.year : null}
            />
          ) : (
            <InputString
              label={this.props.labelOut}
              editable={false}
              paddingTop={end ? 0 : 5}
              value={end ? end.day + " " + end.monthId + " " + end.year : null}
            />
          )}
        </View>
      );
    }

    return (
      <PadderContainer style={Styles.form.grouper}>
        <View
          style={[Styles.form.container, !this.props.range ? { flex: 1 } : {}]}
        >
          {this.props.lang === "EN" ? (
            <InputString
              label={
                !this.props.range
                  ? this.props.label
                  : claimMeta(KEY_CLAIM_IN).label
              }
              editable={false}
              paddingTop={start ? 0 : 5}
              value={
                start ? start.day + " " + start.month + " " + start.year : null
              }
            />
          ) : (
            <InputString
              label={
                !this.props.range
                  ? this.props.label
                  : claimMeta(KEY_CLAIM_IN).label
              }
              editable={false}
              paddingTop={start ? 0 : 5}
              value={
                start
                  ? start.day + " " + start.monthId + " " + start.year
                  : null
              }
            />
          )}
        </View>

        {outForm}
      </PadderContainer>
    );
  }

  render() {
    return (
      <ModalPickerContainer
        title={claimMeta(KEY_CLAIM_TREATMENT_DATE).label}
        onSubmit={() => this.onSubmit()}
        isActive={this.props.isActive}
        submitLabel={claimMeta(KEY_CLAIM_CONTINUE).label}
        onClosePress={() => this.props.onClose()}
      >
        {this.renderForms()}

        <PadderContainer>
          {this.renderMonth()}

          {this.renderWeekDays()}
        </PadderContainer>

        {this.renderDays()}
      </ModalPickerContainer>
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};
