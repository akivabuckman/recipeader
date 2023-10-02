import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router"
import { useEffect, useState } from "react";
import Input from "../components/Input";
import Result from "../components/Result";

const Home = () => {
    const [recipeInput, setRecipeInput] = useState("");
    const [ingredientMeasurements, setIngredientMeasurements] = useState(null)
    const [gptObj, setGptObj] = useState(
        {
            "ingredients":
            [
                {
                    "food": null,
                    "quantity": {
                        "amount": null,
                        "unit": null
                    }
                }
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
    const [factor, setFactor] = useState(2);
    const router = useRouter();

    const Loggy = () => {
        return(
          <TouchableOpacity onPress={()=>{
              console.log(factor)
              }}>
            <Text>Log</Text>
          </TouchableOpacity>
        )
      }


    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen
                options={{
                    headerLeft: ()=> (
                        null
                    ),
                    headerRight: ()=>(
                        null
                        ),
                    headerTitle: "",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Loggy />
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Input recipeInput={recipeInput} setRecipeInput={setRecipeInput} gptObj={gptObj} setGptObj={setGptObj}/>
                    <Result 
                    recipeInput={recipeInput} 
                    setRecipeInput={setRecipeInput} 
                    gptObj={gptObj} 
                    setGptObj={setGptObj}
                    ingredientMeasurements={ingredientMeasurements}
                    setIngredientMeasurements={setIngredientMeasurements}
                    factor={factor}
                    setFactor={setFactor}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default Home;