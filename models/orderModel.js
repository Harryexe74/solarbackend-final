


// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   products: [{
//     product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//     quantity: { type: Number, required: true }
//   }],
//   totalPrice: { type: Number, required: true },
//   status: {
//     type: String,
//     enum: ['Pending', 'Completed', 'Failed'],
//     default: 'Pending'
//   },
//   shippingAddress: {
//     name: { type: String, required: true },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     zipCode: { type: String, required: true },
//     country: { type: String, required: true }
//   },
//   paymentMethod: { type: String, required: true }, // EasyPaisa, JazzCash, Bank Account
//   transactionProof: { type: String }, // Path to uploaded image
// }, { timestamps: true });

// const Order = mongoose.model('Order', orderSchema);

// export default Order;


import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Order must belong to a user.'],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Product reference is required.'],
        },
        quantity: {
          type: Number,
          required: [true, 'Please specify product quantity.'],
          min: [1, 'Quantity cannot be less than 1.'], // Ensure at least 1 item is ordered
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, 'Order must have a total price.'],
      min: [0, 'Total price cannot be negative.'], // Ensure no negative price
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
    },
    shippingAddress: {
      name: {
        type: String,
        required: [true, 'Shipping name is required.'],
      },
      address: {
        type: String,
        required: [true, 'Shipping address is required.'],
      },
      city: {
        type: String,
        required: [true, 'City is required.'],
      },
      zipCode: {
        type: String,
        required: [true, 'ZIP code is required.'],
        // Optional: Validate ZIP code based on specific country patterns
        // validate: {
        //   validator: function (v) {
        //     return /^[0-9]{5}(-[0-9]{4})?$/.test(v); // Example for US ZIP codes
        //   },
        //   message: (props) => `${props.value} is not a valid ZIP code!`,
        // },
      },
      country: {
        type: String,
        required: [true, 'Country is required.'],
      },
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required.'],
      enum: ['EasyPaisa', 'JazzCash', 'Bank Account'], // Limit payment methods to allowed values
    },
    transactionProof: {
      type: String, // Assuming it's the path to an uploaded image
      validate: {
        validator: function (v) {
          // Validate that if provided, it's a valid URL or path to the image
          return v ? /^.*\.(jpg|jpeg|png|pdf)$/i.test(v) : true;
        },
        message: (props) =>
          `${props.value} is not a valid file type. Supported types: jpg, jpeg, png, pdf.`,
      },
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;

