/**
 * BillValidator.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2018 Desionlab
 * @license   MIT
 * 
 * Library for working with "CashCode" Bill Validator devices from Node.js app.
 */

const CCNet = require('./Constants');
const CCNetParser = require('./CCNetParser');
const EventEmitter = require('events');
const SerialPort = require("serialport");

/**
 * Class BillValidator
 * 
 * The object implements the main methods and events for working 
 * with the "CashCode" bill acceptor using the "CCNet" protocol.
 * 
 * @version 1.0.0
 */
class BillValidator extends EventEmitter {

  /**
   * BillValidator constructor.
   * 
   * @param {String} port Serialport address.
   * @param {Boolean} debug Printing debug info flag.
   */
  constructor (port, debug = false) {
    /* Parent constructor. */
    super();

    /*  */
    let self = this;

    /* --------------------------------------------------------------------- */
    
    /* Set peripheral addresses. */
    this.adr = CCNet.ADR_BILL_VALIDATOR;

    /* List of available commands. */
    this.commands = require('./Commands')(this);

    /* --------------------------------------------------------------------- */
    
    /* Set comport address. */
    this.port = port;
    
    /* Set comport options. */
    this.portOptions = {
      baudRate: 9600,
      databits: 8,
      stopbit: 1,
      parity: 'none',
      autoOpen: false
    };

    /* Create comport driver.  */
    this.serial = new SerialPort(this.port, this.portOptions, false);

    /* On serial open event. */
    this.serial.on('open', function () {
      self.onSerialPortOpen();
    });

    /* On serial error event. */
    this.serial.on('error', function (error) {
      self.onSerialPortError(error);
    });

    /* On serial close event. */
    this.serial.on('close', function () {
      this.onSerialPortClose();
    });

    /* Set CCNet packet parser. */
    this.parser = this.serial.pipe(new CCNetParser());

    /* --------------------------------------------------------------------- */
    
    /* Device identification information. */
    this.info = {
      model  : '',
      serial : '',
      asset  : '',
    };

    /* List of supported bills. */
    this.billTable = [];
    
    /* Main status code. */
    this.status = null;

    /* Second status code. */
    this.secondStatus = null;

    /* --------------------------------------------------------------------- */
    
    /* Set debug info flag. */
    this.isDebug = debug;

    /* Flag of the established connection to the device. */
    this.isConnect = false;
    
    /* A flag indicating the current send data of the command. */
    this.isSend = false;
    
    /* --------------------------------------------------------------------- */
    
    /* Container for the timer object. */
    this.statusTimer = null;

    /* Status timer interval ms. */
    this.statusTimerInterval = 200;

    /* Flag for repeater "POLL" requests. */
    this.statusTimerEnable = false;
  }

  /* Getters / Setters methods --------------------------------------------- */
  /* ----------------------------------------------------------------------- */
  
  /**
   * Get serial open state.
   */
  get isOpen () {
    return this.serial.isOpen;
  }
  
  /* Logics methods -------------------------------------------------------- */
  /* ----------------------------------------------------------------------- */

  /**
   * Open comport.
   */
  open () {
    let self = this;

    return new Promise(function (resolve, reject) {
      if (self.serial.isOpen) {
        resolve(true);
      } else {
        self.serial.open(function (error) {
          if (error) {
            reject(error);
          }
  
          resolve(true);
        });
      }
    });
  }
  
  /**
   * Connect to device.
   */
  async connect () {
    /* Check comport. */
    if (!this.isOpen) {
      try {
        await this.open();
      } catch (error) {
        /* !!! */
        throw error;
      }
    }

    /* Begin device init. -------------------------------------------------- */

    try {
      /* Reset device. */
      await this.reset();

      /* Wait "Initial" status. */
      await this.waitStatus('13', 1000);

      /* Get information about the model and serial numbers. */
      this.info = await this.execute(this.commands.Identification);
      
      /* Get bill type description. */
      this.billTable = await this.execute(this.commands.GetBillTable);

      return true;
    } catch (error) {
      /* !!! */
      throw error;
    }
  }

  /* ----------------------------------------------------------------------- */

  /**
   * 
   */
  async reset () {
    try {
      /* Reset device. */
      await this.execute(this.commands.Reset);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 
   */
  async begin () {
    try {
      await this.execute(this.commands.EnableBillTypes, [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 
   */
  async stack () {
    try {
      await this.execute(this.commands.Stack);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 
   */
  async retrieve () {
    try {
      await this.execute(this.commands.Return);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 
   */
  async end () {
    try {
      await this.execute(this.commands.EnableBillTypes, [0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
    } catch (error) {
      console.log(error);
    }
  }
  
  /* ----------------------------------------------------------------------- */

  /**
   * Disconnect from device.
   */
  async disconnect () {
    this.close();
  }

  /**
   * Close comport.
   */
  close () {
    let self = this;
    
    return new Promise(function (resolve, reject) {
      if (self.serial.isOpen) {
        self.serial.close(function (error) {
          if (error) {
            reject(error);
          }
  
          resolve(true);
        });
      } else {
        resolve(true);
      }
    });
  }

  /* Events methods -------------------------------------------------------- */
  /* ----------------------------------------------------------------------- */

  /**
   * On serial open event.
   */
  onSerialPortOpen () {
    /*  */
    this.statusTimerStart();

    /*  */
    this.debug('Serialport Open.');
  }

  /**
   * On serial error event.
   */
  onSerialPortError (error) {
    this.debug('Serialport Error:', error);
  }

  /**
   * On serial close event.
   */
  onSerialPortClose () {
    this.debug('Serialport Close.');
  }

  /* ----------------------------------------------------------------------- */

  /**
   * All device events handler.
   * 
   * @param {Buffer} status 
   */
  onStatus (status) {
    /*  */
    if (status.length >= 2) {
      if (
        this.status !== status[0].toString(16) ||
        this.secondStatus !== status[1].toString(16)
      ) {
        /*  */
        this.status = status[0].toString(16);
        this.secondStatus = status[1].toString(16);

        /*  */
        this.emit('status', this.status, this.secondStatus);

        /* Send event by status. */
        switch (status[0]) {
          /* Device busy. */
          case 0x1B:

          break;

          /* Generic rejecting code. */
          case 0x1C:
            switch (status[1]) {
              /* Rejecting due to Insertion. */
              case 0x60:

              break;

              /* Rejecting due to Magnetic. */
              case 0x61:

              break;

              /* Rejecting due to Remained bill in head. */
              case 0x62:

              break;

              /* Rejecting due to Multiplying. */
              case 0x63:

              break;

              /* Rejecting due to Conveying. */
              case 0x64:

              break;

              /* Rejecting due to Identification. */
              case 0x65:

              break;

              /* Rejecting due to Verification. */
              case 0x66:

              break;

              /* Rejecting due to Optic. */
              case 0x67:

              break;

              /* Rejecting due to Inhibit. */
              case 0x68:

              break;

              /* Rejecting due to Capacity. */
              case 0x69:

              break;

              /* Rejecting due to Operation. */
              case 0x6A:

              break;

              /* Rejecting due to Length. */
              case 0x6C:

              break;

              /* Rejecting due to UV. */
              case 0x6D:

              break;

              /* Rejecting due to unrecognised barcode. */
              case 0x92:

              break;

              /* Rejecting due to incorrect number of characters in barcode. */
              case 0x93:

              break;

              /* Rejecting due to unknown barcode start sequence. */
              case 0x94:

              break;

              /* Rejecting due to unknown barcode stop sequence. */
              case 0x95:

              break;
            }
          break;

          /* Generic failure codes. */
          case 0x47:
            switch (status[1]) {
              /* Stack motor failure.  */
              case 0x50:

              break;

              /* Transport motor speed failure. */
              case 0x51:

              break;

              /* Transport motor failure. */
              case 0x52:

              break;

              /* Aligning motor failure. */
              case 0x53:

              break;

              /* Initial cassette status failure. */
              case 0x54:

              break;

              /* Optic canal failure.  */
              case 0x55:

              break;

              /* Magnetic canal failure. */
              case 0x56:

              break;

              /* Capacitance canal failure. */
              case 0x5F:

              break;
            }
          break;

          /* Escrow position. */
          case 0x80:
            /* Fire event. */
            this.emit('escrow', this.billTable[parseInt(status[1].toString(10))]);
          break;

          /* Bill stacked. */
          case 0x81:
            /* Fire event. */
            this.emit('stacked', this.billTable[parseInt(status[1].toString(10))]);
          break;

          /* Bill returned. */
          case 0x82:
            /* Fire event. */
            this.emit('returned', this.billTable[parseInt(status[1].toString(10))]);
          break;
        }
      }
    } else {
      if (
        this.status !== status[0].toString(16)
      ) {
        /*  */
        this.status = status[0].toString(16);
        this.secondStatus = '';
        
        /*  */
        this.emit('status', this.status, '');

        /* Send event by status. */
        switch (status[0]) {
          /* Power Up. */
          case 0x10:
            /* Fire event. */
            this.emit('power-up');
          break;

          /* Power Up with Bill in Validator. */
          case 0x11:
            /* Fire event. */
            this.emit('power-up-with-bill');
          break;

          /* Power Up with Bill in Stacker. */
          case 0x12:
            /* Fire event. */
            this.emit('power-up-with-bill-in-stacker');
          break;

          /* Initialize. */
          case 0x13:
            /* Fire event. */
            this.emit('initialize');
          break;

          /* Idling. */
          case 0x14:
            /* Fire event. */
            this.emit('idling');
          break;

          /* Accepting. */
          case 0x15:
            /* Fire event. */
            this.emit('accepting');
          break;

          /* Stacking. */
          case 0x17:
            /* Fire event. */
            this.emit('stacking');
          break;

          /* Returning. */
          case 0x18:
            /* Fire event. */
            this.emit('returning');
          break;

          /* Unit Disabled. */
          case 0x19:
            /* Fire event. */
            this.emit('disabled');
          break;

          /* Holding. */
          case 0x1A:
            /* Fire event. */
            this.emit('holding');
          break;

          /* Drop Cassette Full. */
          case 0x41:
            /* Fire event. */
            this.emit('cassette-full');
          break;

          /* Drop Cassette out of position. */
          case 0x42:
            /* Fire event. */
            this.emit('cassette-out-of-position');
          break;

          /* Validator Jammed. */
          case 0x43:
            /* Fire event. */
            this.emit('jammed');
          break;

          /* Drop Cassette Jammed. */
          case 0x44:
            /* Fire event. */
            this.emit('cassette-jammed');
          break;

          /* Cheated. */
          case 0x45:
            /* Fire event. */
            this.emit('cheated');
          break;

          /* Pause. */
          case 0x46:
            /* Fire event. */
            this.emit('pause');
          break;
        }
      }
    }
  }

  /**
   * Event of processing the status timer.
   */
  onStatusTimer () {
    /* Linked self. */
    let self = this;

    /* Clear timer. */
    clearInterval(this.statusTimer);

    /* Check comport init. */
    if (!this.isOpen) {
      return;
    }

    /* Get current status. */
    this.execute(
      this.commands.Poll
    )
    .then(function (data) {
      /* Check permission to run. */
      if (self.statusTimerEnable) {
        /* Start status timer. */
        self.statusTimer = setTimeout(function () {
          self.onStatusTimer();
        }, self.statusTimerInterval);
      }

      /* Send event. */
      self.onStatus(data);
    })
    .catch(function (error) {
      /* Check permission to run. */
      if (self.statusTimerEnable) {
        /* Start status timer. */
        self.statusTimer = setTimeout(function () {
          self.onStatusTimer();
        }, self.statusTimerInterval);
      }

      self.debug(error);
    });
  }

  /* Utils methods --------------------------------------------------------- */
  /* ----------------------------------------------------------------------- */
  
  /**
   * Start status timer.
   */
  statusTimerStart () {
    /* Linked self. */
    let self = this;

    /* Set flag. */
    this.statusTimerEnable = true;

    /* Start status timer. */
    this.statusTimer = setTimeout(function () {
      self.onStatusTimer();
    }, this.statusTimerInterval);
  }

  /**
   * Stop status timer.
   */
  statusTimerStop () {
    /* Set flag. */
    this.statusTimerEnable = false;
    
    /* Clear status timer. */
    clearTimeout(this.statusTimer);
  }

  /* ----------------------------------------------------------------------- */

  /**
   * Waits for the occurrence of the specified status event.
   * 
   * @param {String} status Number of status code.
   * @param {Number} timeout The maximum time to complete this action.
   * @returns {Promise} 
   */
  waitStatus (status, timeout = 1000) {
    /* Linked self. */
    let self = this;

    /* Async worker. */
    return new Promise(function (resolve, reject) {
      /* Check current status. */
      if (self.status == status) {
        /* Send event. */
        resolve(true);
      }
      
      /* Timeout timer. */
      let timer = null;

      /* Timeout handler. */
      let timerHandler = function () {
        /* Clear timeout timer. */
        clearTimeout(timer);

        /* Unbind event. */
        self.removeListener('status', handler);

        /* Send event. */
        reject(new Error('Request timeout.'));
      };

      /* Event handler. */
      let handler = function (primary) {
        if (primary == status) {
          /* Clear timeout timer. */
          clearTimeout(timer);

          /* Unbind event. */
          self.removeListener('status', handler);

          /* Send event. */
          resolve(true);
        }
      }
      
      /* Bind event. */
      self.on('status', handler);
      
      /* Start timeout timer. */
      if (timeout) {
        timer = setTimeout(timerHandler, timeout);
      }
    });
  }

  /**
   * Waiting for the completion of the processing of the current command.
   * 
   * @param {Number} timeout The maximum time to complete this action.
   * @returns {Promise}
   */
  waitSending (timeout = 1000) {
    /* Linked self. */
    let self = this;

    /* Async worker. */
    return new Promise(function (resolve, reject) {
      /* Waiting timer. */
      let timer = null;

      /* Interval for checking the status in ms. */
      let interval = 50;

      /* Waiting timeout. */
      let counter = 0;

      /* Check flag. */
      if (!self.isSend) {
        /* Send event. */
        resolve(true);
      }

      /* Timeout timer handler. */
      let timerHandler = function () {
        counter += interval;

        /* Check flag. */
        if (!self.isSend) {
          /* Clear timer. */
          clearInterval(timer);

          /* Send event. */
          resolve(true);
        } else if (counter >= timeout) {
          /* Clear timer. */
          clearInterval(timer);

          /* Send event. */
          reject(new Error('Request timeout.'));
        }
      };

      /* Bind timeout handler. */
      timer = setInterval(timerHandler, interval);
    });
  }

  /* ----------------------------------------------------------------------- */

  /**
   * Sending a data packet.
   * 
   * @param {Buffer} request Data packet.
   * @param {Number} timeout The maximum time to complete this action.
   * @returns {Promise}
   */
  send (request, timeout = 1000) {
    /* Linked self. */
    let self = this;

    /* Async worker. */
    return new Promise(function (resolve, reject) {
      /* Timeout timer. */
      let timer = null;

      /* Timeout timer handler. */
      let timerHandler = function () {
        /* Update flag. */
        self.isSend = false;

        /* Send event. */
        reject(new Error('Request timeout.'));
      };
      
      /* Receive packet handler. */
      let handler = async function (response) {        
        /* Unbind timeout handler. */
        clearTimeout(timer);
        
        /* Unbind event. */
        self.parser.removeListener('data', handler);
        
        /* Check CRC */
        let ln = response.length;
        let check = response.slice(ln-2, ln);
        let slice = response.slice(0, ln-2);

        /* Check response CRC. */
        if (check.toString() !== (self.getCRC16(slice)).toString()) {
          /* Send NAK. */
          await self.serial.write(self.commands.Nak.request());

          /* Update flag. */
          self.isSend = false;

          /* Send event. */
          reject(new Error('Wrong response data hash.'));
        }

        /* Get data from packet. */
        let data = response.slice(3, ln-2);

        /* Check response type. */
        if (data.length == 1 && data[0] == 0x00) {
          /* Response receive as ACK. */
        } else if (data.length == 1 && data[0] == 0xFF) {
          /* Response receive as NAK. */
          reject(new Error('Wrong request data hash.'));
        } else {
          /* Send ACK. */
          await self.serial.write(self.commands.Ack.request());
        }
        
        /* Update flag. */
        self.isSend = false;

        /* Send event. */
        resolve(data);
      }

      /* Bind event. */
      self.parser.once('data', handler);

      /* Update flag. */
      self.isSend = true;

      /* Send packet. */
      self.serial.write(request);

      /* Bind timeout handler. */
      timer = setTimeout(timerHandler, timeout);
    });
  }

  /**
   * Execute the specified command.
   * 
   * @param {Object} command Target command.
   * @param {Object} params Execute parameters.
   * @param {Number} timeout The maximum time to complete this action.
   * @returns {Promise}
   */
  execute (command, params = [], timeout = 1000) {
    /* Linked self. */
    let self = this;

    /* Async worker. */
    return new Promise(async function (resolve, reject) {
      try {
        /* Preparing command to send. */
        let request = command.request(params);

        /* Waiting if another command is being sending. */
        await self.waitSending(timeout);

        /* Send command to device. */
        let response = await self.send(request, timeout);

        /* Processing command response. */
        resolve(command.response(response)); 
      } catch (error) {
        /* !!! */
        reject(error);
      }
    });
  }

  /* ----------------------------------------------------------------------- */

  /**
   * Calculation packet checksum.
   * 
   * @param {Buffer} buffer Raw data for calculation.
   * @returns {Number} Calculated checksum.
   */
  getCRC16 (buffer) {
    var CRC, i, j;
    var sizeData = buffer.length;
    
    CRC = 0;
    
    for (i = 0; i < sizeData; i++) {
        CRC ^= buffer[i];

        for (j = 0; j < 8; j++) {

            if (CRC & 0x0001) {
                CRC >>= 1;
                CRC ^= CCNet.CRC_POLY;
            } else CRC >>= 1;
        }
    }

    var buf = new Buffer(2);
    buf.writeUInt16BE(CRC, 0);
    
    CRC = buf;

    return Array.prototype.reverse.call(CRC);
  }

  /**
   * Printing data to console.
   * 
   * @param {Any} params Data for printing to console.
   */
  debug (...params) {
    if (this.isDebug) {
      console.log(params);
    }
  }

}

module.exports = BillValidator;

/* End of file BillValidator.js */