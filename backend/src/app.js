"use strict";

import express from "express";
import usersRouter from "./routes/users.js";
import reviewsRouter from "./routes/reviews.js";
import statisticsRouter from "./routes/statistics.js";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true,
  allowedHeaders: [ "Content-Type" ]
}));

// Use the session middleware with some options
app.use(session({
  secret: "nB?p_yR+U?Se4HyL", // string to encrypt the session cookie
  name: "session", // cookie name
  resave: false, // avoid saving session if unmodified
  saveUninitialized: true, // save session even if empty
  cookie: {
    maxAge: 60 * 60 * 1000, // expiration time -> 1 hour
    secure: false, // needs to be true for HTTPS
    httpOnly: true,
    sameSite: "lax"
  }
  // this will only work in prod on https and with secure: true and sameSite: "none"
}));

app.use("/api/users", usersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/statistics", statisticsRouter);

// Use environment variable if present, otherwise locally hosted
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1/trippy";
mongoose.connect(MONGODB_URL);

const port = 20013;

// Swagger setup

const options = {
  // Loads the definition from the given YAML config file
  definition: YAML.load(path.join(__dirname, "../config/swagger.yml")),
  servers: [
      {
          url: `http://localhost:${port}`,
          description: 'Development server',
      },
  ],
  apis: ["./src/**/*.js"],
};

const specs = swaggerJSDoc(options);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

// Bind app to port
app.listen(port, () => {
	console.log(`Backend listening on port ${port}`)
});