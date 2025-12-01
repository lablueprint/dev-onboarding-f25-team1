import { useState } from 'react';
import { Alert, Button, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

const BACKEND_URL = 'http://localhost:4000';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setPassword] = useState('');
  const [confirmUserPassword, setConfirmUserPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async () => {
    // simple checks
    if (!firstName || !lastName || !userName || !userPassword || !confirmUserPassword) {
      Alert.alert('Signup Error', 'Please fill in every box.');
      return;
    }

    if (userPassword !== confirmUserPassword) {
      Alert.alert('Signup Error', 'Passwords must match.');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          username: userName,
          password: userPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Signup Error', data?.error || 'Something went wrong.');
        return;
      }

      console.log('User created:', data.user);
      router.push('/post/home');
    } catch (err) {
      console.log('Network error:', err);
      Alert.alert('Signup Error', 'Could not reach the server.');
    }
  };

  return (
    <ScrollView>
      <View style={{ marginBottom: 20 }}>
        <Text>First Name:</Text>
        <TextInput
          placeholder="Please enter your first name:"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text>Last Name:</Text>
        <TextInput
          placeholder="Please enter your last name:"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text>Username:</Text>
        <TextInput
          placeholder="Please enter your username:"
          value={userName}
          onChangeText={setUserName}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text>Password:</Text>
        <TextInput
          placeholder="Please enter your password:"
          value={userPassword}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
/>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text>Confirm Password:</Text>
        <TextInput
          placeholder="Please confirm your password"
          value={confirmUserPassword}
          onChangeText={setConfirmUserPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
        />
      </View>

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}