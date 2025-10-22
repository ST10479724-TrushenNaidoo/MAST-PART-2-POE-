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