import React from 'react';
import { 
    Text,
    StyleSheet,
} from 'react-native';
import {
    Card,
    ListItem,
    Icon
} from 'react-native-elements';

// 커뮤니티 게시판 글 리스트
export default ({post}) => {
    return (
        <Card title={post.title}>
            <Text>{post.content}</Text>
        </Card>
    )
};

