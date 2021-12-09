import config from 'config';
import dbConnect from './utils/connect';
import logger from './utils/logger';
import app from './app';

const port = config.get<number>('port');

app.listen(port || 3000, async () => {
  logger.info(
    `✅ Server running on port: ${process.env.PORT ? process.env.PORT : 3000}`
  );
  await dbConnect();
});
