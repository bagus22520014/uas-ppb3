import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { db } from "@/firebaseConfig";
import { StatusBar } from 'expo-status-bar';

interface Recipe {
  id: string;
  name: string;
  ingredients: string | string[];
  steps: string | string[];
}

const HomeScreen = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const fetchRecipes = async () => {
    const recipeCollection = collection(db, 'recipes');
    const recipeSnapshot = await getDocs(recipeCollection);
    const recipeList = recipeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Recipe));
    setRecipes(recipeList);
  };

  useFocusEffect(
    useCallback(() => {
      fetchRecipes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" translucent={false} backgroundColor="#649bf5" />
      <Text style={styles.title}>RESEP MASAKAN</Text>

      {!selectedRecipe ? (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.recipeContainer}>
              <Text style={styles.recipeTitle}>{item.name}</Text>
              <TouchableOpacity style={styles.button} onPress={() => setSelectedRecipe(item)}>
                <Text style={styles.buttonText}>➔</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.detailContainer}>
            <Text style={styles.detailTitle}>{selectedRecipe.name}</Text>

            <Text style={styles.detailSubtitle}>Bahan-bahan:</Text>
            {Array.isArray(selectedRecipe.ingredients)
              ? selectedRecipe.ingredients.map((ingredient, index) => (
                  <Text key={index} style={styles.detailContent}>{`${index + 1}. ${ingredient}`}</Text>
                ))
              : selectedRecipe.ingredients.split(',').map((ingredient, index) => (
                  <Text key={index} style={styles.detailContent}>{`${index + 1}. ${ingredient.trim()}`}</Text>
                ))
            }

            <Text style={styles.detailSubtitle}>Langkah-langkah:</Text>
            {Array.isArray(selectedRecipe.steps)
              ? selectedRecipe.steps.map((step, index) => (
                  <Text key={index} style={styles.detailContent}>{`${index + 1}. ${step}`}</Text>
                ))
              : selectedRecipe.steps.split(',').map((step, index) => (
                  <Text key={index} style={styles.detailContent}>{`${index + 1}. ${step.trim()}`}</Text>
                ))
            }

            <TouchableOpacity style={styles.buttonBack} onPress={() => setSelectedRecipe(null)}>
              <Text style={styles.buttonText}>Kembali</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recipeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 50,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  recipeTitle: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#256eb3',
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  detailContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 30,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonBack: {
    backgroundColor: '#ff6f61',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
