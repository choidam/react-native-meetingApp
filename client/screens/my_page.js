import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput
} from 'react-native';
import {
    Container,
    Content,
    Header,
    Form,
    Input,
    Item,
    Icon,
    Label
} from 'native-base';

import RNPickerSelect from 'react-native-picker-select';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';

import firebase from 'firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';

export default class MyPageScreen extends React.Component {

    constructor(props){
        super(props);
        this.inputRefs = {}
        this.state = {
            email: '',
            berry: '',

            beforeName: '',
            beforeGender: '',
            beforeAge: '',
            beforeArea: '',

            username: '',
            gender: '',
            genderItem : [
                { label: 'female', value: 'female' },
                { label: 'male', value: 'male'},
            ],
            age: '',
            ageItem : [
                { label: '20', value: '20'},
                { label: '21', value: '21'},
                { label: '22', value: '22'},
                { label: '23', value: '23'},
                { label: '24', value: '24'},
                { label: '25', value: '25'},
            ],
            area : '',
            areaItem : [
                { label: 'seoul', value: 'seoul' },
                { label: 'busan', value: 'busan' },
                { label: 'jeju', value: 'jeju'},
            ],
        };
    }

    componentDidMount(){
        var user = firebase.auth().currentUser;
        var that = this

        firebase.database().ref(`users/${user.uid}`).on('value', function(snapshot){
            that.setState({ 
                email: snapshot.val().email,
                berry: snapshot.val().berry,

                beforeName: snapshot.val().username,
                beforeGender: snapshot.val().gender,
                beforeAge: snapshot.val().age,
                beforeArea: snapshot.val().area,
            })
        })
    }

    editInfo(){
        console.log('press edit info btn');

        if(this.state.gender =='' || this.state.age == '' || this.state.area == '' || this.state.username == ''){
            showMessage({
                message: 'Info Error!',
                description: 'please input all parameter',
                icon: 'auto',
                type: 'danger',
            });
            return;
        }

        var myUserId = firebase.auth().currentUser.uid;

        var berry = '';
        var email = firebase.auth().currentUser.email;
       
        firebase.database().ref(`users/${myUserId}`).on('value', function(snapshot){
            berry = snapshot.val().berry;
        })

        firebase.database().ref(`users/${myUserId}`).set({
            age: this.state.age,
            area: this.state.area,
            berry : berry,
            email: email,
            gender : this.state.gender,
            username : this.state.username,
            uid: myUserId,
        });

        console.log('info updated');

        showMessage({
            message: "Congratulations!",
            description: "your information updated",
            icon: "auto",
            type:"success",
        });

    }

    render(){
        return (
            <View style={styles.container}>
                <Ionicons name='ios-person' size={100} />
                <Text style={{ fontWeight: 'bold', padding: 10, fontSize: 17, }}>{this.state.email}</Text>
                <Text style={styles.info}><Ionicons name='ios-flash' size={20}/>{' '}berry : {this.state.berry}</Text>
                <Text style={styles.info}><Ionicons name='ios-flash' size={20}/>{' '}name : {this.state.beforeName}</Text>
                <Text style={styles.info}><Ionicons name='ios-flash' size={20}/>{' '}gender : {this.state.beforeGender}</Text>
                <Text style={styles.info}><Ionicons name='ios-flash' size={20}/>{' '}age : {this.state.beforeAge}</Text>
                <Text style={styles.info}><Ionicons name='ios-flash' size={20}/>{' '}area : {this.state.beforeArea}</Text>

                <View style={{ paddingVertical: 35 }} />

                <Text style={{ fontSize: 20, fontWeight: 'bold'}}><Ionicons name='ios-settings' size={20}/>{' '}Settings</Text>

                <View style={{ paddingVertical: 10 }} />

                <TextInput 
                    placeholder = 'input your name'
                    autoCorrect = {false}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({username: text})}
                    value = {this.state.username}
                    style={styles.txtInput}
                />

                <View style={{ paddingVertical: 10 }} />

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

                <RNPickerSelect
                    placeholder={{
                        label: 'Select age',
                        value: null,
                    }}
                    items={this.state.ageItem}
                    onValueChange={(value) => {
                        this.setState({
                            age: value,
                        });
                    }}
                    onUpArrow={() => {
                        this.inputRefs.name.focus();
                    }}
                    onDownArrow={() => {
                        this.inputRefs.picker2.togglePicker();
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.age}
                    ref={(el) => {
                        this.inputRefs.picker = el;
                    }}
                /> 

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

                <Button
                    title='edit your info'
                    onPress = {() => {this.editInfo()}}
                />

                <FlashMessage position='top'/>           
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent : 'center',
    },
    txtInput : {
        width: 370,
    },
    info:{
        padding: 2,
        color: 'gray',
        fontStyle: 'italic',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 13,
        padding: 20,
        backgroundColor: 'white',
        color: 'black',
        width: 350,
        alignItems: 'center',
    },
});