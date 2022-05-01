import express from "express";
import {
  helloPru,
  herolist,
  finalfantazy,
  chats,
  postHeroList,
} from "../controllers/pruController";

const heroRouter = express.Router();
heroRouter.get("/hello", helloPru);
heroRouter.route("/:heros(\\d+)").get(herolist).post(postHeroList);
heroRouter.get("/ff14", finalfantazy);
heroRouter.get("/chats", chats);
export default heroRouter;
