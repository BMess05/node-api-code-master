const { createLogger, transports, format } = require("winston");
const { combine, timestamp, errors, json } = format;

exports.buildProdLogger = () => {
    $err_log_dir = "./logger/logs/error_logs.log";
    $info_log_dir = "./logger/logs/info_logs.log";
    $warn_log_dir = "./logger/logs/warn_logs.log";
  return createLogger({
    // level: "info",
    format: combine(
        timestamp(),
        errors({ stack: true }),
        json()
        ),

    defaultMeta: { service: "user-service" },
    transports: [
      //   new transports.Console(),
      new transports.File({
        filename: $err_log_dir,
        level: "error",
      }),
      new transports.File({
        filename: $info_log_dir,
        level: "info",
      }),
      new transports.File({
        filename: $warn_log_dir,
        level: "warn",
      }),
      //   new transports.File({ filename: "quick-start-combined.log" }),
    ],
  });
};
