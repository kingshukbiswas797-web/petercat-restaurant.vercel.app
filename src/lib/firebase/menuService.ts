import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db, firebaseConfig } from "./config";
import type { MenuItem, MenuCategory } from "@/types/menu";

/**
 * Authentic Peter Cat Kolkata catalogue containing the legendary culinary creations
 * perfected at 18 Park Street since 1975.
 */
export const DEMO_FALLBACK_MENU: MenuItem[] = [
  // 1. SIGNATURES
  {
    id: "chelo-kebab-original",
    name: "The Original Chelo Kebab",
    category: "Signatures",
    price: 495,
    currency: "₹",
    description:
      "Minced mutton seekh and grilled chicken tender kebabs laid on a bed of steamed basmati rice, crowned with a medallion of fresh butter, a sunny-side-up fried egg, and fire-charred tomatoes.",
    heritageNotes:
      "Park Street's crown jewel since the 1970s. Introduced by founder Nitin Kothari, this Persian-inspired masterpiece remains Kolkata's most sacred dining ritual.",
    isSignature: true,
    dietary: "non-veg",
    badge: "Heritage 1975",
    servingStyle: "Served on a warm oval platter with melting salted butter",
    pairingNotes: "Pairs exquisitely with Vintage Kolkata Shandy",
    spiceLevel: 1,
    imageUrl: "/images/chelo_kebab.png",
    order: 1,
    available: true,
  },
  {
    id: "chelo-kebab-special",
    name: "Chelo Kebab Special (All-Mutton)",
    category: "Signatures",
    price: 540,
    currency: "₹",
    description:
      "Double skewers of heritage spiced mutton seekh kebabs over buttery steamed rice with poached egg and grilled tomato.",
    heritageNotes:
      "Crafted for the purist connoisseur who demands the original rich spice blend perfected across half a century.",
    isSignature: true,
    dietary: "non-veg",
    badge: "Connoisseur's Choice",
    servingStyle: "Served on steaming bed of long-grain basmati with dollop of salted table butter",
    pairingNotes: "Pairs with Darjeeling First Flush",
    spiceLevel: 2,
    imageUrl: "/images/chelo_kebab.png",
    order: 2,
    available: true,
  },

  // 2. SMOKING SIZZLERS
  {
    id: "sizzler-house-mixed",
    name: "Peter Cat House Mixed Sizzler",
    category: "Sizzlers",
    price: 520,
    currency: "₹",
    description:
      "Tender mutton steak, chicken supreme, cocktail sausage, and fried egg served sizzling over a smoking cast-iron platter with French fries and buttered vegetables.",
    heritageNotes:
      "Carried across the dining hall by turbaned stewards amidst billowing herb-butter smoke.",
    isSignature: true,
    dietary: "non-veg",
    badge: "Smoking Sizzler",
    servingStyle: "Served on a scorching cast-iron cow-shaped skillet with caramelised onions",
    pairingNotes: "Vintage Kolkata Shandy",
    spiceLevel: 2,
    imageUrl: "/images/atmospheric_dining_room.png",
    order: 3,
    available: true,
  },
  {
    id: "sizzler-chicken-steak",
    name: "Chicken Steak Sizzler with Herb Butter",
    category: "Sizzlers",
    price: 460,
    currency: "₹",
    description:
      "Marinated chicken breast seared and flambéed in garlic rosemary butter, surrounded by crispy potato chips and wilted greens.",
    heritageNotes:
      "An enduring Continental classic perfected in Peter Cat's cast-iron pans since 1978.",
    isSignature: false,
    dietary: "non-veg",
    badge: "House Special",
    servingStyle: "Sizzling iron platter with brown jus gravy",
    pairingNotes: "Chilled Beer or Shandy",
    spiceLevel: 1,
    order: 4,
    available: true,
  },
  {
    id: "sizzler-exotic-veg",
    name: "Exotic Veg Sizzler",
    category: "Sizzlers",
    price: 390,
    currency: "₹",
    description:
      "Grilled cottage cheese steaks, button mushrooms, baby corn, and buttered tossed peas on a bed of brown garlic rice on a sizzling iron base.",
    heritageNotes:
      "Specially concocted for Park Street vegetarians craving the signature theatrical sizzler spectacle.",
    isSignature: false,
    dietary: "veg",
    badge: "Vegetarian Flagship",
    servingStyle: "Crackling hot iron platter with herb butter jus",
    spiceLevel: 1,
    order: 5,
    available: true,
  },

  // 3. TANDOOR & KEBABS
  {
    id: "kebab-mutton-boti",
    name: "Mutton Boti Kebab",
    category: "Tandoor & Kebabs",
    price: 440,
    currency: "₹",
    description:
      "Prime lamb chunks marinated overnight in raw papaya, roasted gram flour, and royal spices, char-grilled in clay tandoors.",
    heritageNotes:
      "An ode to Anglo-Indian and Awadhi crosscurrents on Park Street.",
    isSignature: false,
    dietary: "non-veg",
    badge: "Tandoor Legend",
    spiceLevel: 3,
    order: 6,
    available: true,
  },
  {
    id: "kebab-murgh-makhmali",
    name: "Murgh Makhmali Kebab",
    category: "Tandoor & Kebabs",
    price: 410,
    currency: "₹",
    description:
      "Silken chicken morsels coated with cream, green cardamom, and cashew paste, melt-in-mouth texture.",
    heritageNotes:
      "Charcoal-smoked kebabs embodying Mughal decadence tempered for Calcutta palates.",
    isSignature: false,
    dietary: "non-veg",
    badge: "Melt-In-Mouth",
    spiceLevel: 1,
    order: 7,
    available: true,
  },
  {
    id: "kebab-paneer-zaffrani",
    name: "Paneer Tikka Zaffrani",
    category: "Tandoor & Kebabs",
    price: 360,
    currency: "₹",
    description:
      "Fresh cottage cheese cubes infused with saffron, hung curd, and carom seeds, skewered with bell peppers and Spanish onions.",
    heritageNotes:
      "Delicate saffron marination inspired by royal Awadhi vegetarian recipes.",
    isSignature: false,
    dietary: "veg",
    badge: "Saffron Infused",
    spiceLevel: 1,
    order: 8,
    available: true,
  },

  // 4. CONTINENTAL CLASSICS
  {
    id: "continental-beckti-meuniere",
    name: "Beckti Meunière",
    category: "Continental",
    price: 480,
    currency: "₹",
    description:
      "Fresh Kolkata Beckti fillet pan-fried in brown butter, capers, parsley, and lemon juice, served with mashed potatoes.",
    heritageNotes:
      "A colonial-era tribute that has graced Park Street menus since the swinging sixties.",
    isSignature: true,
    dietary: "non-veg",
    badge: "Colonial Classic",
    spiceLevel: 1,
    order: 9,
    available: true,
  },
  {
    id: "continental-chicken-kiev",
    name: "Chicken à la Kiev",
    category: "Continental",
    price: 450,
    currency: "₹",
    description:
      "Golden crumbed chicken breast pocket bursting with cold parsley-herb butter upon the first knife incision.",
    heritageNotes:
      "A theatrical European culinary showpiece that became synonymous with Park Street fine dining.",
    isSignature: false,
    dietary: "non-veg",
    badge: "European Heritage",
    spiceLevel: 1,
    order: 10,
    available: true,
  },

  // 5. OLD-WORLD DESSERTS
  {
    id: "dessert-caramel-custard",
    name: "Classic Caramel Custard",
    category: "Desserts",
    price: 195,
    currency: "₹",
    description:
      "Silky egg custard baked with burnt amber caramel syrup, served chilled.",
    heritageNotes:
      "The undisputed finale to every Peter Cat feast since opening day in 1975.",
    isSignature: true,
    dietary: "veg",
    badge: "Timeless Finale",
    spiceLevel: 1,
    order: 11,
    available: true,
  },
  {
    id: "dessert-baked-alaska",
    name: "Flambéed Baked Alaska",
    category: "Desserts",
    price: 260,
    currency: "₹",
    description:
      "Sponge cake and ice cream encased in browned meringue, flamed with dark rum tableside.",
    heritageNotes:
      "Tableside flame theatre that captivated generations of Kolkata diners.",
    isSignature: false,
    dietary: "veg",
    badge: "Tableside Flambé",
    spiceLevel: 1,
    order: 12,
    available: true,
  },

  // 6. BEVERAGES & BAR
  {
    id: "beverage-kolkata-shandy",
    name: "Vintage Kolkata Shandy",
    category: "Beverages",
    price: 220,
    currency: "₹",
    description:
      "Refreshing colonial blend of chilled ginger beer, house brew, and fresh lime twist served in a chilled pewter mug.",
    heritageNotes:
      "The quintessential afternoon refresher of Park Street connoisseurs.",
    isSignature: true,
    dietary: "veg",
    badge: "House Beverage",
    spiceLevel: 1,
    order: 13,
    available: true,
  },
  {
    id: "beverage-darjeeling-tea",
    name: "Darjeeling First Flush Autumnal Blend",
    category: "Beverages",
    price: 160,
    currency: "₹",
    description:
      "Muscatel-fragrant whole leaf tea harvested from high-elevation estates, brewed in bone china pots.",
    heritageNotes:
      "Single-estate heritage tea preserving the golden age of tea appreciation in Bengal.",
    isSignature: false,
    dietary: "veg",
    badge: "Estate Harvest",
    spiceLevel: 1,
    order: 14,
    available: true,
  },
];

/**
 * Fetches all menu items from Firestore's `menu_items` collection.
 * If Firestore is empty, unconfigured, or offline, smoothly falls back to DEMO_FALLBACK_MENU.
 */
export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    // In demo mode without a local emulator, directly return the authentic fallback catalogue
    const hasEmulator = typeof process !== "undefined" && Boolean(process.env.FIRESTORE_EMULATOR_HOST);
    const isDemoProject = firebaseConfig.projectId.startsWith("demo-");

    if (isDemoProject && !hasEmulator) {
      return DEMO_FALLBACK_MENU;
    }

    const menuCollection = collection(db, "menu_items");
    const fetchPromise = getDocs(menuCollection);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Firestore fetch timeout")), 3000)
    );

    const snapshot = await Promise.race([fetchPromise, timeoutPromise]);

    if (snapshot.empty) {
      return DEMO_FALLBACK_MENU;
    }

    const items: MenuItem[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as Omit<MenuItem, "id">;
      items.push({
        id: docSnap.id,
        ...data,
      });
    });

    return items.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.warn("Firestore menuService fetch fallback activated:", error);
    return DEMO_FALLBACK_MENU;
  }
}

/**
 * Fetches menu items filtered by category.
 */
export async function getMenuItemsByCategory(category: string | MenuCategory): Promise<MenuItem[]> {
  const allItems = await getMenuItems();
  if (!category || category === "All") {
    return allItems;
  }
  return allItems.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Seeds Firestore with the menu catalogue items if live or emulator connection is active.
 */
export async function seedMenuCatalogue(items: MenuItem[] = DEMO_FALLBACK_MENU): Promise<number> {
  let count = 0;
  for (const item of items) {
    const itemRef = doc(db, "menu_items", item.id);
    await setDoc(itemRef, item);
    count++;
  }
  return count;
}
