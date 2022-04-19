import express from "express";

const pruRouter = express.Router();
const handlePru = (req, res) => res.send("PRU IS GOOD");
pruRouter.get("/pru", handlePru);

export default pruRouter;
