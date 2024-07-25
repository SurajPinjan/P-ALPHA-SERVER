import express, { Request, Response } from "express";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { ensureAuthenticated } from "../../auth/passportConfig";
import { invalidRequest } from "../../services/errorHandling";
import { sendMail } from "../../services/mailServiceGmail";
import {
  API_RESPONSE_CODE,
  API_RESPONSE_MAP,
  HTTP_OPERATION
} from "../../types/enums";
import { HttpErrorResponseBody, HttpMailRequestBody } from "../../types/httpTypes";

export const router = express.Router();

router.post(
  `/${HTTP_OPERATION.SEND_MAIL}`,
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    const requestData: HttpMailRequestBody = req.body
    const _isValid: boolean = true

    if (!_isValid) {
      invalidRequest(res, `request invalid`)
    } else {
      try {
        const status: SMTPTransport.SentMessageInfo = await sendMail(
          requestData.to.join(','),
          requestData.subject,
          requestData.text
        )

        if (status.accepted.length > 0) {
          const responseData = res.status(200).json({
            responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_MAIL_SENT].code,
            displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_MAIL_SENT].displayMsg,
          });
          res.status(200).json(responseData)
        } throw new Error('Error sending mail');

      } catch (error: unknown) {
        if (error instanceof Error)
          res.status(500).json({
            responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_SENDING_MAIL].code,
            displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_SENDING_MAIL].displayMsg,
            errorMessage: error.message,
          } as HttpErrorResponseBody)
      }
    }
  }
);

export default router;
