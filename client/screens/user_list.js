import React, { Component } from 'react';
import { 
    TouchableOpacity,
    Alert,
    FlatList,
} from 'react-native';

import UserItem from '../components/useritem';

const UserListItem = ({ user, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <UserItem user={user} chevron={true}/>
        </TouchableOpacity>
    );
};

class UserListScreen extends Component {
    static navigationOptions = {
        title: 'Users',
    }
    constructor(props){
        super(props);
        this.state = {
            list: [
                {
                    id:0,
                    name: 'CHOI',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jm_denis/128.jpg',
                },
                {
                    id:1,
                    name: 'KIM',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/martip07/128.jpg',
                },
                {
                    id:2,
                    name: 'PARK',
                    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/angelceballos/128.jpg',
                }
            ]
        }
    }

    render(){
        return (
            <FlatList
                data={this.state.list}
                keyExtractor={(item) => `${item.id}`}
                renderItem = {({item}) => {
                    return (
                        <UserListItem
                            user={item}
                            onPress={() => {
                                Alert.alert(`${item.name} selected`);
                            }}
                        />
                    );
                }}
            />
        );
    }
}

export default UserListScreen;