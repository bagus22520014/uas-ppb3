import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "@/firebaseConfig";
import { Colors } from "@/constants/Colors";
import Alert from "@/components/alert";

const Page = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    steps: [""],
  });
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "info">(
    "info"
  );

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = value;

    if (index === recipe.ingredients.length - 1 && value.trim() !== "") {
      updatedIngredients.push("");
    }

    const nonEmptyIngredients = updatedIngredients.filter(
      (item, i) => item.trim() !== "" || i === updatedIngredients.length - 1
    );

    setRecipe({ ...recipe, ingredients: nonEmptyIngredients });
  };

  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...recipe.steps];
    updatedSteps[index] = value;

    if (index === recipe.steps.length - 1 && value.trim() !== "") {
      updatedSteps.push("");
    }

    const nonEmptySteps = updatedSteps.filter(
      (item, i) => item.trim() !== "" || i === updatedSteps.length - 1
    );

    setRecipe({ ...recipe, steps: nonEmptySteps });
  };

  const handleSubmit = async () => {
    const filteredIngredients = recipe.ingredients.filter(
      (item) => item.trim() !== ""
    );
    const filteredSteps = recipe.steps.filter((item) => item.trim() !== "");

    if (
      !recipe.name.trim() ||
      filteredIngredients.length === 0 ||
      filteredSteps.length === 0
    ) {
      setAlertMessage("Please fill in all required fields.");
      setAlertType("error");
      setAlertVisible(true);
      return;
    }

    const recipeData = {
      ...recipe,
      ingredients: filteredIngredients,
      steps: filteredSteps,
    };

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "recipes"), recipeData);
      console.log("Recipe added with ID: ", docRef.id);
      setAlertMessage("Recipe submitted successfully!");
      setAlertType("success");
      setAlertVisible(true);
      setRecipe({ name: "", ingredients: [""], steps: [""] });
    } catch (error) {
      console.error("Error adding recipe: ", error);
      setAlertMessage("Failed to submit the recipe. Please try again.");
      setAlertType("error");
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const renderIngredients = () => {
    const rows = [];
    for (let i = 0; i < recipe.ingredients.length; i += 2) {
      rows.push(
        <View key={`ingredient-row-${i}`} style={styles.ingredientRow}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder={`Ingredient ${i + 1}`}
            value={recipe.ingredients[i]}
            onChangeText={(text) => handleIngredientChange(i, text)}
          />
          {recipe.ingredients[i + 1] !== undefined && (
            <TextInput
              style={[styles.input, styles.halfWidth]}
              placeholder={`Ingredient ${i + 2}`}
              value={recipe.ingredients[i + 1]}
              onChangeText={(text) => handleIngredientChange(i + 1, text)}
            />
          )}
        </View>
      );
    }
    return rows;
  };

  const renderSteps = () => {
    return recipe.steps.map((step, index) => (
      <TextInput
        key={`step-${index}`}
        style={[styles.input, styles.textarea, styles.marginBottom]}
        placeholder={`Step ${index + 1}`}
        value={step}
        onChangeText={(text) => handleStepChange(index, text)}
        multiline
      />
    ));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.header}>Tambah Resep Baru</Text>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primaryColors} />
          ) : (
            <>
              <Text style={styles.text}>Nama Resep</Text>
              <TextInput
                style={[styles.input, styles.marginBottom]}
                placeholder="Recipe Name"
                value={recipe.name}
                onChangeText={(text) => setRecipe({ ...recipe, name: text })}
              />
              <Text style={styles.text}>Bahan-bahan</Text>
              <View>{renderIngredients()}</View>
              <Text style={styles.text}>Langkah Memasak</Text>
              <View>{renderSteps()}</View>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Simpan Resep</Text>
              </TouchableOpacity>
            </>
          )}
          <Alert
            visible={alertVisible}
            message={alertMessage}
            type={alertType}
            onClose={() => setAlertVisible(false)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  container: {
    margin: 24,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
  halfWidth: {
    width: "48%",
  },
  textarea: {
    height: 60,
    textAlignVertical: "top",
  },
  marginBottom: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.primaryColors,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Page;
