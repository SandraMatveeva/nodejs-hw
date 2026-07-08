import { pinoHttp } from "pino-http";


export const logger = pinoHttp({
    transport:
      process.env.NODE_ENV === "production"
        ? undefined
        : { target: "pino-pretty" },
  });
