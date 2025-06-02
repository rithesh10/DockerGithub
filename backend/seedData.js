const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/productcatalog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

// Sample data generation
const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty', 'Toys', 'Automotive'];
const productNames = [
  'Smartphone', 'Laptop', 'Headphones', 'T-Shirt', 'Jeans', 'Sneakers', 'Novel', 'Cookbook',
  'Chair', 'Table', 'Lamp', 'Basketball', 'Tennis Racket', 'Lipstick', 'Shampoo', 'Action Figure',
  'Board Game', 'Car Phone Mount', 'Bluetooth Speaker', 'Tablet', 'Watch', 'Sunglasses', 'Backpack',
  'Coffee Maker', 'Blender', 'Microwave', 'TV', 'Gaming Console', 'Keyboard', 'Mouse', 'Monitor',
  'Dress', 'Jacket', 'Boots', 'Hat', 'Gloves', 'Scarf', 'Textbook', 'Magazine', 'Journal',
  'Sofa', 'Bed', 'Pillow', 'Blanket', 'Curtains', 'Mirror', 'Soccer Ball', 'Golf Club',
  'Yoga Mat', 'Dumbbells', 'Perfume', 'Face Cream', 'Toothbrush', 'Puzzle', 'Doll',
  'Remote Control Car', 'LEGO Set', 'Phone Case', 'Charger', 'Power Bank', 'Camera'
];

function generateRandomProduct(index) {
  const randomName = productNames[Math.floor(Math.random() * productNames.length)];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomPrice = parseFloat((Math.random() * 999 + 1).toFixed(2));
  const randomStock = Math.random() > 0.2; // 80% chance of being in stock

  return {
    name: `${randomName} ${index + 1}`,
    price: randomPrice,
    category: randomCategory,
    inStock: randomStock
  };
}

async function seedDatabase() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Generate 100 products
    const products = [];
    for (let i = 0; i < 100; i++) {
      products.push(generateRandomProduct(i));
    }

    // Insert products into database
    await Product.insertMany(products);
    console.log('Successfully seeded 100 products into the database');

    // Display first 5 products as sample
    const sampleProducts = await Product.find({}).limit(5);
    console.log('\nSample products:');
    sampleProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price} - ${product.category} - ${product.inStock ? 'In Stock' : 'Out of Stock'}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();