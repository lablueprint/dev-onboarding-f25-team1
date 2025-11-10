import { ScrollView, StyleSheet, Text, View } from "react-native";
import Post from "../../components/Post";

export default function PostHome() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text>Post Home Page</Text>
        <Post title="First Post" description="Hello world. This is a post" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
});
