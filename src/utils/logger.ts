import dayjs from "dayjs";
import logger from "pino";

const log = logger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `"time:"${dayjs().format("hh:mm:sss")}`,
});

export default log;
