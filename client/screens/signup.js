import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    Alert
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';

export default class SignupScreen extends React.Component {
    constructor(props){
        super(props);
        this.inputRefs = {};
        this.state = {
            id: '',
            pw: '',
            age: '',
            gender : undefined,
            genderItem : [
                {
                    label: 'female',
                    value: 'female',
                },
                {
                    label: 'male',
                    value: 'male',
                },
            ],
            area: 'undefined',
            areaItem: [
                {
                    label: 'seoul',
                    value: 'seoul'
                },
                {
                    label: 'busan',
                    value: 'busan',
                },
                {
                    label: 'jeju',
                    value: 'jeju',
                },
            ],
        };
        this.requestSignup = this.requestSignup.bind(this);
    }

    requestSignup(){   
        console.log('signup requested');
        console.log(this.state);

        const id = this.state.id;
        const pw = this.state.pw;
        const gender = this.state.gender;
        const area = this.state.area;
        const age = this.state.age;

        // 회원 가입 실패
        if(id=='' || pw=='' || gender==undefined || area == undefined || age ==''){

            showMessage({
                message: 'Error!',
                description: 'make sure input all parameters',
                icon: 'auto',
                type: 'danger',
            });

        } else { // 회원 가입에 성공했을 경우 

            showMessage({
                message: "Congratulations!",
                description: "signup succeed!",
                icon: "auto",
                type:"success",
            });
        }   
    }

    render(){
        return (
            <View style ={styles.container}>
                <TextInput
                    style={styles.textStyle}
                    autoFocus={true}
                    placeholder = 'input your id'
                    value={this.state.id}
                    onChangeText = {(text)=> this.setState({id: text })}
                />
                <TextInput 
                    style={styles.textStyle}
                    placeholder='input your password'
                    value={this.state.pw}
                    onChangeText={(text) => this.setState({pw: text })}
                    secureTextEntry={true}
                />

                <RNPickerSelect
                    placeholder={{
                        label: 'Select gender',
                        value: null,
                    }}
                    items={this.state.genderItem}
                    onValueChange={(value) => {
                        this.setState({
                            gender: value,
                        });
                    }}
                    onUpArrow={() => {
                        this.inputRefs.name.focus();
                    }}
                    onDownArrow={() => {
                        this.inputRefs.picker2.togglePicker();
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.gender}
                    ref={(el) => {
                        this.inputRefs.picker = el;
                    }}
                /> 
                

                <View style={{ paddingVertical: 3 }} />

                <RNPickerSelect
                    placeholder={{
                        label: 'Select area',
                        value: null,
                    }}
                    items={this.state.areaItem}
                    onValueChange={(value) => {
                        this.setState({
                            area: value,
                        });
                    }}
                    onUpArrow={() => {
                        this.inputRefs.name.focus();
                    }}
                    onDownArrow={() => {
                        this.inputRefs.picker2.togglePicker();
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.area}
                    ref={(el) => {
                        this.inputRefs.picker = el;
                    }}
                />

                <TextInput 
                    style={styles.textStyle}
                    placeholder='input your age'
                    value={this.state.age}
                    onChangeText={(text)=>this.setState({age: text})}
                />

                <Button
                    title='signup'
                    onPress = {this.requestSignup}
                />
                <FlashMessage position='top'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',
        flex:1
    },
    textStyle: {
        backgroundColor: "#fff",
        height: 40,
        width: 400,
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 10
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 13,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        backgroundColor: 'white',
        color: 'black',
    },
});
