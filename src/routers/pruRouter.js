import express from "express";
import { helloPru, heroPru } from "../controllers/pruController";

const pruRouter = express.Router();
pruRouter.get("/hello", helloPru);
pruRouter.get("/hero", heroPru);

export default pruRouter;
