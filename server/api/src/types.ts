export interface Game {
    id?: number;
    title: string;
    originalPrice: number;
    discountPercentage?: number;
    genres: string[];
    platform: string;
    imageUrl: string;
  }