import { View, Text, ScrollView, SafeAreaView, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router"
import { useEffect, useState } from "react";
import Input from "../components/Input";
import Result from "../components/Result";
import { Checkbox } from 'react-native-paper';


const Home = () => {
    const [recipeInput, setRecipeInput] = useState("");
    const [ingredientMeasurements, setIngredientMeasurements] = useState(null)
    const [isloading, setIsLoading] = useState(false)
    const [gptObj, setGptObj] = useState(
        {
            "ingredients":
            [
                // {
                //     "food": null,
                //     "quantity": {
                //         "amount": null,
                //         "unit": null
                //     }
                // }
            ],
            "yield": {
                "quantity": null,
                "units": null
            },
            "instructions": [
            ],
            "times": {
                "prep time": null,
                "cook time": null,
                "total time": null
            }
        }
    );
    const originalObj =
        {
            "ingredients":
            [
                // {
                //     "food": null,
                //     "quantity": {
                //         "amount": null,
                //         "unit": null
                //     }
                // }
            ],
            "yield": {
                "quantity": null,
                "units": null
            },
            "instructions": [
            ],
            "times": {
                "prep time": null,
                "cook time": null,
                "total time": null
            }
        }
    
    const [factor, setFactor] = useState(1);
    const Loggy = () => {
        return(
          <Pressable onPress={()=>{
              console.log(factor)
              }}>
            <Text>Log</Text>
          </Pressable>
        )
      }


    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Input isloading={isloading} setIsLoading={setIsLoading} recipeInput={recipeInput} setRecipeInput={setRecipeInput} gptObj={gptObj} setGptObj={setGptObj}/>
                    {
                        JSON.stringify(gptObj) !== JSON.stringify(originalObj) && !isloading ?
                    <Result 
                    isloading={isloading} setIsLoading={setIsLoading} 
                    recipeInput={recipeInput} 
                    setRecipeInput={setRecipeInput} 
                    gptObj={gptObj} 
                    setGptObj={setGptObj}
                    ingredientMeasurements={ingredientMeasurements}
                    setIngredientMeasurements={setIngredientMeasurements}
                    factor={factor}
                    setFactor={setFactor}
                    />
                    : null }

                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default Home;