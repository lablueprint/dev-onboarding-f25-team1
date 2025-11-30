import { IconCircleArrowUp, IconCircleArrowUpFilled } from '@tabler/icons-react-native';
import axios from "axios";
import { useEffect, useState, useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import Comment from './Comment';

const api = axios.create({
    baseURL: "http://192.168.4.50:4000/api",
});

export default function CommentSection({ postID }) {
    const [text, setText] = useState('');
    const [isCommented, setIsCommented] = useState(false);
    const [comments, setComments] = useState([]);
    const currentUser = "username";

    const loadComments = useCallback(async () => {
        try {
            const result = await api.get(`/comments/${postID}`);
            console.log("Loaded comments:", result.data); 
            setComments(result.data);
        } catch (err) {
            console.log("Failed to fetch comments: ", err);
        }
    }, [postID]);

    useEffect(() => {
        loadComments();
    }, [loadComments]);

    const submitComment = async () => {
        try {
            const response = await api.post(`/comments`, {
                postID: postID,
                user: currentUser,
                text: text,
            });
            console.log(text)
            console.log(postID)
            
            const newComment = response.data;
            setComments(prev => [...prev, newComment]);
            
            setText("");    
            console.log("Comment created: ", response.data)

            await loadComments();
        } catch (err) {
            console.log("Error: ", err)
        }
    };

     const deleteComment = async (commentId) => {
        try {
            await api.delete(`/comments/${commentId}`);
            // Remove comment from local state immediately
            setComments(prev => prev.filter(comment => comment._id !== commentId));
            console.log("Comment deleted: ", commentId);
            await loadComments();
        } catch (err) {
            console.log("Error deleting comment: ", err);
            // Reload comments to ensure consistency if delete failed
            await loadComments();
        }
    };

    return (
        <>
            <ScrollView style={{ maxHeight: 200 }}>
                {comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        commentId={comment._id}    
                        user={comment.user}
                        text={comment.text} 
                        currentUser={currentUser}
                        onDelete={deleteComment}
                    />
                ))}
            </ScrollView>

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
        </>
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
