/* 
   This is the file that runs winston. It contains the configuration as well as the various types of logs,
   outputted in a JSON format.
 */ 

const winston = require('winston')
dateFormat = () => {
  return new Date(Date.now()).toUTCString()
}

// winston configuration
class LoggerService {
  constructor(route) {
    this.log_data = null
    this.route = route
    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
        	level: 'error'
        }),
        new winston.transports.File({
          filename: `./server.log`,
          level: 'error'
        })
      ],
      format: winston.format.printf((info) => {
        let message = JSON.stringify(info)
        return message
      })
   });
   this.logger = logger
}

setLogData(log_data) {
  this.log_data = log_data
}

// print different types of log messages 
async info(message) {
  this.logger.log(message);
}
async info(message, obj) {
  this.logger.log('info', message, {
    obj
  })
}
async debug(message) {
  this.logger.log('debug', message);
}
async debug(message, obj) {
  this.logger.log('debug', message, {
    obj
  })
}
async error(message) {
  this.logger.log(message);
}
async error(message, obj) {
  this.logger.log('error', message, {
    obj
  })
}
}

module.exports = LoggerService