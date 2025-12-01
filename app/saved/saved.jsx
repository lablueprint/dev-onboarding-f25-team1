import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

import Post from "../../components/Post";

export default function Saved() {

  const params = useLocalSearchParams();
  const { username } = params;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
  const getSavedPosts = async () => {
    try {
      const response = await fetch (`http://localhost:4000/api/profile/${username}/saved-posts`)
      const data = await response.json();
      const savedPosts = data.savedPosts || []
      console.log('Fetched saved posts:', savedPosts);
      setPosts(savedPosts);
    }
    catch (error) {
      console.error('Error fetching saved posts:', error);
    }
  }
  getSavedPosts();
  }, [username]);
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Display none posts message if posts is empty */}
        {posts.length === 0 && <Text>No saved posts available.</Text>}
        {posts.map((post) => (
          <Post key={post._id} postId={post._id} title={post.title} description={post.description} username={username} />
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
