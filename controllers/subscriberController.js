// import Subscriber from '../models/subscriberModel.js';



// // Add a new subscriber
// export const addSubscriber = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const existingSubscriber = await Subscriber.findOne({ email });
//     if (existingSubscriber) {
//       return res.status(400).json({ message: 'Subscriber already exists' });
//     }
//     const newSubscriber = new Subscriber({ email });
//     await newSubscriber.save();
//     res.status(201).json(newSubscriber);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all subscribers or search subscribers by email
// export const getSubscribers = async (req, res) => {
//     const { searchValue } = req.query;
//     try {
//       let subscribers;
//       if (searchValue) {
//         const regex = new RegExp(searchValue, 'i'); // 'i' makes the search case insensitive
//         subscribers = await Subscriber.find({ email: { $regex: regex } });
//       } else {
//         subscribers = await Subscriber.find();
//       }
//       res.status(200).json(subscribers);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
// // Delete a subscriber by ID
// export const deleteSubscriber = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const subscriber = await Subscriber.findByIdAndDelete(id);
//     if (!subscriber) {
//       return res.status(404).json({ message: 'Subscriber not found' });
//     }
//     res.status(200).json({ message: 'Subscriber deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import Subscriber from '../models/subscriberModel.js';

// Add a new subscriber
export const addSubscriber = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if the email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Subscriber already exists' });
    }

    // Create and save a new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Respond with success
    return res.status(201).json({ message: 'Subscriber added successfully', subscriber: newSubscriber });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
};

// Get all subscribers or search subscribers by email
export const getSubscribers = async (req, res) => {
  const { searchValue } = req.query;
  try {
    let subscribers;

    // Search for subscribers if a search value is provided
    if (searchValue) {
      const regex = new RegExp(searchValue, 'i'); // Case insensitive search
      subscribers = await Subscriber.find({ email: { $regex: regex } });
    } else {
      // Fetch all subscribers if no search value is provided
      subscribers = await Subscriber.find();
    }

    // Respond with the subscribers list
    return res.status(200).json(subscribers);
  } catch (error) {
    // Handle errors
    return res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
};

// Delete a subscriber by ID
export const deleteSubscriber = async (req, res) => {
  const { id } = req.params;
  try {
    // Find and delete the subscriber by ID
    const subscriber = await Subscriber.findByIdAndDelete(id);
    if (!subscriber) {
      // Return a 404 if the subscriber does not exist
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    // Respond with success
    return res.status(200).json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
};
