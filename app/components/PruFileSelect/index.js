/**
 * Use below format to use this component
 * <FileSelect
        fileList={this.fileArr}
        getFile={(file, name) => {
            this.fileArr.push({
            file,
            name
            });
            console.log(this.fileArr);
        }}
        close={() => { }}
    />
 */
import React, { Component } from "react";
import { View, Image, TouchableOpacity, Text, ScrollView, Alert } from "react-native";
import { FILE1, DIR, FILE2, FILE3 } from "../../config/images";
import styles from "./style";
import { CustomAlert } from "../../components";
var RNFS = require('react-native-fs');

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
        console.log("select fileList", fileList)
        this.setState({
            fileData: fileList,
            fileList: [
                {
                    index: 0,
                    content: fileList
                }
            ]
        })
        const prevPath = RNFS.ExternalStorageDirectoryPath;
        this.getFiles(RNFS.ExternalStorageDirectoryPath).then((data) => {
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
                    CustomAlert.show(
                        'Select ' + item.name + "?",
                        "",
                        {
                          positiveText: 'OK',
                          onPositivePress: () => {
                            this.props.getFile(res, item.name);
                          },
                        },
                        {
                          negativeText: 'Cancel',
                          onNegativePress: () =>{
                            console.log('Cancel Pressed');
                          },
                        }
                      );
                })
                .catch((Err) => {
                    CustomAlert.show(
                        "Warn",
                        Err,
                        {
                          positiveText: 'OK',
                          onPositivePress: () => {},
                        },
                    );

                })
        }
        else {
            const prevPath = item.path.substr(0, item.path.lastIndexOf("/"));
            console.log("prevPath", prevPath);
            console.log("nowpath", item.path);
            this.getFiles(item.path).then((data) => {
                if (data.length) {
                    this.setState({
                        fileData: data,
                        prevPath
                    })
                }
                else {
                    CustomAlert.show(
                        "Warn",
                        "No file",
                        {
                          positiveText: 'OK',
                          onPositivePress: () => {},
                        },
                    );
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
                    data.map((item) => {
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
                    })
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
                        prevPath ?
                            <TouchableOpacity onPress={() => { this.back() }}>
                                <Text style={{ color: "#fff", fontWeight: "600" }}>Back</Text>
                            </TouchableOpacity>
                            : null
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
                                fileData.map((item) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            this.addFile(item)
                                        }}>
                                            <View style={styles.box}>
                                                {
                                                    item.isDirectory() ?
                                                        <Image style={{ width: 35, height: 40, marginRight: 20, }} source={DIR} resizeMode="contain" /> : null
                                                }
                                                {
                                                    item.isFile() ?
                                                        <Image style={{ width: 35, height: 40, marginRight: 20, }} source={this.fileType(item.name)} resizeMode="contain" />
                                                        : null
                                                }
                                                <View>
                                                    <Text style={{
                                                        width: "100%",
                                                        marginBottom: 5,
                                                    }} ellipsizeMode={"tail"} numberOfLines={2}>{item.name}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }

                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}
