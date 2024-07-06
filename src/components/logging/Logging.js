const logLevels = {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
  };
  
  const log = (level, message, details) => {
    const timestamp = new Date().toISOString();
    const logMessage = {
      level,
      message,
      details,
      timestamp,
    };
  
   
    console[level](logMessage);
  
    
  };
  
  export const logger = {
    debug: (message, details) => log(logLevels.DEBUG, message, details),
    info: (message, details) => log(logLevels.INFO, message, details),
    warn: (message, details) => log(logLevels.WARN, message, details),
    error: (message, details) => log(logLevels.ERROR, message, details),
  };
  