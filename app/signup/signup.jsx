import { useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';


export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setPassword] = useState('');
  const [confirmUserPassword, setConfirmUserPassword] = useState('');

  const handleSubmit = () => {
    console.log({
      firstName,
      lastName,
      userName,
      userPassword,
      confirmUserPassword,
    });
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