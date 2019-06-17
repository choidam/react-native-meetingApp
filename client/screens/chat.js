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
                                        full
                                        info
                                        rounded
                                    >
                                        <Text style={{ color: 'white' }}>{data.val().text}</Text>  
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
