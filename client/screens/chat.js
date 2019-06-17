import React from 'react';
import { 
    Text,
    View, 
    StyleSheet,
    TouchableOpacity, 
    FlatList,
    Alert,
    ListView,
} from 'react-native';

import{
    Container,
    Content,
    Input,
    Button,
    Icon,
    ListItem,
} from 'native-base'

import * as firebase from 'firebase';

var data = []

export default class ChatScreen extends React.Component {
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2 })
        this.state = {
            listviewData: data,
        }
    }

    componentDidMount(){
        var that = this
        var myUserId = firebase.auth().currentUser.uid;
        console.log(myUserId)

        firebase.database().ref(`msg/${myUserId}`).on('child_added', function(data){
            var newData = [...that.state.listviewData]
            newData.push(data)
            that.setState({ listviewData: newData })
        })
    }

    render(){
        return (
            <Container>
                <Content>
                    <ListView
                        enableEmptySection
                        dataSource = { this.ds.cloneWithRows(this.state.listviewData) }
                        renderRow = {data => 
                            <TouchableOpacity>
                                <View style={styles.itemcontainer}>
                                    <Button 
                                        style={{ padding: 15, }}
                                        full
                                        info
                                        rounded>
                                        <View style={styles.itemcontainer}>
                                            <Text style={{ color: 'white', leftMargin: 10, }}>{data.val().text}</Text>  
                                            <Text style={{ color: 'white', fontSize: 8, leftMargin: 10, }}>{data.val().date}</Text>  
                                        </View>
                                    </Button>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    itemcontainer : {
        flex: 1,
        padding: 5,
    },
    nameStyle: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    msgStyle: {
        padding: 10,
        fontSize: 15
    }
})
