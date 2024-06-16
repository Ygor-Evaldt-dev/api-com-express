import { FilterParams } from "@/presentation/types";
import { Request, Response, NextFunction } from "express";

export default function taskFiltersMiddleware(req: Request, res: Response, next: NextFunction) {
    const { finished } = req.query as FilterParams;

    Object.assign(req.query, {
        finished: (finished === "true") ? true : (finished === "false") ? false : undefined
    })

    next();
}