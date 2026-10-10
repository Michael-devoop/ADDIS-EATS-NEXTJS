export const dishes = [
  {
    id: "d1",
    name: "Pizza",
    price: 2500,
    category: "Mains",
    image: "/images/cat-p.png",
    alt: "Delicious Pizza",
    description: "Delicious Pizza with vegetables of your choice"
  },
  {
    id: "d2",
    name: "Steak & Fries",
    price: 3000,
    category: "Mains",
    image: "/images/tebs2.png",
    alt: "Sizzling prime beef steak tibs sautéed with aromatic rosemary, onions, and crispy rustic fries",
    description: "Tender cubes of premium grass-fed Ethiopian beef flash-seared with niter kibbeh, garlic, and served with rustic fries."
  },
  {
    id: "d3",
    name: "Big Smokey Burger",
    price: 750,
    category: "Mains",
    image: "/images/classic-bu.png",
    alt: "Gourmet double-patty smokey burger with melted artisan cheese, crisp lettuce, and special sauce",
    description: "House-ground beef patties char-grilled over acacia wood coals, topped with aged cheddar, caramelized red onion, and smoky sauce."
  },
  {
    id: "d4",
    name: "buna",
    price: 250,
    category: "Drinks",
    image: "/images/catd.png",
    alt: "Freshly roasted ethiopian coffee beans, brewed using traditional tools",
    description: "Freshly roasted ethiopian coffee beans, brewed using traditional tools"
  },
  {
    id: "d5",
    name: "Shiro Tegabino",
    price: 220,
    category: "Mains",
    image: "/images/shiro.png",
    alt: "Slow-simmered bubbling clay-pot spiced chickpea shiro tegabino with fragrant herbal butter",
    description: "Sun-dried chickpea flour whipped with garlic, ginger, and berbere, slow-simmered and served bubbling hot in an earthen clay pot."
  },
  {
    id: "d6",
    name: "Doro Wat",
    price: 850,
    category: "Mains",
    image: "/images/dorowot1.png",
    alt: "Traditional Ethiopian chicken doro wat slow-cooked in rich berbere reduction with spiced boiled egg",
    description: "The crown jewel of Ethiopian cuisine: slow-cooked chicken drumstick simmered for hours in rich caramelized onion berbere sauce."
  },
  {
    id: "d7",
    name: "Fasting Platter",
    price: 350,
    category: "Starters",
    image: "/images/beyaynet.png",
    alt: "Colorful vegan Yetsom Beyaynet fasting platter featuring gomen, misir wat, and fresh teff injera",
    description: "A vibrant sampler of slow-simmered yellow split peas, spicy red lentils, collard greens, and cabbage served over teff injera."
  }
];

export async function getDishes() {
  return dishes;
}

export async function findDish(id) {
  return dishes.find((d) => d.id === id) || null;
}