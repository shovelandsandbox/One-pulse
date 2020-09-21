import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const tabTextStyles = {
    selected: styles.tabItemSelected,
    unselected: styles.tabItem
};

const tabStyles = {
    selected: styles.tabItemContainerSelected,
    unselected: styles.tabItemContainer
}

export default class CommunityEventTabs extends Component {

  render() {
    const { tabs, selectedTabIndex, onTabSelect } = this.props;
    return (
      <View style={styles.tabContainer}>
        {tabs.map((tabItem) => {
            const currTabSelectionState = tabItem.tabIndex === selectedTabIndex ?
                "selected" : "unselected" ;
            return (
                <View style={tabStyles[currTabSelectionState]}>
                    <TouchableOpacity
                        onPress={() => onTabSelect(tabItem)}>
                        <Text style={tabTextStyles[currTabSelectionState]}>
                            {tabItem.tabName}
                        </Text>
                    </TouchableOpacity>
                    {currTabSelectionState === "selected" ?
                        <View style={styles.underline}></View> : null}
                </View>
            );
        })}
      </View>
    );
  }
}

CommunityEventTabs.propTypes = {
  /* eslint-disable */
  tabs: PropTypes.array,
  selectedTabIndex: PropTypes.number,
  onTabSelect: PropTypes.func,
};

CommunityEventTabs.defaultProps = {
    tabs: [],
    selectedTabIndex: 0,
};
