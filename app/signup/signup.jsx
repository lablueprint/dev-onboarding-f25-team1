import { useState } from 'react';
import { Alert, Button, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setPassword] = useState('');
  const [confirmUserPassword, setConfirmUserPassword] = useState('');

  const router = useRouter();

  const handleSubmit = () => {
    const msg = verifyPassword(userPassword, confirmUserPassword)

    
    if (msg !== '') {
      Alert.alert('Signup Error', msg)
      return;
    }
    console.log({
      firstName,
      lastName,
      userName,
      userPassword,
      confirmUserPassword,
    });
     router.push('/post/home');
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
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text>Confirm Password:</Text>
        <TextInput
          placeholder="Please confirm your password"
          value={confirmUserPassword}
          onChangeText={setConfirmUserPassword}
        />
      </View>

      <Button title="Submit" onPress={handleSubmit} />

    </ScrollView>
  );
}

function verifyPassword(password, confirmPassword) {
  if (password.length <= 8) {
    return 'Password must be greater than 8 characters.';
  }

  let hasNumber = false;
  for (let i = 0; i < password.length; i++) {
    const code = password.charCodeAt(i);
    if (code >= 48 && code <= 57) {
      hasNumber = true;
      break;
    }
  }

  if (!hasNumber) {
    return 'Password must contain at least one number.';
  }

  if (password !== confirmPassword) {
    return 'Passwords must match.';
  }

  return '';
}