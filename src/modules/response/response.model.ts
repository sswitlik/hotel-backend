import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class ResponseModel {
  static BadRequestResponse(message: string) {
    return {
      statusCode: 400,
      error: 'Bad Request',
      message: message,
    };
  }

  static async tryCatch(res: Response, success: () => any) {
    try {
      res.send(await success());
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send(ResponseModel.BadRequestResponse(e.message + e.stack));
    }
  }
}
