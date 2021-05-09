import { getStatusCode, getReasonPhrase } from 'http-status-codes';

class GeneralResponse {
  phrase: string;
  reason: string | undefined;
  message: string | undefined;
  data: object | undefined;

  constructor(phrase: string, reason?: string, message?: string) {
    this.phrase = phrase;
    this.message = message;
    if (reason === undefined) {
      this.reason = getReasonPhrase(this.getCode());
    } else {
      this.reason = reason;
    }
  }

  setData(data: object): GeneralResponse {
    this.data = data;
    return this;
  }

  getCode(): number {
    return getStatusCode(this.phrase);
  }
}

export default GeneralResponse;
