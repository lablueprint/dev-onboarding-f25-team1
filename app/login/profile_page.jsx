import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  //set up state variables which can be changed
  const [firstName, setFirstName] = useState('Gokul'); //will set to empty string for acc implementation
  const [lastName, setLastName] = useState('Nambiar'); 
  const [username, setUsername] = useState('talking.yam')

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