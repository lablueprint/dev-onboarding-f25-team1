import { View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

export default function Post() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.postText}>This is one post</Text>
          <Pressable
            onPress={() => setIsLiked(!isLiked)}
            style={styles.heartButton}
          >
            {isLiked ? (
              <FontAwesome name="heart" size={30} color="red" />
            ) : (
              <FontAwesome name="heart-o" size={30} color="grey" />
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
