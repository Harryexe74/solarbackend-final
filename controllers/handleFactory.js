import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// export const deleteOne = (Model) =>
// 	catchAsync(async (req, res, next) => {
// 		const doc = await Model.findByIdAndDelete(req.params.id);

// 		if (!doc) {
// 			return next(new AppError("No document found with that ID", 404));
// 		}

// 		res.status(204).json({
// 			status: "success",
// 			data: null,
// 		});
// 	});

// export const updateOne = (Model) =>
// 	catchAsync(async (req, res, next) => {
// 		console.log(req.body);
// 		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
// 			new: true,
// 			runValidators: true,
// 		});

// 		if (!doc) {
// 			return next(new AppError("No document found with that ID", 404));
// 		}

// 		res.status(200).json({
// 			status: "success",
// 			doc,
// 		});
// 	});

// export const createOne = (Model) =>
// 	catchAsync(async (req, res, next) => {
// 		console.log(req.body);
// 		const doc = await Model.create(req.body);

// 		res.status(201).json({
// 			status: "success",
// 			doc,
// 		});
// 	});

// export const getOne = (Model, popOptions) =>
// 	catchAsync(async (req, res, next) => {
// 		let query = Model.findById(req.params.id);

// 		if (popOptions) query = query.populate(popOptions);
// 		const doc = await query;

// 		if (!doc) {
// 			return next(new AppError("No document found with that ID", 404));
// 		}

// 		res.status(200).json({
// 			status: "success",
// 			doc,
// 		});
// 	});

// export const getAll = (Model) =>
// 	catchAsync(async (req, res) => {
// 		// To allow nested GET reviews on tour
// 		console.log("GET ALL", req.query);
// 		let filter = {};
// 		if (req?.params?.productId) filter = { tour: req.params.productId };

// 		// EXECUTE QUERY
// 		const features = new APIFeatures(Model.find(filter), req.query)
// 			.filter()
// 			.sort()
// 			.fieldsLimit()
// 			.paginate();

// 		// for more detailed about query
// 		// const doc = await features.query.explain();
// 		const doc = await features.query;

// 		// SEND RESPONSE
// 		res.status(200).json({
// 			status: "success",
// 			results: doc.length,
// 			doc,
// 		});
// 	});


import { sendErrorResponse } from "../utils/responseHandler";

export const createOne = (Model) => async (req, res) => {
    try {
        const document = await Model.create(req.body);
        return document;
    } catch (error) {
        console.error("Error creating document:", error);
        sendErrorResponse(res, error.message || "Failed to create document", 500);
    }
};

export const getAll = (Model) => async (req, res) => {
    try {
        const documents = await Model.find();
        return documents;
    } catch (error) {
        console.error("Error fetching documents:", error);
        sendErrorResponse(res, error.message || "Failed to fetch documents", 500);
    }
};

export const getOne = (Model) => async (req, res) => {
    try {
        const document = await Model.findById(req.params.id);
        if (!document) {
            throw new Error("Document not found");
        }
        return document;
    } catch (error) {
        console.error("Error fetching document:", error);
        sendErrorResponse(res, error.message || "Failed to fetch document", 500);
    }
};

export const updateOne = (Model) => async (req, res) => {
    try {
        const document = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!document) {
            throw new Error("Document not found");
        }
        return document;
    } catch (error) {
        console.error("Error updating document:", error);
        sendErrorResponse(res, error.message || "Failed to update document", 500);
    }
};

export const deleteOne = (Model) => async (req, res) => {
    try {
        const document = await Model.findByIdAndDelete(req.params.id);
        if (!document) {
            throw new Error("Document not found");
        }
        return document;
    } catch (error) {
        console.error("Error deleting document:", error);
        sendErrorResponse(res, error.message || "Failed to delete document", 500);
    }
};
