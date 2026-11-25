import { Router } from "express";
import { getOffers, createOffer, deleteOffer } from "../controllers/offers.js";
import { auth } from "../middleware/auth.js";

const offersRouter = Router();

offersRouter.get("/", auth, getOffers);
offersRouter.post("/", auth, createOffer);
offersRouter.delete("/:id", auth, deleteOffer);

export default offersRouter;