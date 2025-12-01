import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';

const url = 'http://localhost:4000'

export default function Login (){
    const [username, setUsername]= useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    function handleLogin(){
       verifyPassword();
        console.log ({username, password});
        //router.push('/post/home')
    }

    const verifyPassword= async () => {
    try {
      const response = await axios.get(`${url}/login/${username}`,{params:{password}});
      console.log(response.data);
      if (response.data.success){
        router.push('/post/home');
        return response.data;
      }
      else{
        alert ("Incorrect password");
        return response.data;
      }
      } catch (error) {
        console.log("Error logging in", error);
        return null;
      }
    };

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
