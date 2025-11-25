import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { IconCircleArrowUp, IconCircleArrowUpFilled, IconMessageCircle } from '@tabler/icons-react-native';
import { useState } from 'react';
import axios from "axios";

const api = axios.create({
  baseURL: "http://172.22.121.227:4000/api",
});

const bookmarkedImage = require("../assets/images/post_bookmarked.png");
const notBookmarkedImage = require("../assets/images/post_not_bookmarked.png");
export default function Post({ postID, title, description }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [text, setText] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [isCommented, setIsCommented] = useState(false);

  function handleBookmarkPress() {
    setIsBookmarked(!isBookmarked);

    /*
      TODO: setup backup schema to store saved post info
      and issue POST / DELETE requests to server accordingly
    */
  }

  function handleCommentPress() {
    setShowCommentBox(!showCommentBox);
    /* 
      TODO: setup backend schema to store comment information
      and issue POST / DELETE / GET requests 
    */
    // for getting comments
  }

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

  const bookmarkIconSource = isBookmarked ? bookmarkedImage : notBookmarkedImage;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
          <Text>{title}</Text>
          <Text>{description}</Text>
          <View style={styles.postRow}>
            <Pressable style={styles.bookmarkButton} onPress={handleBookmarkPress}>
              <Image source={bookmarkIconSource} style={styles.image} />
            </Pressable>
            <Pressable onPress={() => setIsLiked(!isLiked)}>
                {isLiked ? (<FontAwesome name="heart" size={25} color="red" />) 
                : (<FontAwesome name="heart-o" size={25} color="grey" />)}
              </Pressable>
          </View>

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
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f9fafb',
    padding: 10,
  },
  container: {
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  postRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
