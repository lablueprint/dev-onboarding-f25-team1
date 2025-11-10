import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

export default function Post() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.postText}>This is one post</Text>
          <Pressable
            onPress={() => setIsBookmarked(!isBookmarked)}
            style={styles.bookmarkButton}
          >
            {isBookmarked ? (
              <FontAwesome name="bookmark" size={24} color="blue" />
            ) : (
              <FontAwesome name="bookmark-o" size={24} color="grey" />
            )}
          </Pressable>
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
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postText: {
    flex: 1,
    fontSize: 16,
  },
  bookmarkButton: {
    marginLeft: 10,
  },
});
