import * as winston from "winston";
import {Logger} from "winston";

export const logger: Logger = createLogger();

function createLogger() {
    const loggerInstance: Logger = winston.createLogger({
        exitOnError: false,
    });
    const ct = new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.label({label: "OpenShiftAPI"}),
            winston.format.colorize(),
            winston.format.printf(({level, message, label, timestamp}) => {
                return `${timestamp} [${label}] [${level}]: ${message}`;
            }),
        ),
    });

    loggerInstance.add(ct);
    return loggerInstance;
}
