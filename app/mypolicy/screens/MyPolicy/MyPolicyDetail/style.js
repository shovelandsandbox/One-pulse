import { Colors, Sizes } from "../../../configs";
import {Platform} from 'react-native';
export default {
  topContainer: {
    backgroundColor: Colors.main.softGray,
  },

  rider: {
    tag: {
      marginBottom: 16,
    },
  },
  card: {
    emptyPadder: {
      flex: -1,
      height: 32,
    },

    container: {
      marginTop: 24,
      marginBottom: 16,
    },

    downloadLink: {
      marginBottom: 8,
    },

    image: {
      container: {
        flex: -1,
        backgroundColor: Colors.main.softGray,
        borderRadius: 10,
        overflow: "hidden",
      },
    },

    indicator: {
      grouper: {
        flex: -1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
      },

      content: {
        flex: -1,
        width: 8,
        height: 8,
        borderRadius: 50,
        marginHorizontal: 3,
        backgroundColor: Colors.main.baseWhite,
      },
    },

    text: {
      policyHolder: {
        fontSize: 16,
        color: Colors.main.baseWhite,
        fontWeight: "bold",
      },
      HS: {
        marginTop: 32,
      },

      HA: {
        marginTop: 60,
      },
    },
  },

  tab: {
    head: {
      grouper: {
        flexDirection: "row",
        height: 51,
        paddingTop: 16,
        borderBottomWidth: 1,
        borderColor: Colors.main.borderGray,
        backgroundColor: Colors.main.baseWhite,
        shadowColor: "rgba(0,0,0,0.11)",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
      },

      redContainer: {
        justifyContent: 'flex-end',
        width: Sizes.screen.width * 0.2,
        right: 0,
        bottom: 0,
        position: 'absolute',
        shadowColor: "rgba(0,0,0,0.11)",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        backgroundColor: 'rgb(237,27,46)'
      },

      container: {
        flex: -1,
        height: 3,
        backgroundColor: Colors.main.transparent,
      },
    },

    body: {
      container: {
        width: Sizes.screen.width * .8,
      },
      block: {
        flex: -1,
        width: Sizes.screen.width * .2,
      }
    },
  },

  main: {
    action: {
      container: {
        flex: -1,
        borderWidth: 1,
        borderRadius: 10,
        width: 327,
        height: 176,
        marginBottom: 8,
        paddingTop: 16,
        paddingLeft: 24,
        paddingRight: 24,
        top: -30,
        backgroundColor: Colors.main.baseWhite,
        borderColor: Colors.main.softGray,
      },
      textLabel: {
        borderRadius: 10,
        padding: 2,
        paddingHorizontal: 15,
      },
      textTitle: {
        marginTop: 16,
      },
      textContent: {
        marginTop: 8,
      },
      textInfo: {
        marginTop: 24,
        marginBottom: 8,
      },
    },

    card: {
      container: {
        flex: -1,
        backgroundColor: Colors.main.borderGray,
        borderRadius: 10,
        width: 297,
        height: 200,
      },
    },

    detail: {
      container: {
        backgroundColor: Colors.main.baseWhite,
        // paddingHorizontal: Sizes.screen.paddingHorizontal,
        paddingBottom: 20,
      },
      title: {
        marginTop: 24,
      },
      grouper: {
        borderWidth: 1,
        marginTop: 16,
        borderRadius: 10,
        borderStyle: "dashed",
        flexDirection: "row",
      },
    },
    nav: {
      lex: -1,
      flexDirection: "row",
      marginTop: 48,
      marginBottom: 14,
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: Colors.main.softGray,
    },
    navFixed: {
      container: {
        position: "absolute",
        width: Sizes.screen.width,
        paddingVertical: 16,
        backgroundColor: Colors.main.softGray,
        borderWidth: 1,
        borderColor: Colors.main.softGray,
      },
      grouper: {
        flex: -1,
        flexDirection: "row",
        justifyContent: "space-between",
      },
    },
    info: {
      container: {
        flex: -1,
        flexDirection: "row",
        marginTop: 24,
      },
      textBullet: {
        flex: -1,
        marginRight: 8,
      },
      textLabel: {
        flex: -1,
        width: 80,
      },
      textContent: {
        flex: 1,
        marginBottom: 16,
      },
    },
    document: {
      container: {
        borderWidth: 1,
        borderColor: Colors.main.softGray,
        backgroundColor: Colors.main.softGray,
        paddingHorizontal: Sizes.screen.paddingHorizontal,
        paddingVertical: 8,
      },
      title: {
        marginBottom: 24,
        marginTop: 24,
      },
      content: {
        marginBottom: 16,
      },
    },
  },

  icon: {
    container: {
      flex: -1,
      width: 32,
      marginRight: 8,
      marginTop: 16,
      marginLeft: 16,
    },
  },

  image: {
    container: {
      flex: -1,
      position: "absolute",
      height: Sizes.screen.width,
      backgroundColor: Colors.main.baseRed,
      width: Sizes.screen.height,
      left: -35,
      paddingLeft: 50,
      paddingTop: 15,
    },
    background: {
      flex: 1,
    },
  },
  bottomPadding: {
    height: 100,
  },
  redLine: {
    position: "absolute",
    height: 3,
    backgroundColor: Colors.main.baseRed,
    top: 27,
  },
  riderContainer: {
    marginTop: 7,
    marginBottom: 7,
  },
  myPolicyImageContainer: {
    resizeMode: "cover",
    height: 205,
    width: "100%"
  },
  statusHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    paddingBottom: 11,
    justifyContent: 'center',
    alignItems: 'center',
    width: Sizes.screen.width,
    flex: 1,
    height: 63,
    paddingVertical: 12
  },
  tabContainers: {
    width: Sizes.screen.width * 0.8,
    flex: 1
  },
  tabItemContainer: { paddingBottom: Platform.OS === 'ios' ? 160 : 100 }
};
