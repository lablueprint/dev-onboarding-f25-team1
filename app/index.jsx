import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Landing() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Blueprint!</Text>
      <Button title="Go to Example Page" onPress={() => router.push('/example/example')} />
      <Button title="Go to Post Home Page" onPress={() => router.push('/post/home')} />
      <Button title="Go to Login Page" onPress={() => router.push('/login/login')} />
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
