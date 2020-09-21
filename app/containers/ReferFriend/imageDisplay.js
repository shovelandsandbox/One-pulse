import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, ImageBackground } from 'react-native';


export const BackgroundImageDisplay = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => (props.backEvent(), props.NavigationService.resetStack(props.SCREEN_NAME_WHEN_SKIP))}
                style={styles.skipContainer_back}>
                <Text style={styles.skipText_back}>{props.MetaConstants.skip}</Text>
            </TouchableOpacity>
            <View style={styles.container_back}>
                <View style={styles.imageWrapper_back}>
                    <ImageBackground source={{ uri: props.IMAGE_URL }} style={styles.imageBackground_back}>
                        <View style={{ flex: 2.5 }}></View>
                        {!!props.showDescription && <View style={styles.desc}>
                            <Text style={styles.descText}>
                                {props.MetaConstants.descriptionText1}
                            </Text>
                            <Text style={styles.descText}>
                                {props.MetaConstants.descriptionText2}
                            </Text>
                        </View>}
                        <View style={styles.buttonContainer_back}>
                            <TouchableOpacity activeOpacity={.5}
                                onPress={props.openSocialInvite}
                                style={styles.buttonWrapper_back}>
                                <Text style={styles.buttonText_back}>
                                    {props.MetaConstants.inviteBtnText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </View>
    )
}

export const ContainerImageDisplay = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <PruBackHeader previousPage={props.SCREEN_NAME_WHEN_SKIP}
                rightImage={true} rightImageRenderMethod={props.renderSkip}
            />
            <View style={styles.container} >
                <View style={styles.imageWrapper}>
                    <Image source={props.IMAGE_URL ? { uri: props.IMAGE_URL } : props.REFER_FRIEND} style={styles.image} />
                </View>
                {!!props.showDescription && <View style={styles.desc}>
                    <Text style={styles.descText}>
                        {props.MetaConstants.descriptionText1}
                    </Text>
                    <Text style={styles.descText}>
                        {props.MetaConstants.descriptionText2}
                    </Text>
                </View>}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={.5}
                        onPress={props.openSocialInvite}
                        style={styles.buttonWrapper}>
                        <Text style={styles.buttonText}>
                            {props.MetaConstants.inviteBtnText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container_back: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageWrapper_back: {
        flex: 1
    },
    imageBackground_back: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    image_back: {
        flex: 3.5,
        width: undefined,
        height: undefined
    },
    desc_back: {
        flex: 0.5,
    },
    descText_back: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 18,
        color: '#474F53',
        letterSpacing: 0.5,
    },
    buttonWrapper_back: {
        backgroundColor: '#F1172B',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 50,
    },
    buttonText_back: {
        color: 'white',
        fontSize: 18,
        letterSpacing: 0.5
    },
    buttonContainer_back: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    skipText_back: {
        color: '#F1172B',
    },
    skipContainer_back: {
        padding: 10,
        alignItems: 'flex-end',
        backgroundColor: '#ffffff'
    },



    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageWrapper: {
        flex: 2.5,
        backgroundColor: 'white',
        margin: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',

    },
    image: {
        flex: 3.5,
        width: undefined,
        height: undefined
    },
    desc: {
        flex: 0.5,
        // backgroundColor: 'red',
    },
    descText: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 18,
        color: '#474F53',
        letterSpacing: 0.5,


    },
    buttonWrapper: {
        backgroundColor: '#F1172B',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        letterSpacing: 0.5

    },
    buttonContainer: {
        flex: 1,
        margin: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    skipText: {
        color: '#F1172B',
    }
})