import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator,SafeAreaView,TextInput,ImageBackground} from 'react-native';  
import { StatusBar } from 'expo-status-bar';
import axios from "axios";

export default function App() {
  const [input, setInput] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const Clear = () => {
    setInput('');
    setPokemon(null);
    setError(null);
  };
  
  const Search = async () => {
    if (!input.trim().toLowerCase) {
      setError("Please enter a Pokemon Name or ID");
      return;
    }
    setLoading(true);
    setError(null);
    


    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${input}`);
      setPokemon(response.data);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }

        } 
        
    catch (err) {   setError(err.message);    setPokemon(null);} 
    finally {
      setLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ImageBackground 
        source={require('../../pokedex.png')} 
        style={styles.backgroundImage}
        resizeMode="contain"
      >
        <View style={styles.pokemonDisplayArea}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : pokemon ? (
            <View style={styles.pokemonContainer}>
              <Image 
                source={{ uri: pokemon.sprites.front_default }} 
                style={styles.pokemonImage} 
                resizeMode="contain"
              />
              <Text style={styles.pokemonName}>{pokemon.name.toUpperCase()}</Text>
              <Text>#{pokemon.id}</Text>
              <Text >Type: {pokemon.types.map(type => type.type.name).join(', ')}</Text>
              <Text >Height: {pokemon.height/10}m</Text>
              <Text >Weight: {pokemon.weight/10}kg</Text>
            </View>
          ) : (
            <Text style={styles.placeholderText}>No Pokemon</Text>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>ENTER NAME OR NUMBER</Text>
          <TextInput
  style={[styles.nameInput, error && { borderColor: '#FF4444', borderWidth: 1 }]}
  value={input}
  onChangeText={(text) => {
    setInput(text);
    if (error) setError(null); 
  }}
  placeholder={error ? error : "Pokemon name/id"}
  placeholderTextColor={error ? "#FF4444" : "rgba(255,255,255,0.5)"}
  onSubmitEditing={Search}
/>
        </View>

        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.search} onPress={Search}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clear} onPress={Clear}>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  pokemonDisplayArea: {
    position: 'absolute',
    top: '15%',
    width: '65%',
    height: '30%',
  },
  pokemonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  placeholderText: {
    color: '#333',
    fontStyle: 'italic',
  },
  errorText: {
    color: '#FF0000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    top: '52%', 
    left: '40',
    width: '80%',
    backgroundColor: '#000066',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  inputLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  nameInput: {
    width: '90%',
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  actionButtonsRow: {
    position: 'absolute',
    top: '79%', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    left: '10%',
  },
  search: {
    width: '35%',
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
    right: '9.5%', 
  },
  clear: {
    width: '35%',
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
    right: '38%', 
  },
  transparenttext: {
    color: 'transparent',
    fontSize: 14,
    fontWeight: 'bold',
  },
});