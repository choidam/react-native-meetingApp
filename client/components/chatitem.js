import React from 'react';
import {
    Text
} from 'react-native';
import { ListItem } from 'react-native-elements';

// 쪽지 출력 

export default ({user, chevron}) => {
    return (
        <ListItem
            leftAvatar={{ source: {uri: user.avatar }}}
            title={user.name}
            subtitle={user.msg}
            chevron={chevron}
        />
    );
}