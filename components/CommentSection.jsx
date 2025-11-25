import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { IconCircleArrowUp, IconCircleArrowUpFilled, IconMessageCircle } from '@tabler/icons-react-native';
import { useState } from 'react';
import axios from "axios";

const api = axios.create({
    baseURL: "http://172.22.121.227:4000/api",
});

export default function CommentSection({ postID }) {
    const [text, setText] = useState('');
    const [isCommented, setIsCommented] = useState(false);

    const submitComment = async () => {
        try {
            const response = await api.post(`/comments`, {
                postID: "postID for now",
                user: "abc123",
                text: text,
            });
            console.log(text)
            console.log(postID)
            console.log("Comment created: ", response.data)
        } catch (err) {
            console.log("Error: ", err)
        }
    };

    return (
        <View style={styles.commentContainer}>
            <TextInput
                style={styles.input}
                placeholder="Write a comment..."
                value={text}
                onChangeText={setText}
                autoCapitalize="none"
                multiline
            />
            <Pressable
                onPress={submitComment}
                onPressIn={() => setIsCommented(true)}
                onPressOut={() => setIsCommented(false)}
            >
                {isCommented
                    ? <IconCircleArrowUpFilled size={28} color="black" />
                    : <IconCircleArrowUp size={28} color="black" />}
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    commentIconRow: {
        paddingRight: 150,
    },
    input: {
        flex: 1,
        fontSize: 14,
        marginLeft: 8,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#e9e9e9ff',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#e9e9e9ff',
    },
});
