import express from "express";
import { helloPru, herolist, finalfantazy } from "../controllers/pruController";

const heroRouter = express.Router();
heroRouter.get("/hello", helloPru);
heroRouter.get("/:heros(\\d+)", herolist);
heroRouter.get("/ff14", finalfantazy);
export default heroRouter;
