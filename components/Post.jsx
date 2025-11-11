import { IconCircleArrowUp, IconCircleArrowUpFilled, IconMessageCircle } from '@tabler/icons-react-native';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const bookmarkedImage = require('../assets/images/post_bookmarked.png');
const notBookmarkedImage = require('../assets/images/post_not_bookmarked.png');
export default function Post() {
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
  }

  const bookmarkIconSource = isBookmarked ? bookmarkedImage : notBookmarkedImage;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.postRow}>
          <Text>This is one example post</Text>
          <Pressable style={styles.bookmarkButton} onPress={handleBookmarkPress}>
            <Image source={bookmarkIconSource} style={styles.image} />
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
              multiline
            />
            <Pressable
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
  },
  container: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black'
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
    alignSelf: 'center',
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
  commentIconRow: {
    paddingRight: 150,
  },
  input: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
  },
});
