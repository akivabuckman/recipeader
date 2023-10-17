import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Image, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import quantityCalculator from "../utils/quantityCalculator";
import { Checkbox } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import YieldButton from "./YieldButton";
const Fraction = require('fractional').Fraction



const Result = (props) => {
  const [ingredientChecks, setIngredientChecks] = useState(
    props.gptObj
      ? props.gptObj.hasOwnProperty("ingredients") ? props.gptObj.ingredients.map(() => false)
      : []
  : []);
  const [instructionChecks, setInstructionChecks] = useState(
    props.gptObj
    ? props.gptObj.hasOwnProperty("instructions") ? props.gptObj.instructions.map(()=> true)
    : []
    : []);
    const [yields, setYields] = useState([]);
    const [fractions, setFractions] = useState([])
  

  useEffect(() => {
    quantityCalculator(props);
    if (props.gptObj) {
        setIngredientChecks(props.gptObj.ingredients.map(() => false));
        setInstructionChecks(props.gptObj.instructions.map(() => false));
        props.setFactor(1)
    };

    if (props.gptObj && props.gptObj.hasOwnProperty("yield")) {
        const yields = [];

        if (props.gptObj.yield.quantity !== null && props.gptObj.yield.quantity !== 0 && props.gptObj.yield.quantity !== ""){
          for (let i = 0.25; i <= 3; i += 0.25) {
            yields.push(i * props.gptObj.yield.quantity);
          };
          setYields(yields)
        } else {
          for (let i = 0.25; i <= 3; i += 0.25) {
            yields.push(i);
          };
          setYields(yields)
        }   
    };
    decimalsToFractions();
  }, [props.gptObj]);

  const handleFactorChange = (text) => {
    props.setFactor(text);
  };

  const ingredientCheckChange = (index) => {
    setIngredientChecks((prevChecks) => {
      const newChecks = [...prevChecks];
      newChecks[index] = !newChecks[index];
      return newChecks;
    });
  };

  const instructionCheckChange = (index) => {
    const prevChecks = instructionChecks;
      const newChecks = [...prevChecks];
      newChecks[index] = !newChecks[index];
    setInstructionChecks(newChecks)
  };

  const decimalsToFractions = () => {
    let newFractions = [];
    props.gptObj.ingredients.forEach((i)=>{
      // if null
      if (!i.quantity.amount) {
        newFractions.push("")
      } else {
        const rough = i.quantity.amount * props.factor;
        const j = roundToFraction(rough);
        if (.32 <= (j) % 1 && j % 1 <= .34) {
          const frac = "1/3";
          const mod = Math.floor(j) === 0 ? "" : `${Math.floor(j)} `;
          newFractions.push(`${mod}${frac} `)
        }
        // if 2/3
        else if (.65 <= (j) % 1 && j % 1 <= .67 ) {
          const frac = "2/3";
          const mod = Math.floor(j) === 0 ? "" : `${Math.floor(j)} `;
          newFractions.push(`${mod}${frac} `)
        }
        // if 1/6
        else if (.15 <= (j) % 1 && j % 1 <= .17 ) {
          const frac = "1/6";
          const mod = Math.floor(j) === 0 ? "" : `${Math.floor(j)} `;
          newFractions.push(`${mod}${frac} `)
        }
        // if 5/6
        else if (.82 <= (j) % 1 && j % 1 <= .84 ) {
          const frac = "5/6";
          const mod = Math.floor(j) === 0 ? "" : `${Math.floor(j)} `;
          newFractions.push(`${mod}${frac} `)
        }
        // if other decimal
        else if (j % 1 !== 0) {
          const frac = new Fraction(j);
          newFractions.push(frac.toString() + " ")
        }
        // if whole
        else if (!isNaN(j)) {
          newFractions.push((j).toString() + " ")
        }
      }
    })
    setFractions(newFractions)
  };

  const decimalsToFractions1 = () => {
    let newFractions = [];
    props.gptObj.ingredients.forEach((i)=>{
      // if null
      if (!i.quantity.amount) {
        newFractions.push("")
      }
      // round to closest 16th or 12th
      // if 1/3
      else if (.32 <= (i.quantity.amount * props.factor) % 1 && i.quantity.amount * props.factor % 1 <= .34) {
        const frac = "1/3";
        const mod = Math.floor(i.quantity.amount * props.factor) === 0 ? "" : `${i.quantity.amount * props.factor} `;
        newFractions.push(`${mod}${frac} `)
      }
      // if 2/3
      else if (.65 <= (i.quantity.amount * props.factor) % 1 && i.quantity.amount * props.factor % 1 <= .67 ) {
        const frac = "2/3";
        const mod = Math.floor(i.quantity.amount * props.factor) === 0 ? "" : `${Math.floor(i.quantity.amount * props.factor)} `;
        newFractions.push(`${mod}${frac} `)
      }
      // if other decimal
      else if (i.quantity.amount * props.factor % 1 !== 0) {
        const frac = new Fraction(i.quantity.amount * props.factor);
        newFractions.push(frac.toString() + " ")
      }
      // if whole
      else if (!isNaN(i.quantity.amount * props.factor)) {
        newFractions.push((i.quantity.amount * props.factor).toString() + " ")
      }
    })
    setFractions(newFractions)
  };

  const roundToFraction = (rough) => {
    const fractions = [0, 1, 1/16, 2/16, 3/16, 4/16, 5/16, 6/16, 7/16, 8/16, 9/16, 10/16, 11/16, 12/16, 13/16, 14/16, 15/16, 1/12, 2/12, 4/12, 5/12, 7/12, 8/12, 10/12, 11/12, 1/10, 2/10, 3/10, 4/10, 6/10, 7/10, 8/10, 9/10, .99999]
    let wholeNum = Math.floor(rough);
    const remainder = rough % 1;
    let smallestDiff = 999;
    let closestFraction;
    for (let i of fractions) {
      const diff = Math.abs(i % 1 - remainder);
      if (diff < smallestDiff) {
        closestFraction = i;
        smallestDiff = diff;
      }
    };

    // if it makes it whole 
    if (closestFraction === .99999) {
      closestFraction = 0;
      wholeNum ++;
    }

    // console.log(wholeNum, closestFraction)

    return wholeNum + closestFraction;
  }


  
  

  const Loggy = () => {
      return (
        <Pressable
          onPress={() => {
            console.log(props.factor, "factor");
            console.log(fractions, "fracs")
          }}
        >
          <Text>Loggg</Text>
        </Pressable>
      );
    };
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    yieldView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    ingredientsView: {
      marginBottom: 20,
    },
    ingredientRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    },
    instructionsView: {
      marginBottom: 20,
    },
    instructionRow: {
      flexDirection: "row",
      alignItems: "top",
      marginBottom: 5,
    },
    title: {
      fontSize: 20,
    }
  });

  const handleIngredientFactor = (index, input) => {
    const text = input.nativeEvent.text
    if (!["", "0"].includes(text) && !isNaN(text)) {
      props.setFactor(parseFloat(text) / props.gptObj.ingredients[index].quantity.amount)
    }
  }

  useEffect(() => {
    decimalsToFractions()
  }, [props.factor])


  return (
    props.isLoading === true ? 
    <View>
      <Text>This might take a minute, but it'll save you many more minutes</Text>
    </View> :
    (
    <View style={styles.container}>
      <Loggy />

    {/* Yield Section */}
    {props.gptObj ? (
      <View id="yieldView" style={styles.yieldView}>
        <Text style={styles.title}>Yield: </Text>
        {/* if quantity is null */}
        {props.gptObj.yield.quantity === null || props.gptObj.yield.quantity === 0 || props.gptObj.yield.quantity === "" ? (
          <YieldButton
            data={yields.map((i) => `${i}X`)}
            handleFactorChange={handleFactorChange}
            />
            // quantity is not null, units is null
        ) : props.gptObj.yield.units === null || props.gptObj.yield.units === "" || props.gptObj.yield.units === 0 ? (
          <SelectDropdown
            data={yields}
            defaultButtonText={`↕️ ${props.gptObj.yield.quantity}`}
            defaultValue={props.gptObj.yield.quantity}
            onSelect={(selectedItem, index) => {
              handleFactorChange(selectedItem / props.gptObj.yield.quantity);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return `↕️ ${selectedItem}`;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={{width:"100px"}}
            buttonTextStyle={{color: "#0f6bea"}}
            dropdownStyle={{height:"480px"}}
            rowStyle={{minHeight:"40px"}}
          />
        ) : (
          // neither are null
          <SelectDropdown
            style={{flex: 1}}
            data={yields}
            defaultButtonText={`↕️ ${props.gptObj.yield.quantity}`}
            defaultValue={props.gptObj.yield.quantity}
            onSelect={(selectedItem, index) => {
              handleFactorChange(selectedItem / props.gptObj.yield.quantity);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return `↕️ ${selectedItem}`;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={{width:"100px"}}
            buttonTextStyle={{color: "#0f6bea", fontSize: "16px", backgroundColor:"rgba(0,0,0,0)"}}
            dropdownStyle={{height:"480px"}}
            rowStyle={{minHeight:"40px"}}
          />
        )}
        <Text style={{flex: 1}}>{props.gptObj.yield.units}</Text>
      </View>
    ) : null}

    {/* Ingredients Section */}
    <View id="ingredientsView" style={styles.ingredientsView}>
      {props.gptObj ? (
        <View>
          <Text style={styles.title}>Ingredients:</Text>
          
          {props.gptObj.ingredients.map((ingredient, index) => (
            <View style={styles.ingredientRow} key={index}>
              <Checkbox.Android
                  status={ingredientChecks[index] === true ? 'checked' : "unchecked"}
                  onPress={() => {
                  ingredientCheckChange(index);
                  }}
                  uncheckedColor="darkgrey"
                  color="#0f6bea"
              />
                <TextInput
                  defaultValue={fractions[index] ? fractions[index].slice(0, -1) : ''}
                  onChange={(text) => handleIngredientFactor(index, text)}
                  editable={fractions[index] !== ""}
                  keyboardType="numeric"
                  style={{minWidth: "50px", maxWidth: "50px", textAlign: "center", color: "#0f6bea", borderWidth: fractions[index] == "" ? 0 : 1, borderRadius: 10, margin: 10, borderColor: "darkgrey"}}
                  width={50}
                  onBlur={(thisInput) => {
                    const newText = thisInput.nativeEvent.text
                    if (["", "0"].includes(newText) || !isNaN(newText)) {
                      console.log(newText)
                    }
                  }}
                />
                <TextInput
                  defaultValue={fractions[index] ? fractions[index].slice(0, -1) : ''}
                  onChange={(text) => handleIngredientFactor(index, text)}
                  value={fractions[index].slice(0, -1)}
                  editable={fractions[index] !== ""}
                  keyboardType="numeric"
                  style={{minWidth: "50px", maxWidth: "50px", textAlign: "center", color: "#0f6bea", borderWidth: fractions[index] == "" ? 0 : 1, borderRadius: 10, margin: 10, borderColor: "darkgrey"}}
                  width={50}
                  onBlur={(thisInput) => {
                    const newText = thisInput.nativeEvent.text
                    if (["", "0"].includes(newText) || !isNaN(newText)) {
                      console.log(newText)
                    }
                  }}
                />
                <Text>{ingredient.quantity.unit} {ingredient.food}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>

    {/* Instructions Section */}
    <View id="instructionsView" style={styles.instructionsView}>
      {props.gptObj ? (
        <View>
          <Text style={styles.title}>Instructions:</Text>
          {props.gptObj.instructions.map((instruction, index) => (
            <View style={styles.instructionRow} key={index}>
              <Checkbox
                  status={instructionChecks[index] === true ? 'checked' : "unchecked"}
                  onPress={() => {
                  instructionCheckChange(index);
                }}
              />
              <Text
                style={{
                  textDecorationLine: instructionChecks[index] ? "line-through" : "none",
                }}
              >
                {index + 1}. {instruction}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  </View>
));
};

export default Result;
