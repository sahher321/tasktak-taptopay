import { Navigation } from "react-native-navigation";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AppTheme } from "../AppTheme/AppTheme";
// import IoIcon from 'react-native-vector-icons/Ionicons'

export function toHome() {
  const unSelectedTabColor = "grey";
  const selectedTabColor = "white";
  const customFont = "papyrus";
  const textFontSize = 12;
  const selectedText = 12;
  const isIOS = Platform.OS == "ios";
  Promise.all([]).then(
    ([
      firstTabIcon,
      secondTabIcon,
      thirdTabIcon,
      fouthTabIcon,
      fifthTabIcon,
    ]) => {
      Navigation.setStackRoot("AppStack", {
        bottomTabs: {
          id: "Bottom_Tabs",
          options: {
            layout: {
              // backgroundColor: colors.darkPurple,
              // componentBackgroundColor: colors.darkPurple,
            },
            window: {
              //   backgroundColor: colors.darkPurple
            },
            blurOnUnmount: true,
            bottomTabs: {
              borderWidth: 0,
              // borderColor: colors.bgPurple,
              // backgroundColor: colors.darkPurple,
              elevation: 2,
              currentTabIndex: 0,
              // fontFamily: customFont,
              animate: true,
              titleDisplayMode: "alwaysShow",
              preferLargeIcons: false,
              tabsAttachMode: "onSwitchToTab",
              animateTabSelection: true,
            },
            bottomTab: {},
          },
          children: [
            // 1-
            {
              stack: {
                id: "AppStack_Home",
                children: [
                  {
                    component: {
                      id: "Bottom_Tab_Discover",
                      name: "Dashboard",
                      options: {
                        topBar: {
                          visible: false,
                        },
                        // passProps: {
                        //   tabMainScreen: true,
                        // },
                        // hardwareBackButton: {
                        //   popStackOnPress: true,
                        //   // bottomTabsOnPress: backAction
                        // },
                        statusBar: {
                          drawBehind: true,
                          backgroundColor: "transparent",
                          style: "light",
                          // visible: false,
                        },
                      },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    icon: isIOS
                      ? require("../Assets/ic_home.png")
                      : require("../Assets/ic_home.png"),
                    // icon: firstTabIcon,
                    //   icon: isAndroid ? require('../Assets/ic_timesheet.png') : require('../Assets/ic_timesheet.png'),
                    text: "Home",
                    // fontSize: textFontSize,
                    // selectedFontSize: selectedText,
                    textColor: "#000000",
                    iconColor: "#000000",
                    // fontFamily: customFont,
                    selectedTextColor: AppTheme.PrimaryColor,
                    selectedIconColor: AppTheme.PrimaryColor,
                  },
                },
              },
            },
            //2-
            {
              stack: {
                id: "AppStack_Search",
                children: [
                  {
                    component: {
                      // id: 'Bottom_Tab_Library',
                      name: "Todo",
                      options: {
                        topBar: {
                          visible: false,
                        },
                        passProps: {
                          tabMainScreen: true,
                        },
                        // hardwareBackButton: {
                        //   popStackOnPress: true,
                        //   bottomTabsOnPress: 'previous'
                        // },
                        statusBar: {
                          drawBehind: true,
                          backgroundColor: "transparent",
                          style: "light",
                          // visible: false,
                        },
                      },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    icon: isIOS
                      ? require("../Assets/ic_todo_ios.png")
                      : require("../Assets/ic_todo_ios.png"),
                    // icon: secondTabIcon,
                    // icon: isAndroid ? require('../Assets/btSearch.png') : require('../Assets/btSearch-40.png'),
                    text: "Todo Items",
                    // selectedFontSize: selectedText,
                    // fontSize: textFontSize,
                    textColor: "#000000",
                    iconColor: "#000000",
                    selectedTextColor: AppTheme.PrimaryColor,
                    selectedIconColor: AppTheme.PrimaryColor,
                  },
                },
              },
            },
            // 3-
            {
              stack: {
                id: "AppStack_Profile",
                children: [
                  {
                    component: {
                      // id: 'Bottom_Tab_Profile',
                      name: "ShareADoc",
                      options: {
                        topBar: {
                          visible: false,
                        },
                        passProps: {
                          tabMainScreen: true,
                        },
                        // hardwareBackButton: {
                        //   popStackOnPress: true,
                        //   bottomTabsOnPress: 'previous'
                        // }
                        statusBar: {
                          drawBehind: true,
                          backgroundColor: "transparent",
                          style: "light",
                          // visible: false,
                        },
                      },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    icon: isIOS
                      ? require("../Assets/ic_share_ios.png")
                      : require("../Assets/ic_share_ios.png"),
                    disableIconTint: true,
                    textColor: "#000000",
                    iconColor: "#000000",
                    selectedTextColor: AppTheme.PrimaryColor,
                    selectedIconColor: AppTheme.PrimaryColor,
                  },
                },
              },
            },
            // 4-
            {
              stack: {
                id: "AppStack_TVGUIDE",
                children: [
                  {
                    component: {
                      name: "Dashboard",
                      options: {
                        topBar: {
                          visible: false,
                        },
                        passProps: {
                          tabMainScreen: true,
                        },
                        statusBar: {
                          drawBehind: true,
                          backgroundColor: "transparent",
                          style: "light",
                        },
                      },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    icon: isIOS
                      ? require("../Assets/ic_status_ios.png")
                      : require("../Assets/ic_status_ios.png"),
                    text: "Chat Status",
                    textColor: "#000000",
                    iconColor: "#000000",
                    selectedTextColor: AppTheme.PrimaryColor,
                    selectedIconColor: AppTheme.PrimaryColor,
                    // iconInsets: _iconInsets,
                    // iconHeight: _iconHeight,
                    // iconWidth: _iconWidth,
                  },
                },
              },
            },
            // 5-
            {
              stack: {
                id: "AppStack_TVGUIDE",
                children: [
                  {
                    component: {
                      // id: 'Bottom_Tab_Profile',
                      name: "Dashboard",
                      options: {
                        topBar: {
                          visible: false,
                        },
                        passProps: {
                          tabMainScreen: false,
                        },
                        statusBar: {
                          style: "light",
                          drawBehind: true,
                          backgroundColor: "transparent",
                        },
                      },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    icon: isIOS
                      ? require("../Assets/ic_timesheet_ios.png")
                      : require("../Assets/ic_timesheet_ios.png"),
                    text: "Timesheet",
                    textColor: "#000000",
                    iconColor: "#000000",
                    selectedTextColor: AppTheme.PrimaryColor,
                    selectedIconColor: AppTheme.PrimaryColor,
                  },
                },
              },
            },
          ],
        },
      });
    }
  );
}
