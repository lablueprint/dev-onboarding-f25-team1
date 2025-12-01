import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

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
        // <Text style={styles.username}>@{username}</Text>
        <Text style={styles.username}> @talking.yam</Text>

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
        // <Text style={styles.userDetails}>{firstName} {lastName}</Text>
        <Text style={styles.userDetails}> Gokul Nambiar </Text>
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

        <Pressable 
          style={({ pressed }) => [
            styles.buttonContainer,
            pressed && styles.buttonPressed
          ]}
          onPress={handleButtonPress}
          
        >
          <Text style={styles.buttonText}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Text>
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
    overflow: 'hidden',
    backgroundColor: 'rgba(206, 231, 255, 1)'
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
    borderWidth: 4,    
    borderColor: '#fff', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 8,   
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
    position: 'absolute',  
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#5382c7',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    cursor: 'pointer',
  },
  
  buttonPressed: {
  backgroundColor: '#1f3352ff', // darker blue when pressed
  opacity: 0.8, 
  },

  username: {
  fontSize: 40,
  marginBottom: 8,
  textAlign: 'center',
  color: '#5382c7',
  fontWeight: '600',
  },

  buttonText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#fff',
    
  }

  


});