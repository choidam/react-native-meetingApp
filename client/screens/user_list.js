import React from 'react';
import { 
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Alert,
} from 'react-native';

import{
    Container,
    Content,
    Input,
    Button,
    Icon,
    ListItem,
    Header,
} from 'native-base'

import { SearchBar } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';

import * as firebase from 'firebase';

var data = []

export default class UserListScreen extends React.Component {

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2 })
        this.state = {
            listviewData: data,
            msg: '',
        }
    }

    componentDidMount(){
        var that = this

        firebase.database().ref('/users').on('child_added', function(data){
            var newData = [...that.state.listviewData]
            newData.push(data)
            that.setState({listviewData: newData})
        })
    }

    addFavorUser(adduid){
        var myUserId = firebase.auth().currentUser.uid;

        console.log(myUserId)
        console.log(adduid)

        // 자기 자신을 즐겨찾기에 등록하는 경우 
        if(myUserId == adduid){
            console.log('same user')
            Alert.alert(
                'add error!',
                'you cannot add yourself',
                [{ text: 'OK', }]
            );
            return;
        }

        // 즐겨찾기에 추가하는 유저 정보 불러오기 - username, gender, age
        var addusername = '';
        var addgender = '';
        var addage = '';

       
        firebase.database().ref(`users/${adduid}`).on('value', function(snapshot){
            addusername = snapshot.val().username;
            addgender = snapshot.val().gender;
            addage = snapshot.val().age;
        })

        // 즐겨찾기 유저 추가 
        firebase.database().ref(`favor/${myUserId}/${adduid}`).set({
            favoruid: adduid,
            username: addusername,
            gender: addgender,
            age: addage,
        })  

        Alert.alert(
            'add user!',
            'you can see you userlist on favor tab',
            [{ text: 'OK', }]
        );

    }


    sendMsg(receiveuid){
        // myUserId: 발신자, senduid: 수신자
        var myUserId = firebase.auth().currentUser.uid; 
        var user = firebase.auth().currentUser

        console.log(myUserId);
        console.log(receiveuid);

        if(myUserId == receiveuid){
            console.log('same user')
            Alert.alert(
                'send msg error!',
                'you cannot send message to yourself',
                [{ text: 'OK', }]
            );
            return;
        }

        if(this.state.msg == ''){
            Alert.alert(
                'send msg error!',
                'input message',
                [{ text: 'OK', }]
            );
            return;
        }

        // 메세지 보내기 - db update
        var key = firebase.database().ref(`msg/${receiveuid}`).push().key 
        firebase.database().ref(`msg/${receiveuid}`).child(key).set({
            senduid: myUserId,
            text: this.state.msg,
        })


        // 베리 -10 
        var myberry = '';
        var mygender = '';
        var myusername = '';
        var myage = '';
        var myarea = '';

        firebase.database().ref(`users/${myUserId}`).on('value', function(snapshot){
            myberry = snapshot.val().berry;
            mygender = snapshot.val().gender;
            myage = snapshot.val().age;
            myarea = snapshot.val().area;
            myusername = snapshot.val().username;
        })

        // berry가 10보다 작을 경우 리턴 
        if(parseInt(myberry) < 10){
            Alert.alert(
                'No More Berry',
                'charge your berry first',
                [{ text: 'OK', }]
            );
            return;
        }

        myberry = parseInt(myberry)-10

        firebase.database().ref(`users/${user.uid}`).set({
            email: user.email,
            berry: myberry,
            gender : mygender,
            age: myage,
            area: myarea,
            username: myusername,
            uid: user.uid,
        })

        Alert.alert(
            'send message!',
            `using 10 berry`,
            [{ text: 'OK', }]
        );
    }


    render(){
        return (
            <Container style={styles.container}>
                <Content>
                    <Input 
                        style={styles.inputStyle}
                        onChangeText={(text) => this.setState({ msg: text })}
                        autoCorrect = {false}
                        autoCapitalize = 'none'
                        placeholder='input your message'
                    />
                    <ListView
                        enableEmptySection
                        dataSource = { this.ds.cloneWithRows(this.state.listviewData) }
                        renderRow={ data =>
                            <TouchableOpacity>
                                <ListItem>
                                    <Ionicons name='ios-contact' size={50} style={{padding: 5, marginRight : 5}}/>
                                    <View style={styles.itemcontainer}>
                                        <Text style={styles.nameStyle}>{data.val().username}</Text>
                                        <Text>gender : {data.val().gender}</Text>
                                        <Text>age : {data.val().age}</Text>
                                    </View>
                                    <Button 
                                        info
                                        rounded
                                        onPress={() => { 
                                            this.addFavorUser(data.val().uid)
                                            }}
                                        style={{ marginTop: 7 }}
                                        >
                                        <Text style={styles.btnStyle}>add</Text>
                                    </Button>
                                    <Button 
                                        success
                                        rounded
                                        style={{ marginTop: 7, marginLeft: 10, }}
                                        onPress={() => {
                                            this.sendMsg(data.val().uid)
                                        }}
                                        >
                                        <Text style={styles.btnStyle}>msg</Text>
                                    </Button>
                                </ListItem>
                            </TouchableOpacity>
                        }
                    />
                </Content>
                <FlashMessage position='top'/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor : '#fff',
        justifyContent: 'center',
    },
    itemcontainer : {
        flex: 1,
        padding: 5,
    },
    nameStyle: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    btnStyle: {
        color: 'white',
        marginLeft: 7,
        marginRight: 5,
        fontSize: 12,
        padding: 3,
    },
    inputStyle : {
        width: 300,
        margin: 10,
        fontSize: 15,
    },
})
