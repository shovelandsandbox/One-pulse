import React, { PureComponent } from "react";
import {
  Dimensions,
  PanResponder,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Animated,
  UIManager,
} from "react-native";

import PropTypes from "prop-types";

const MARGIN_TOP = Platform.OS === "ios" ? 20 : 0;
const DEVICE_HEIGHT = Dimensions.get("window").height - MARGIN_TOP;
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_FULL_HEIGHT = Dimensions.get("window").height;

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class Swipeable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
      swipe: "vertical",
      disable: this.props.disable || false,
      shortHeight: props.shortHeight,
      isNotificationRead: false,
    };

    this.SWIPE_HEIGHT = 100;
    this._panResponder = null;
    this.top = this.SWIPE_HEIGHT;
    this.height = this.SWIPE_HEIGHT;
    this.left = 0;
    this.right = 0;
    this.customStyle = this.positionStyle;
    this.checkCollapsed = true;
    this.PADDINGTOP = 10;
    this.translateX = new Animated.Value(0);
  }

  positionStyle = {
    style: {
      bottom: 0,
      top: this.top,
      height: this.height,
      left: 0,
      right: 0,
    },
  };

  componentDidMount() {
    this.props.hasRef && this.props.hasRef(this);
  }

  updateNativeProps() {
    LayoutAnimation.easeInEaseOut();
    this.viewRef.setNativeProps(this.customStyle);
  }

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        return !(
          Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5
        );
      },
      onPanResponderMove: this._onPanResponderMove.bind(this),
      onPanResponderRelease: this._onPanResponderRelease.bind(this),
    });
  }

  // eslint-disable-next-line complexity
  _onPanResponderMove(event, gestureState) {
    const { onSwipeHorizontal } = this.props;
    if (
      gestureState.x0 - gestureState.moveX >= 70 ||
      gestureState.x0 - gestureState.moveX <= -70
    ) {
      //DEVICE_WIDTH SWIPE LEFT OR RIGHT
      this.setState({ swipe: "horizontal" });
      this._panResponderSecond = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: Animated.event([null, { dx: this.translateX }]),
        onPanResponderRelease: (e, { vx, dx }) => {
          this.setState({ swipe: "vertical" });
          const screenWidth = Dimensions.get("window").width;
          if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
            Animated.timing(this.translateX, {
              toValue: dx > 0 ? screenWidth : -screenWidth,
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              this.customStyle = this.positionStyle;
              this.translateX = new Animated.Value(0);
              onSwipeHorizontal && onSwipeHorizontal();
              this.setState({ isNotificationRead: false });
            });
          } else {
            Animated.spring(this.translateX, {
              toValue: 0,
              bounciness: 10,
              useNativeDriver: true,
            }).start();
          }
        },
      });
    } else if (gestureState.dy > 0 && !this.checkCollapsed) {
      // SWIPE DOWN
      this.customStyle.style.top = this.top + gestureState.dy;
      this.customStyle.style.height = DEVICE_HEIGHT - gestureState.dy;
      !this.state.collapsed &&
        this.setState({ collapsed: true, swipe: "vertical" });
      this.updateNativeProps();
    } else if (this.checkCollapsed && gestureState.dy < -60) {
      // SWIPE UP
      const { shortHeight } = this.state;
      this.top = shortHeight ? DEVICE_HEIGHT - shortHeight : 150;
      this.customStyle.style.top = DEVICE_HEIGHT + gestureState.dy;
      this.updateNativeProps();

      this.state.collapsed &&
        this.setState({ collapsed: false, swipe: "vertical" });
    }
  }

  _onPanResponderRelease(event, gestureState) {
    if (
      this.checkCollapsed &&
      (gestureState.x0 - gestureState.moveX >= 100 ||
        gestureState.x0 - gestureState.moveX <= -100)
    ) {
      // do nothing for now
    } else if (gestureState.dy < -100 || gestureState.dy < 100) {
      this.showFull();
    } else {
      this.showMini();
    }
  }

  showFull() {
    if (this.state.swipe === "vertical") {
      const { shortHeight } = this.state;
      this.customStyle.style.top = shortHeight
        ? DEVICE_HEIGHT - shortHeight
        : 300;
      this.customStyle.style.height =
        DEVICE_HEIGHT - (shortHeight ? DEVICE_HEIGHT - shortHeight : 150);
      
      if (Platform.OS === "android" && DEVICE_HEIGHT > 700 && this.props.ShortComponent) {
        this.customStyle.style.height = this.customStyle.style.height + 20;
        this.customStyle.style.top = this.customStyle.style.top + 20;
      }
      this.updateNativeProps();

      this.state.collapsed && this.setState({ collapsed: false });
      this.checkCollapsed = false;
      this.PADDINGTOP = 10;
    }
  }

  showMini() {
    this.SWIPE_HEIGHT = 100; //Avoid hiding when swiping down.
    this.customStyle.style.top = DEVICE_HEIGHT - this.SWIPE_HEIGHT;
    this.customStyle.style.height = this.SWIPE_HEIGHT;

    if (Platform.OS === "android" && DEVICE_HEIGHT > 700 && this.props.ShortComponent) {
      this.customStyle.style.height = this.customStyle.style.height + 10;
      this.customStyle.style.top = this.customStyle.style.top + 10;
    }
    this.updateNativeProps();

    !this.state.collapsed && this.setState({ collapsed: true });
    this.checkCollapsed = true;
    this.PADDINGTOP = 20;
  }

  getComponent = (Component, action) => {
    const swipeAnimeStyle = {
      transform: [
        {
          translateX: this.translateX,
        },
      ],
    };

    return (
      <Animated.View
        ref={ref => (this.viewRef = ref)}
        {...this._panResponder.panHandlers}
        style={[
          styles.wrapSwipe,
          {
            height: this.SWIPE_HEIGHT,
            marginTop: MARGIN_TOP,
          },
          swipeAnimeStyle,
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            height: this.SWIPE_HEIGHT,
          }}
          onPress={action}
        >
          {Component}
        </TouchableOpacity>
      </Animated.View>
    )
  }

  // eslint-disable-next-line complexity
  render() {
    const { collapsed, isNotificationRead } = this.state;
    const { Component, onSwipeUp, ShortComponent } = this.props;
    const { disable, swipe } = this.state;
    const swipeAnimeStyle = {
      transform: [
        {
          translateX: this.translateX,
        },
      ],
    };

    if (disable) {
      return null;
    } else if (!collapsed && !isNotificationRead) {
      onSwipeUp && onSwipeUp();
      this.setState({ isNotificationRead: true });
    }

    return (
      <View style={styles.Container}>
        {swipe === "vertical" ? (
          collapsed ? 
            this.getComponent(ShortComponent ? ShortComponent : Component, () => this.showFull()) : 
            this.getComponent(Component, () => this.showMini())
        ) :
          <Animated.View
            ref={ref => (this.viewRef = ref)}
            {...this._panResponderSecond.panHandlers}
            style={[
              styles.wrapSwipe,
              {
                height: this.SWIPE_HEIGHT,
                marginTop: MARGIN_TOP,
              },
              collapsed && { marginBottom: -200 },
              swipeAnimeStyle,
            ]}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={{ flex: 1, height: this.SWIPE_HEIGHT }}
              onPress={
                collapsed ? () => this.showFull() : () => this.showMini()
              }
            >
              {Component}
            </TouchableOpacity>
          </Animated.View>
        }
      </View>
    );
  }
}

Swipeable.propTypes = {
  swipeHeight: PropTypes.string,
  Component: PropTypes.instanceOf(Object).isRequired,
  onSwipeHorizontal: PropTypes.func.isRequired,
  onSwipeUp: PropTypes.func,
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    flex: 1,
    height: DEVICE_FULL_HEIGHT,
    position: "absolute",
    width: DEVICE_WIDTH,
    zIndex: 999,
  },
  wrapSwipe: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    bottom: 0,
    height: this.SWIPE_HEIGHT,
    left: 0,
    position: "absolute",
    right: 0,
  },
});

export default Swipeable;
