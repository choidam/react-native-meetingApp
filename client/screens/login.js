import React from 'react';

import {
    StyleSheet,
    Alert,
    Text,
    Button,
    View,
} from 'react-native';
import { 
    Container, 
    Form, 
    Input, 
    Item, 
    Label 
} from 'native-base';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
            email: '',
            password: '',
        });
    }

    loginUser = (email,password) => {

        const { navigate } = this.props.navigation; 

        if(email=='' || password==''){
            Alert.alert(
                'Login error!',
                'make sure input all parameters',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            console.log('err ok btn pressed');
                        }
                    }
                ]
            );
            return;
        }

        var isSuccess = true
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(){
                console.log('login succeed');
            })
            .catch(function(error) {
                isSuccess=false
                var errorMessage = error.message;
                Alert.alert(
                    'Login Failed!',
                    errorMessage,
                    [{
                        text: 'OK',
                        onPress: () => {
                            console.log('Login Fail OK button pressed');
                            isSuccess = false;
                        }
                    }]
                );
            });
        
        setTimeout(function(){
            if(isSuccess){
                Alert.alert(
                    'Login Succeed!',
                    'Welcome to meeting app!',
                    [{
                        text: 'OK',
                        onPress: () => {
                            console.log('Login Success OK button pressed'); 
                            var user = firebase.auth().currentUser;
                            console.log(user.uid);
                            navigate('Home')   
                        }
                    }]
                );
            } 
        }, 1000);
    }

    render(){
        return (
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input 
                            autoCorrect = {false}
                            autoCapitalize='none'
                            onChangeText={(email) => this.setState({email: email})}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input 
                            secureTextEntry={true}
                            autoCorrect = {false}
                            autoCapitalize='none'
                            onChangeText={(password) => this.setState({password: password})}
                        />
                    </Item>

                    <View style={{ paddingVertical: 15 }} />

                    <Button
                        title='login'
                        onPress={() => this.loginUser(this.state.email, this.state.password )}
                        >
                    </Button>

                    <View style={{ paddingVertical: 15 }} />

                    <Button
                        title='signup'
                        style={{marginTop:10}}
                        onPress = {() => this.props.navigation.navigate('Signup')}
                        >
                        <Text style={{color: 'white'}}>Sign up</Text>
                    </Button>
                </Form>
                
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10,
    },
});
