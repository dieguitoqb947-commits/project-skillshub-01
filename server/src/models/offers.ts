import mongoose from "mongoose";
import { ERROR_MESSAGES } from "../utils/constants.js";

const offerSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    talentId: {
        type: String,
        required: true,
    },
    talentName: {
        type: String,
        required: true,
    },
    offeredAmountUsd: {
        type: Number,
        required: true,
        validate: {
            validator: (value: number) => value > 0,
            message: ERROR_MESSAGES.offerMustBePositive,
        },
    },
    floorUsd: {
        type: Number,
        required: true,
        validate: {
            validator: (value: number) => value > 0,
            message: ERROR_MESSAGES.floorMustBePositive,
        },
    },
});

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;