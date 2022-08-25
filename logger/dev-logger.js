const {
    createLogger,
    transports,
    format
} = require("winston");
const { combine, timestamp, label, printf } = format;

exports.buildDevLogger = () => {
    const myFormat = printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} ${level}: ${stack || message}`;
    });
    return createLogger({
    level: "info",
    format: combine(
        format.colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        myFormat
    ),
    transports: [new transports.Console()],
    });
}
