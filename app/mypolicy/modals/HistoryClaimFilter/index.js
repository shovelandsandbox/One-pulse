/* eslint-disable react-native/no-raw-text */
import React, { Component } from "react";
import { View } from "react-native";
import { Colors } from "../../configs";
import Styles from "./style";
import {
  InputString,
  InputDatePicker,
  InputLifeAssuredPicker,
  InputFilterCheckButtons,
} from "../../components/derivatives/Input";
import { TextMX } from "../../components/derivatives/Text";
import { Filter as FilterContainer } from "../../components/containers";

import LifeAssuredDummies from "../../dummies/LifeAssureds";

export default class HistoryClaimFilter extends Component {
  onSubmit() {
    this.props.onSubmit();
  }

  onReset() {
    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  renderFormText() {
    return (
      <View>
        <TextMX>Berdasarkan Nama Tertanggung</TextMX>
        <InputLifeAssuredPicker
          placeholder={"Pilih Nama Tertanggung"}
          style={Styles.form.textField}
          lifeAssureds={LifeAssuredDummies}
        />

        <TextMX>Berdasarkan Kata Kunci</TextMX>
        <InputString
          placeholder={"Cari No. Klaim / No. Polis"}
          style={Styles.form.textField}
          rightIcon={"search"}
          autoCapitalize={"none"}
          rightIconColor={Colors.main.baseGray}
        />

        <TextMX>Berdasarkan Tanggal</TextMX>
        <InputDatePicker
          placeholder={"Tanggal Klaim Masuk"}
          style={Styles.form.textField}
          range
        />
      </View>
    );
  }

  renderFormPicker() {
    return (
      <View>
        <InputFilterCheckButtons
          label={"Berdasarkan Tipe Klaim"}
          values={["rawat_inap", "rawat_jalan", "kematian", "non_tunai"]}
          options={[
            {
              label: "Rawat Inap",
              value: "rawat_inap",
            },
            {
              label: "Rawat Jalan",
              value: "rawat_jalan",
            },
            {
              label: "Kematian",
              value: "kematian",
            },
            {
              label: "Non Tunai",
              value: "non_tunai",
            },
          ]}
        />

        <InputFilterCheckButtons
          label={"Berdasarkan Status"}
          values={["disetujui", "dalam_proses", "ditolak"]}
          options={[
            {
              label: "Disetujui",
              value: "disetujui",
            },
            {
              label: "Dalam Proses",
              value: "dalam_proses",
            },
            {
              label: "Ditolak",
              value: "ditolak",
            },
          ]}
        />
      </View>
    );
  }

  render() {
    return (
      <FilterContainer
        isActive={this.props.isActive}
        onClosePress={() => this.props.onClose()}
        title="Filter"
        resetLabel={"Reset"}
        onReset={() => this.onReset()}
        submitLabel={"Pilih"}
        onSubmit={() => this.onSubmit()}
      >
        <View style={Styles.form.container}>
          {this.renderFormText()}

          {this.renderFormPicker()}
        </View>
      </FilterContainer>
    );
  }
}
