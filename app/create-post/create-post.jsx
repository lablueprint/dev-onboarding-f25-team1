import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View>
      <Text>Title</Text>
      <TextInput value={title} onChangeText={setTitle} />

      <Text>Description</Text>
      <TextInput value={description} onChangeText={setDescription} />

      <Button
        title="Submit"
        onPress={() => console.log(title, description)}
      />
    </View>
  );
}