export type ChefC = {
  itemName: string;
  description: string;
  category: string;
  price: number;
  intensity: string;
  image: string;
  ingredients: string[];
};

export type RootStackParamList = {
  WelcomeScreen: undefined;
  HomeScreen: undefined;
  ManageScreen: {
    items: ChefC[];
    setItems: React.Dispatch<React.SetStateAction<ChefC[]>>;
  };
};


// REFERENCES

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
// Available At: https://www.w3schools.com/typescript/typescript_interfaces.php

// Author: W3Schools
// Version: Latest (2025)
// Title: TypeScript Types
// Available At: https://www.w3schools.com/typescript/typescript_types.php
