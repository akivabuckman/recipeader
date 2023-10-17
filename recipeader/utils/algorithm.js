
import OpenAIApi from "openai";

const algorithm = async (props) => {
    // get recipe input
    if (props.recipeInput.length > 0) {
        try {
            const sentence = `Convert the following recipe description into the specified JSON object format:

            {
                "ingredients": [
                    {
                        "food": "<food - do not include quantities>",
                        "quantity": {
                            "amount": <amount>,
                            "unit": "<unit>"
                        }
                    }
                ],
                "yield": {
                    "quantity": <yield quantity>,
                    "units": "<yield units>"
                },
                "instructions": [
                    "<step 1>",
                    "<step 2>",
                    ...
                ],
                "times": {
                    "prep time": <prep time>,
                    "cook time": <cook time>,
                    "total time": <total time>
                }
            }
            
            - For ingredients without an amount, leave "amount" and "unit" as null.
            - For ingredients with a unit but no amount (e.g., "a pinch of salt"), use common sense (quantity=1, unit=<unit>).
            - For ingredients with no measurable unit (e.g., "2 eggs"), set "food" as "egg," "amount" as 2, and "unit" as null.
            - Avoid plural units.
            - Use the entire description of the food (e.g., "salted butter* (softened)") in the "food" field.
            - Do not use hyphens or special characters. do not use fraction characters. only decimals
            - If no yield is given, leave the yield values null
            - always include all object keys, even if the values are null
            - example for ingredients: '2¼ tbsp sugar' should return  {
              "food": "sugar",
              "quantity": {
                  "amount": 2.25,
                  "unit": "tbsp"
              }
          }
            
            use this data: ${props.recipeInput}
            `
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
                        "food": "flat rice noodles",
                        "quantity": {
                            "amount": 8,
                            "unit": "ounces"
                        }
                    },
                    {
                        "food": "oil",
                        "quantity": {
                            "amount": 3,
                            "unit": "Tablespoons"
                        }
                    },
                    {
                        "food": "garlic",
                        "quantity": {
                            "amount": 3,
                            "unit": "cloves"
                        }
                    },
                    {
                        "food": "uncooked shrimp, chicken, or extra-firm tofu",
                        "quantity": {
                            "amount": null,
                            "unit": null
                        }
                    },
                    {
                        "food": "eggs",
                        "quantity": {
                            "amount": 2.3333,
                            "unit": null
                        }
                    },
                    {
                        "food": "fresh bean sprouts",
                        "quantity": {
                            "amount": 1,
                            "unit": "cup"
                        }
                    },
                    {
                        "food": "red bell pepper",
                        "quantity": {
                            "amount": 1,
                            "unit": null
                        }
                    },
                    {
                        "food": "green onions",
                        "quantity": {
                            "amount": 3,
                            "unit": null
                        }
                    },
                    {
                        "food": "dry roasted peanuts",
                        "quantity": {
                            "amount": 1/2,
                            "unit": "cup"
                        }
                    },
                    {
                        "food": "limes",
                        "quantity": {
                            "amount": 2,
                            "unit": null
                        }
                    },
                    {
                        "food": "Fresh cilantro",
                        "quantity": {
                            "amount": 1/2,
                            "unit": "cup"
                        }
                    },
                    {
                        "food": "fish sauce",
                        "quantity": {
                            "amount": 3,
                            "unit": "Tablespoons"
                        }
                    },
                    {
                        "food": "low-sodium soy sauce",
                        "quantity": {
                            "amount": 1,
                            "unit": "Tablespoon"
                        }
                    },
                    {
                        "food": "light brown sugar",
                        "quantity": {
                            "amount": 5,
                            "unit": "Tablespoons"
                        }
                    },
                    {
                        "food": "rice vinegar",
                        "quantity": {
                            "amount": 2,
                            "unit": "Tablespoons"
                        }
                    },
                    {
                        "food": "Sriracha hot sauce",
                        "quantity": {
                            "amount": 1,
                            "unit": "Tablespoon"
                        }
                    },
                    {
                        "food": "creamy peanut butter",
                        "quantity": {
                            "amount": 2,
                            "unit": "Tablespoons"
                        }
                    }
                ],
                "yield": {
                    "quantity": null,
                    "units": null
                },
                "instructions": [
                    "Cook noodles according to package instructions, just until tender. Rinse under cold water.",
                    "Make sauce by combining sauce ingredients in a bowl. Set aside.",
                    "Stir Fry: Heat 1½ tablespoons of oil in a large saucepan or wok over medium-high heat. Add the shrimp, chicken or tofu, garlic and bell pepper. The shrimp will cook quickly, about 1-2 minutes on each side, or until pink. If using chicken, cook until just cooked through, about 3-4 minutes, flipping only once.",
                    "Push everything to the side of the pan. Add a little more oil and add the beaten eggs. Scramble the eggs, breaking them into small pieces with a spatula as they cook.",
                    "Add noodles, sauce, bean sprouts and peanuts to the pan (reserving some peanuts for topping at the end). Toss everything to combine.",
                    "Garnish the top with green onions, extra peanuts, cilantro and lime wedges. Serve immediately!",
                    "Store leftovers in the fridge and enjoy within 2-3 days."
                ],
                "times": {
                    "prep time": null,
                    "cook time": null,
                    "total time": null
                }
            });
            const gptObj = await JSON.parse(gptString);

            // handle thirds
            if (gptObj.hasOwnProperty("ingredients")) {
            const updatedIngredients = gptObj.ingredients.map(i => {
                if (.66 === parseFloat((i.quantity.amount % 1).toFixed(2))) {
                i.quantity.amount = Math.floor(i.quantity.amount) + 0.6666666;
                } else if (.33 === parseFloat((i.quantity.amount % 1).toFixed(2))) {
                    i.quantity.amount = Math.floor(i.quantity.amount) + 0.3333333;
                    }
                return i;
            });
            
            const updatedGptObj = { ...gptObj, ingredients: updatedIngredients };
            return updatedGptObj
            }

            return gptObj

            } catch (error) {
                console.log(error)
            };
        } else {
          null
        }
    }
export default algorithm;
