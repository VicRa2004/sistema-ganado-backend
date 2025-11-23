import pino from "pino";
import { Logger } from "./Logger";

export class PinoLogger implements Logger {
  private logger = pino({
    transport: {
      target: "pino-pretty",
      options: { colorize: true },
    },
  });

  info(message: string, meta?: unknown) {
    this.logger.info(meta || {}, message);
  }

  warn(message: string, meta?: unknown) {
    this.logger.warn(meta || {}, message);
  }

  error(message: string, meta?: unknown) {
    this.logger.error(meta || {}, message);
  }
}
