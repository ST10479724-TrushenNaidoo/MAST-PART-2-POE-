// ============================================
// Title: Chef Christoffel's Menu App - Type Definitions
// Author: Trushen Keoran Naidoo
// Date: 19/10/2025
// Version: 4.5
// Based on the learning materials of the Independent Institute of Education (IIE)
// ============================================

// ===============================================================
// Type: ChefC
// Description: Defines the structure (shape) of a single menu item
// ===============================================================
export type ChefC = {
  // Name of the dish (e.g., "Honey Garlic Chicken")
  itemName: string;

  // Brief description of the dish
  description: string;

  // Course category of the dish (Starter, Main, or Dessert)
  category: string;

  // Price value of the dish
  price: number;

  // Intensity level based on the price (Mild, Balanced, or Strong)
  intensity: string;

  // Image URL representing the dish visually
  image: string;

  // List of ingredients used in the dish (as an array of strings)
  ingredients: string[];
};

// ===============================================================
// Type: RootStackParamList
// Description: Defines the navigation parameters for each screen
// Used with React Navigation to type-check routes and props
// ===============================================================
export type RootStackParamList = {
  // WelcomeScreen does not require any parameters
  WelcomeScreen: undefined;

  // HomeScreen also does not receive any parameters
  HomeScreen: undefined;

  // ManageScreen receives parameters to manage menu data
  ManageScreen: {
    // Current list of ChefC items passed from HomeScreen
    items: ChefC[];

    // Function used to update the list of items (state setter)
    setItems: React.Dispatch<React.SetStateAction<ChefC[]>>;
  };
};

// ===============================================================
// END OF FILE
// ===============================================================


// ===============================================================
// REFERENCES
// ===============================================================

// Author: W3Schools
// Version: Latest (2025)
// Title: JavaScript Arrays
// Available At: https://www.w3schools.com/js/js_arrays.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: JavaScript Data Types
// Available At: https://www.w3schools.com/js/js_datatypes.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: JavaScript Functions
// Available At: https://www.w3schools.com/js/js_functions.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: JavaScript Objects
// Available At: https://www.w3schools.com/js/js_objects.asp

// Author: W3Schools
// Version: Latest (2025)
// Title: TypeScript Interfaces
// Available At: https://www.w3schools.com/typescript/typescript_types.php
