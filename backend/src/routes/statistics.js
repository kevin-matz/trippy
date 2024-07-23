import { Router, response } from "express";
import * as util from "../utils/response_utils.js";
import User from "../models/user.js";
import Review from "../models/review.js";

const router = Router();

router.get("/", (_, response) => {
  util.responseOnline(response);
});

router.get("/usercount", async (_, response) => {
  try {
    const userCount = await User.countDocuments({});
    util.responseSuccess(response, userCount);
  } catch (error) {
    util.responseInternalError(response, error);
  }
});

router.get("/reviewcount", async (_, response) => {
  try {
    const reviewCount = await Review.countDocuments({});
    util.responseSuccess(response, reviewCount);
  } catch (error) {
    util.responseInternalError(response, error);
  }
});

router.get("/mostreviewedplace", async (_, response) => {
  try {
    // ChatGPT Prompt: How could i get the destination with the most reviews and the exact number of reviews this destination has?
    const result = await Review.aggregate([
      // Group by destination and count the number of reviews
      {
        $group: {
          _id: "$destination",
          count: {
            $sum: 1
          }
        }
      },
      // Sort by count in descending order
      {
        $sort: {
          count: -1
        }
      },
      // Limit to one document
      {
        $limit: 1
      },
      // Rename _id to destination
      {
        $project: {
          _id: false,
          destination: "$_id",
          count: true
        }
      }
    ]);
    util.responseSuccess(response, result[0]);
  } catch (error) {
    util.responseInternalError(response, error);
  }
});

router.get("/bestratedplace", async (_, response) => {
  try {
    const result = await Review.aggregate([
      // Group by destination, calculate average rating
      {
        $group: {
          _id: "$destination",
          average_rating: {
            $avg: "$rating"
          }
        }
      },
      // Sort by average rating (descending)
      {
        $sort: {
          average_rating: -1
        }
      },
      // Limit to one document
      {
        $limit: 1
      },
      {
        $project: {
          _id: false,
          destination: "$_id",
          average_rating: true
        }
      }
    ]);
    util.responseSuccess(response, result[0]);
  } catch (error) {
    util.responseInternalError(response, error);
  }
});

router.get("/averagerating", async (_, response) => {
  try {
    const result = await Review.aggregate([
      // Group all reviews ("by null"), calculate avgerage rating
      {
        $group: {
          _id: null,
          average_rating: {
            $avg: "$rating"
          }
        }
      },
      {
        $project: {
          _id: false,
          average_rating: true
        }
      }
    ]);
    util.responseSuccess(response, result[0].average_rating);
  } catch (error) {
    util.responseInternalError(response, error);
  }
});

export default router;