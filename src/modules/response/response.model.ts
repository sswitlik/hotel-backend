export class ResponseModel {
  static BadRequestResponse(message: string) {
    return {
      statusCode: 400,
      error: 'Bad Request',
      message: message,
    };
  }
}
