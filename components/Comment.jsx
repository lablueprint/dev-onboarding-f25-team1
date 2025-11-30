import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconX } from '@tabler/icons-react-native';

export default function Comment({ commentId, user, text, currentUser, onDelete }) {
    const isOwnComment = user === currentUser;
    return (
        <View style={styles.comment}>
            <Text style={styles.user}>{user}</Text>
            <Text style={styles.text}>{text}</Text>
            {isOwnComment && (
                <Pressable
                    onPress={() => {
                        console.log("Delete pressed for:", commentId);
                        onDelete(commentId);
                    }}
                    style={styles.deleteButton}
                    hitSlop={8}
                >
                    <IconX size={16} color="#666" />
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    comment: {
        padding: 10,
        backgroundColor: "#f1f1f1",
        borderRadius: 10,
        marginVertical: 5,
    },
    user: {
        fontWeight: "600",
        marginBottom: 3,
    },
    text: {
        fontSize: 14,
    }
});
