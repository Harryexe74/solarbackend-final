
export const buildSearchQuery = (searchParams) => {
    const query = {};

    if (searchParams.orderStatus) {
        query.orderStatus = searchParams.orderStatus;
    }

    if (searchParams.customerId) {
        query.customer = searchParams.customerId;
    }

    // Vendor ID filter
    if (searchParams.vendorId) {
        query.vendor = searchParams.vendorId;
    }

    // Product IDs filter
    if (searchParams.productIds && Array.isArray(searchParams.productIds)) {
        query.products = { $in: searchParams.productIds };
    }

    // Date range filter
    if (searchParams.startDate && searchParams.endDate) {
        query.createdAt = {
            $gte: new Date(searchParams.startDate),
            $lte: new Date(searchParams.endDate)
        };
    }

    // Price range filter
    if (searchParams.minPrice && searchParams.maxPrice) {
        query.totalPrice = {
            $gte: Number(searchParams.minPrice),
            $lte: Number(searchParams.maxPrice)
        };
    }

    // Search term filter across various fields
    if (searchParams.searchTerm) {
        query.$or = [
            { 'products.name': new RegExp(searchParams.searchTerm, 'i') },
            { 'customer.firstName': new RegExp(searchParams.searchTerm, 'i') },
            { 'customer.lastName': new RegExp(searchParams.searchTerm, 'i') },
            { 'vendor.shopName': new RegExp(searchParams.searchTerm, 'i') }
        ];
    }

  // Category ID filter
  if (searchParams.categoryId) {
    query['products.category._id'] = searchParams.categoryId;
}






    console.log('Search Query:', query); // For debugging purposes

    return query;
};


// export const buildSearchQuery = (searchParams) => {
//     const query = {};

//     const {
//         orderStatus,
//         customerId,
//         vendorId,
//         productIds,
//         startDate,
//         endDate,
//         minPrice,
//         maxPrice,
//         searchTerm,
//         categoryId,
//     } = searchParams;

//     // Add order status filter
//     if (orderStatus) {
//         query.orderStatus = orderStatus;
//     }

//     // Add customer ID filter
//     if (customerId) {
//         query.customer = customerId;
//     }

//     // Add vendor ID filter
//     if (vendorId) {
//         query.vendor = vendorId;
//     }

//     // Add product IDs filter
//     if (Array.isArray(productIds)) {
//         query.products = { $in: productIds };
//     }

//     // Add date range filter
//     if (startDate && endDate) {
//         query.createdAt = {
//             $gte: new Date(startDate),
//             $lte: new Date(endDate)
//         };
//     }

//     // Add price range filter
//     if (minPrice && maxPrice) {
//         const min = Number(minPrice);
//         const max = Number(maxPrice);
        
//         // Ensure valid price range
//         if (!isNaN(min) && !isNaN(max) && min <= max) {
//             query.totalPrice = {
//                 $gte: min,
//                 $lte: max
//             };
//         }
//     }

//     // Add search term filter across various fields
//     if (searchTerm) {
//         query.$or = [
//             { 'products.name': new RegExp(searchTerm, 'i') },
//             { 'customer.firstName': new RegExp(searchTerm, 'i') },
//             { 'customer.lastName': new RegExp(searchTerm, 'i') },
//             { 'vendor.shopName': new RegExp(searchTerm, 'i') }
//         ];
//     }

//     // Add category ID filter
//     if (categoryId) {
//         query['products.category._id'] = categoryId;
//     }

//     console.log('Search Query:', query); // For debugging purposes

//     return query;
// };
