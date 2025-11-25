import { View, Text, StyleSheet } from 'react-native';

export default function Comment({ user, text }) {
  return (
    <View style={styles.comment}>
      <Text style={styles.user}>{user}</Text>
      <Text style={styles.text}>{text}</Text>
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
