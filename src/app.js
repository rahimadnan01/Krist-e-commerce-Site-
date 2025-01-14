import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import methodOverride from "method-override";

import {fileURLToPath} from "url";
const app = express();
const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

import ejsMate from "ejs-mate";

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
export {app};

// import routes
import authRouter from "./routes/auth.routes.js";
import homeRoute from "./routes/home.routes.js";
import productRoute from "./routes/products.routes.js";
import userRoute from "./routes/user.routes.js";
import categoryRoute from "./routes/category.routes.js";
import {errorHandler} from "./middlewares/error.middleware.js";

// routers declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", homeRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1/", userRoute);
app.use("/api/v1/", categoryRoute);
app.all("*", (req, res, next) => {
  next({status: 404, message: "Page Not Found"});
});

app.use(errorHandler);
