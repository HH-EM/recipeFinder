import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, Button, Alert, Image, KeyboardAvoidingView } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  const buttonPressed = () => {
    const url = 'http://www.recipepuppy.com/api/?i='+ingredient;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      setRecipes(responseJson.results);
    })
    .catch((error) => {
      Alert.alert('Error', error);
    });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: '#CED0CE',
          marginLeft: '10%'
        }}
      />
    );
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
        <FlatList
          style={{marginTop: 70}}
          keyExtractor={item => item.href}
          renderItem={({item}) => 
            <View>
            <Text>{item.title}</Text>
            <Image
              style={{ width:50, height:50 }}
              source={{
                uri:item.thumbnail
              }}
            />
            </View>
          }
          data={recipes}
          ItemSeparatorComponent={listSeparator}
        />
        <TextInput
          style={{fontSize: 18, alignSelf: 'center'}}
          value={ingredient}
          placeholder='Enter ingredient'
          onChangeText={ingredient => setIngredient(ingredient)}
        />
        <Button title='Find' onPress={buttonPressed} />
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
