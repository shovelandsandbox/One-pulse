import { Fragment } from "react";
import {
  View,
  TextInput,
  ScrollView,
  FlatList,
  SectionList,
  Picker,
  Switch,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
  StatusBar,
  ImageBackground,
  RefreshControl,
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import DatePicker from "react-native-date-picker";
import { CoreComponents } from "@pru-rt-internal/pulse-common";
import NewTextInput from "../components/NewTextInput";
const { AppButton, Languages, SocialLogin } = CoreComponents;
import ConnectedPruShare from "../components/PruShare/ConnectedPruShare";
import FlatListJSX from "../components/FlatListJSX/FlatListJSX";
import InsaanHomeTile from "../features/insaan/components/InsaanHomeTile/InsaanHomeTile";
import CancerPolicy from "../features/cancerPolicy/screens/CancerPolicy";
import * as Progress from "react-native-progress";
//import { WebView } from 'react-native-webview';
//import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Card,
  Tile,
  CheckBox,
  Input,
  Divider,
  Slider,
  Avatar,
  Badge,
  ListItem,
  Header,
  Overlay,
  Tooltip,
  SocialIcon,
  SearchBar,
  Rating,
  Icon,
  Text,
  Button,
  ButtonGroup,
} from "react-native-elements";
//import MaterialIcons from "react-native-vector-icons/MaterialIcons";
//import { NavigationContainer } from '@react-navigation/native';
import HTML from "react-native-render-html";
//import Spinner from 'react-native-loading-spinner-overlay';
//import MapView,{Marker,Callout,Polygon,Polyline,Circle,Overlay,Heatmap,Geojson} from 'react-native-maps';
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

export default componentTypes = {
  Text: Text,
  Button: Button,
  View: View,
  TextInput: TextInput,
  ScrollView: ScrollView,
  Image: Image,
  ImageBackground: ImageBackground,
  RefreshControl: RefreshControl,
  ActivityIndicator: ActivityIndicator,
  //    'Spinner': Spinner,
  FlatList: FlatList,
  SectionList: SectionList,
  Picker: Picker,
  Slider: Slider,
  Switch: Switch,
  //'WebView': WebView,
  TouchableOpacity: TouchableOpacity,
  TouchableHighlight: TouchableHighlight,
  TouchableWithoutFeedback: TouchableWithoutFeedback,
  KeyboardAvoidingView: KeyboardAvoidingView,
  KeyboardAwareScrollView: KeyboardAwareScrollView,
  KeyboardAwareFlatList: KeyboardAwareFlatList,
  StatusBar: StatusBar,
  Modal: Modal,
  DatePicker: DatePicker,
  //    'DateTimePicker': DateTimePicker,
  Card: Card,
  Tile: Tile,
  CheckBox: CheckBox,
  Input: Input,
  Divider: Divider,
  ButtonGroup: ButtonGroup,
  Avatar: Avatar,
  Badge: Badge,
  ListItem: ListItem,
  Icon: Icon,
  Rating: Rating,
  SearchBar: SearchBar,
  SocialIcon: SocialIcon,
  Tooltip: Tooltip,
  Overlay: Overlay,
  Header: Header,
  //  'MaterialIcons': MaterialIcons,
  HTML: HTML,
  Fragment: Fragment,
  SocialLogin: SocialLogin,
  Languages: Languages,
  NewTextInput: NewTextInput,
  AppButton: AppButton,
  FlatListJSX: FlatListJSX,
  LinearGradient: LinearGradient,
  ConnectedPruShare: ConnectedPruShare,
  InsaanHomeTile: InsaanHomeTile,
  CancerPolicy: CancerPolicy,
  ProgressBar: Progress.Bar,
  //    'NavigationContainer': NavigationContainer,
  /*'Map': {
        'MapView': MapView,
        'Marker': Marker,
        'Callout': Callout,
        'Polygon': Polygon,
        'Polyline': Polyline,
        'Circle': Circle,
        'Overlay': Overlay,
        'Heatmap': Heatmap,
        'Geojson': Geojson
    }*/
  Animated: {
    Image: Animated.Image,
    ScrollView: Animated.ScrollView,
    Text: Animated.Text,
    View: Animated.View,
    FlatList: Animated.FlatList,
    SectionList: Animated.SectionList,
  },
};

export function getBuiltinComponent(typeName) {
  if (typeName) {
    const paths = typeName.split(".");
    let ref = componentTypes;
    for (let i = 0; i < paths.length; i++) {
      ref = ref[paths[i]];
    }
    return ref;
    //return componentTypes[typeName];
  }
}

const getDefaultProps = {};
