import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
    Text,
    TextView,
    KeyboardAvoidingView,
    Button,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';
import { Container, Content, Header, Form, Input, Item, Label } from 'native-base';
import firebase from 'firebase';

export default class SignupScreen extends React.Component {

    constructor(props){
        super(props);
        this.inputRefs = {};
        this.state = ({
            email: '',
            password: '',
            password2: '',
        });
    }

    signupUser = (email,password) => {
        // 모두 입력하지 않았을 때 
        if(email=='' || password=='' || this.state.password2==''){
            console.log('parameter error');
            showMessage({
                message: 'Signup Error!',
                description: 'make sure input all parameters',
                icon: 'auto',
                type: 'danger',
            });
            return;
        }

        // 비밀번호 - 비밀번호 확인이 다를 때 
        if(this.state.password != this.state.password2){
            console.log('password error');
            showMessage({
                message: 'Password Error!',
                description: 'password is diffrent',
                icon: 'auto',
                type: 'danger',
            });
            return;
        }

        // firebase auth에 email, password 저장 
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
            
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                Alert.alert(
                    'Password Error!',
                    'Password must be longer than 6 letters', [{ text: 'OK', }]
                );
            } else {
                alert(errorMessage);
            }
            console.log(error);
            return;
        });

        showMessage({
            message: "Congratulations!",
            description: "signup succeed!",
            icon: "auto",
            type:"success",
        });
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

                    <Item floatingLabel>
                        <Label>Password confirm</Label>
                        <Input 
                            secureTextEntry={true}
                            autoCorrect = {false}
                            autoCapitalize='none'
                            onChangeText={(password2) => this.setState({password2: password2})}
                        />
                    </Item>

                    <View style={{ paddingVertical: 20 }} />

                    <Button
                        title='signup'
                        style={{marginTop:10}}
                        onPress={() => this.signupUser(this.state.email, this.state.password, this.state.password2 )}
                        >
                        <Text style={{color: 'white'}}>Sign up</Text>
                    </Button>

                </Form>
                <FlashMessage position='top'/>
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
    pwNotConfirmStyle : {
        padding: 10,
        color: 'red',
        textAlign: 'left',
    },
    pwConfirmStyle: {
        padding: 10,
        color: 'blue',
    },
});

