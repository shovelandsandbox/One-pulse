/*
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 *  IMPORTS
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 */

// ----------------------------------------
// PACKAGE IMPORTS
// ----------------------------------------
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  PanResponder,
  Animated,
  Keyboard
} from "react-native";
import PropTypes from "prop-types";
// ----------------------------------------
// LOCAL & CONFIG IMPORTS
// ----------------------------------------
import { Colors, Sizes } from "../../../configs";
import Styles from "./style";

// ----------------------------------------
// COMPONENT IMPORTS
// ----------------------------------------
import _ from "lodash";
// import { GOOGLE_API_KEY } from "../../../bootstrap/";
import {
  TextLX,
  TextMX,
  TextM,
  TextS,
  TextXS
} from "../../../components/derivatives/Text";
import { ImageIllustration } from "../../../components/derivatives/Image";
import { InputString } from "../../../components/derivatives/Input";
import {
  Place as PlaceCard,
  HospitalMap as HospitalMapCard
} from "../../../components/cards";
import Icon from "../../../components/generics/Icon";
import {
  Padder as PadderContainer,
  Base as BaseContainer,
  HorizontalAnimator as HorizontalAnimatorContainer,
  VerticalAnimator as VerticalAnimatorContainer
} from "../../../components/containers";
import HospitalFilter from "../../../modals/HospitalFilter";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers
} from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;
const helpers = metaHelpers;
// const TYPE_MAIN = "mpolicyMain";
// ----------------------------------------
// DUMMY IMPORTS
// ----------------------------------------
import AdvisedLocationDummies from "../../../dummies/AdvisedLocations";
import AdvisedHospitalDummies from "../../../dummies/AdvisedHospitals";
import NearestHospitalDummies from "../../../dummies/NearestHospitals";
import { connect } from "react-redux";
import { withNavigationFocus } from "react-navigation";

/*
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 *  MAIN CLASS
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 */

const MAIN_HOSPITAL_TYPES = "mainhospital";
const mainHospitalMeta = (meta, types, keys) =>
  meta.find(item => item.type === types && item.key === keys).label;
class Search extends Component {
  // ----------------------------------------
  // ----------------------------------------
  // CONSTRUCTOR AND LIFE CYCLES
  // ----------------------------------------

  static propTypes = {
    loadHospitalDetail: PropTypes.func,
    navigation: PropTypes.object,
    getHospitalResponse: PropTypes.any,
    getHospitalAreaResponse: PropTypes.any,
    getHospitalParam: PropTypes.any,
    action: PropTypes.string,
    loadHospitalArea: PropTypes.func,
    getListHospitalsByArea: PropTypes.func,
    loadCurrentLocation: PropTypes.func,
    getFilteredHospital: PropTypes.func,
    getHospitalTpa: PropTypes.func,
    getTpaResponse: PropTypes.any,
    getHospitalServices: PropTypes.func,
    loadHospitalSearch: PropTypes.func,
    getServicesResponse: PropTypes.any,
    lastLocation: PropTypes.object,
    changeHospitalParam: PropTypes.func,
    meta: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      filterServices: [],
      filterPriority: [],
      filterAssociatedTPA: [],
      position: new Animated.Value(Sizes.screen.height - 410),
      isListUp: false,
      isHospitalListMode: false,
      searchText: "",
      showMap: false,
      isFilterModalVisible: false,
      main: {
        type: "location",
        id: "",
        title: "KOTA KASABLANKA",
        distance: 0,
        partnershipType: null,
        address: ""
      },
      activeHospitalMarkerIndex: -1,
      loadingState: {
        location: false,
        hospital: false
      },

      isGPSActive: true
    };

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);

    this.searchServer = _.debounce(this.searchServer, 100);

    this._mainScroll = null;

    this._panResponsder = PanResponder.create({
      onStartShouldSetPanResponder: (event, panState) => true,
      onPanResponderMove: (event, panState) => {
        let newValue = panState.moveY - 120;
        if (newValue <= 0) {
          newValue = 0;
        } else if (newValue >= Sizes.screen.height - 410) {
          newValue = Sizes.screen.height - 410;
        }

        Animated.timing(this.state.position, {
          toValue: newValue,
          duration: 0,
          delay: 0
        }).start();

        if (newValue > 0) {
          this.setState({
            isListUp: false,
            showMap: true
          });
        }
      },
      onPanResponderRelease: (event, panState) => {
        let newValue = panState.moveY - 120;
        if (newValue <= 0) {
          newValue = 0;
        } else if (newValue >= Sizes.screen.height - 410) {
          newValue = Sizes.screen.height - 410;
        }

        if (newValue > (Sizes.screen.height - 410) * (2 / 4)) {
          Animated.timing(this.state.position, {
            toValue: Sizes.screen.height - 410,
            duration: 0,
            delay: 0
          }).start();

          this.setState({
            isListUp: false,
            isHospitalListMode: false
          });

          Keyboard.dismiss();
        } else {
          Animated.timing(this.state.position, {
            toValue: 0,
            duration: 0,
            delay: 0
          }).start();

          this.setState({
            isListUp: true,
            showMap: false
          });
        }
      }
    });
  }

  componentDidMount() {
    const { getHospitalParam } = this.props;
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        getHospitalParam.latitude +
        "," +
        getHospitalParam.longitude +
        "&key=AIzaSyBN7511_6iwTgoGJ0L16_uqrR550BJX8-U"
    )
      .then(response => response.json())
      .then(responseJson => {
        const shortAddress = responseJson.results[0].formatted_address.substr(
          0,
          responseJson.results[0].formatted_address.indexOf(",")
        );
        this.setState({
          main: {
            type: "location",
            id: "",
            title: shortAddress,
            distance: 0,
            partnershipType: null,
            address: responseJson.results[0].formatted_address
          },
          first_title: shortAddress,
          first_address: responseJson.results[0].formatted_address
        });
      });
    const _this = this;
    setTimeout(function() {
      _this.setState({ showMap: true });
    }, 500);
  }

  componentDidUpdate(prevProps) {
    const {
      action,
      loadHospitalArea,
      getHospitalTpa,
      getHospitalServices,
      getHospitalParam
    } = this.props;
    if (prevProps.action !== action) {
      switch (action) {
        case CoreActionTypes.MAIN_HOSPITAL_SEARCH_LOAD_SUCCESS:
          loadHospitalArea({
            latitude: getHospitalParam.latitude,
            longitude: getHospitalParam.longitude
          });
          getHospitalTpa();
          getHospitalServices();
          break;
        case CoreActionTypes.GET_HOSPITAL_BY_AREA_SUCCESS:
          this.onSuccessGetListHospitals();
          break;
        case CoreActionTypes.MAIN_HOSPITAL_CURRENT_SEARCH_LOAD_SUCCESS:
          this.onSuccessGetListHospitals();
          break;
        case CoreActionTypes.GET_FILTERED_HOSPITAL_SUCCESS:
          this.onSuccessGetListHospitals();
          break;
        default:
      }
    }
  }

  searchServer() {
    const { getFilteredHospital, getHospitalParam } = this.props;
    const {
      filterAssociatedTPA,
      filterPriority,
      filterServices,
      searchText
    } = this.state;
    getFilteredHospital({
      latitude: getHospitalParam.latitude,
      longitude: getHospitalParam.longitude,
      filterPriority,
      filterServices,
      filterAssociatedTPA,
      searchText
    });
  }

  setFilter = (label, value) => {
    this.setState({
      [label]: value
    });
  };

  getFiltered = () => {
    const { getFilteredHospital, getHospitalParam } = this.props;
    const {
      filterAssociatedTPA,
      filterPriority,
      filterServices,
      searchText
    } = this.state;
    this.setState({ isFilterModalVisible: false }, () => {
      getFilteredHospital({
        latitude: getHospitalParam.latitude,
        longitude: getHospitalParam.longitude,
        filterPriority,
        filterServices,
        filterAssociatedTPA,
        searchText
      });
    });
  };

  // ----------------------------------------
  // ----------------------------------------
  // METHODS
  // ----------------------------------------

  onFilterSubmit() {
    this.setState({ isFilterModalVisible: false });
  }

  // ----------------------------------------

  onFilterReset() {
    this.setState({ isFilterModalVisible: false });
  }

  // ----------------------------------------

  search(value) {
    this.setState({
      searchText: value,
      isHospitalListMode: false
    });
    value.length > 3 ? this.searchServer() : null;
  }

  // ----------------------------------------

  focusSearchInput() {
    Animated.timing(this.state.position, {
      toValue: 0,
      duration: 0,
      delay: 0
    }).start();

    this.setState({
      isHospitalListMode: false,
      isListUp: true,
      showMap: false
    });
  }

  // ----------------------------------------

  setMainToCurrent(data) {
    this.setState({
      main: {
        type: "location",
        id: data.id,
        title: data.title,
        distance: 0,
        partnershipType: null,
        address: data.address
      },
      activeHospitalMarkerIndex: -1
    });
  }

  // ----------------------------------------

  setMainToHospital(hospital, index) {
    const { changeHospitalParam } = this.props;
    this.setState(
      {
        main: {
          type: "hospital",
          ...hospital
        },
        activeHospitalMarkerIndex: index
      },
      () => {
        changeHospitalParam({
          latitude: hospital.latitude,
          longitude: hospital.longitude
        });
      }
    );
  }

  // ----------------------------------------

  getNearbyHospitals() {
    const { getHospitalResponse } = this.props;
    const data = getHospitalResponse.body.map((item, idx) => ({
      onPress: () =>
        this.setMainToHospital(
          {
            id: item.id,
            title: item.title,
            distance: item.distance,
            partnershipType: item.tpas
              ? item.tpas.map(item => item.tpaName).join(", ")
              : [],
            address: item.address.line1,
            latitude: item.address.latitude,
            longitude: item.address.longitude
          },
          idx
        ),
      latitude: item.address.latitude,
      longitude: item.address.longitude
    }));
    return data;
  }

  // ----------------------------------------

  getNearbyHospitalListByLocation(data, index) {
    const {
      getListHospitalsByArea,
      getHospitalParam,
      loadCurrentLocation
    } = this.props;
    if (index !== -1) {
      getListHospitalsByArea({ area: data });
    } else {
      loadCurrentLocation({
        latitude: getHospitalParam.latitude,
        longitude: getHospitalParam.longitude
      });
    }
  }

  onSuccessGetListHospitals() {
    Animated.timing(this.state.position, {
      toValue: 0,
      duration: 0,
      delay: 0
    }).start();

    this._mainScroll.scrollTo({ x: 0, y: 0, animated: false });

    this.setState({
      isHospitalListMode: true,
      isListUp: true,
      showMap: false
    });
  }

  // ----------------------------------------

  returnBack() {
    const { navigation } = this.props;
    this.setState({ showMap: false });

    setTimeout(function() {
      navigation.goBack();
    }, 200);
  }

  onRegionChangeComplete(region) {
    const { loadHospitalSearch, lastLocation } = this.props;
    loadHospitalSearch({
      latitude: region.latitude,
      longitude: region.longitude,
      lastLocation: {
        lastLatitude: lastLocation.lastLatitude,
        lastLongitude: lastLocation.lastLongitude
      }
    });
  }

  // ----------------------------------------
  // ----------------------------------------
  // RENDERS
  // ----------------------------------------

  renderLoadings(counts = 1) {
    const loadings = [];
    for (let i = 0; i < counts; i++) {
      loadings.push(<PlaceCard key={i} isLoading={true} />);
    }

    return loadings;
  }

  // ----------------------------------------

  renderLocationCard(
    id,
    title,
    address,
    noBorder = false,
    isSearchMode = false,
    index
  ) {
    const main = (
      <PlaceCard
        id={id}
        title={title}
        searchText={isSearchMode ? this.state.searchText : ""}
        type={"location"}
        onPress={() => this.getNearbyHospitalListByLocation(title, index)}
        noBorder={noBorder}
        address={address}
      />
    );

    if (index === -1) {
      return (
        <HorizontalAnimatorContainer order={1}>
          {main}
        </HorizontalAnimatorContainer>
      );
    }

    return (
      <VerticalAnimatorContainer
        key={index}
        order={index * 2 + (this.state.isHospitalListMode ? 5 : 3)}
      >
        {main}
      </VerticalAnimatorContainer>
    );
  }

  // ----------------------------------------

  renderHospitalCard(
    id,
    title,
    distance,
    partnershipType,
    address,
    noBorder = false,
    isSearchMode = false,
    index
  ) {
    const main = (
      <PlaceCard
        id={id}
        title={title}
        searchText={isSearchMode ? this.state.searchText : ""}
        type={"hospital"}
        onPress={() => {
          this.props.loadHospitalDetail({ id: id });
        }}
        noBorder={noBorder}
        address={address}
        distance={distance.toFixed(2) + " Km"}
        partnershipType={partnershipType}
      />
    );

    if (index === -1) {
      return (
        <HorizontalAnimatorContainer order={1}>
          {main}
        </HorizontalAnimatorContainer>
      );
    }

    return (
      <VerticalAnimatorContainer
        key={index}
        order={index * 2 + (this.state.isHospitalListMode ? 5 : 3)}
      >
        {main}
      </VerticalAnimatorContainer>
    );
  }

  // ----------------------------------------

  renderListCard(label, renderCards) {
    if (!this.state.isListUp) {
      return null;
    }

    return (
      <PadderContainer>
        <VerticalAnimatorContainer order={1}>
          <TextMX>{label}</TextMX>
        </VerticalAnimatorContainer>

        {renderCards}
      </PadderContainer>
    );
  }

  // ----------------------------------------

  renderHospitalAdvices() {
    const { getHospitalResponse, meta } = this.props;
    const hospitals = getHospitalResponse.body.map((hospital, index) => {
      // if (
      //   this.state.searchText &&
      //   hospital.title.indexOf(this.state.searchText) === -1
      // ) {
      //   return null;
      // }
      return this.renderHospitalCard(
        hospital.id,
        hospital.title,
        hospital.distance,
        hospital.tpas ? hospital.tpas.map(item => item.tpaName).join(", ") : [],
        hospital.address.line1,
        index ===
          getHospitalResponse.body.filter(
            item => item.title.indexOf(this.state.searchText) !== -1
          ).length -
            1,
        true,
        index
      );
    });

    return this.renderListCard(
      mainHospitalMeta(
        meta.metaDetail.commons,
        MAIN_HOSPITAL_TYPES,
        "searchhospitalrecommend"
      ),
      <View style={Styles.card.grouper}>{hospitals}</View>
    );
  }

  // ----------------------------------------

  renderLocationAdvices() {
    const { getHospitalAreaResponse, meta } = this.props;
    const locations = getHospitalAreaResponse.body
      ? getHospitalAreaResponse.body.map((location, index) => {
          // if (
          //   this.state.searchText &&
          //   location.area.indexOf(this.state.searchText) === -1
          // ) {
          //   return null;
          // }
          return this.renderLocationCard(
            location.id,
            location.area,
            location.area,
            false,
            true,
            index
          );
        })
      : [];

    return this.renderListCard(
      mainHospitalMeta(
        meta.metaDetail.commons,
        MAIN_HOSPITAL_TYPES,
        "searchhospitallocationrecommend"
      ),
      <View style={Styles.card.grouper}>{locations}</View>
    );
  }

  // ----------------------------------------

  renderNearbyHospitalHotpitals() {
    const { getHospitalResponse, meta } = this.props;
    const hospitals = getHospitalResponse.body.map((hospital, index) => {
      // if (
      //   this.state.searchText &&
      //   hospital.title.indexOf(this.state.searchText) === -1
      // ) {
      //   return null;
      // }
      return this.renderHospitalCard(
        hospital.id,
        hospital.title,
        hospital.distance,
        hospital.tpas ? hospital.tpas.map(item => item.tpaName).join(", ") : [],
        hospital.address.line1,
        false,
        false,
        index
      );
    });

    return this.renderListCard(
      mainHospitalMeta(
        meta.metaDetail.commons,
        MAIN_HOSPITAL_TYPES,
        "searchhospitalnear"
      ),
      <View style={Styles.card.grouper}>{hospitals}</View>
    );
  }

  // ----------------------------------------

  renderHeadCard(label, renderCard) {
    let labelRender = null;
    if (label) {
      labelRender = <TextMX style={Styles.list.head.label}>{label}</TextMX>;
    }

    return (
      <VerticalAnimatorContainer order={5}>
        <View
          style={[
            Styles.list.head.container,
            !this.state.isListUp ? { borderBottomWidth: 0 } : {}
          ]}
        >
          <PadderContainer>
            {labelRender}

            {renderCard}
          </PadderContainer>
        </View>
      </VerticalAnimatorContainer>
    );
  }

  // ----------------------------------------

  renderGPSInactive() {
    const { meta } = this.props;
    return this.renderHeadCard(
      mainHospitalMeta(
        meta.metaDetail.commons,
        MAIN_HOSPITAL_TYPES,
        "searchhospitalgpsnotactive"
      ),
      this.renderLoadings(1)[0]
    );
  }

  // ----------------------------------------

  renderLocationByGPS() {
    const { meta } = this.props;
    return this.renderHeadCard(
      mainHospitalMeta(
        meta.metaDetail.commons,
        MAIN_HOSPITAL_TYPES,
        "searchhospitalyourlocation"
      ),
      this.renderLocationCard(
        this.state.main.id,
        this.state.main.title,
        this.state.main.address,
        true,
        false,
        -1
      )
    );
  }

  // ----------------------------------------

  renderSelectedHospital() {
    return this.renderHeadCard(
      null,
      this.renderHospitalCard(
        this.state.main.id,
        this.state.main.title,
        this.state.main.distance,
        this.state.main.partnershipType,
        this.state.main.address,
        true,
        false,
        -1
      )
    );
  }

  // ----------------------------------------

  renderList() {
    const { getHospitalResponse, meta } = this.props;
    if (!getHospitalResponse.body) {
      // return (
      //   <View style={[Styles.list.container, Styles.empty.container]}>
      //     <View style={Styles.empty.image.container}>
      //       <ImageIllustration name="list.not_found" />
      //     </View>

      //     <TextM color={Colors.main.baseGray}>
      //       Pencarian lokasi kamu tidak ditemukan. Mohon masukan kata kunci yang
      //       lain.
      //     </TextM>
      //   </View>
      // );
      return (
        <ScrollView
          ref={ref => (this._mainScroll = ref)}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          style={Styles.list.container}
        >
          <View style={[Styles.list.container, { paddingHorizontal: 24 }]}>
            <View style={Styles.empty.image.container}>
              <ImageIllustration name="list.not_found" />
            </View>

            <TextM color={Colors.main.baseGray}>
              {mainHospitalMeta(
                meta.metaDetail.commons,
                MAIN_HOSPITAL_TYPES,
                "searchhospitalnotfound"
              )}
            </TextM>
          </View>
        </ScrollView>
      );
    }

    if (!this.state.isHospitalListMode) {
      return (
        <ScrollView
          ref={ref => (this._mainScroll = ref)}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          style={Styles.list.container}
        >
          {this.state.main.type === "hospital"
            ? this.renderSelectedHospital()
            : this.renderLocationByGPS()}

          <View
            style={[
              Styles.list.head.container,
              !this.state.isListUp ? { borderBottomWidth: 0 } : {}
            ]}
          >
            {this.renderHospitalAdvices()}
          </View>

          {this.renderLocationAdvices()}
        </ScrollView>
      );
    }

    return (
      <ScrollView
        ref={ref => (this._mainScroll = ref)}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        style={Styles.list.container}
      >
        {this.renderNearbyHospitalHotpitals()}
      </ScrollView>
    );
  }

  // ----------------------------------------

  renderFilter(count) {
    const { meta } = this.props;
    return (
      <TouchableOpacity
        style={Styles.control.filter.container}
        onPress={() => this.setState({ isFilterModalVisible: true })}
      >
        <Icon
          name="filter"
          color={Colors.main.baseRed}
          style={Styles.control.filter.icon}
        />

        <View style={Styles.control.filter.count}>
          <TextXS size={10} bold line={16} color={Colors.main.baseWhite}>
            {count}
          </TextXS>
        </View>

        <TextS color={Colors.main.baseRed}>
          {mainHospitalMeta(
            meta.metaDetail.commons,
            MAIN_HOSPITAL_TYPES,
            "searchhospitalnotfound"
          )}
        </TextS>
      </TouchableOpacity>
    );
  }

  // ----------------------------------------

  renderControls() {
    const { meta } = this.props;
    return (
      <PadderContainer
        style={[
          Styles.control.container,
          this.state.main.type === "hospital" ? { marginBottom: 0 } : {}
        ]}
      >
        <VerticalAnimatorContainer order={1}>
          <TextLX {...this._panResponsder.panHandlers}>
            {mainHospitalMeta(
              meta.metaDetail.commons,
              MAIN_HOSPITAL_TYPES,
              "searchhospitalsearch"
            )}
          </TextLX>
        </VerticalAnimatorContainer>

        <VerticalAnimatorContainer order={3}>
          <InputString
            placeholder={mainHospitalMeta(
              meta.metaDetail.commons,
              MAIN_HOSPITAL_TYPES,
              "searchhospitalinput"
            )}
            rightIcon={"search"}
            multiline={false}
            rightIconColor={Colors.main.inactiveGray}
            onChangeText={val => this.search(val)}
            onSubmitEditing={event => this.search(event.nativeEvent.text)}
            onRightIconPress={() => this.searchServer()}
            value={this.state.searchText}
            onFocus={() => this.focusSearchInput()}
          />

          <TouchableOpacity
            style={Styles.control.filter.container}
            onPress={() => this.setState({ isFilterModalVisible: true })}
          >
            <Icon
              name="filter"
              color={Colors.main.baseRed}
              style={Styles.control.filter.icon}
            />
            <TextS color={Colors.main.baseRed}>
              {mainHospitalMeta(
                meta.metaDetail.commons,
                MAIN_HOSPITAL_TYPES,
                "searchhospitalfilter"
              )}
            </TextS>
          </TouchableOpacity>
        </VerticalAnimatorContainer>
      </PadderContainer>
    );
  }

  // ----------------------------------------

  renderMap() {
    const { getHospitalParam, lastLocation } = this.props;
    if (!this.state.showMap) {
      return null;
    }
    return (
      <HospitalMapCard
        lastLocation={lastLocation}
        getHospitalParam={getHospitalParam}
        hospitals={this.getNearbyHospitals()}
        onCurrentPositionPress={data => this.setMainToCurrent(data)}
        activeMarkerIndex={this.state.activeHospitalMarkerIndex}
        onRegionChangeComplete={this.onRegionChangeComplete}
        title={this.state.first_title}
        address={this.state.first_address}
      />
    );
  }

  // ----------------------------------------
  // ----------------------------------------
  // MAIN RENDER
  // ----------------------------------------

  render() {
    const { getTpaResponse, getServicesResponse, meta } = this.props;
    const { filterAssociatedTPA, filterPriority, filterServices } = this.state;
    return (
      <BaseContainer
        title={
          this.state.isGPSActive
            ? mainHospitalMeta(
                meta.metaDetail.commons,
                MAIN_HOSPITAL_TYPES,
                "searchhospitalfindhospital"
              )
            : mainHospitalMeta(
                meta.metaDetail.commons,
                MAIN_HOSPITAL_TYPES,
                "searchhospitalgpsactivated"
              )
        }
        onBackPress={() => this.returnBack()}
        backgroundColor={
          this.state.isGPSActive ? Colors.main.softGray : Colors.main.errorRed
        }
        inverse={!this.state.isGPSActive}
        static
        noBottomPadding
        floatingKeyboard
      >
        <View
          style={[
            Styles.map.container,
            {
              height: Sizes.screen.height - 410 + 30,
              opacity: this.state.isListUp ? 0 : 1
            }
          ]}
        >
          {this.renderMap()}
        </View>

        <Animated.View
          style={[Styles.outerContainer, { top: this.state.position }]}
        >
          <View
            style={Styles.rounder.container}
            {...this._panResponsder.panHandlers}
          >
            <View style={Styles.rounder.handle} />
          </View>

          <View style={Styles.container}>
            {this.renderControls()}

            {this.renderList()}
          </View>
        </Animated.View>

        <HospitalFilter
          isActive={this.state.isFilterModalVisible}
          associatedTPA={
            getTpaResponse
              ? getTpaResponse.body.map(item => ({
                  label: item.tpaName,
                  value: item.id
                }))
              : []
          }
          services={
            getServicesResponse
              ? getServicesResponse.body.map(item => ({
                  label: item.value,
                  value: item.id
                }))
              : []
          }
          filterAssociatedTPA={filterAssociatedTPA}
          filterPriority={filterPriority}
          filterServices={filterServices}
          meta={meta}
          onConfirm={() => this.getFiltered()}
          onClosePress={() => this.getFiltered()}
          setFilter={this.setFilter}
        />
      </BaseContainer>
    );
  }

  // ----------------------------------------
}

const mapStateToProps = state => ({
  action: state.mpolicyMain.action,
  getHospitalParam: state.mpolicyMain.getHospitalParam,
  getHospitalResponse: state.mpolicyMain.getHospitalResponse,
  getHospitalAreaResponse: state.mpolicyMain.getHospitalAreaResponse,
  getTpaResponse: state.mpolicyMain.getTpaResponse,
  getServicesResponse: state.mpolicyMain.getServicesResponse,
  lastLocation: state.mpolicyMain.lastLocation,
  meta: state.meta
});

const mapDispatchToProps = dispatch => ({
  changeHospitalParam: payload => {
    dispatch({
      type: CoreActionTypes.CHANGE_HOSPITAL_PARAM,
      payload
    });
  },
  loadHospitalSearch: payload => {
    dispatch({
      context: pageKeys.MAIN_HOSPITAL_SEARCH_SCREEN,
      type: CoreActionTypes.MAIN_HOSPITAL_SEARCH_LOAD,
      payload
    });
  },
  getListHospitalsByArea: payload => {
    dispatch({
      context: pageKeys.MAIN_HOSPITAL_DETAIL_SCREEN,
      type: CoreActionTypes.GET_HOSPITAL_BY_AREA,
      payload
    });
  },
  loadHospitalDetail: payload => {
    dispatch({
      context: pageKeys.MAIN_HOSPITAL_DETAIL_SCREEN,
      type: CoreActionTypes.MAIN_HOSPITAL_DETAIL_LOAD,
      payload
    });
  },
  loadHospitalArea: payload => {
    dispatch({
      context: pageKeys.MAIN_HOSPITAL_DETAIL_SCREEN,
      type: CoreActionTypes.MAIN_HOSPITAL_AREA_LOAD,
      payload
    });
  },
  loadCurrentLocation: payload => {
    dispatch({
      context: pageKeys.MAIN_HOSPITAL_SEARCH_SCREEN,
      type: CoreActionTypes.MAIN_HOSPITAL_CURRENT_SEARCH_LOAD,
      payload
    });
  },
  getFilteredHospital: payload => {
    dispatch({
      context: pageKeys.MAIN_HOSPITAL_SEARCH_SCREEN,
      type: CoreActionTypes.GET_FILTERED_HOSPITAL,
      payload
    });
  },
  getHospitalTpa: payload => {
    dispatch({
      context: pageKeys.MAIN_HOSPITAL_SEARCH_SCREEN,
      type: CoreActionTypes.GET_HOSPITAL_TPA,
      payload
    });
  },
  getHospitalServices: payload => {
    dispatch({
      context: pageKeys.MAIN_HOSPITAL_SEARCH_SCREEN,
      type: CoreActionTypes.GET_HOSPITAL_SERVICES,
      payload
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(Search));
