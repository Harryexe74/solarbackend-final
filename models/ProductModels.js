

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const reviewSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
}, { timestamps: true });



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },

    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: [true, "Category is required"]
    },
    sku: {
        type: String,
        required: [true, "SKU is required"]
    },

    price: {
        type: Number,
        required: [true, "Price is required"]
    },

    discountAmount: {
        type: Number
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"]
    },
    thumbnail: String,
    images: [String],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
     
    reviews: [reviewSchema],
}, {
    timestamps: true
});

productSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', productSchema);

export default Product;
