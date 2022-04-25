import express from "express";
import {
  helloPru,
  herolist,
  finalfantazy,
  chats,
} from "../controllers/pruController";

const heroRouter = express.Router();
heroRouter.get("/hello", helloPru);
heroRouter.get("/:heros(\\d+)", herolist);
heroRouter.get("/ff14", finalfantazy);
heroRouter.get("/chats", chats);
export default heroRouter;
