// Pino for logs lib/logger.ts

import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,                     // Easier to scan in terminal
      translateTime: 'SYS:standard',     // Shows readable timestamps
      ignore: 'pid,hostname'             // Removes noisy clutter
    }
  }
});

export default logger;
