import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  ImageBackground
} from 'react-native';  
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLetterPress = (letter) => {
    setInputValue(inputValue + letter);
  };

  const handleNumberPress = (number) => {
    setInputValue(inputValue + number);
  };
  
  const handleClear = () => {
    setInputValue('');
    setPokemon(null);
    setError(null);
  };
  
  const handleSearch = async () => {
    if (!inputValue.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`);
      
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError(err.message);
      setPokemon(null);
    } finally {
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
              <Text style={styles.pokemonInfo}>#{pokemon.id}</Text>
              <Text style={styles.pokemonInfo}>Type: {pokemon.types.map(type => type.type.name).join(', ')}</Text>
              <Text style={styles.pokemonInfo}>Height: {pokemon.height/10}m</Text>
              <Text style={styles.pokemonInfo}>Weight: {pokemon.weight/10}kg</Text>
            </View>
          ) : (
            <Text style={styles.placeholderText}>No Pokemon</Text>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>ENTER NAME OR NUMBER</Text>
          <TextInput
            style={styles.nameInput}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Pokemon name/id"
            placeholderTextColor="rgba(255,255,255,0.5)"
            onSubmitEditing={handleSearch}
          />
        </View>

        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.actionButtonText}>SEARCH</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.actionButtonText}>CLEAR</Text>
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
  pokemonInfo: {
    fontSize: 12,
    color: '#000',
    marginTop: 2,
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
  searchButton: {
    width: '35%',
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
    right: '9.5%', 
  },
  clearButton: {
    width: '35%',
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
    right: '38%', 
  },
  actionButtonText: {
    color: 'transparent',
    fontSize: 14,
    fontWeight: 'bold',
  },
});