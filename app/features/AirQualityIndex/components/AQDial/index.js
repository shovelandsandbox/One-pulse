import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Dimensions,
    StatusBar,
    SafeAreaView,
    PixelRatio
} from 'react-native';
import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';
import { styles } from './styles'
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const { width, height } = Dimensions.get('window');

const size = width * 0.8;
const strokeWidth = 0;
const radius = 83
export default class AQDial extends Component {

    getCenter = () => {
        return {
            x: 90,
            y: 90
        };
    };

    getAngle = () => {
        return this.getAngleHelper() * (Math.PI / 180);
    };

    getAngleHelper() {

        return ((this.props.value + 10) / 120) * 360
    }

    getAnglePoint() {
        return (Math.PI * 2) / 100;
    }

    getPointPosition = () => {
        const center = this.getCenter();
        const angle = this.getAngle();
        console.log("radius", angle, center, Math.cos(angle));
        return {
            x: center.x - radius * Math.sin(angle),
            y: center.y + radius * Math.cos(angle),
        };
    };

    renderGradient(id, c1, c2, p1, p2) {
        const x1 = p1.x,
            y1 = p1.y,
            x2 = p2.x,
            y2 = p2.y;
        const x = 0;
        const y = 0;

        const stroke = strokeWidth / width;

        const px1 = PixelRatio.get();

        return (
            <Defs>
                <LinearGradient id={id}
                    x1={x1 - x}
                    y1={y1 - y}
                    x2={x2 - x}
                    y2={y2 - y}
                >
                    <Stop offset={String(stroke)} stopColor={c1} />
                    <Stop offset={String(1 - stroke)} stopColor={c2} />
                </LinearGradient>
            </Defs>
        );
    }

    render() {
        const points = [
            { x: 173.302, y: 83.0457 },
            { x: 143.321, y: 155.307 },
            { x: 129.767, y: 17.527 },
            { x: 172.284, y: 81.0804 },
            { x: 129.767, y: 14.6061 },
            { x: 48.9771, y: 16.7055 },
            { x: 48.1396, y: 16.6927 },
            { x: 5.2124, y: 84.4177 },
            { x: 4.60465, y: 84.2979 },
            { x: 34.5878, y: 154.057 },
        ];
        const colors = [
            Colors.color0F6D72,
            Colors.color192F3E,
            Colors.color369F23,
            Colors.colorFAB130,
            Colors.pulseRed,
            Colors.color551C87
        ]
        const position = this.getPointPosition();

        return (
            <SafeAreaView style={styles.container}>
                <Svg width={166} height={122} viewBox="0 0 188 155" fill="none" >
                    <Path d="M167.276 84.6759C167.716 91.372 167.281 98.1321 165.954 104.784C162.966 119.76 155.59 133.517 144.76 144.314C142.307 146.758 142.307 150.722 144.76 153.166C147.212 155.611 151.187 155.611 153.64 153.166C166.226 140.618 174.798 124.631 178.271 107.227C180.08 98.1567 180.463 88.9139 179.45 79.8213L167.276 84.6759Z" fill="url(#paint0_linear)" />
                    <Path d="M127.008 21.905L132.938 10.8691C135.349 12.1742 137.707 13.5923 140.001 15.1208C154.802 24.9797 166.337 38.9925 173.149 55.3872C176.299 62.9688 178.374 70.9024 179.35 78.9622L167.214 83.8019C166.59 75.7219 164.691 67.7463 161.547 60.1782C155.686 46.0711 145.76 34.0136 133.024 25.5304C131.069 24.228 129.061 23.0189 127.008 21.905Z" fill="url(#paint1_linear)" />
                    <Path d="M52.5798 22.1306L46.5132 11.1689C59.7929 3.86244 74.7497 0 90 0C104.76 0 119.245 3.618 132.2 10.4746L126.27 21.5104C115.133 15.6249 102.684 12.5195 90 12.5195C76.8772 12.5195 64.0068 15.8432 52.5798 22.1306Z" fill="url(#paint2_linear)" />
                    <Path d="M51.8491 22.538C50.1922 23.4731 48.5665 24.4711 46.9757 25.5308C34.2404 34.014 24.3145 46.0715 18.4531 60.1786C15.0493 68.371 13.1049 77.0409 12.6581 85.8039L0.443634 80.8264C1.31324 72.1265 3.45829 63.553 6.85093 55.3876C13.6628 38.9929 25.1983 24.9801 39.9988 15.1212C41.8858 13.8642 43.8152 12.6819 45.7822 11.5757L51.8491 22.538Z" fill="url(#paint3_linear)" />
                    <Path d="M0.361087 81.6943L12.618 86.6891C12.3798 92.7248 12.8518 98.7984 14.0462 104.785C17.0343 119.761 24.4099 133.517 35.2404 144.314C37.6925 146.759 37.6925 150.722 35.2404 153.167C32.7882 155.611 28.8125 155.611 26.3604 153.167C13.7737 140.619 5.20203 124.632 1.72936 107.227C0.0437459 98.779 -0.403755 90.1811 0.361087 81.6943Z" fill="url(#paint4_linear)" />

                    {/* <G mask={"url(#mask)"}> */}
                    {this.renderGradient("paint0_linear", colors[0], colors[1], points[0], points[1])}
                    {this.renderGradient("paint1_linear", colors[2], colors[0], points[2], points[3])}
                    {this.renderGradient("paint2_linear", colors[2], colors[3], points[4], points[5])}
                    {this.renderGradient("paint3_linear", colors[3], colors[4], points[6], points[7])}
                    {this.renderGradient("paint4_linear", colors[4], colors[5], points[8], points[9])}
                    {/* </G> */}
                    <Circle
                        fill="white"
                        stroke="black"
                        stroke-width="3"
                        fill-opacity="1"
                        r="10"
                        cx={position.x}
                        cy={position.y}
                    />
                </Svg>
            </SafeAreaView>
        );
    }
}