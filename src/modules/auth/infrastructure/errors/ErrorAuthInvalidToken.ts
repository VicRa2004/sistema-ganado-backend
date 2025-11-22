export class ErrorAuthInvalidToken extends Error {
  constructor() {
    super("Error, token invalid o expired");
  }
}
