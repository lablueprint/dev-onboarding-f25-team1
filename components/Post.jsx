import { IconMessageCircle } from '@tabler/icons-react-native';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const bookmarkedImage = require('../assets/images/post_bookmarked.png');
const notBookmarkedImage = require('../assets/images/post_not_bookmarked.png');
export default function Post() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [text, setText] = useState('');

  function handleBookmarkPress() {
    setIsBookmarked(!isBookmarked);
    /*
      TODO: setup backup schema to store saved post info
      and issue POST / DELETE requests to server accordingly
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
          <View style={styles.commentContainer}>
              <IconMessageCircle/>
              <TextInput
                  style={styles.input}
                  placeholder="Write a comment..."
                  value={text}
                  onChangeText={setText}
                  multiline
              />
            </View>
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
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
  },
});
