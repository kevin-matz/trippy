import { Router } from "express";
import User from "../models/user.js";
import Review from "../models/review.js";
import * as util from "../utils/response_utils.js";
import { createHash } from "crypto";
import { body, checkExact, validationResult } from "express-validator";

const router = Router();

router.get("/", (_, response) => {
    util.responseOnline(response);
});

router.post("/register", checkExact([
    body("username").exists().isString().notEmpty(),
    body("password").exists().isString().notEmpty(),
    body("birthdate").exists().isISO8601(),
    body("email").exists().isEmail()
]), async (request, response) => {
    try {
        if (request.session.userId) {
            util.responseForbidden(response);
            return;
        }
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            util.responseBadInput(response, errors);
            return;
        }
        const { username, password, birthdate, email } = request.body;

        const searchResult = await User.findOne({ $or: [{ username: username }, { email: email }] });
        if (searchResult) {
            util.responseBadInput(response, "User with that name/email already exists");
            return;
        }
        const passwordHash = createHash('sha256').update(password).digest('hex');
        const user = await User.create({
            username: username,
            passwordHash: passwordHash,
            email: email,
            birthdate: birthdate,
            registeredAt: new Date(),
            passwordChangedAt: new Date()
        });
        const saved = await user.save();
        request.session.userId = saved._id;
        util.responseSuccess(response, saved);
    } catch (error) {
        util.responseInternalError(response, error);
    }
});

router.post("/login", checkExact([
    body("username").exists().isString().notEmpty(),
    body("password").exists().isString().notEmpty()
]), async (request, response) => {
    try {
        if (request.session.userId) {
            util.responseForbidden(response);
            return;
        }
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            util.responseBadInput(response, errors);
            return;
        }
        const { username, password } = request.body;
        const passwordHash = createHash('sha256').update(password).digest('hex');
        const result = await User.findOne({ username: username, passwordHash: passwordHash });
        if (!result) {
            util.responseBadInput(response, "Wrong username or/and password");
            return;
        }
        request.session.userId = result._id;
        util.responseSuccess(response, null);
    } catch (error) {
        util.responseInternalError(response, error);
    }
});

router.put("/change", checkExact([
    body("username").optional().isString().notEmpty(),
    body("password").optional().isString().notEmpty(),
    body("email").optional().isEmail()
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
        if (Object.keys(request.body).length < 1) {
            util.responseBadInput(response, "At least one of username, password or email is required");
            return;
        }
        const user = await User.findById(request.session.userId);
        const searchResult = await User.findOne({
            $or: [
                { username: request.body.username },
                { email: request.body.email }
            ]
        });
        if (searchResult) {
            util.responseBadInput(response, "User with that name/email already exists");
            return;
        }
        if (request.body.hasOwnProperty("password")) {
            const password = request.body.password;
            const passwordHash = createHash('sha256').update(password).digest('hex');
            request.body.passwordHash = passwordHash;
            request.body.passwordChangedAt = new Date();
         }
        Object.assign(user, request.body);
        const saved = await user.save();
        util.responseSuccess(response, saved);
    } catch (error) {
        util.responseInternalError(response, error);
    }
});

router.delete("/delete", async (request, response) => {
    try {
        if (!request.session.userId) {
            util.responseUnauthorized(response);
            return;
        }
        const id = request.session.userId;
        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) {
            util.responseBadInput(response, "Unable to find user for given id");
            return;
        }
        await Review.deleteMany({ author: id });
        request.session.destroy();
        util.responseSuccess(response, null);
    } catch (error) {
        util.responseInternalError(response, error);
    }
});

router.get("/logout", (request, response) => {
    if (!request.session.userId) {
        util.responseUnauthorized(response);
        return;
    }
    request.session.destroy();
    util.responseSuccess(response, null);
});

router.get("/status", async (request, response) => {
    try {
        if (!request.session.userId) {
            util.responseSuccess(response, null);
            return;
        }
        const user = await User.findOne({ _id: request.session.userId }, { _id: false, passwordHash: false, __v: false });
        util.responseSuccess(response, user);
    } catch (error) {
        util.responseInternalError(response, error);
    }
});

export default router;