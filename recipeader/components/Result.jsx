import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from "react-native";
import { useRouter } from "expo-router";
import quantityCalculator from "../utils/quantityCalculator";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

const Result = (props) => {
    // call quantities.js to convert gptobj to grams and milliliters
    useEffect(()=>{
        quantityCalculator(props)
    }, [props.gptObj])

    const handleFactorChange = (text) => {
        props.setFactor(text)
    }

    return (
        <View>
            <TextInput
                value={props.factor}
                onChangeText={handleFactorChange}
            />
            <View id="ingredientsView">
                {
                    props.gptObj ? (
                        <ol>
                            {props.gptObj.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.quantity.amount * props.factor} {ingredient.quantity.unit} {ingredient.food}</li>
                            ))}
                        </ol>
                    ) : null
                }
            </View>
            <View id="instructionsView">
                {
                    props.gptObj ? (
                        <ol>
                            {props.gptObj.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                            ))}
                        </ol>
                    ) :
                    null
                }
            </View>
            <View>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
            </View>
        </View>
    );
}

export default Result;
