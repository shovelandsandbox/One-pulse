import React, { PureComponent } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import SearchBar from "../SearchBar";
import {
  fetchCustomerDetails,
  clearSelectedContacts,
  removeContact,
} from "../../redux/actions";
import { AVATAR } from "../../../../config/images";
import { CustomAlert } from "../../../../components";
import { metaFinderCustomerConnect } from "../../meta";

class ContactSearch extends PureComponent {
  componentDidMount() {
    this.props.clearSelectedContacts();
  }

  isNumber = n => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  };

  errorMessage = () => {
    CustomAlert.show("", metaFinderCustomerConnect("callingtoownerror"), {
      positiveText: "OK",
      onPositivePress: () => { },
    });
  };

  onContactSearch = value => {
    const { userEmail, userPhone } = this.props;
    const isMobile = this.isNumber(value);
    const condition = isMobile
      ? value !== userPhone
      : value.toLowerCase() !== userEmail.toLowerCase();
    if (condition) {
      this.props.fetchCustomerDetails(value, isMobile);
    } else {
      this.errorMessage();
    }
  };

  onCancelContact = item => {
    this.props.removeContact(item.id);
  };

  renderSelectedContacts = () => {
    const { selectedContacts } = this.props;

    if (selectedContacts.length === 0) {
      return null;
    }

    return (
      <FlatList
        data={selectedContacts}
        horizontal={true}
        contentContainerStyle={{ paddingLeft: 20, paddingVertical: 14 }}
        renderItem={({ item }) => {
          return (
            <View style={{ marginRight: 20 }}>
              {item.fullName ? (
                <View style={[styles.thumbnail, styles.nameThumbnailWrapper]}>
                  <Text style={styles.nameThumbnail}>
                    {item.fullName ?.substring(0, 2)}
                  </Text>
                </View>
              ) : (
                  <Image
                    source={AVATAR}
                    style={[
                      styles.thumbnail,
                      {
                        transform: [
                          {
                            scale: 1.2,
                          },
                        ],
                      },
                    ]}
                  />
                )}
              <TouchableOpacity
                style={styles.cancelContact}
                onPress={() => this.onCancelContact(item)}
              >
                <Icon name="cancel" size={20} color="#444" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    );
  };

  render() {
    return (
      <View>
        <SearchBar onSearch={this.onContactSearch} />
        {this.renderSelectedContacts()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  selectedContacts: state.customerConnect.selectedContacts,
  userEmail: state.profile.email,
  userPhone: state.profile.phone,
});

const mapDispatchToProps = {
  fetchCustomerDetails,
  clearSelectedContacts,
  removeContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactSearch);

const styles = StyleSheet.create({
  cancelContact: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
    position: "absolute",
    right: -7,
    top: 0,
  },
  nameThumbnail: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  nameThumbnailWrapper: {
    alignItems: "center",
    backgroundColor: "#ec1c2e",
    justifyContent: "center",
    overflow: "hidden",
  },
  thumbnail: {
    borderRadius: 23,
    height: 46,
    width: 46,
  },
});
