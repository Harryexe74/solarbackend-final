// import mongoose from 'mongoose';

// const subscriberSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   subscriptionDate: { type: Date, default: Date.now }
// });

// const Subscriber = mongoose.model('Subscriber', subscriberSchema);
// export default Subscriber;



import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true, // Store emails in lowercase
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email format validation
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create Subscriber model
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

export default Subscriber;
