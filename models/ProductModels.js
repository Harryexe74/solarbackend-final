

// import mongoose from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';
// const reviewSchema = new mongoose.Schema({
//     customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
//     reviewText: { type: String, required: true },
//     rating: { type: Number, required: true, min: 1, max: 5 },
//     status: {
//         type: String,
//         enum: ['Active', 'Inactive'],
//         default: 'Active'
//     },
// }, { timestamps: true });



// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "Product name is required"]
//     },

//     description: {
//         type: String,
//         required: [true, "Product description is required"]
//     },
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         // required: [true, "Category is required"]
//     },
//     sku: {
//         type: String,
//         required: [true, "SKU is required"]
//     },

//     price: {
//         type: Number,
//         required: [true, "Price is required"]
//     },

//     discountAmount: {
//         type: Number
//     },
//     stock: {
//         type: Number,
//         required: [true, "Stock is required"]
//     },
//     thumbnail: String,
//     images: [String],
//     status: {
//         type: String,
//         enum: ['pending', 'approved', 'rejected'],
//         default: 'pending'
//     },
     
//     reviews: [reviewSchema],
// }, {
//     timestamps: true
// });

// productSchema.plugin(mongoosePaginate);
// const Product = mongoose.model('Product', productSchema);

// export default Product;


import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Review schema
const reviewSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'Customer reference is required.']
    },
    reviewText: {
        type: String,
        required: [true, 'Review text is required.']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required.'],
        min: [1, 'Rating must be at least 1.'],
        max: [5, 'Rating cannot exceed 5.']
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
}, { timestamps: true });

// Product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.']
    },
    description: {
        type: String,
        required: [true, 'Product description is required.']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required.'] // Make category required
    },
    sku: {
        type: String,
        required: [true, 'SKU is required.'],
        unique: true // Consider making SKU unique
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
        min: [0, 'Price cannot be negative.'] // Ensure price is non-negative
    },
    discountAmount: {
        type: Number,
        min: [0, 'Discount amount cannot be negative.'], // Ensure discount is non-negative
        validate: {
            validator: function (v) {
                return v <= this.price; // Ensure discount does not exceed the price
            },
            message: 'Discount amount cannot exceed the product price.'
        },
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required.'],
        min: [0, 'Stock cannot be negative.'] // Ensure stock is non-negative
    },
    thumbnail: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))$/.test(v); // Validate image URL format
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    },
    images: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.every(url => /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))$/.test(url)); // Validate each image URL
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    reviews: [reviewSchema],
}, {
    timestamps: true
});

// Add pagination plugin
productSchema.plugin(mongoosePaginate);

// Create Product model
const Product = mongoose.model('Product', productSchema);

export default Product;
