import type { Request, Response } from "express";
import Offer from "../models/offers.js";
import { ERROR_MESSAGES } from "../utils/constants.js";



export const getOffers = async (req: Request, res: Response) => {
    const userId =  req.user?.userId;

    if(!userId) {
        throw Object.assign(new Error(ERROR_MESSAGES.unauthenticated), {statusCode: 401 });
    }

    const offers = await Offer.find({ owner: userId });

    res.status(200).json({
        success: true,
        data: {
            offers,
        },
        error: null,
    });
}

export const createOffer = async (req: Request, res: Response) => {
    const userId =  req.user?.userId;
    const { talentId, talentName, offeredAmountUsd, floorUsd } = req.body as { talentId: string, talentName: string, offeredAmountUsd: number, floorUsd: number };

    if(!userId) {
        throw Object.assign(new Error(ERROR_MESSAGES.missingUserId), {statusCode: 401 });
    }

    if(!talentId || !talentName || !offeredAmountUsd || !floorUsd || typeof talentId !== "string" || typeof talentName !== "string" || typeof offeredAmountUsd !== "number" || typeof floorUsd !== "number") {
        throw Object.assign(new Error(ERROR_MESSAGES.offerDataMissing), {statusCode: 400 });
    }

    if(offeredAmountUsd <= floorUsd){
        throw Object.assign(new Error(ERROR_MESSAGES.offerMustExceedFloor), {statusCode: 400 });

    }

    const offer = await Offer.create({ talentId, talentName, offeredAmountUsd, floorUsd, owner: userId });
    res.status(201).json( {
        success: true,
        data: {
            offer,
        },
        error: null,
    });
}

export const deleteOffer =  async (req: Request, res: Response) => {
    const userId =  req.user?.userId;

    if(!userId) {
        throw Object.assign(new Error(ERROR_MESSAGES.missingUserId), {statusCode: 401 });
    }

    const offer = await Offer.findById(req.params.id);

    if(!offer) {
        throw Object.assign(new Error(ERROR_MESSAGES.offerNotFound), {statusCode: 404 });
    }
    if(offer.owner.toString() !== userId) {
        throw Object.assign(new Error(ERROR_MESSAGES.offerForbidden), {statusCode: 403 });
    }

    await offer.deleteOne();
    res.status(200).json({
        success: true,
        data: offer,
        error: null,
    });
}