import winston from 'winston';
import path from 'path';


const logDir = 'logs'; 

// kolla om logg mapp fins annars skapa en.
const fs = require('fs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const { combine, timestamp, printf } = winston.format;


const logFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});


const logger = winston.createLogger({
  level: 'info', // (info, warn, error)
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    
    new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

export default logger;
    
    
