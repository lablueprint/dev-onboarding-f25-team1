import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { useRouter } from 'expo-router';

export default function Login (){
    const [username, setUsername]= useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    function handleLogin(){
        console.log ({username, password});
        router.push('/')
    }

    return(
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text> Username</Text> 
                 <TextInput
                   style={styles.input}
                    onChangeText={setUsername}
                    value={username}/>
                <Text> Password </Text>
                <TextInput
                   style={styles.input}
                    onChangeText={setPassword}
                    value={password}/>
                <Button title = "Login" onPress = {handleLogin}/>
                <Text style = {styles.text} onPress={() => router.push('/')}>Go Home</Text>
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
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
    input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
});
