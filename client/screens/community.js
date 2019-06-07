import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomNavigator, createAppContainer } from 'react-navigation';


// 커뮤니티 게시판에 글을 작성하고 글을 올릴 수 있는 screen
export default class CommunityScreen extends React.Component {
    render(){
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text>This is my community screen </Text>
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