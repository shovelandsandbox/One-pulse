import React, { Component } from "react";
import { View, Image, TouchableOpacity, Text, ScrollView, Alert } from "react-native";
import { FILE1, DIR, FILE2, FILE3 } from "../../../../config/images"
var RNFS = require('react-native-fs');
import { map } from 'ramda'


export default class FileSelect extends Component {
    state = {
        fileList: [
            {
                index: 0,
                content: null
            }
        ],
        nowIndex: 0,
        dir: ["root"],
        prevPath: RNFS.ExternalStorageDirectoryPath.substr(0, RNFS.ExternalStorageDirectoryPath.lastIndexOf("/")),
        fileData: []
    }
    componentWillMount() {
        const fileList = [...this.props.fileList];

        this.setState({
            fileData: fileList,
            fileList: [
                {
                    index: 0,
                    content: fileList
                }
            ]
        })
    }
    back() {
    
        const prevPath = this.state.prevPath.substr(0, this.state.prevPath.lastIndexOf("/"));
        this.getFiles(this.state.prevPath).then((data) => {
            if (data.length) {
                this.setState({
                    fileData: data,
                    prevPath
                })
            }
            else {
                alert("No file");
            }
        })

    }

    addFile(item) {
        if (item.isFile()) {
            RNFS.readFile(item.path, "base64")
                .then((res) => {
                    Alert.alert(
                        'Select ' + item.name + "?",
                        "",
                        [
                            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                            {
                                text: 'OK', onPress: () => {
                                    this.props.getFile(res, item.name);
                                }
                            },
                        ],
                        { cancelable: false }
                    )
                    // console.log(res)
                })
                .catch((Err) => {
                    // alert(Err);
                    Alert.alert(
                        "Warn",
                        Err,
                        [
                            {
                                text: 'OK', onPress: () => {
                                }
                            }
                        ],
                        { cancelable: false }
                    )

                })
        }
        else {
            const prevPath = item.path.substr(0, item.path.lastIndexOf("/"));
            console.log("prevPath", prevPath);
            console.log("nowpath", item.path);
            // console.log(this.getFiles(item.path))
            this.getFiles(item.path).then((data) => {
                if (data.length) {
                    this.setState({
                        fileData: data,
                        prevPath
                    })
                }
                else {
                    Alert.alert(
                        "Warn",
                        "No file",
                        [
                            {
                                text: 'OK', onPress: () => {
                                }
                            }
                        ],
                        { cancelable: false }
                    )
                }
            })


        }
    }


    fileType(name) {
        if (name.indexOf(".pdf") > -1) {
            return FILE1;
        }
        if (name.indexOf(".png") > -1) {
            return FILE2;
        }
        if (name.indexOf(".jpg") > -1) {
            return FILE3;
        }
        return FILE1;
    }

    getFiles(path) {
        return new Promise((resolve, reject) => {
            let fileArr = [];
            RNFS.readDir(path)
                .then((data) => {
                    console.log(data);
                    map((item) => {
                        if (item.isFile()) {
                            if (item.name.indexOf(".jpeg") > -1 ||
                                item.name.indexOf(".jpg") > -1 ||
                                item.name.indexOf(".png") > -1 ||
                                item.name.indexOf(".pdf") > -1 ||
                                item.name.indexOf(".mov") > -1 ||
                                item.name.indexOf(".caf") > -1 ||
                                item.name.indexOf(".aac") > -1 ||
                                item.name.indexOf(".3gp") > -1 ||
                                item.name.indexOf(".mpeg") > -1 ||
                                item.name.indexOf(".gif") > -1 ||
                                item.name.indexOf(".mp4") > -1
                            ) {
                                fileArr.push(item)
                            }
                        }
                        else {
                            this.myScrollView.scrollTo({ x: 0, y: 0, animated: false });
                            fileArr.push(item)
                        }
                    }, data)
                    console.log("getFiles", fileArr);
                    resolve(fileArr);
                })
                .catch((Err) => {
                    alert(Err);
                })
        })
    }

    render() {
        const prevPath = this.state.prevPath != RNFS.ExternalStorageDirectoryPath.substr(0, RNFS.ExternalStorageDirectoryPath.lastIndexOf("/")) ? 1 : 0;
        const fileData = this.state.fileData;
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    {
                        prevPath ? <TouchableOpacity onPress={() => { this.back() }}> <Text style={{ color: "#fff", fontWeight: "600" }}>Back</Text></TouchableOpacity>
                            : ""
                    }
                    <TouchableOpacity onPress={this.props.close}>
                        <Text style={{ color: "#fff", fontWeight: "600" }}>Close</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView ref={(view) => { this.myScrollView = view }} style={{ flex: 1 }}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Select File</Text>
                        <View style={styles.boxContent}>
                            {
                                map((item) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            this.addFile(item)
                                        }}>
                                            <View style={styles.box}>
                                                {
                                                    item.isDirectory() ?
                                                        <Image style={{ width: 35, height: 40, marginRight: 20, }} source={DIR} resizeMode="contain" /> : ""
                                                }
                                                {
                                                    item.isFile() ?

                                                        <Image style={{ width: 35, height: 40, marginRight: 20, }} source={this.fileType(item.name)} resizeMode="contain" />
                                                        : ""
                                                }
                                                <View>
                                                    <Text style={{
                                                        width: "100%",
                                                        marginBottom: 5,
                                                    }} ellipsizeMode={"tail"} numberOfLines={2}>{item.name}</Text>
                                                    {/* <Text>{item.size / 1000} k</Text> */}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }, fileData)
                            }

                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}




