import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomNavigator, createAppContainer } from 'react-navigation';

// 이성과의 채팅 목록을 출력하는 screen

export default class ChatScreen extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>This is chat list screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});