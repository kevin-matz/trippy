import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    passwordHash: String,
    email: String,
    registeredAt: Date,
    passwordChangedAt: Date,
    birthdate: Date
});

export default mongoose.model("User", userSchema);