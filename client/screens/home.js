import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import MyFavorScreen from './my_favor';
import CommunityScreen from './community';
import UserListScreen from './user_list';
import ChatScreen from './chat';
import MyPageScreen from './my_page';

import Ionicons from '@expo/vector-icons/Ionicons';


const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    if (routeName == 'Favor') {
        iconName = 'ios-heart';
    } else if (routeName == 'Community') {
        iconName = 'ios-paper'
    } else if (routeName == 'UserList') {
        iconName = 'ios-people';
    } else if (routeName == 'Chat') {
        iconName = 'ios-notifications';
        // IconComponent = ChatIconWithBadge;
    } else if (routeName == 'MyPage') {
        iconName = 'ios-menu';
    }
    return <IconComponent name={iconName} size={25} color={tintColor} />;
}

export default createAppContainer(
    createBottomTabNavigator(
        {
            Favor: {screen: MyFavorScreen},
            Community : {screen: CommunityScreen},
            UserList : {screen: UserListScreen},
            Chat: {screen: ChatScreen},
            MyPage : {screen: MyPageScreen},
        },
        {
            defaultNavigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, tintColor }) =>
                  getTabBarIcon(navigation, focused, tintColor),
            }),
            tabBarOptions: {
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }, 
        }
    )
);

const styles = StyleSheet.create({
    badgeStyle : {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: 'red',
        borderRadius: 6,
        width: 12,
        height: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeTextStyle: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});
