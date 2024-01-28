import { Response } from "express";
import { API_RESPONSE_CODE } from "../types/enums";
import { HttpErrorResponseBody } from "../types/httpTypes";

export const invalidRequest = function (res: Response, message: string) {
    const response: HttpErrorResponseBody = {
        responseCode: API_RESPONSE_CODE.REQUEST_INVALID,
        errorMessage: message
    }
    res.status(200).json(response);
}