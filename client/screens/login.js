import React from 'react';

import {
    StyleSheet,
    View,
    Button,
    TextInput,
    KeyboardAvoidingView,
    Alert
} from 'react-native';

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: "",
            pw: "",
        };
        this.requestLogin = this.requestLogin.bind(this);
    }

    requestLogin(){
        console.log('login requested');
        const userid = this.state.id.trim();
        const userpw = this.state.pw.trim();

        if (userid=='' || userpw =='' ){ // 로그인 실패 
            Alert.alert(
                'Login Error!',
                'Please make sure input all parameters',
                [
                    {
                        text: 'Cancel',
                        onPress : () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'Ok',
                        onPress: () => console.log('OK Pressed'),
                    },
                ],
                { cancelable : false },
            );
        } else { // 로그인 성공
            Alert.alert(
                'Login Succeed!',
                'Welcome to meeting app!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            console.log('login OK pressed');
                            this.props.navigation.navigate('Home');
                        }
                    }
                ]
            )
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput 
                    style={styles.textStyle}
                    autoFocus={true}
                    placeholder = 'input your id'
                    onChangeText={(text) => this.setState({id: text})}
                    value={this.state.text}
                />
                <TextInput 
                    style={styles.textStyle}
                    placeholder = 'input your password'
                    onChangeText={(text) => this.setState({pw: text})}
                    value = {this.state.text}
                    secureTextEntry={true}
                />
                <Button 
                    title='go to signup'
                    onPress = {() => this.props.navigation.navigate('Signup')}
                />
                <Button
                    title='login'
                    onPress = {this.requestLogin}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        backgroundColor: "#fff",
        height: 40,
        width: 300,
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 10
    },
});