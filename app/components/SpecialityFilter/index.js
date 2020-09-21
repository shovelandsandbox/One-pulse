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
} from "react-native";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SearchBar from '../SearchBar'
import {
    UNIVERSE_DOWN_ARROW,
    MAP_ANNOTATION_FILTER,
    BACK_WHITE
} from '../../config/images'
import { CoreActions, CoreConfig, CoreUtils } from '@pru-rt-internal/pulse-common'
const { metaHelpers } = CoreUtils
const {
    FINDHOSPITAL,
    FINDHOSPITAL_SEARCHBYSPECIALITY,
    FINDHOSPITAL_APPLY
} = CoreConfig
const { filterChangeAction } = CoreActions
import FoldableSectionHeaderCell from '../FoldableSectionHeaderCell'
import SelectionFilterCell from '../SelectionFilterCell'
import FilterPillButton from '../FilterPillButton'
const mockResponse = require('../../mockResponse/specialization.json')

const unfoldTopMargin = 44
export const SPECIALLY_FILTER_FOLDED_HEIGHT = 140
const sh = Dimensions.get('window').height
const sw = Dimensions.get('window').width

class SpecialityFilter extends Component {

    constructor(props) {
        super(props)
        const { isFolded, filters, specializationList } = props
        this.state = {
            isFolded: isFolded,
            foldStatus: {},
            selectedfilters: filters,
            displaySource_filtered: specializationList,
            keyword: '',
        }
        this.marginTop = new Animated.Value(isFolded ? sh - SPECIALLY_FILTER_FOLDED_HEIGHT : unfoldTopMargin)
        this.foldArrowRotation = new Animated.Value()
    }


    _filterWithKeyword(specializationList) {

        // const { specializationList } = this.props
        const { keyword } = this.state

        if (keyword == undefined || keyword == '') {
            // this.setState({
            //     displaySource_filtered: specializationList
            // })
            return specializationList
        }
        try {
            const exp = RegExp(`(${keyword})+`, 'gi')
            const ds = specializationList.filter((item, idx, sample) => {
                const title = item.label
                return exp.test(title)
            })
            return ds
            // this.setState({
            //     displaySource_filtered: ds
            // })
        } catch (error) {
            return specializationList
            // this.setState({
            //     displaySource_filtered: specializationList
            // })
        }



    }

    componentWillMount() {

        // const { specializationList, filters } = this.props
        // var foldStatus = {}
        // // this.setState({
        // //     selectedfilters: filters,
        // //     // isFolded: isFolded
        // // })
        // if (specializationList.length > 0) {
        //     for (const idx in specializationList) {
        //         foldStatus[idx] = true
        //     }
        //     this.setState({
        //         foldStatus: foldStatus
        //     }, () => {
        //     })
        // }

        this._filterWithKeyword()


    }

    _buildListItem = tuple => {
        const { selectedSpecializations, filterChangeAction } = this.props
        const { foldStatus } = this.state
        const item = tuple.item
        const label = item.label
        const idx = tuple.index
        const isFolded = foldStatus[idx]
        var selectedList = selectedSpecializations

        return (
            <SelectionFilterCell
                labelText={label}
                isSelected={selectedList.includes(label)}
                onSelected={() => {
                    // if (selectedList.length >= 4) { return }
                    selectedList.push(label)
                    // Update Selected Filters
                    this.setState({
                        selectedfilters: selectedList
                    }, () => {
                        filterChangeAction(50, selectedList)
                    })
                }}
                onDeselected={() => {
                    delete selectedList[selectedList.indexOf(label)]

                    selectedList = selectedList.filter((item) => {
                        return item != null
                    })

                    // Update Selected Filters

                    this.setState({
                        selectedfilters: selectedList
                    }, () => {
                        filterChangeAction(50, selectedList)
                    })
                }}
            />
        )
    }

    _selectedFilterUpdate(sample) {
        const { onClearAction, onFilterListChanged } = this.props
        var list = this.state.selectedfilters
        list = list.filter((item, idx, arr) => {

            return item != sample
        })
        if (list == undefined) {
            onClearAction && onClearAction()
            onFilterListChanged && onFilterListChanged([])
            return
        }
        this.setState({
            selectedfilters: list
        }, () => {
            if (list == undefined || list.length == 0) {
                onFilterListChanged && onFilterListChanged([])
                onClearAction && onClearAction()
            } else {
                onFilterListChanged && onFilterListChanged(list)
            }
        })
    }

    _onCommit() {
        const { onFilterListChanged, onFoldStateChanged } = this.props
        // const { isFolded } = this.state
        onFilterListChanged && onFilterListChanged(this.state.selectedfilters)
        this.setState({
            isFolded: !this.state.isFolded
        }, () => {
            onFoldStateChanged && onFoldStateChanged(this.state.isFolded)
            Animated.timing(this.marginTop, {
                toValue: this.state.isFolded ? sh - SPECIALLY_FILTER_FOLDED_HEIGHT : unfoldTopMargin,
                duration: 250,
                easing: Easing.inout,
            }).start()
            LayoutAnimation.configureNext({ duration: 250 })
        })
    }

    // Render this component as full screen controller
    render_indiviual() {

        const { onFoldStateChanged, selectedSpecializations, specializationList, filter, onClearAction, filterChangeAction, onBackAction, indiviualMode, onApplyActions } = this.props
        const { isFolded, selectedfilters } = this.state

        return (
            <View
                style={{ flex: 1 }}
            >
                {/* Header Components */}
                < View style={{
                    flexDirection: 'row',
                    height: 40,
                }}>
                    <TouchableOpacity
                        style={{
                            width: 64,
                            justifyContent: 'center'
                        }}
                        onPress={() => {
                            filterChangeAction(50, [])
                            onBackAction && onBackAction()
                        }}
                    >
                        <Image
                            style={{
                                width: 16,
                                height: 14,
                                tintColor: '#515b61',
                                marginLeft: 20,
                                resizeMode: 'stretch',
                            }}
                            source={BACK_WHITE} />
                    </TouchableOpacity>
                    {/* Title Text */}
                    <Text style={{
                        alignSelf: 'center',
                        fontFamily: 'Avenir',
                        fontSize: 16,
                        fontWeight: '800',
                        color: '#515B61',
                        flex: 1,
                    }}>
                        {` `}
                    </Text>


                    {/* Clear Button - Won't display unless filters not empty */}
                    {
                        selectedSpecializations && selectedSpecializations.length > 0 &&
                        <TouchableOpacity
                            style={{
                                width: 64,
                                justifyContent: 'center',
                            }}
                            onPress={() => {
                                filterChangeAction(50, [])
                            }}
                        >
                            <Text
                                style={{
                                    color: '#ED1B2E',
                                    alignSelf: 'center',
                                    fontWeight: '600',
                                    fontFamily: 'Avenir',
                                    marginRight: 20,
                                    fontSize: 16,
                                }}>
                                Clear
                        </Text>

                        </TouchableOpacity>
                    }
                </View >
                {/* Unfolded - Search Bar */}
                {
                    <View style={{
                        marginHorizontal: 20,
                    }}>
                        <SearchBar
                            maxLength={200}
                            placeholderOverride={metaHelpers.findElement(FINDHOSPITAL, FINDHOSPITAL_SEARCHBYSPECIALITY).label}
                            onValueChanged={(content) => {
                                this.setState({
                                    keyword: content
                                }, () => { this._filterWithKeyword() })
                            }} />
                    </View>
                }
                {/* Unfolded - Filter List */}
                {
                    true && <FlatList
                        style={{
                            flex: 1,
                            width: '100%',
                            // height: '100%',
                            marginBottom: 25,
                            // backgroundColor: '#a43'
                        }}
                        data={this._filterWithKeyword(specializationList)}
                        renderItem={this._buildListItem}
                        keyExtractor={(item, index) => index}
                    />
                }
                {/* Apply Button */}
                <View
                    style={{
                        width: sw,
                        height: 64,
                        // backgroundColor: '#a43'
                    }}>
                    <TouchableOpacity
                        style={{
                            // position: 'absolute',
                            // bottom: 32,
                            marginBottom: 15,
                            alignSelf: 'center',
                            backgroundColor: '#ED1B2E',
                            width: sw * 0.8,
                            borderRadius: 22,
                            height: 44,
                            justifyContent: 'center'
                        }}
                        activeOpacity={0.6}
                        onPress={() => {
                            if (indiviualMode) {
                                onApplyActions && onApplyActions()
                            }
                            this._onCommit()
                        }}
                    >
                        <Text
                            style={{
                                alignSelf: 'center',
                                color: '#fff',
                                fontFamily: 'Avenir',
                                fontSize: 16,
                                fontWeight: '500',
                            }}
                        >
                            {metaHelpers.findElement(FINDHOSPITAL, FINDHOSPITAL_APPLY).label}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View >
        )

    }

    // Render this component as embed elements
    render() {
        const { onFoldStateChanged, specializationList, filter, onClearAction, onFilterListChanged, indiviualMode, filterChangeAction } = this.props
        if (indiviualMode) {
            return this.render_indiviual()
        }
        const { isFolded, selectedfilters } = this.state
        return (
            <Animated.View
                style={[
                    this.props.style,
                    {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        overflow: 'hidden',
                        backgroundColor: '#fff',
                        position: 'absolute',
                        zIndex: 2,
                        top: this.marginTop,
                        width: '100%',
                        flex: 1,
                        shadowColor: '#000',
                        shadowOffset: {
                            height: 1,
                            width: 1,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 5,
                    }
                ]}
            >
                {/* Header Components */}
                < View style={{
                    flexDirection: 'row',
                    height: 40,
                }}>
                    <TouchableOpacity
                        style={{
                            width: 64,
                            justifyContent: 'center'
                        }}
                        onPress={() => {

                            if (selectedfilters == undefined || selectedfilters.length == 0) {
                                onClearAction && onClearAction()
                                return
                            }

                            this.setState({
                                isFolded: !this.state.isFolded
                            }, () => {
                                onFoldStateChanged && onFoldStateChanged(this.state.isFolded)
                                Animated.timing(this.marginTop, {
                                    toValue: this.state.isFolded ? sh - SPECIALLY_FILTER_FOLDED_HEIGHT : unfoldTopMargin,
                                    duration: 250,
                                    easing: Easing.inout,
                                }).start()
                                LayoutAnimation.configureNext({ duration: 250 })
                            })
                        }}
                    >
                        <Animated.Image
                            style={{
                                width: 16,
                                height: 14,
                                tintColor: '#515b61',
                                marginLeft: 20,
                                resizeMode: 'stretch',
                                transform: [{ rotate: this.state.isFolded ? '180deg' : '0deg' }]
                            }}
                            source={UNIVERSE_DOWN_ARROW} />
                    </TouchableOpacity>
                    {/* Title Text */}
                    <Text style={{
                        alignSelf: 'center',
                        fontFamily: 'Avenir',
                        fontSize: 16,
                        fontWeight: '800',
                        color: '#515B61',
                        flex: 1,
                    }}>
                        Speciality Filter
                    </Text>
                    {/* Clear Button - Won't display unless filters not empty */}
                    {selectedfilters && selectedfilters.length > 0 &&
                        <TouchableOpacity
                            style={{
                                width: 64,
                                justifyContent: 'center',
                            }}
                            onPress={() => {
                                onFilterListChanged && onFilterListChanged([])
                                onClearAction && onClearAction()
                            }}
                        >
                            <Text
                                style={{
                                    color: '#ED1B2E',
                                    alignSelf: 'center',
                                    fontWeight: '600',
                                    fontFamily: 'Avenir',
                                    marginRight: 20,
                                    fontSize: 16,
                                }}>
                                Clear
                        </Text>

                        </TouchableOpacity>
                    }
                </View >
                {/* Unfolded - Search Bar */}
                {!isFolded &&
                    <View style={{ marginHorizontal: 20, }}>
                        <SearchBar
                            placeholderOverride={'Search by Speciality'}
                            onValueChanged={(content) => {
                                this.setState({
                                    keyword: content
                                }, () => { this._filterWithKeyword() })
                            }} />
                    </View>
                }
                {/* Unfolded - Filter List */}
                {!isFolded &&
                    <FlatList
                        style={{
                            width: '100%',
                            height: this.state.selectedfilters.length > 0 ? sh - unfoldTopMargin - 64 - 64 - 64 : sh - unfoldTopMargin - 64 - 64,
                        }}
                        data={this.state.displaySource_filtered}
                        renderItem={this._buildListItem}
                        keyExtractor={(item, index) => index}
                    />
                }
                {/* Filded - Filter List */}
                {isFolded &&
                    <View>
                        <FlatList
                            style={{
                                height: SPECIALLY_FILTER_FOLDED_HEIGHT - 64,
                                marginTop: -4,
                                width: sw,
                                marginBottom: 10,
                                // backgroundColor: '#a43',
                            }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            // horizontal={true}
                            contentContainerStyle={{
                                // height: 100,
                                width: sw,
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                            }}
                            data={selectedfilters}
                            renderItem={(tuple) => {
                                const title = tuple.item
                                const element = <FilterPillButton
                                    title={title}
                                    onPressAction={() => {
                                        this._selectedFilterUpdate(title)
                                    }} />
                                return element
                            }}
                            keyExtractor={(item, index) => index}
                        >
                        </FlatList>
                    </View>
                }
                {
                    this.state.selectedfilters.length > 0 && (
                        <View
                            style={{
                                width: sw,
                                height: 64,
                                // backgroundColor: '#a43'
                            }}>
                            <TouchableOpacity
                                style={{
                                    // position: 'absolute',
                                    // bottom: 32,
                                    marginTop: 2,
                                    alignSelf: 'center',
                                    backgroundColor: '#ED1B2E',
                                    width: sw * 0.8,
                                    borderRadius: 22,
                                    height: 44,
                                    justifyContent: 'center'
                                }}
                                activeOpacity={0.6}
                                onPress={() => {
                                    this._onCommit()
                                }}
                            >
                                <Text
                                    style={{
                                        alignSelf: 'center',
                                        color: '#fff',
                                        fontFamily: 'Avenir',
                                        fontSize: 16,
                                        fontWeight: '500',
                                    }}
                                >
                                    {`Apply ${this.state.selectedfilters.length} filter${this.state.selectedfilters.length > 1 ? 's' : ''}`}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </Animated.View >
        )
    }
}

SpecialityFilter.PropTypes = {
    isFolded: PropTypes.bool,
    filterChangeAction: PropTypes.func,
    onFilterListChanged: PropTypes.func.isRequired,
    onClearAction: PropTypes.func.isRequired,
    onFoldStateChanged: PropTypes.func,
    filters: PropTypes.array,
    indiviualMode: PropTypes.bool,
    onBackAction: PropTypes.func,
    onApplyActions: PropTypes.func,
}

SpecialityFilter.defaultProps = {
    isFolded: true,
    specializationList: [],
    filters: [],
}

const mapStateToProps = state => {
    return {
        specializationList: state.navigator.filter.specialization,
        selectedSpecializations: state.navigator.filter.selectedSpecialization,
    }
}

export default connect(
    mapStateToProps,
    {
        filterChangeAction
    }
)(SpecialityFilter)