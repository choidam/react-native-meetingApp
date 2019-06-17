import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    ListView, 
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { 
    Container, 
    Content, 
    Header, 
    Form, 
    Input, 
    Item, 
    Button, 
    Label, 
    Icon, 
    List, 
    ListItem,
} from 'native-base';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';
import Ionicons from '@expo/vector-icons/Ionicons';

import * as firebase from 'firebase';

var data = []

export default class CommunityScreen extends React.Component {
    constructor(props){
        super(props);

        this.ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2 })

        this.state = {
            listviewData : data,
            title: '', 
            content : '',
        }
    }

    componentDidMount(){
        var that = this

        firebase.database().ref('/posts').on('child_added', function(data){
            var newData = [...that.state.listviewData]
            newData.push(data)
            that.setState({listviewData: newData})
        })
    }

    addRow(title, content){
        if(title=='' || content==''){
            showMessage({
                message: 'Error!',
                description: 'please input all parameter',
                icon: 'auto',
                type: 'danger',
            });
            return;
        }


        var myUserId = firebase.auth().currentUser.uid;

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();

        var postdate = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;

        // post database update
        var key = firebase.database().ref('/posts').push().key
        firebase.database().ref('/posts').child(key).set({ 
            writer: myUserId,
            title: title,
            content: content,
            postdate: postdate,
        })

        // berry update +50
        var berry = '';
        var email = '';
        var gender = '';
        var age = '';
        var username = '';
        var area = '';

        firebase.database().ref(`users/${myUserId}`).on('value', function(snapshot){
            berry = snapshot.val().berry;
            email = snapshot.val().email;
            gender = snapshot.val().gender;
            age = snapshot.val().age;
            username = snapshot.val().username;
            area = snapshot.val().area;
        })
        berry = parseInt(berry)+50
        firebase.database().ref(`users/${myUserId}`).set({
            berry: berry,
            email: email,
            gender: gender,
            age: age,
            username: username,
            area: area,
        })
        console.log('berry updated')

        showMessage({
            message: "post updated",
            description: "you gain +50 berry",
            icon: "auto",
            type:"success",
        });   

    }

    render(){
        return(
            <Container style={styles.container}>
                <Content>
                    <Input 
                        style={styles.inputStyle}
                        onChangeText={(title) => this.setState({ title: title })}
                        autoCorrect = {false}
                        autoCapitalize = 'none'
                        placeholder='input your title'
                    />
                    <Input
                        style={styles.inputStyle}
                        onChangeText = {(content)=> this.setState({ content: content }) }
                        autoCorrect = {false}
                        autoCapitalize='none'
                        placeholder='input your post comment'
                    />
                    <Button 
                        full
                        info
                        rounded
                        style={{ margin: 20 }}
                        onPress={()=> {
                            this.addRow(this.state.title, this.state.content)
                            this.setState({content : ''})
                        }
                    }>
                        <Icon name='add'/>
                    </Button>
                    
                    <ListView
                        enableEmptySection
                        dataSource= { this.ds.cloneWithRows(this.state.listviewData) }
                        renderRow={ data => 
                            <TouchableOpacity>
                                <ListItem 
                                    onPress ={() => { Alert.alert('press!'); }}>
                                    <View style={styles.itemcontainer}>
                                        <Text style={styles.titleStyle}>{data.val().title}</Text>
                                        <View style={{ paddingVertical: 5 }} />
                                        <Text>{data.val().content}</Text>
                                        <View style={{ paddingVertical: 15 }} />
                                        <Text style={styles.dateStyle}>{data.val().postdate}</Text>
                                    </View>
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
    container : {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    inputStyle : {
        width: 300,
        margin: 10,
        fontSize: 15,
    },
    itemcontainer : {
        flex: 1,
    },
    titleStyle : {
        fontWeight: 'bold',
    }, 
    dateStyle: {
        fontSize: 10,
        color: 'gray',
    },  
    titleStyle1: {
        color: 'gray',
        textAlign: 'center',
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
        margin: 5,
    },
});
