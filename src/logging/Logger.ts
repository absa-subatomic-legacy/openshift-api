import * as winston from "winston";
import {loggers, transports} from "winston";

createLogger();

export function logger() {
    return loggers.get("@absa-subatomic/openshift-api");
}

function createLogger() {
    loggers.add("@absa-subatomic/openshift-api", {
        level: "debug",
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.label({label: "OpenShiftAPI"}),
            winston.format.colorize(),
            winston.format.printf(({level, message, label, timestamp}) => {
                return `${timestamp} [${label}] [${level}]: ${message}`;
            }),
        ),
        transports: [
            new transports.Console(),
        ],
    });
}
