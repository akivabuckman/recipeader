import { useEffect, useState } from "react";
import {View, Text, TextInput, TouchableOpacity, Image, FlatList} from "react-native";
import { useRouter } from "expo-router";
import algorithm from "../utils/algorithm";

const Input = (props) => {
    const router = useRouter();

    const handleInputChange = async (text) => {
        props.setRecipeInput(text);
    };

    const callAlgorithm = async () => {
        const gptObject = await algorithm(props);
        props.setGptObj(gptObject);
    }

    useEffect(()=>{console.log(props.gptObj)}, [props.gptObj])

    
    useEffect(()=>{callAlgorithm()}, [props.recipeInput])

    return (
        <View>
      <Text>Copy-paste recipe quantities and instructions:</Text>
      <TextInput
        style={{"height": "100px", "width": "90%"}}
        multiline
        textAlignVertical="top"
        value={props.recipeInput}
        onChangeText={handleInputChange}
      />
    </View>
    )
}

export default Input