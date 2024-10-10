// import mongoose from "mongoose"

// export const buildFilterQuery = (query) => {
//     const {
//         category, latest, newArrival, status, userId, userType, vendorNew4Days
//     } = query;
//     let filter = {};

//     if (category) filter.category = category;

//     if (status) filter.status = status;


 
//     // if (userId) filter.userId = userId;
//     if (userId) filter.userId = new mongoose.Types.ObjectId(userId);

//     if (userType) filter.userType = userType;

//       if (vendorNew4Days === 'true') {
//         const last4Days = new Date();
//         last4Days.setDate(last4Days.getDate() - 4);
//         filter.createdAt = { $gte: last4Days };
//         delete filter.createdAt;
//     }
//     if (latest === 'true') {
//         const last7Days = new Date();
//         last7Days.setDate(last7Days.getDate() - 7);
//         filter.createdAt = { $gte: last7Days };
//     }

//     if (newArrival === 'true') {
//         const last30Days = new Date();
//         last30Days.setDate(last30Days.getDate() - 30);
//         filter.createdAt = { $gte: last30Days };
//     }

//     return filter;
// };

// export const buildSortOptions = (sort, order) => {
//     let sortOptions = {};
//     if (sort) {
//         sortOptions[sort] = order === 'asc' ? 1 : -1;
//     } else {
//         sortOptions.createdAt = -1;
//     }
//     return sortOptions;
// };



import mongoose from "mongoose";

export const buildFilterQuery = (query) => {
    const {
        category, latest, newArrival, status, userId, userType, vendorNew4Days
    } = query;
    
    let filter = {};

    // Filter by category if provided
    if (category) filter.category = category;

    // Filter by status if provided
    if (status) filter.status = status;

    // Filter by user ID (convert to ObjectId if valid)
    if (userId) {
        try {
            filter.userId = new mongoose.Types.ObjectId(userId);
        } catch (error) {
            console.error("Invalid userId format:", userId);
        }
    }

    // Filter by user type if provided
    if (userType) filter.userType = userType;

    // Filter for vendor created within the last 4 days
    if (vendorNew4Days === 'true') {
        const last4Days = new Date();
        last4Days.setDate(last4Days.getDate() - 4);
        filter.createdAt = { $gte: last4Days };
    }

    // Filter for latest created items within the last 7 days
    if (latest === 'true') {
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);
        filter.createdAt = { ...filter.createdAt, $gte: last7Days };
    }

    // Filter for new arrivals within the last 30 days
    if (newArrival === 'true') {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        filter.createdAt = { ...filter.createdAt, $gte: last30Days };
    }

    return filter;
};

export const buildSortOptions = (sort, order) => {
    let sortOptions = {};
    if (sort) {
        sortOptions[sort] = order === 'asc' ? 1 : -1; // Ascending or descending order
    } else {
        sortOptions.createdAt = -1; // Default sort by createdAt descending
    }
    return sortOptions;
};
