import { Colors } from "../../../configs";

export default {
  topContainer: {
    borderBottomWidth: 1,
    borderColor: Colors.main.borderGray,
    paddingTop: 24,
    paddingBottom: 16,
  },

  downloadControl: {
    button: {
      container: {
        flex: -1,
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 10,
        borderStyle: "dashed",
        borderColor: Colors.main.checkCream,
        padding: 16,
        marginTop: 16,
        marginBottom: 24,
      },

      label: {
        paddingLeft: 16,
      },
    },
  },

  pdfContainer: {
    width: '100%',
    paddingLeft: 16.5,
    height: 72,
    justifyContent: "center",
    backgroundColor: Colors.main.baseWhite,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 9
  },
  pdfItem: {
    paddingTop: 5,
    fontSize: 14,
    color: 'rgb(56,57,57)',
    fontFamily: 'Avenir'
    //fontColor: Colors.main.transparentBlack,
  },
  pdfDownloadItem: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 14,
    color: 'rgb(81,91,97)',
    fontWeight: 'bold'
  },
  inputContainer: () => ({
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.main.transparentBlack,
  }),
  iconContainer: {
    alignItems: "center",
    //height: 25,
    justifyContent: "center",
    // marginRight: 15,
    // paddingLeft: 10,
  },
  line: {
    height: 9,
    width: "100%",
    backgroundColor: 'rgb(247,249,251)',
  },
  downloadExample: {
    container: {
      marginTop: 24,
    },

    list: {
      grouper: {
        flex: -1,
        marginTop: 24,
      },

      container: {
        flex: -1,
        flexDirection: "row",
        marginBottom: 16,
      },

      label: {
        container: {
          flex: -1,
          width: 80,
        },
      },

      content: {
        container: {
          flex: 1,
        },
      },
    },
  },

  info: {
    container: {
      backgroundColor: Colors.main.baseWhite,
      paddingVertical: 24,
    },

    list: {
      grouper: {
        flex: -1,
        marginTop: 24,
      },

      container: {
        marginBottom: 16,
      },
    },
  },
};
