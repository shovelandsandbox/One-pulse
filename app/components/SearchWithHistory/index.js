/* eslint-disable */
import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
    Easing,
    LayoutAnimation,
    FlatList,
    Platform,
} from "react-native";
import {
    CoreActions,
    CoreConfig,
    CoreUtils
} from "@pru-rt-internal/pulse-common"
const { metaHelpers } = CoreUtils
const {
    FINDHOSPITAL,
    FINDHOSPITAL_SEARCHLOCATION,
    FINDHOSPITAL_RECENT,
} = CoreConfig
const {
    appendHospitalSearchHistory,
    updateHospitalSearchHistoryCapacity,
    clearHospitalSearchHistory,
} = CoreActions
import PropTypes from 'prop-types'
import SearchBar from '../SearchBar'
import { CLOSE_PAGE, MAP_ANNOTATION_FILTER } from '../../config/images'
import DetailArrowCell from '../../components/DetailArrowCell'
import { connect } from "react-redux";

const unfoldTopMargin = 44
export const SEARCH_WITH_HISTORY_FOLDED_HEIGHT = 100
const sh = Dimensions.get('window').height
const sw = Dimensions.get('window').width

class SearchWithHistory extends Component {

    constructor(props) {
        super(props)

        const { isFolded } = this.props

        this.state = {
            folded: isFolded,
            filteredResults: [],
            keyword: '',
        }

        this.marginTop = new Animated.Value(isFolded ? sh - SEARCH_WITH_HISTORY_FOLDED_HEIGHT : unfoldTopMargin)

    }

    _fold() {
        const { onFoldStateChanged } = this.props
        this.searchBar.blur()
        this.setState({
            folded: true,
        }, () => {
            onFoldStateChanged && onFoldStateChanged(true)
            Animated.timing(this.marginTop, {
                toValue: sh - SEARCH_WITH_HISTORY_FOLDED_HEIGHT,
                duration: 250,
                easing: Easing.inout,
            }).start()
            LayoutAnimation.configureNext({ duration: 250 })
        })
    }

    _unfold() {
        const { onFoldStateChanged } = this.props
        this.setState({
            folded: false
        }, () => {
            onFoldStateChanged && onFoldStateChanged(false)
            Animated.timing(this.marginTop, {
                toValue: unfoldTopMargin,
                duration: 250,
                easing: Easing.inout,
            }).start()
            LayoutAnimation.configureNext({ duration: 250 })

            if (Platform.OS !== "ios") {
                setTimeout(() => {
                    this.searchBar.focus()
                }, 300)
            }

            if (this.state.keyword != undefined || this.state.keyword != '') {
                this._buildFilteredResultsWith(this.state.keyword)
            }

        })
    }

    _didSelectItemInDetailSheet(item) {
        this.setState({
            keyword: item
        }, () => {
            this._fold()
            this._submitKeyWord(this.state.keyword)
        })
    }

    _buildListItem = (tuple) => {
        const item = tuple.item
        return (
            <View style={{
                marginHorizontal: 20,
            }}>
                <DetailArrowCell
                    textStyleOverride={{
                        flex: 1,
                        color: "#515B61",
                        fontFamily: "Avenir",
                        fontSize: 14,
                        fontWeight: "700",
                        width: sh - 40,
                    }}
                    numberOfLines={2}
                    labelText={item}
                    hideArrow={true}
                    onPress={() => {
                        this._didSelectItemInDetailSheet(item)
                    }} />
            </View>
        )
    }

    _submitKeyWord(keyword) {
        // Update search history
        const { onSubmit } = this.props
        if (keyword != undefined && keyword != '') {
            this.props.appendHospitalSearchHistory(keyword)
            // Build filtered array
            this._buildFilteredResultsWith(keyword)
            onSubmit && onSubmit(keyword)
            return
        }
        onSubmit && onSubmit(keyword)
    }

    _buildFilteredResultsWith(keyword) {
        //TODO

        const { hospitalMarkers, clinicMarkers } = this.props
        let markers = []
        markers = markers.concat(hospitalMarkers)
        markers = markers.concat(clinicMarkers)



        let searchSources = []
        for (const idx in markers) {
            const address = markers[idx].address
            const addLine1 = address.line1 ? address.line1 : ''
            const addLine2 = address.line2 ? address.line2 : ''
            const addLine3 = address.line3 ? address.line3 : ''
            const addString = [addLine1, addLine2, addLine3].join(' ')
            searchSources.push(addString)
        }

        if (keyword == undefined || keyword == '') {
            this.setState({
                filteredResults: searchSources
            })
            return
        }

        try {
            const exp = RegExp(`(${keyword})+`, 'gi')
            let filtered = searchSources.filter((item, idx, arr) => {
                return exp.test(item)
            })
            this.setState({
                filteredResults: filtered
            })
        } catch (error) {
            this.setState({
                filteredResults: searchSources
            })
        }
    }

    _chooseDisplaySourceForList() {
        // return ["Speciality Filter page, input keyword in input box, the background of this page is the Map"]
        const { keyword, filteredResults } = this.state
        const { history } = this.props
        if (keyword == undefined || keyword == '') { return history }
        return filteredResults
    }

    _clearAndFold() {
        const { onSubmit } = this.props
        this.setState({
            keyword: ''
        }, () => {
            onSubmit && onSubmit()
            this._fold()
        })
    }

    render() {
        const { folded, filteredResults, keyword } = this.state
        const { accessoryAction, history } = this.props

        if (Platform.OS === "ios") {
            return (
              <Animated.View
                style={{
                    position: 'absolute',
                    top: this.marginTop,
                    width: sw,
                    height: folded ? SEARCH_WITH_HISTORY_FOLDED_HEIGHT : sh - unfoldTopMargin,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    zIndex: 1,
                }}
              >
                  <View style={{
                      flexDirection: 'row',
                  }}>
                      <View
                        style={{
                            flex: 1,
                            marginLeft: 20,
                        }}
                      >
                          <SearchBar
                            value={this.state.keyword}
                            onValueChanged={() => { }}
                            ref={isa => this.searchBar = isa}
                            shouldPresentingUnderline={!folded}
                            overrideIconStyle={{
                                tintColor: '#A9A9A9',
                            }}
                            onValueChanged={(content) => {
                                this.setState({
                                    keyword: content
                                }, () => {

                                    this._buildFilteredResultsWith(content)
                                })
                            }}
                            onFocus={() => {
                                this._unfold()
                            }}
                            onBlur={() => {
                            }}
                            onSubmit={(content) => {
                                this._submitKeyWord(content)
                                this._fold()
                            }}
                            maxLength={200}
                          />
                      </View>
                      {false && <View
                        style={{
                            width: 1,
                            height: 40,
                            backgroundColor: '#d9d9d9',
                            marginHorizontal: 12,
                            marginTop: 12,
                        }}
                      />
                      }
                      {!folded && <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            // backgroundColor: '#a434',
                            marginTop: 12,
                            marginRight: 12,
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            // folded
                            //     ? accessoryAction && accessoryAction()
                            this._clearAndFold()
                        }}
                      >

                          {/* Unfold Element */}
                          {
                              <Image
                                style={{
                                    alignSelf: 'center',
                                }}
                                source={folded ? MAP_ANNOTATION_FILTER : CLOSE_PAGE}
                              />
                          }
                      </TouchableOpacity>}
                  </View>
                  {/* Search History Indicator */}
                  {
                      !folded && keyword == '' &&
                      <Text
                        style={{
                            marginLeft: 20,
                            color: '#BDBEC0',
                            fontFamily: 'Avenir',
                            fontSize: 14,
                            fontWeight: '900'
                        }}>{'Recent'}</Text>
                  }
                  {/* Search History */}
                  {
                      // If keyword was not empty, display source should be filteredResults
                      // otherwise, will be search history
                      !folded &&
                      <FlatList
                        style={{
                            width: '100%',
                            marginTop: 8,
                            height: sh - unfoldTopMargin - 64 - 64 - 8,
                        }}
                        data={this._chooseDisplaySourceForList()}
                        renderItem={this._buildListItem}
                        keyExtractor={(item, index) => index} />
                  }
              </Animated.View >
            )
        }
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: this.marginTop,
                    zIndex: 1,
                    width: sw,
                    height: folded ? SEARCH_WITH_HISTORY_FOLDED_HEIGHT : sh - unfoldTopMargin,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            marginLeft: 20,
                        }}
                        onPress={() => {
                            this._unfold()
                        }}
                    >
                        <SearchBar
                            value={this.state.keyword}
                            onValueChanged={() => { }}
                            ref={isa => this.searchBar = isa}
                            placeholderOverride={metaHelpers.findElement(FINDHOSPITAL, FINDHOSPITAL_SEARCHLOCATION).label}
                            shouldPresentingUnderline={!folded}
                            foldedType={!folded}
                            overrideIconStyle={{
                                tintColor: '#A9A9A9',
                            }}
                            onValueChanged={(content) => {
                                this.setState({
                                    keyword: content
                                }, () => {

                                    this._buildFilteredResultsWith(content)
                                })
                            }}
                            // onFocus={() => {
                            //     this._unfold()
                            // }}
                            // onBlur={() => {
                            // }}
                            onSubmit={(content) => {
                                this._submitKeyWord(content)
                                this._fold()
                            }}
                            maxLength={200}
                        />
                    </TouchableOpacity>
                    {false && <View
                        style={{
                            width: 1,
                            height: 40,
                            backgroundColor: '#d9d9d9',
                            marginHorizontal: 12,
                            marginTop: 12,
                        }}
                    />
                    }
                    {!folded && <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            // backgroundColor: '#a434',
                            marginTop: 12,
                            marginRight: 12,
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            // folded
                            //     ? accessoryAction && accessoryAction()
                            this._clearAndFold()
                        }}
                    >

                        {/* Unfold Element */}
                        {
                            <Image
                                style={{
                                    alignSelf: 'center',
                                }}
                                source={folded ? MAP_ANNOTATION_FILTER : CLOSE_PAGE}
                            />
                        }
                    </TouchableOpacity>}
                </View>
                {/* Search History Indicator */}
                {
                    !folded && keyword == '' &&
                    <Text
                        style={{
                            marginLeft: 20,
                            color: '#BDBEC0',
                            fontFamily: 'Avenir',
                            fontSize: 14,
                            fontWeight: '900'
                        }}>
                            {metaHelpers.findElement(FINDHOSPITAL, FINDHOSPITAL_RECENT).label}
                        </Text>
                }
                {/* Search History */}
                {
                    // If keyword was not empty, display source should be filteredResults
                    // otherwise, will be search history
                    !folded &&
                    <FlatList
                        style={{
                            width: '100%',
                            marginTop: 8,
                            height: sh - unfoldTopMargin - 64 - 64 - 8,
                        }}
                        data={this._chooseDisplaySourceForList()}
                        renderItem={this._buildListItem}
                        keyExtractor={(item, index) => index} />
                }
            </Animated.View >
        )
    }
}

SearchWithHistory.PropTypes = {
    isFolded: PropTypes.bool,
    accessoryAction: PropTypes.func,
    onFoldStateChanged: PropTypes.func,
    onSubmit: PropTypes.func,
    dataSource: PropTypes.array,
}

SearchWithHistory.defaultProps = {
    isFolded: true
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        history: state.hospitalSearchReducer.hosptialSearchHistory,
        hospitalMarkers: state.navigator.hospital.hospitalMarkers,
        clinicMarkers: state.navigator.clinic.clinicMarkers,
    };
};
export default connect(
    mapStateToProps,
    {
        appendHospitalSearchHistory,
        updateHospitalSearchHistoryCapacity,
        clearHospitalSearchHistory,
    }
)(SearchWithHistory)