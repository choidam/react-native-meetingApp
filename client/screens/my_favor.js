import React, { Component } from 'react';
import { 
    TouchableOpacity,
    Alert,
    Text,
    View,
    ListView,
    StyleSheet,
} from 'react-native';

import {
    Container,
    Content,
    ListItem,
    Button,
    Icon,
} from 'native-base'

import firebase from 'firebase';

import Ionicons from '@expo/vector-icons/Ionicons';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';

var data = []

export default class MyFavorScreen extends Component {
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2})
        this.state = {
            listviewData: data,
        }
    }

    componentDidMount(){
        console.log('component did mount')

        var user = firebase.auth().currentUser;

        // 즐겨찾기한 사용자 리스트 출력 
        var that = this

        firebase.database().ref(`favor/${user.uid}`).on('child_added', function(data){
            var newData = [...that.state.listviewData]
            newData.push(data)
            that.setState({ listviewData: newData })
        })

        
        // 로그인한 유저가 db에 저장된 유저인지 검사 
        var isNull = false;
        firebase.database().ref(`users/${user.uid}`).on('value', function(snapshot){
            if(snapshot.val()==null){
                console.log('null')
                isNull = true
            }else{
                console.log('not null')
            }
        })

        setTimeout(function(){
            // db에 저장이 안 된 경우(첫 로그인) - default 유저 정보 저장  
            if(isNull){
                firebase.database().ref(`users/${user.uid}`).set({
                    uid: user.uid,
                    email: user.email,
                    berry: 100,
                    gender : 'not entered',
                    username: 'not entered',
                    age: 'not entered',
                    area: 'not entered',
                })
                console.log('database updated successfully')
                Alert.alert(
                    'Congratulations for first login!',
                    'You gain 100 berry', [{ text: 'OK', }]
                );
            } else {
                // 첫 로그인이 아닌 경우 - 로그인 할 때마다 berry 10씩 증가 
                var berry = '';
                var gender = '';
                var username = '';
                var age = '';
                var area = '';

                firebase.database().ref(`users/${user.uid}`).on('value', function(snapshot){
                    berry = snapshot.val().berry;
                    gender = snapshot.val().gender;
                    age = snapshot.val().age;
                    area = snapshot.val().area;
                    username = snapshot.val().username;
                })

                berry = parseInt(berry)+10
                firebase.database().ref(`users/${user.uid}`).set({
                    email: user.email,
                    berry: berry,
                    gender : gender,
                    age: age,
                    area: area,
                    username: username,
                    uid: user.uid,
                })
                console.log('berry updated')
                Alert.alert(
                    'You gain 10 berry for login',
                    'congratulations!',
                    [{ text: 'OK', }]
                );
            }
        }, 2000); 
    }

    renderUserInfo(uid){

        // berry update -10
        var user = firebase.auth().currentUser;

        var myberry = '';
        var mygender = '';
        var myusername = '';
        var myage = '';
        var myarea = '';

        firebase.database().ref(`users/${user.uid}`).on('value', function(snapshot){
            myberry = snapshot.val().berry;
            mygender = snapshot.val().gender;
            myage = snapshot.val().age;
            myarea = snapshot.val().area;
            myusername = snapshot.val().username;
        })

        myberry = parseInt(myberry)-10

        // berry가 10보다 작을 경우 리턴 
        if(parseInt(myberry) < 10){
            Alert.alert(
                'No More Berry',
                'charge your berry first',
                [{ text: 'OK', }]
            );
            return;
        }

        firebase.database().ref(`users/${user.uid}`).set({
            email: user.email,
            berry: myberry,
            gender : mygender,
            age: myage,
            area: myarea,
            username: myusername,
            uid: user.uid,
        })

        console.log('berry updated for -10')


        
        // 추가 유저 정보 가져오기 
        var email = '';
        var area = '';
        var username = ''
        
        firebase.database().ref(`users/${uid}`).on('value', function(snapshot){
            // console.log(snapshot.val())
            email = snapshot.val().email;
            area = snapshot.val().area;
            username = snapshot.val().username;
        })

        setTimeout(function(){
            Alert.alert(
                `More ${username} info using 10 berry`,
                `email : ${email} \n area : ${area}`,
                [{ text: 'OK', }]
            );
        }, 1500)
    }

    render(){
        return (
           <Container style={styles.container}>
               <Content>
                   <ListView
                        enableEmptySection
                        dataSource = { this.ds.cloneWithRows(this.state.listviewData) }
                        renderRow={ data =>
                            <TouchableOpacity>
                                <ListItem>
                                    <Ionicons name='ios-contact' size={50} style={{ padding: 5, marginRighr: 5, }}/>
                                    <View style={styles.itemcontainer}>
                                        <Text style={styles.nameStyle}>{data.val().username}</Text>
                                        <Text>gender : {data.val().gender}</Text>
                                        <Text>age : {data.val().age}</Text>
                                    </View>
                                    <Button 
                                        info
                                        rounded
                                        style={{marginTop : 7}}
                                        onPress={() => { 
                                            this.renderUserInfo(data.val().favoruid)
                                        }}
                                    >
                                        <Icon name='add'/>
                                    </Button>
                                </ListItem>
                            </TouchableOpacity>
                        }
                   />
               </Content>
           </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    itemcontainer: {
        flex: 1,
        padding: 5
    },
    nameStyle: {
        fontWeight: 'bold',
        fontSize: 15,
    }
})
