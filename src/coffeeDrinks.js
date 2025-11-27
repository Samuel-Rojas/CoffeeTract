export const coffeeDrinks = [
    {
      id: 1,
      name: "Espresso",
      caffeine: "strong",
      bitterness: "bold",
      vibes: ["focused", "adventurous"],
      temp: "hot",
      description: "Pure concentrated coffee shot - intense and quick"
    },
    {
      id: 2,
      name: "Americano",
      caffeine: "strong",
      bitterness: "bold",
      vibes: ["focused", "chill"],
      temp: "both",
      description: "Espresso diluted with hot water - strong but smooth"
    },
    {
      id: 3,
      name: "Cappuccino",
      caffeine: "medium",
      bitterness: "balanced",
      vibes: ["comfort", "chill"],
      temp: "hot",
      description: "Equal parts espresso, steamed milk, and foam - classic and creamy"
    },
    {
      id: 4,
      name: "Latte",
      caffeine: "medium",
      bitterness: "mild",
      vibes: ["comfort", "chill"],
      temp: "both",
      description: "Espresso with lots of steamed milk - smooth and milky"
    },
    {
      id: 5,
      name: "Cortado",
      caffeine: "medium",
      bitterness: "balanced",
      vibes: ["chill", "comfort"],
      temp: "hot",
      description: "Equal parts espresso and steamed milk - perfectly balanced"
    },
    {
      id: 6,
      name: "Macchiato",
      caffeine: "strong",
      bitterness: "bold",
      vibes: ["adventurous", "focused"],
      temp: "hot",
      description: "Espresso with just a dash of milk - strong with a hint of smoothness"
    },
    {
      id: 7,
      name: "Flat White",
      caffeine: "medium",
      bitterness: "balanced",
      vibes: ["comfort", "focused"],
      temp: "hot",
      description: "Espresso with microfoam milk - velvety and strong"
    },
    {
      id: 8,
      name: "Mocha",
      caffeine: "medium",
      bitterness: "mild",
      vibes: ["comfort", "adventurous"],
      temp: "both",
      description: "Latte with chocolate - sweet and indulgent"
    },
    {
      id: 9,
      name: "Cold Brew",
      caffeine: "strong",
      bitterness: "mild",
      vibes: ["chill", "focused"],
      temp: "iced",
      description: "Coffee steeped in cold water - smooth and less acidic"
    },
    {
      id: 10,
      name: "Iced Latte",
      caffeine: "light",
      bitterness: "mild",
      vibes: ["chill", "comfort"],
      temp: "iced",
      description: "Espresso over ice with cold milk - refreshing and easy"
    },
    {
      id: 11,
      name: "Affogato",
      caffeine: "medium",
      bitterness: "balanced",
      vibes: ["adventurous", "comfort"],
      temp: "both",
      description: "Espresso poured over vanilla ice cream - dessert in a cup"
    },
    {
      id: 12,
      name: "Red Eye",
      caffeine: "strong",
      bitterness: "bold",
      vibes: ["focused"],
      temp: "hot",
      description: "Drip coffee with a shot of espresso - maximum caffeine kick"
    }
  ];
  
 // Helper function to filter drinks based on user preferences
 export const filterDrinks = (preferences) => {
    const { vibe, caffeine, bitterness, temp } = preferences;
    
    return coffeeDrinks.filter(drink => {
      const matchesCaffeine = drink.caffeine === caffeine;
      const matchesBitterness = drink.bitterness === bitterness;
      const matchesVibe = drink.vibes.includes(vibe);
      const matchesTemp = temp === "either" || drink.temp === temp || drink.temp === "both";
      
      return matchesCaffeine && matchesBitterness && matchesVibe && matchesTemp;
    });
  };
  
  // If no exact matches, find closest match based on priority: vibe > temp > caffeine > bitterness
  export const findBestMatch = (preferences) => {
    let matches = filterDrinks(preferences);
    
    if (matches.length > 0) {
      return matches[0];
    }
    
    // Fallback: relax constraints one by one
    const { vibe, caffeine, bitterness, temp } = preferences;
    
    // Try without bitterness constraint
    matches = coffeeDrinks.filter(drink => 
      drink.caffeine === caffeine && 
      drink.vibes.includes(vibe) &&
      (temp === "either" || drink.temp === temp || drink.temp === "both")
    );
    if (matches.length > 0) return matches[0];
    
    // Try without caffeine constraint
    matches = coffeeDrinks.filter(drink => 
      drink.bitterness === bitterness && 
      drink.vibes.includes(vibe) &&
      (temp === "either" || drink.temp === temp || drink.temp === "both")
    );
    if (matches.length > 0) return matches[0];
    
    // Try just vibe and temp
    matches = coffeeDrinks.filter(drink => 
      drink.vibes.includes(vibe) &&
      (temp === "either" || drink.temp === temp || drink.temp === "both")
    );
    if (matches.length > 0) return matches[0];
    
    // Last resort: just match vibe
    matches = coffeeDrinks.filter(drink => drink.vibes.includes(vibe));
    return matches.length > 0 ? matches[0] : coffeeDrinks[3]; // Default to Latte
  };