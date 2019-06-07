import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomNavigator, createAppContainer } from 'react-navigation';

// 마음에 드는 이성을 저장한 목록을 출력하는 screen
export default class MyFavorScreen extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>This is my favor screen </Text>
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