import { Navigation } from 'react-native-navigation'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { AppTheme } from '../AppTheme/AppTheme'
// import IoIcon from 'react-native-vector-icons/Ionicons'

export function toHome() {
    const unSelectedTabColor = "grey"
    const selectedTabColor = "white"
    const customFont = 'papyrus'
    const textFontSize = 12
    const selectedText = 12
    const isIOS = Platform.OS == "ios"
    Promise.all([
        // IoIcon.getImageSource(isIOS ? 'ios-home' : 'md-home', 25, selectedTabColor),
    ]).then(
        ([
            firstTabIcon,
            secondTabIcon,
            thirdTabIcon,
            fouthTabIcon,
            fifthTabIcon
        ]) => {
            Navigation.setStackRoot("AppStack", {
                bottomTabs: {
                    id: 'Bottom_Tabs',
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
                            elevation: 2,
                            currentTabIndex: 0,
                            animate: true,
                            titleDisplayMode: 'alwaysShow',
                            preferLargeIcons: false,
                            tabsAttachMode: "onSwitchToTab",
                            animateTabSelection: true,
                        },
                        bottomTab: {
                        },
                    },
                    children: [
                        // 1-
                        {
                            stack: {
                                id: 'AppStack_Home',
                                children: [
                                    {
                                        component: {
                                            id: 'Bottom_Tab_Discover',
                                            name: "Dashboard",
                                            options: {
                                                topBar: {
                                                    visible: false,
                                                },
                                                statusBar: {
                                                    drawBehind: true,
                                                    backgroundColor: 'transparent',
                                                    style: "light",
                                                    // visible: false,
                                                },
                                              
                                            },
                                        },
                                    },
                                ],
                                options: {
                                    bottomTab: {
                                        icon: isIOS ? require('../Assets/ic_home.png') : require('../Assets/ic_home.png'),
                                        // icon: firstTabIcon,
                                        //   icon: isAndroid ? require('../Assets/ic_timesheet.png') : require('../Assets/ic_timesheet.png'),
                                        text: 'Home',
                                        // fontSize: textFontSize,
                                        // selectedFontSize: selectedText,
                                        textColor: "#000000",
                                          iconColor: "#000000",
                                        // fontFamily: customFont,
                                        selectedTextColor:  AppTheme.PrimaryColor,
                                        selectedIconColor:  AppTheme.PrimaryColor,
                                    },
                                },
                            },
                        },
                        //2-
                        {
                            stack: {
                                id: 'AppStack_Search',
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
                                            icon: isIOS ? require('../Assets/ic_todo_ios.png') : require('../Assets/ic_todo_ios.png'),
                                        // icon: secondTabIcon,
                                        // icon: isAndroid ? require('../Assets/btSearch.png') : require('../Assets/btSearch-40.png'),
                                        text: 'Todo Items',
                                        // selectedFontSize: selectedText,
                                        // fontSize: textFontSize,
                                        textColor: "#000000",
                                          iconColor: "#000000",
                                        selectedTextColor:  AppTheme.PrimaryColor,
                                        selectedIconColor:  AppTheme.PrimaryColor,
                                    },
                                },
                            },
                        },
                        // 3-
                        {
                            stack: {
                                id: 'AppStack_Profile',
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
                                                statusBar: {
                                                    drawBehind: true,
                                                    backgroundColor: 'transparent',
                                                    style: "light",
                                                    // visible: false,
                                                },
                                            },
                                        },
                                    },
                                ],
                                options: {
                                    bottomTab: {
                                           icon: isIOS ? require('../Assets/ic_share_ios.png') : require('../Assets/ic_share_ios.png'),
                                        //   selectedIcon: isIOS ? require('../Assets/live_tv_24px.png') : require('../Assets/ic_bcg_fab.png'),
                                        disableIconTint: true,
                                        // iconHeight: 45,
                                        // iconWidth: 45,
                                        // icon: thirdTabIcon,
                                        // icon: isAndroid ? require('../Assets/btProfile.png') : require('../Assets/btProfile-40.png'),
                                        text: 'Share Doc',
                                    //    selectedFontSize: selectedText,
                                        // fontSize: textFontSize,
                                        textColor: "#000000",
                                          iconColor: "#000000",
                                        // fontFamily: customFont,
                                        selectedTextColor:  AppTheme.PrimaryColor,
                                        selectedIconColor:  AppTheme.PrimaryColor,
                                    },
                                },
                            },
                        },
                        // 4-
                        {
                            stack: {
                                id: 'AppStack_TVGUIDE',
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
                                                    tabMainScreen: true,
                                                },
                                                statusBar: {
                                                    drawBehind: true,
                                                    backgroundColor: 'transparent',
                                                    style: "light",
                                                    // visible: false,
                                                },
                                            },
                                        },
                                    },
                                ],
                                options: {
                                    bottomTab: {
                                        // icon: fouthTabIcon,
                                          icon: isIOS ? require('../Assets/ic_status_ios.png') : require('../Assets/ic_status_ios.png'),
                                        // icon: isAndroid ? require('../Assets/btMenu.png') : require('../Assets/btMenu-40.png'),
                                        text: 'Chat Status',
                                        // selectedFontSize: selectedText,
                                        // fontSize: textFontSize,
                                        textColor: "#000000",
                                          iconColor: "#000000",
                                        // fontFamily: customFont,
                                        selectedTextColor:  AppTheme.PrimaryColor,
                                        selectedIconColor:  AppTheme.PrimaryColor,
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
                                id: 'AppStack_TVGUIDE',
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
                                                    backgroundColor: 'transparent',
                                                },
                                            },
                                        },
                                    },
                                ],
                                options: {
                                    bottomTab: {
                                        // icon: fifthTabIcon,
                                         icon: isIOS ? require('../Assets/ic_timesheet_ios.png') : require('../Assets/ic_timesheet_ios.png'),
                                        // icon: isAndroid ? require('../Assets/btMenu.png') : require('../Assets/btMenu-40.png'),
                                        text: 'Timesheet',
                                        // selectedFontSize: selectedText,
                                        // fontSize: textFontSize,
                                        textColor: "#000000",
                                          iconColor: "#000000",
                                        // fontFamily: customFont,
                                        selectedTextColor:  AppTheme.PrimaryColor,
                                        selectedIconColor:  AppTheme.PrimaryColor,
                                        // iconInsets: _iconInsets,
                                        // iconHeight: _iconHeight,
                                        // iconWidth: _iconWidth,
                                    },
                                },
                            },
                        },
                    ],
                },
            }); //SET STACK ...
        }
    )
}









