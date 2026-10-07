export type MenuCategory =
  | "Signatures"
  | "Sizzlers"
  | "Tandoor & Kebabs"
  | "Continental"
  | "Desserts"
  | "Beverages";

export interface MenuItem {
  id: string;                         // Unique document ID e.g. "chelo-kebab-original"
  name: string;                       // e.g. "The Original Chelo Kebab"
  category: MenuCategory;             // Category matching MenuCategory union
  price: number;                      // Price in INR e.g. 495
  currency: string;                   // Currency symbol e.g. "₹"
  description: string;                // Evocative culinary description
  heritageNotes: string;              // Historical lore and Park Street culinary tradition
  isSignature: boolean;               // Flagship highlight flag
  dietary: "veg" | "non-veg";         // Dietary classification
  badge?: string;                     // Vintage badge e.g. "Heritage 1975", "Smoking Sizzler"
  servingStyle?: string;              // Description of plating e.g. "Served on sizzling cast-iron platter"
  pairingNotes?: string;              // Recommended beverage or accompaniment
  spiceLevel?: 1 | 2 | 3;             // Heat level: 1 (Mild), 2 (Medium), 3 (Robust)
  imageUrl?: string;                  // Image asset path e.g. "/images/chelo_kebab.png"
  order: number;                      // Display priority sorting index
  available?: boolean;                // Availability flag (defaults to true)
  createdAt?: string;                 // ISO creation timestamp
  updatedAt?: string;                 // ISO update timestamp
}

export const MENU_CATEGORIES: readonly MenuCategory[] = [
  "Signatures",
  "Sizzlers",
  "Tandoor & Kebabs",
  "Continental",
  "Desserts",
  "Beverages",
] as const;
