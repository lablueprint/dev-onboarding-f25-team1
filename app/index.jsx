import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Post from '../components/Post';

export default function Landing() {
  const router = useRouter();

  const username = "talking.yam";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Blueprint!</Text>
      <Button title="Go to Example Page" onPress={() => router.push('/example/example')} />
      <Button title="Go to Post Home Page" onPress={() => router.push({ pathname: '/post/home', params: { username } })} />
      <Button title="Go to Saved Posts Page" onPress={() => router.push({ pathname: '/saved/saved', params: { username } })} />
      <Button title="Go to Signup Page" onPress={() => router.push('/signup/signup')} />
      <Button title="Go to Login Page" onPress={() => router.push('/login/login')} />
      <Post postId={"6912849925e22dd1342d0eaf"} key={"examplePostId"} title={"Example Post Title"} description={"This is an example post description."} username={username} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
