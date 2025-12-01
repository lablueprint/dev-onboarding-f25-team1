import { FontAwesome } from "@expo/vector-icons";
import { IconCircleArrowUp, IconCircleArrowUpFilled, IconMessageCircle } from '@tabler/icons-react-native';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const bookmarkedImage = require("../assets/images/post_bookmarked.png");
const notBookmarkedImage = require("../assets/images/post_not_bookmarked.png");

const url = "http://localhost:4000";
console.log("Backend URL:", url);
const demoUserId = "000000000000000000000001";

export default function Post({ title, description, postId }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [text, setText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [isCommented, setIsCommented] = useState(false);

  const savePost = async () => {
    const postId = id
    if (!postId) {
      console.error('savePost called without post id')
      return
    }

    try {
      const response = await axios.post(`${API_BASE}/api/profile/${username}/saved-posts/${postId}`)
      console.log('Post saved:', response.data)
    } catch (error) {
      console.error('Error saving post:', error)
    }
  }

  const unsavePost = async () => {
    const postId = id ?? key
    if (!postId) {
      console.error('unsavePost called without post id')
      return
    }

    try {
      const response = await axios.delete(`${API_BASE}/api/profile/${username}/saved-posts/${postId}`)
      console.log('Post unsaved:', response.data)
    } catch (error) {
      console.error('Error unsaving post:', error)
    }
  }

  function handleBookmarkPress() {
    setIsBookmarked(!isBookmarked);
    if(!isBookmarked){
      savePost();
    }
    else {
      unsavePost();
    }
    
  }

  function handleCommentPress() {
    setShowCommentBox(!showCommentBox);
    /* 
      TODO: setup backend schema to store comment information
      and issue POST / DELETE / GET requests 
    */
  }

  const handleLikePress = async () => {
    try {
      const response = await axios.post(`${url}/api/posts/${postId}/like`, { userId: demoUserId });
      const updated = response.data;
      const likedNow = Array.isArray(updated?.likedBy)
        ? updated.likedBy.includes(demoUserId)
        : false;
      setIsLiked(likedNow);
      console.log("Updated post after like toggle:", updated);
      return updated;
    } catch (error) {
      console.log("Error toggling like", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        if (!postId) return;
        const res = await axios.get(`${url}/api/posts/${postId}/liked`, {
          params: { userId: demoUserId },
        });
        setIsLiked(Boolean(res.data?.isLiked));
      } catch (err) {
        console.log('Error fetching like status', err);
      }
    };
    fetchLikeStatus();
  }, [postId]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        if (!postId) return;
        const res = await axios.get(`${url}/api/posts/${postId}/liked`, {
          params: { userId: demoUserId },
        });
        setIsLiked(Boolean(res.data?.isLiked));
      } catch (err) {
        console.log('Error fetching like status', err);
      }
    };
    fetchLikeStatus();
  }, [postId]);

  const bookmarkIconSource = isBookmarked ? bookmarkedImage : notBookmarkedImage;

  return (
    <View style={styles.container}>
      <View style={styles.postBar}>
        <Text style={{ fontWeight: "bold" }}>{title}</Text>
        <View style={styles.postRow}>
          <Pressable style={styles.bookmarkButton} onPress={handleBookmarkPress}>
            <Image source={bookmarkIconSource} style={styles.image} />
          </Pressable>
          <Pressable onPress={() => setIsLiked(!isLiked)}>
            {isLiked ? (
              <FontAwesome name="heart" size={25} color="red" />
            ) : (
              <FontAwesome name="heart-o" size={25} color="grey" />
            )}
          </Pressable>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.commentIconRow}>
        <Pressable onPress={handleCommentPress}>
          <IconMessageCircle size={24} color="black" />
        </Pressable>
      </View>

      {showCommentBox && (
        <View style={styles.commentContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write a comment..."
            value={text}
            onChangeText={setText}
            multiline
          />
          <Pressable
            onPressIn={() => setIsCommented(true)}
            onPressOut={() => setIsCommented(false)}
          >
            {isCommented ? (
              <IconCircleArrowUpFilled size={28} color="black" />
            ) : (
              <IconCircleArrowUp size={28} color="black" />
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    minHeight: 200,
    backgroundColor: "white",
  },
  postBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  postRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  bookmarkButton: {
    marginLeft: 10,
  },
  image: {
    width: 24,
    height: 24,
    alignSelf: "center",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#e9e9e9ff",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#e9e9e9ff",
  },
  commentIconRow: {
    paddingTop: 20,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
  },
  description: {
    width: "100%",
  },
});
