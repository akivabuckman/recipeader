import { useState, useEffect } from "react";
import {TouchableOpacity, View, Text} from "react-native"

// const express = require("express")
// const cors = require("cors")
// const bodyParser = require("body-parser")
import {OpenAI, Configuration } from "openai";

const GPTConverter = (props) => {
    const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true
      });
    const getGPT = async (prompt) => {

        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer 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`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: sentence}],
                max_tokens: 500,
            })
        }
        try {
            // const completion = await openai.createCompletion({
            // model: "text-davinci-003",
            // max_tokens: 512,
            // temperature: 0,
            // prompt: prompt,
            // });
            // console.log(completion.data.choices[0].text)
            const response = await fetch("https://api.openai.com/v1/chat/completions", options);
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.log(error)
        }

        
    }
    return(
        <View >
            <TouchableOpacity 
            onPress={getGPT}>
                <Text>Click</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GPTConverter