import { Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

const bookmarkedImage = require("../assets/images/post_bookmarked.png");
const notBookmarkedImage = require("../assets/images/post_not_bookmarked.png");
export default function Post({ title, description }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{title}</Text>
            <Pressable style={styles.bookmarkButton} onPress={handleBookmarkPress}>
              <Image source={bookmarkIconSource} style={styles.image} />
            </Pressable>
            <Pressable onPress={() => setIsLiked(!isLiked)}>
              {isLiked ? (<FontAwesome name="heart" size={25} color="red" />) 
              : (<FontAwesome name="heart-o" size={25} color="grey" />)}
            </Pressable>
            <Text>{description}</Text>
          </View>
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
  bookmarkButton: {
    marginLeft: 10,
  },
  image: {
    width: 24,
    height: 24,
    alignSelf: "center",
  },
});
