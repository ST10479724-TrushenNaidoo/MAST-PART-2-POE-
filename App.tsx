// ============================================
// Title: Chef Christoffel's Menu App
// Author: Trushen Keoran Naidoo
// Date: 19/10/2025
// Version: 4.5
// Based on the learning materials of the Independent Institute of Education (IIE)
// ============================================

import React, { useState } from "react"; // React core and useState Hook for managing component state
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native"; // Core React Native components

// React Navigation imports for page navigation and typed props
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

// Picker component for dropdown menu
import { Picker } from "@react-native-picker/picker";

// Type definitions imported from local Type.tsx
import { RootStackParamList, ChefC } from "./Type";

// ============================================
// Predefined Menu Items (Starter, Main, Dessert)
// ============================================
const predefinedItems: ChefC[] = [
  {
    itemName: "Honey Garlic Chicken",
    description:
      "A well based honey garlic chicken with herbs and spices which comes with a side of your choice.",
    category: "Main Meal",
    price: 120,
    intensity: "Balanced",
    image:
      "https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg",
    ingredients: ["Chicken", "Honey", "Rosemary"],
  },
  {
    itemName: "New York Cheesecake",
    description: "A sweet New York styled cheesecake.",
    category: "Dessert",
    price: 80,
    intensity: "Mild",
    image:
      "https://www.onceuponachef.com/images/2017/12/cheesecake-1200x1393.jpg",
    ingredients: ["Crushed cookies", "cream cheese", "Sugar"],
  },
  {
    itemName: "Halloumi, carrot & orange salad",
    description: "A cheesy, healthy salad with tons of flavor.",
    category: "Starter",
    price: 60,
    intensity: "Mild",
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/halloumi-carrot-orange-salad-64b2d8b.jpg?quality=90&resize=440,400",
    ingredients: ["Tomato", "Basil", "Garlic"],
  },
];

// ============================================
// Manage Screen: Add new menu item
// ============================================
function ManageScreen(
  props: NativeStackScreenProps<RootStackParamList, "ManageScreen">
) {
  // State variables for user inputs
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");

  // Form submission logic
  const handleSubmit = () => {
    // Validation: ensure all fields are filled
    if (itemName && description && category && price) {
      const priceValue = parseFloat(price);

      // Validate price must be > 0
      if (priceValue > 0) {
        // Determine intensity level based on price range
        const intensity =
          priceValue < 100
            ? "Mild"
            : priceValue < 200
            ? "Balanced"
            : "Strong";

        // Create a new item object following the ChefC interface
        const newItem: ChefC = {
          itemName,
          description,
          category,
          price: priceValue,
          intensity,
          image,
          ingredients: ingredients.split(",").map((i) => i.trim()),
        };

        // Add new item to existing list using setter passed via navigation params
        props.route.params.setItems([
          ...props.route.params.items,
          newItem,
        ]);

        // Return to the previous screen
        props.navigation.goBack();
      } else {
        Alert.alert("Invalid Price", "Price must be greater than zero.");
      }
    } else {
      Alert.alert(
        "Missing Fields",
        "Please fill out all fields before saving, Thank You!"
      );
    }
  };

  return (
    // View adjusts when keyboard appears (especially on iOS)
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {/* Allows dismissing the keyboard by tapping outside input fields */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.formHeader}>Add a new item to the menu</Text>

          {/* Text inputs for item details */}
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={itemName}
            onChangeText={setItemName}
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          {/* Dropdown Picker for Category Selection */}
          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(value: React.SetStateAction<string>) =>
                  setCategory(value)
                }
                mode="dropdown"
                dropdownIconColor="#000000ff"
                style={styles.pickerStyle}
              >
                <Picker.Item
                  label="Please select a category"
                  value=""
                  color="#999"
                />
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main Meal" value="Main Meal" />
                <Picker.Item label="Dessert" value="Dessert" />
              </Picker>
            </View>
          </View>

          {/* Numeric input for price */}
          <TextInput
            style={styles.input}
            placeholder="Price (e.g. 100)"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          {/* Optional image URL input */}
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={image}
            onChangeText={setImage}
          />

          {/* Image preview only if a valid URL is entered */}
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : null}

          {/* Ingredients input (comma-separated values) */}
          <TextInput
            style={styles.input}
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChangeText={setIngredients}
          />

          {/* Button to save item */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save Item</Text>
          </TouchableOpacity>

          {/* Button to cancel and go back */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// ============================================
// Home Screen: Displays all menu items
// ============================================
function HomeScreen(
  props: NativeStackScreenProps<RootStackParamList, "HomeScreen">
) {
  const [items, setItems] = useState<ChefC[]>(predefinedItems); // Load predefined items by default

  // Remove an item by index with confirmation alert
  const removeItem = (index: number) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => setItems(items.filter((_, i) => i !== index)) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Christoffel's</Text>
      <Text style={styles.subTitle}>Fine Dining Experience</Text>

      {/* Display all menu items using FlatList */}
      <FlatList
        data={items}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            {/* Item Image */}
            <Image source={{ uri: item.image || "" }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.itemName}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <Text style={styles.cardMeta}>
                {item.category}. R{item.price} ({item.intensity})
              </Text>

              {/* Remove Button for each item */}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(index)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Add new item button (navigates to ManageScreen) */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          props.navigation.navigate("ManageScreen", { items, setItems })
        }
      >
        <Text style={styles.addText}>+ Add New Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ============================================
// Welcome Screen: App entry point
// ============================================
function WelcomeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.welcomeContainer}>
      {/* Hero image for background */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1600891963935-5b8e04d9a54a?auto=format&fit=crop&w=1200&q=80",
        }}
        style={styles.heroImage}
      />

      {/* Overlay with welcome text and button */}
      <View style={styles.overlay}>
        <Text style={styles.welcomeTitle}>
          Welcome to Chef Christoffel's Restaurant!
        </Text>
        <Text style={styles.welcomeText}>
          The best food and experience right here for you to try.
        </Text>

        {/* Navigate to Home Screen */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={styles.startText}>Explore Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ============================================
// Main App Component (Navigation Setup)
// ============================================
export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>(); // Stack navigator type-safe declaration

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Welcome Screen */}
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

        {/* Home Screen */}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        {/* Manage Screen */}
        <Stack.Screen
          name="ManageScreen"
          component={ManageScreen}
          options={{
            title: "Add Menu Item",
            headerStyle: { backgroundColor: "#ffffffff" },
            headerTintColor: "#4c00ffff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ============================================
// Stylesheet
// ============================================
const styles = StyleSheet.create({
  // ---------- Welcome Screen ----------
  welcomeContainer: { flex: 1, backgroundColor: "#4169E1" },
  heroImage: { width: "100%", height: "100%", position: "absolute" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  welcomeTitle: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  welcomeText: {
    color: "#fbe9e7",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: "#d7ccc8",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  startText: { color: "#4169E1", fontWeight: "bold", fontSize: 18 },

  // ---------- Home Screen ----------
  container: { flex: 1, backgroundColor: "#efebe9", padding: 15 },
  mainTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#4169E1",
    textAlign: "center",
  },
  subTitle: {
    textAlign: "center",
    color: "#4169E1",
    marginBottom: 15,
    fontSize: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginVertical: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: { width: "100%", height: 220 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 20, fontWeight: "700" },
  cardDesc: { color: "#4169E1" },
  cardMeta: { color: "#41c9e1ff" },
  removeButton: {
    backgroundColor: "#1d42b0ff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  removeText: { color: "#fff", fontWeight: "bold" },
  addButton: {
    backgroundColor: "#4169E1",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    elevation: 4,
  },
  addText: { color: "#fff8e1", fontSize: 18, fontWeight: "bold" },

  // ---------- Manage Screen ----------
  formContainer: { backgroundColor: "#f5f5f5", padding: 20 },
  formHeader: {
    fontSize: 24,
    color: "#2352e0ff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#29a3c5ff",
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 50,
    justifyContent: "center",
    marginVertical: 8,
  },
  pickerWrapper: { marginVertical: 10 },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4169E1",
    marginBottom: 6,
    marginLeft: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#8bdadeff",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: 50,
    justifyContent: "center",
  },
  pickerStyle: {
    height: 50,
    width: "100%",
    color: "#071749ff",
    fontSize: 15,
    paddingHorizontal: 10,
  },
  imagePreview: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginTop: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  saveButton: {
    backgroundColor: "#4169E1",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  cancelButton: { alignItems: "center", marginTop: 10 },
  cancelButtonText: { color: "#5070d1ff", fontWeight: "bold" },
});


// REFERENCES

// Author: W3Schools
// Version: Latest (2025)
// Title: HTML Form Tag Reference
// Available At: https://www.w3schools.com/tags/tag_form.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: HTML Input Tag Reference
// Available At: https://www.w3schools.com/tags/tag_input.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: HTML Select and Option Tags Reference
// Available At: https://www.w3schools.com/tags/tag_select.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: HTML Textarea Tag Reference
// Available At: https://www.w3schools.com/tags/tag_textarea.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: JavaScript Array Methods
// Available At: https://www.w3schools.com/js/js_array_methods.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: JavaScript Conditional (Ternary) Operator
// Available At: https://www.w3schools.com/js/js_comparisons.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: JavaScript Functions
// Available At: https://www.w3schools.com/js/js_functions.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: JavaScript JSON Reference (parse and stringify)
// Available At: https://www.w3schools.com/js/js_json_intro.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: JavaScript split() Method
// Available At: https://www.w3schools.com/jsref/jsref_split.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: JavaScript Variables and let Keyword
// Available At: https://www.w3schools.com/js/js_let.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: JavaScript ES6 Features Overview
// Available At: https://www.w3schools.com/js/js_es6.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: React JSX Syntax
// Available At: https://www.w3schools.com/react/react_jsx.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: React Components
// Available At: https://www.w3schools.com/react/react_components.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: React useState Hook
// Available At: https://www.w3schools.com/react/react_usestate.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: React useEffect Hook
// Available At: https://www.w3schools.com/react/react_useeffect.asp
