import mongoose from "mongoose";

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
            message: "La oferta debe ser mayor que 0",
        },
    },
    floorUsd: {
        type: Number,
        required: true,
        validate: {
            validator: (value: number) => value > 0,
            message: "El piso debe ser mayor que 0",
        },
    },
});

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;