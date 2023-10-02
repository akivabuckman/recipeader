
import OpenAIApi from "openai";

const algorithm = async (props) => {
    // get recipe input
    if (props.recipeInput.length > 0) {
        console.log(props.recipeInput)

        // concat input to sentence for api

        try {
            const sentence = `only if the following is a recipe, convert recipe to array in this format, one item per ingredient:
            {
                "ingredients":
                [
                    {
                        "food": <the given food>,
                        "quantity": {
                            "amount": <given amount (examples: 3 tbsp returns 3, 4 cups returns 4)>,
                            "unit": <unit in which the ingredient is given (cup, gr, oz, etc.)>
                        }
                    }
                ],
                "yield": {
                    "quantity": <qty>,
                    "units": <servings, cookies, etc>
                },
                "instructions": [
                    <step 1, 2... one array item per step>
                ],
                "times": {
                    "prep time": <if given>,
                    "cook time": <if given>,
                    "total time": <if given, or total of prep + cook>
                }
            }
            if an ingredient doesnt contain amount, leave the "amount" and "unit" as null. if it contains a unit but does not contain an amount (like "a pinch of salt"), use common sense,
            so that would be quantity=1, unit=pinch. if there is no measurable unit (like "2 eggs"), do food=egg, amount=2, unit=null. no ingredients or units should be written in plural. do not send any explanation, just send the array as the response. include the entire description of the food, example: salted butter* (softened) should go into the "food" in its entirety ${props.recipeInput}`
            
            // fetch api
            const options = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer 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`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: sentence}],
                    max_tokens: 1000,
                })
            };
            // const response = await fetch("https://api.openai.com/v1/chat/completions", options);
            // const data = await response.json();
            // const gptString = data.choices[0]["message"]["content"];
            // console.log(gptString)
            const gptString = JSON.stringify({
                "ingredients": [
                    {
                        "food": "salted butter*",
                        "quantity": {
                            "amount": 227,
                            "unit": "g"
                        }
                    },
                    {
                        "food": "white (granulated) sugar",
                        "quantity": {
                            "amount": 200,
                            "unit": "g"
                        }
                    },
                    {
                        "food": "light brown sugar packed",
                        "quantity": {
                            "amount": 220,
                            "unit": "g"
                        }
                    },
                    {
                        "food": "pure vanilla extract",
                        "quantity": {
                            "amount": 2,
                            "unit": "tsp"
                        }
                    },
                    {
                        "food": "large eggs",
                        "quantity": {
                            "amount": 2,
                            "unit": null
                        }
                    },
                    {
                        "food": "all-purpose flour",
                        "quantity": {
                            "amount": 360,
                            "unit": "g"
                        }
                    },
                    {
                        "food": "baking soda",
                        "quantity": {
                            "amount": 1,
                            "unit": "tsp"
                        }
                    },
                    {
                        "food": "baking powder",
                        "quantity": {
                            "amount": 0.5,
                            "unit": "tsp"
                        }
                    },
                    {
                        "food": "sea salt***",
                        "quantity": {
                            "amount": 1,
                            "unit": "tsp"
                        }
                    },
                    {
                        "food": "chocolate chips (or chunks, or chopped chocolate)",
                        "quantity": {
                            "amount": 350,
                            "unit": "g"
                        }
                    },
                ],
                "yield": {
                    "quantity": 36,
                    "units": "cookies"
                },
                "instructions": [
                    "Preheat oven to 375 degrees F. Line a baking pan with parchment paper and set aside.",
                    "In a separate bowl mix flour, baking soda, salt, baking powder. Set aside.",
                    "Cream together butter and sugars until combined.",
                    "Beat in eggs and vanilla until fluffy.",
                    "Mix in the dry ingredients until combined.",
                    "Add 12 oz package of chocolate chips and mix well.",
                    "Roll 2-3 TBS (depending on how large you like your cookies) of dough at a time into balls and place them evenly spaced on your prepared cookie sheets. (alternately, use a small cookie scoop to make your cookies).",
                    "Bake in preheated oven for approximately 8-10 minutes. Take them out when they are just BARELY starting to turn brown.",
                    "Let them sit on the baking pan for 2 minutes before removing to cooling rack."
                ],
                "times": {
                    "prep time": "10 minutes",
                    "cook time": "8 minutes",
                    "total time": "30 minutes"
                }
            });
            const gptObj = await JSON.parse(gptString);
            console.log(gptObj)
            return gptObj

            } catch (error) {
                console.log(error)
            };
        }
    }
export default algorithm;
