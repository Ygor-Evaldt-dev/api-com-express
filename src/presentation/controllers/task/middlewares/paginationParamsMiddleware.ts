import HttpStatusCode from "@/presentation/constants/HttpStatusCode";

import { PaginationParams } from "@/presentation/types";
import { Request, Response, NextFunction } from "express";

export default function paginationParams(req: Request, res: Response, next: NextFunction) {
    const { userId, page, take } = req.params as PaginationParams;

    if (
        !userId
        || isNaN(parseInt(page))
        || isNaN(parseInt(take))
    ) {
        return res.status(HttpStatusCode.BAD_REQUEST).send("Parâmetros de URL inválidos");
    }

    Object.assign(req.params, {
        page: parseInt(page),
        take: parseInt(take)
    });

    next();
}