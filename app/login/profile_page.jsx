import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

  const url = 'http://localhost:4000'
  const usernameToFetch = 'talking.yam';


export default function Profile() {
  //set up state variables which can be changed
  const [firstName, setFirstName] = useState(''); //will set to empty string for acc implementation
  const [lastName, setLastName] = useState(''); 
  const [username, setUsername] = useState('')

  const getUserInfo = async () => {
    try {
      const response = await axios.get(`${url}/api/profile/${usernameToFetch}`);

      setFirstName(response.data.firstName);
      setFirstName(response.data.firstName);
      setFirstName(response.data.firstName);
      console.log(response.data);
      return response.data;
      } catch (error) {
        console.log("Error getting profile", error);
        return null;
      }
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
          
      



        <Text style = {styles.userDetails}>
          
          @{username}

        </Text>
        <Text style = {styles.userDetails}>

          {firstName} {lastName}
          
        </Text>
     



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
  }


});