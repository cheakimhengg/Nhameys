export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface FoodCategory {
  id: number;
  category: string;
  items: FoodItem[];
}

export interface FoodResponse {
  message: string;
  status: number;
  foodData: FoodCategory[];
}
