import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

  const url = 'http://localhost:4000';
  const usernameToFetch = 'talking.yam';


export default function Profile() {
  //set up state variables which can be changed
  const [firstName, setFirstName] = useState(''); //will set to empty string for acc implementation
  const [lastName, setLastName] = useState(''); 
  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const getUserInfo = async () => {
    try {
      const response = await axios.get(`${url}/api/profile/${usernameToFetch}`);

      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setUsername(response.data.username);
      
      console.log(response.data);
      return response.data;
      } catch (error) {
        console.log("Error getting profile", error);
        return null;
      }
    };

  const updateUserInfo = async () => {
    try {
      const response = await axios.post(`${url}/api/profile/${usernameToFetch}`, { //post request
        firstName,
        lastName,
        username
      });
      console.log("Profile updated:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error updating profile", error);
      return null;
    }
  };

  const handleButtonPress = async () => {
    if (isEditing) {
      // save the changes
      await updateUserInfo();
    }
    // toggle edit mode
    setIsEditing(!isEditing);
  };

    //get user info instantly   
    useEffect(() => {
      getUserInfo();
    }, []);
    
  

  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>

        <Text style = {styles.title}>Profile Page</Text> 


        <Image source={require('../../assets/images/gokul-profile.jpg')}
          style={styles.profileImage}
          resizeMode="cover"
        />
          
      
        
        {/* set conditional rendering for each field using ternary operator */}
        {/* USERNAME */}
      {isEditing ? (
        <TextInput
          style={[styles.userDetails, styles.input]}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
      ) : (
        <Text style={styles.userDetails}>@{username}</Text>
        // <Text style={styles.userDetails}> @talking.yam</Text>

      )}
        
        {/* first name */}
      {isEditing ? (
        <TextInput
          style={[styles.userDetails, styles.input]}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
        />
      ) : (
        <Text style={styles.userDetails}>{firstName} {lastName}</Text>
        // <Text style={styles.userDetails}> Gokul Nambiar </Text>
      )}
      

        {/* last name */}

      {isEditing && (
        <TextInput
          style={[styles.userDetails, styles.input]}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
        />
      )}

        <Pressable>

         <Button 
          title={isEditing ? "Save" : "Edit"} 
          onPress={handleButtonPress}
        />


        </Pressable>
     



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
    overflow: 'hidden'
  },

  title: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
    textAlign: 'center',
  },

  userDetails: {
    fontSize: 28,
    marginBottom: 8,
    textAlign: 'center',
  },

  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,     //half for circle profile pic
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: 'rgba(83, 130, 199, 1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '80%',
    backgroundColor: '#fff'
  },

  buttonContainer: {
    marginTop: 12,
  }


});