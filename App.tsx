// Title: Chef Christoffel's Menu App
// Author: Trushen Keoran Naidoo
// Date: 19/10/2025
// Version: 4.5
// Based on the learning materials of the Independent Institute of Education (IIE)

import React, { useState } from "react";
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
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import { RootStackParamList, ChefC } from "./Type";

// Predefined items
const predefinedItems: ChefC[] = [
  {
    itemName: "Honey Garlic Chicken",
    description: "A well based honey garlic chicken with herbs and spices which comes with a side of your choice.",
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

// ======================
// Manage Screen
// ======================
function ManageScreen(
  props: NativeStackScreenProps<RootStackParamList, "ManageScreen">
) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = () => {
    if (itemName && description && category && price) {
      const priceValue = parseFloat(price);
      if (priceValue > 0) {
        const intensity =
          priceValue < 100
            ? "Mild"
            : priceValue < 200
            ? "Balanced"
            : "Strong";

        const newItem: ChefC = {
          itemName,
          description,
          category,
          price: priceValue,
          intensity,
          image,
          ingredients: ingredients.split(",").map((i) => i.trim()),
        };

        props.route.params.setItems([
          ...props.route.params.items,
          newItem,
        ]);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.formHeader}>Add a new item to the menu</Text>

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

          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(value: React.SetStateAction<string>) => setCategory(value)}
                mode="dropdown"
                dropdownIconColor="#000000ff"
                style={styles.pickerStyle}
              >
                <Picker.Item label="Please select a category" value="" color="#999" />
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main Meal" value="Main Meal" />
                <Picker.Item label="Dessert" value="Dessert" />
              </Picker>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Price (e.g. 100)"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={image}
            onChangeText={setImage}
          />

          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChangeText={setIngredients}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save Item</Text>
          </TouchableOpacity>

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

// ======================
// Home Screen
// ======================
function HomeScreen(
  props: NativeStackScreenProps<RootStackParamList, "HomeScreen">
) {
  const [items, setItems] = useState<ChefC[]>(predefinedItems);

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

      <FlatList
        data={items}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image || "" }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.itemName}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <Text style={styles.cardMeta}>
                {item.category}. R{item.price} ({item.intensity})
              </Text>
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => props.navigation.navigate("ManageScreen", { items, setItems })}
      >
        <Text style={styles.addText}>+ Add New Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ======================
// Welcome Screen
// ======================
function WelcomeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.welcomeContainer}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1600891963935-5b8e04d9a54a?auto=format&fit=crop&w=1200&q=80",
        }}
        style={styles.heroImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.welcomeTitle}>
          Welcome to Chef Christoffel's Restaurant!
        </Text>
        <Text style={styles.welcomeText}>
          The best food and experience right here for you to try.
        </Text>
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

// ======================
// Main App
// ======================
export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
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

// ======================
// Styles
// ======================
const styles = StyleSheet.create({
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
  container: { flex: 1, backgroundColor: "#efebe9", padding: 15 },
  mainTitle: { fontSize: 28, fontWeight: "800", color: "#4169E1", textAlign: "center" },
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