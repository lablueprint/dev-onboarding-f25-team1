import { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import Post from "../../components/Post";

export default function PostHome() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {posts.map((post) => (
          <Post key={post._id} postId={post._id} title={post.title} description={post.description} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#F5FBFF",
  },
  container: {
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
});
