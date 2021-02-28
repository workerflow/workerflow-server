class GeneralError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  getCode(): number {
    if (this instanceof BadRequest) {
      return 400;
    } else if (this instanceof PageNotFound) {
      return 404;
    } else if (this instanceof RecordNotFound) {
      return 404;
    }
    return 500;
  }
}

class BadRequest extends GeneralError {}
class PageNotFound extends GeneralError {}
class RecordNotFound extends GeneralError {}

export { BadRequest, GeneralError, PageNotFound, RecordNotFound };
