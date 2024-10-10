// import Category from '../models/categoryModel.js';

// export const validateSlug = async (Model, slug) => {
//     const obj = slug ? await Model.findOne({ slug }) : null;
//     if (slug && !obj) {
//         throw new Error(`Invalid ${Model.modelName.toLowerCase()} slug`);
//     }
//     return obj;
// };

// export const validateProductDependencies = async ({ category }) => {
//     const categoryObj = await validateSlug(Category, category);
 


   
//     return {
//         categoryObj,
        
//     };
// };





import Category from '../models/categoryModel.js';

/**
 * Validate that a slug exists in the given model.
 * @param {Model} Model - The Mongoose model to check against.
 * @param {string} slug - The slug to validate.
 * @returns {Object|null} - The found object or null.
 * @throws {Error} - Throws an error if the slug is invalid.
 */
export const validateSlug = async (Model, slug) => {
    if (!slug) return null; // Return null if no slug is provided

    const obj = await Model.findOne({ slug });
    if (!obj) {
        throw new Error(`Invalid ${Model.modelName.toLowerCase()} slug: ${slug}`);
    }

    return obj; // Return the found object
};

/**
 * Validate product dependencies, such as category existence.
 * @param {Object} dependencies - An object containing dependencies.
 * @param {string} dependencies.category - The category slug to validate.
 * @returns {Object} - An object containing validated dependencies.
 * @throws {Error} - Throws an error if any dependency is invalid.
 */
export const validateProductDependencies = async ({ category }) => {
    const categoryObj = await validateSlug(Category, category);
    
    return {
        categoryObj,
    };
};

