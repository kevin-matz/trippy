import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    destination: String,
    text: String,
    rating: {
        type: Number,
        min: 0.5,
        max: 5
    }
});

export default mongoose.model("Review", reviewSchema);