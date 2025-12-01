import axios from "axios";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
const url = "http://localhost:4000";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async() => {
    try {
      const timePosted = new Date().toISOString();
      const response = await axios.post(`${url}/api/posts`, {
        title,
        description,
        timePosted,
      });

      console.log("Post submitted:", response.data); 
    } catch(error) {
      console.log("Error submitting post", error);
    }
  };

  return (
    <View>
      <Text>Title</Text>
      <TextInput value={title} onChangeText={setTitle} />

      <Text>Description</Text>
      <TextInput value={description} onChangeText={setDescription} />

      <Button title="Submit" onPress={handleSubmit} />

    </View>
  );
}