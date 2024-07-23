import { Router } from "express";
import Review from "../models/review.js";
import * as util from "../utils/response_utils.js";
import { body, checkExact, param, validationResult } from "express-validator";

const router = Router();

router.get("/", (_, response) => {
    util.responseOnline(response);
});

router.get("/get/all", async (request, response) => {
    try {
        const userId = request.session.userId;
        if (!userId) {
            util.responseUnauthorized(response);
            return;
        }
        const reviews = await Review.find({ author: userId });
        util.responseSuccess(response, reviews);
    } catch (error) {
        util.responseInternalError(response, error);
    }
});

router.get("/get/dest/:destination", checkExact([
    param("destination").exists().isString().notEmpty()
]), async (request, response) => {
    try {
        const destination = request.params.destination;
        const reviews = await Review.find({ destination: destination }).populate({
            path: "author",
            select: "username -_id"
        });
        util.responseSuccess(response, reviews);
    } catch (error) {
        util.responseInternalError(response, error);
    }
});

router.post("/", checkExact([
    body("destination").exists().isString().notEmpty(),
    body("text").exists().isString().notEmpty(),
    body("rating").exists().isFloat({ min: 0.5, max: 5 })
]), async (request, response) => {
    try {
        if (!request.session.userId) {
            util.responseUnauthorized(response);
            return;
        }
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            util.responseBadInput(response, errors);
            return;
        }
        const author = request.session.userId;
        const { destination, text, rating } = request.body;
        const result = await Review.findOne({ author: author, destination: destination });
        if (result) {
            util.responseBadInput(response, "You already submitted a review for this destination");
            return;
        }
        const review = await Review.create({
            author: author,
            destination: destination,
            text: text,
            rating: rating
        });
        const saved = await review.save();
        util.responseSuccess(response, saved);
    } catch (error) {
        util.responseInternalError(response, error);
    }
});

router.put("/:id", checkExact([
    param("id").exists().isString().notEmpty(),
    body("text").optional().isString().notEmpty(),
    body("rating").optional().isFloat({ min: 0.5, max: 5 })
]), async (request, response) => {
    try {
        if (!request.session.userId) {
            util.responseUnauthorized(response);
            return;
        }
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            util.responseBadInput(response, errors);
            return;
        }
        if (Object.keys(request.body).length === 0) {
            util.responseBadInput(response, "At least one of text or rating is required");
            return;
        }
        const review = await Review.findById(request.params.id);
        if (!review) {
            util.responseBadInput(response, "Unable to find review for given id");
            return;
        }
        if (review.author != request.session.userId) {
            util.responseForbidden(response);
            return;
        }
        Object.assign(review, request.body);
        const saved = await review.save();
        util.responseSuccess(response, saved);
    } catch (error) {
        util.responseInternalError(response, error);
    }
});

router.delete("/:id", checkExact([
    param("id").exists().isString().notEmpty()
]), async (request, response) => {
    try {
        if (!request.session.userId) {
            util.responseUnauthorized(response);
            return;
        }
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            util.responseBadInput(response, errors);
            return;
        }
        const review = await Review.findById(request.params.id);
        if (!review) {
            util.responseBadInput(response, "Unable to find review for given id");
            return;
        }
        if (review.author != request.session.userId) {
            util.responseForbidden(response);
            return;
        }
        await review.deleteOne();
        util.responseSuccess(response, null);
    } catch (error) {
        console.error(error);
        util.responseInternalError(response, error);
    }
});

export default router;