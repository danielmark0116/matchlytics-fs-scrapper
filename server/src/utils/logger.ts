import { bgGreen, bgRed, bgWhite, bgBlueBright, bgYellow } from "chalk";

type LoggerColors = "success" | "error" | "info" | "warning";

export const logger = (message = "", color?: LoggerColors) => {
  switch (color) {
    case "success":
      return console.log(bgGreen.magenta(message));
    case "error":
      return console.log(bgRed.magenta(message));
    case "info":
      return console.log(bgBlueBright.blackBright(message));
    case "warning":
      return console.log(bgYellow.red(message));
    default:
      return console.log(bgWhite.black(message));
  }
};
