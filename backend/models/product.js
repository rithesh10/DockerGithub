import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  inStock: Boolean
});

const Product = mongoose.model('Product1', productSchema);
export default Product;
