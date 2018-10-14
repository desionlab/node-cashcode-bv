/**
 * Const.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2017 - 2018 Desionlab
 * @license   MIT
 */

/**
 * Message transmission start code.
 */
export const SYNC = 0x02;

/**
 * Poly for CRC calculated.
 */
export const CRC_POLY = 0x08408;

/**
 * Bill to bill peripheral addresses.
 */
export const ADR_BILL_TO_BILL = 0x01;

/**
 * Coin changer peripheral addresses.
 */
export const ADR_COIN_CHANGER = 0x02;

/**
 * Bill validator peripheral addresses.
 */
export const ADR_BILL_VALIDATOR = 0x03;

/**
 * Card reader peripheral addresses.
 */
export const ADR_CARD_READER = 0x04;

/**
 * Indicates state of the bill validator and its activity.
 */
export enum DeviceStatus {
  POWER_UP                                                   = '10',
  POWER_UP_WITH_BILL_IN_VALIDATOR                            = '11',
  POWER_UP_WITH_BILL_IN_STACKER                              = '12',
  /* ----------------------------------------------------------------------- */
  INITIALIZE                                                 = '13',
  IDLING                                                     = '14',
  ACCEPTING                                                  = '15',
  STACKING                                                   = '17',
  RETURNING                                                  = '18',
  UNIT_DISABLED                                              = '19',
  HOLDING                                                    = '1a',
  DEVICE_BUSY                                                = '1b',
  /* ----------------------------------------------------------------------- */
  REJECTING_DUE_TO_INSERTION                                 = '1c60',
  REJECTING_DUE_TO_MAGNETIC                                  = '1c61',
  REJECTING_DUE_TO_REMAINED_BILL_IN_HEAD                     = '1c62',
  REJECTING_DUE_TO_MULTIPLYING                               = '1c63',
  REJECTING_DUE_TO_CONVEYING                                 = '1c64',
  REJECTING_DUE_TO_IDENTIFICATION                            = '1c65',
  REJECTING_DUE_TO_VERIFICATION                              = '1c66',
  REJECTING_DUE_TO_OPTIC                                     = '1c67',
  REJECTING_DUE_TO_INHIBIT                                   = '1c68',
  REJECTING_DUE_TO_CAPACITY                                  = '1c69',
  REJECTING_DUE_TO_OPERATION                                 = '1c6a',
  REJECTING_DUE_TO_LENGTH                                    = '1c6c',
  REJECTING_DUE_TO_UNRECOGNISED_BARCODE                      = '1c92',
  REJECTING_DUE_TO_UV                                        = '1c6d',
  REJECTING_DUE_TO_INCORRECT_NUMBER_OF_CHARACTERS_IN_BARCODE = '1c93',
  REJECTING_DUE_TO_UNKNOWN_BARCODE_START_SEQUENCE            = '1c94',
  REJECTING_DUE_TO_UNKNOWN_BARCODE_STOP_SEQUENCE             = '1c95',
  /* ----------------------------------------------------------------------- */
  DROP_CASSETTE_FULL                                         = '41',
  DROP_CASSETTE_OUT_OF_POSITION                              = '42',
  VALIDATOR_JAMMED                                           = '43',
  DROP_CASSETTE_JAMMED                                       = '44',
  CHEATED                                                    = '45',
  PAUSE                                                      = '46',
  /* ----------------------------------------------------------------------- */
  STACK_MOTOR_FAILURE                                        = '4750',
  TRANSPORT_MOTOR_SPEED_FAILURE                              = '4751',
  TRANSPORT_MOTOR_FAILURE                                    = '4752',
  ALIGNING_MOTOR_FAILURE                                     = '4753',
  INITIAL_CASSETTE_STATUS_FAILURE                            = '4754',
  OPTIC_CANAL_FAILURE                                        = '4755',
  MAGNETIC_CANAL_FAILURE                                     = '4756',
  CAPACITANCE_CANAL_FAILURE                                  = '475f',
  /* ----------------------------------------------------------------------- */
  ESCROW_POSITION                                            = '80',
  BILL_STACKED                                               = '81',
  BILL_RETURNED                                              = '82'
};

/**
 * 
 */
export const DeviceStatusMessage = new Map<DeviceStatus, string>([
  [DeviceStatus.POWER_UP, 'Power up.'],
  [DeviceStatus.POWER_UP_WITH_BILL_IN_VALIDATOR, 'Power up with bill in the bill validator.'],
  [DeviceStatus.POWER_UP_WITH_BILL_IN_STACKER, 'Power up with bill in stacker.'],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.INITIALIZE, 'Initialize.'],
  [DeviceStatus.IDLING, 'Idling.'],
  [DeviceStatus.ACCEPTING, 'Accepting.'],
  [DeviceStatus.STACKING, 'Stacking.'],
  [DeviceStatus.RETURNING, 'Returning.'],
  [DeviceStatus.UNIT_DISABLED, 'Unit disabled.'],
  [DeviceStatus.HOLDING, 'Holding.'],
  [DeviceStatus.DEVICE_BUSY, 'Device busy.'],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.REJECTING_DUE_TO_INSERTION, 'Rejecting due to Insertion.'],
  [DeviceStatus.REJECTING_DUE_TO_MAGNETIC, 'Rejecting due to magnetic.'],
  [DeviceStatus.REJECTING_DUE_TO_REMAINED_BILL_IN_HEAD, 'Rejecting due to remained bill in head.'],
  [DeviceStatus.REJECTING_DUE_TO_MULTIPLYING, 'Rejecting due to multiplying.'],
  [DeviceStatus.REJECTING_DUE_TO_CONVEYING, 'Rejecting due to conveying.'],
  [DeviceStatus.REJECTING_DUE_TO_IDENTIFICATION, 'Rejecting due to identification.'],
  [DeviceStatus.REJECTING_DUE_TO_VERIFICATION, 'Rejecting due to verification.'],
  [DeviceStatus.REJECTING_DUE_TO_OPTIC, 'Rejecting due to optic.'],
  [DeviceStatus.REJECTING_DUE_TO_INHIBIT, 'Rejecting due to inhibit.'],
  [DeviceStatus.REJECTING_DUE_TO_CAPACITY, 'Rejecting due to capacity.'],
  [DeviceStatus.REJECTING_DUE_TO_OPERATION, 'Rejecting due to operation.'],
  [DeviceStatus.REJECTING_DUE_TO_LENGTH, 'Rejecting due to length.'],
  [DeviceStatus.REJECTING_DUE_TO_UNRECOGNISED_BARCODE, 'Rejecting due to unrecognised barcode.'],
  [DeviceStatus.REJECTING_DUE_TO_UV, 'Rejecting due to UV.'],
  [DeviceStatus.REJECTING_DUE_TO_INCORRECT_NUMBER_OF_CHARACTERS_IN_BARCODE, 'Rejecting due to incorrect number of characters in barcode.'],
  [DeviceStatus.REJECTING_DUE_TO_UNKNOWN_BARCODE_START_SEQUENCE, 'Rejecting due to unknown barcode start sequence.'],
  [DeviceStatus.REJECTING_DUE_TO_UNKNOWN_BARCODE_STOP_SEQUENCE, 'Rejecting due to unknown barcode stop sequence.'],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.DROP_CASSETTE_FULL, 'Drop cassette full.'],
  [DeviceStatus.DROP_CASSETTE_OUT_OF_POSITION, 'Drop cassette out of position.'],
  [DeviceStatus.VALIDATOR_JAMMED, 'Validator jammed.'],
  [DeviceStatus.DROP_CASSETTE_JAMMED, 'Drop cassette jammed.'],
  [DeviceStatus.CHEATED, 'Cheated.'],
  [DeviceStatus.PAUSE, 'Pause.'],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.STACK_MOTOR_FAILURE, 'Stack motor failure.'],
  [DeviceStatus.TRANSPORT_MOTOR_SPEED_FAILURE, 'Transport motor speed failure.'],
  [DeviceStatus.TRANSPORT_MOTOR_FAILURE, 'Transport motor failure.'],
  [DeviceStatus.ALIGNING_MOTOR_FAILURE, 'Aligning motor failure.'],
  [DeviceStatus.INITIAL_CASSETTE_STATUS_FAILURE, 'Initial cassette status failure.'],
  [DeviceStatus.OPTIC_CANAL_FAILURE, 'Optic canal failure.'],
  [DeviceStatus.MAGNETIC_CANAL_FAILURE, 'Magnetic canal failure.'],
  [DeviceStatus.CAPACITANCE_CANAL_FAILURE, 'Capacitance canal failure.'],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.ESCROW_POSITION, 'Escrow position.'],
  [DeviceStatus.BILL_STACKED, 'Bill stacked.'],
  [DeviceStatus.BILL_RETURNED, 'Bill returned.']
]);

/**
 * 
 */
export const DeviceStatusDescription = new Map<DeviceStatus, string>([
  [DeviceStatus.POWER_UP, 'The state of the bill validator after power up.'],
  [DeviceStatus.POWER_UP_WITH_BILL_IN_VALIDATOR, 'Power up with bill in the Bill Validator. After a RESET command from the Controller Bill Validator returns the bill and continues initializing.'],
  [DeviceStatus.POWER_UP_WITH_BILL_IN_STACKER, 'Power up with bill in Stacker (Bill was transported too far to be returned). After the Bill Validator is reset and INITIALIZING is complete, status will immediately change to STACKED (81H) (Credit Recovery feature).'],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.INITIALIZE, 'Bill Validator executes initialization after the RESET command from Controller.'],
  [DeviceStatus.IDLING, 'Bill Validator waits for an inserting of bill into its bill path.'],
  [DeviceStatus.ACCEPTING, 'Bill Validator executes scanning of a bill and determines its denomination.'],
  [DeviceStatus.STACKING, 'Bill Validator transports a bill from Escrow position to drop cassette and remains in this state until the bill is stacked or jammed.'],
  [DeviceStatus.RETURNING, 'Bill Validator transports a bill from Escrow position back to customer and remains in this state until customer removes the bill or the bill is jammed.'],
  [DeviceStatus.UNIT_DISABLED, 'Bill Validator has been disabled by the Controller or just came out of initialization.'],
  [DeviceStatus.HOLDING, 'The state, in which the bill is held in Escrow position after the HOLD command of the Controller.'],
  [DeviceStatus.DEVICE_BUSY, 'Bill Validator cannot answer with a full-length message right now.'],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.REJECTING_DUE_TO_INSERTION, 'Insertion error.'],
  [DeviceStatus.REJECTING_DUE_TO_MAGNETIC, 'Dielectric error.'],
  [DeviceStatus.REJECTING_DUE_TO_REMAINED_BILL_IN_HEAD, 'Previously inserted bill remains in head.'],
  [DeviceStatus.REJECTING_DUE_TO_MULTIPLYING, 'Compensation error/multiplying factor error.'],
  [DeviceStatus.REJECTING_DUE_TO_CONVEYING, 'Bill transport error.'],
  [DeviceStatus.REJECTING_DUE_TO_IDENTIFICATION, 'Identification error.'],
  [DeviceStatus.REJECTING_DUE_TO_VERIFICATION, 'Verification error.'],
  [DeviceStatus.REJECTING_DUE_TO_OPTIC, 'Optic Sensor error.'],
  [DeviceStatus.REJECTING_DUE_TO_INHIBIT, 'Return by “inhibit denomination” error.'],
  [DeviceStatus.REJECTING_DUE_TO_CAPACITY, 'Capacitance error.'],
  [DeviceStatus.REJECTING_DUE_TO_OPERATION, 'Operation error.'],
  [DeviceStatus.REJECTING_DUE_TO_LENGTH, 'Length error.'],
  [DeviceStatus.REJECTING_DUE_TO_UNRECOGNISED_BARCODE, 'Bill taken was treated as a barcode but no reliable data can be read from it.'],
  [DeviceStatus.REJECTING_DUE_TO_UV, 'Banknote UV properties do not meet the predefined criteria.'],
  [DeviceStatus.REJECTING_DUE_TO_INCORRECT_NUMBER_OF_CHARACTERS_IN_BARCODE, 'Barcode data was read (at list partially) but is inconsistent.'],
  [DeviceStatus.REJECTING_DUE_TO_UNKNOWN_BARCODE_START_SEQUENCE, 'Barcode was not read as no synchronization was established.'],
  [DeviceStatus.REJECTING_DUE_TO_UNKNOWN_BARCODE_STOP_SEQUENCE, 'Barcode was read but trailing data is corrupt.'],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.DROP_CASSETTE_FULL, 'Drop Cassette full condition.'],
  [DeviceStatus.DROP_CASSETTE_OUT_OF_POSITION, 'The Bill Validator has detected the drop cassette to be open or removed.'],
  [DeviceStatus.VALIDATOR_JAMMED, 'A bill(s) has jammed in the acceptance path.'],
  [DeviceStatus.DROP_CASSETTE_JAMMED, 'A bill has jammed in drop cassette.'],
  [DeviceStatus.CHEATED, 'Bill Validator sends this event if the intentions of the user to deceive the Bill Validator are detected.'],
  [DeviceStatus.PAUSE, 'When the user tries to insert a second bill when the previous bill is in the Bill Validator but has not been stacked. Thus Bill Validator stops motion of the second bill until the second bill is removed.'],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.STACK_MOTOR_FAILURE, 'Drop Cassette Motor failure.'],
  [DeviceStatus.TRANSPORT_MOTOR_SPEED_FAILURE, 'Transport Motor Speed failure.'],
  [DeviceStatus.TRANSPORT_MOTOR_FAILURE, 'Transport Motor failure.'],
  [DeviceStatus.ALIGNING_MOTOR_FAILURE, 'Aligning Motor failure.'],
  [DeviceStatus.INITIAL_CASSETTE_STATUS_FAILURE, 'Initial Cassette Status failure.'],
  [DeviceStatus.OPTIC_CANAL_FAILURE, 'One of the optic sensors has failed to provide its response.'],
  [DeviceStatus.MAGNETIC_CANAL_FAILURE, 'Inductive sensor failed to respond.'],
  [DeviceStatus.CAPACITANCE_CANAL_FAILURE, 'Capacitance sensor failed to respond.'],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.ESCROW_POSITION, 'If bill type is enabled with escrow the Bill Validator waits command from Controller to stack or to return bill. If during 10 sec command will not be sent bill will be returned.'],
  [DeviceStatus.BILL_STACKED, 'Bill stacked.'],
  [DeviceStatus.BILL_RETURNED, 'Bill returned.']
]);

/* End of file Const.ts */