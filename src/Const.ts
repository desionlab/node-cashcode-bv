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
  POWER_UP = 16,
  POWER_UP_WITH_BILL_IN_VALIDATOR = 17,
  POWER_UP_WITH_BILL_IN_STACKER = 18,
  /* ----------------------------------------------------------------------- */
  INITIALIZE = 19,
  IDLING = 20,
  ACCEPTING = 21,
  STACKING = 23,
  RETURNING = 24,
  UNIT_DISABLED = 25,
  HOLDING = 26,
  DEVICE_BUSY = 27,
  /* ----------------------------------------------------------------------- */
  REJECTING_DUE_TO_INSERTION = 2896,
  REJECTING_DUE_TO_MAGNETIC = 2897,
  REJECTING_DUE_TO_REMAINED_BILL_IN_HEAD = 2898,
  REJECTING_DUE_TO_MULTIPLYING = 2899,
  REJECTING_DUE_TO_CONVEYING = 28100,
  REJECTING_DUE_TO_IDENTIFICATION = 28101,
  REJECTING_DUE_TO_VERIFICATION = 28102,
  REJECTING_DUE_TO_OPTIC = 28103,
  REJECTING_DUE_TO_INHIBIT = 28104,
  REJECTING_DUE_TO_CAPACITY = 28105,
  REJECTING_DUE_TO_OPERATION = 28106,
  REJECTING_DUE_TO_LENGTH = 28108,
  REJECTING_DUE_TO_UNRECOGNISED_BARCODE = 28146,
  REJECTING_DUE_TO_UV = 28109,
  REJECTING_DUE_TO_INCORRECT_NUMBER_OF_CHARACTERS_IN_BARCODE = 28147,
  REJECTING_DUE_TO_UNKNOWN_BARCODE_START_SEQUENCE = 28148,
  REJECTING_DUE_TO_UNKNOWN_BARCODE_STOP_SEQUENCE = 28149,
  /* ----------------------------------------------------------------------- */
  DROP_CASSETTE_FULL = 65,
  DROP_CASSETTE_OUT_OF_POSITION = 66,
  VALIDATOR_JAMMED = 67,
  DROP_CASSETTE_JAMMED = 68,
  CHEATED = 69,
  PAUSE = 70,
  /* ----------------------------------------------------------------------- */
  STACK_MOTOR_FAILURE = 7180,
  TRANSPORT_MOTOR_SPEED_FAILURE = 7181,
  TRANSPORT_MOTOR_FAILURE = 7182,
  ALIGNING_MOTOR_FAILURE = 7183,
  INITIAL_CASSETTE_STATUS_FAILURE = 7184,
  OPTIC_CANAL_FAILURE = 7185,
  MAGNETIC_CANAL_FAILURE = 7186,
  CAPACITANCE_CANAL_FAILURE = 7195,
  /* ----------------------------------------------------------------------- */
  ESCROW_POSITION = 128,
  BILL_STACKED = 129,
  BILL_RETURNED = 130
}

/**
 *
 */
export const DeviceStatusMessage = new Map<DeviceStatus, string>([
  [DeviceStatus.POWER_UP, 'Power up.'],
  [
    DeviceStatus.POWER_UP_WITH_BILL_IN_VALIDATOR,
    'Power up with bill in the bill validator.'
  ],
  [
    DeviceStatus.POWER_UP_WITH_BILL_IN_STACKER,
    'Power up with bill in stacker.'
  ],
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
  [
    DeviceStatus.REJECTING_DUE_TO_REMAINED_BILL_IN_HEAD,
    'Rejecting due to remained bill in head.'
  ],
  [DeviceStatus.REJECTING_DUE_TO_MULTIPLYING, 'Rejecting due to multiplying.'],
  [DeviceStatus.REJECTING_DUE_TO_CONVEYING, 'Rejecting due to conveying.'],
  [
    DeviceStatus.REJECTING_DUE_TO_IDENTIFICATION,
    'Rejecting due to identification.'
  ],
  [
    DeviceStatus.REJECTING_DUE_TO_VERIFICATION,
    'Rejecting due to verification.'
  ],
  [DeviceStatus.REJECTING_DUE_TO_OPTIC, 'Rejecting due to optic.'],
  [DeviceStatus.REJECTING_DUE_TO_INHIBIT, 'Rejecting due to inhibit.'],
  [DeviceStatus.REJECTING_DUE_TO_CAPACITY, 'Rejecting due to capacity.'],
  [DeviceStatus.REJECTING_DUE_TO_OPERATION, 'Rejecting due to operation.'],
  [DeviceStatus.REJECTING_DUE_TO_LENGTH, 'Rejecting due to length.'],
  [
    DeviceStatus.REJECTING_DUE_TO_UNRECOGNISED_BARCODE,
    'Rejecting due to unrecognised barcode.'
  ],
  [DeviceStatus.REJECTING_DUE_TO_UV, 'Rejecting due to UV.'],
  [
    DeviceStatus.REJECTING_DUE_TO_INCORRECT_NUMBER_OF_CHARACTERS_IN_BARCODE,
    'Rejecting due to incorrect number of characters in barcode.'
  ],
  [
    DeviceStatus.REJECTING_DUE_TO_UNKNOWN_BARCODE_START_SEQUENCE,
    'Rejecting due to unknown barcode start sequence.'
  ],
  [
    DeviceStatus.REJECTING_DUE_TO_UNKNOWN_BARCODE_STOP_SEQUENCE,
    'Rejecting due to unknown barcode stop sequence.'
  ],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.DROP_CASSETTE_FULL, 'Drop cassette full.'],
  [
    DeviceStatus.DROP_CASSETTE_OUT_OF_POSITION,
    'Drop cassette out of position.'
  ],
  [DeviceStatus.VALIDATOR_JAMMED, 'Validator jammed.'],
  [DeviceStatus.DROP_CASSETTE_JAMMED, 'Drop cassette jammed.'],
  [DeviceStatus.CHEATED, 'Cheated.'],
  [DeviceStatus.PAUSE, 'Pause.'],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.STACK_MOTOR_FAILURE, 'Stack motor failure.'],
  [
    DeviceStatus.TRANSPORT_MOTOR_SPEED_FAILURE,
    'Transport motor speed failure.'
  ],
  [DeviceStatus.TRANSPORT_MOTOR_FAILURE, 'Transport motor failure.'],
  [DeviceStatus.ALIGNING_MOTOR_FAILURE, 'Aligning motor failure.'],
  [
    DeviceStatus.INITIAL_CASSETTE_STATUS_FAILURE,
    'Initial cassette status failure.'
  ],
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
  [
    DeviceStatus.POWER_UP_WITH_BILL_IN_VALIDATOR,
    'Power up with bill in the Bill Validator. After a RESET command from the Controller Bill Validator returns the bill and continues initializing.'
  ],
  [
    DeviceStatus.POWER_UP_WITH_BILL_IN_STACKER,
    'Power up with bill in Stacker (Bill was transported too far to be returned). After the Bill Validator is reset and INITIALIZING is complete, status will immediately change to STACKED (81H) (Credit Recovery feature).'
  ],
  /* ----------------------------------------------------------------------- */
  [
    DeviceStatus.INITIALIZE,
    'Bill Validator executes initialization after the RESET command from Controller.'
  ],
  [
    DeviceStatus.IDLING,
    'Bill Validator waits for an inserting of bill into its bill path.'
  ],
  [
    DeviceStatus.ACCEPTING,
    'Bill Validator executes scanning of a bill and determines its denomination.'
  ],
  [
    DeviceStatus.STACKING,
    'Bill Validator transports a bill from Escrow position to drop cassette and remains in this state until the bill is stacked or jammed.'
  ],
  [
    DeviceStatus.RETURNING,
    'Bill Validator transports a bill from Escrow position back to customer and remains in this state until customer removes the bill or the bill is jammed.'
  ],
  [
    DeviceStatus.UNIT_DISABLED,
    'Bill Validator has been disabled by the Controller or just came out of initialization.'
  ],
  [
    DeviceStatus.HOLDING,
    'The state, in which the bill is held in Escrow position after the HOLD command of the Controller.'
  ],
  [
    DeviceStatus.DEVICE_BUSY,
    'Bill Validator cannot answer with a full-length message right now.'
  ],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.REJECTING_DUE_TO_INSERTION, 'Insertion error.'],
  [DeviceStatus.REJECTING_DUE_TO_MAGNETIC, 'Dielectric error.'],
  [
    DeviceStatus.REJECTING_DUE_TO_REMAINED_BILL_IN_HEAD,
    'Previously inserted bill remains in head.'
  ],
  [
    DeviceStatus.REJECTING_DUE_TO_MULTIPLYING,
    'Compensation error/multiplying factor error.'
  ],
  [DeviceStatus.REJECTING_DUE_TO_CONVEYING, 'Bill transport error.'],
  [DeviceStatus.REJECTING_DUE_TO_IDENTIFICATION, 'Identification error.'],
  [DeviceStatus.REJECTING_DUE_TO_VERIFICATION, 'Verification error.'],
  [DeviceStatus.REJECTING_DUE_TO_OPTIC, 'Optic Sensor error.'],
  [
    DeviceStatus.REJECTING_DUE_TO_INHIBIT,
    'Return by “inhibit denomination” error.'
  ],
  [DeviceStatus.REJECTING_DUE_TO_CAPACITY, 'Capacitance error.'],
  [DeviceStatus.REJECTING_DUE_TO_OPERATION, 'Operation error.'],
  [DeviceStatus.REJECTING_DUE_TO_LENGTH, 'Length error.'],
  [
    DeviceStatus.REJECTING_DUE_TO_UNRECOGNISED_BARCODE,
    'Bill taken was treated as a barcode but no reliable data can be read from it.'
  ],
  [
    DeviceStatus.REJECTING_DUE_TO_UV,
    'Banknote UV properties do not meet the predefined criteria.'
  ],
  [
    DeviceStatus.REJECTING_DUE_TO_INCORRECT_NUMBER_OF_CHARACTERS_IN_BARCODE,
    'Barcode data was read (at list partially) but is inconsistent.'
  ],
  [
    DeviceStatus.REJECTING_DUE_TO_UNKNOWN_BARCODE_START_SEQUENCE,
    'Barcode was not read as no synchronization was established.'
  ],
  [
    DeviceStatus.REJECTING_DUE_TO_UNKNOWN_BARCODE_STOP_SEQUENCE,
    'Barcode was read but trailing data is corrupt.'
  ],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.DROP_CASSETTE_FULL, 'Drop Cassette full condition.'],
  [
    DeviceStatus.DROP_CASSETTE_OUT_OF_POSITION,
    'The Bill Validator has detected the drop cassette to be open or removed.'
  ],
  [
    DeviceStatus.VALIDATOR_JAMMED,
    'A bill(s) has jammed in the acceptance path.'
  ],
  [DeviceStatus.DROP_CASSETTE_JAMMED, 'A bill has jammed in drop cassette.'],
  [
    DeviceStatus.CHEATED,
    'Bill Validator sends this event if the intentions of the user to deceive the Bill Validator are detected.'
  ],
  [
    DeviceStatus.PAUSE,
    'When the user tries to insert a second bill when the previous bill is in the Bill Validator but has not been stacked. Thus Bill Validator stops motion of the second bill until the second bill is removed.'
  ],
  /* ----------------------------------------------------------------------- */
  [DeviceStatus.STACK_MOTOR_FAILURE, 'Drop Cassette Motor failure.'],
  [
    DeviceStatus.TRANSPORT_MOTOR_SPEED_FAILURE,
    'Transport Motor Speed failure.'
  ],
  [DeviceStatus.TRANSPORT_MOTOR_FAILURE, 'Transport Motor failure.'],
  [DeviceStatus.ALIGNING_MOTOR_FAILURE, 'Aligning Motor failure.'],
  [
    DeviceStatus.INITIAL_CASSETTE_STATUS_FAILURE,
    'Initial Cassette Status failure.'
  ],
  [
    DeviceStatus.OPTIC_CANAL_FAILURE,
    'One of the optic sensors has failed to provide its response.'
  ],
  [DeviceStatus.MAGNETIC_CANAL_FAILURE, 'Inductive sensor failed to respond.'],
  [
    DeviceStatus.CAPACITANCE_CANAL_FAILURE,
    'Capacitance sensor failed to respond.'
  ],
  /* ----------------------------------------------------------------------- */
  [
    DeviceStatus.ESCROW_POSITION,
    'If bill type is enabled with escrow the Bill Validator waits command from Controller to stack or to return bill. If during 10 sec command will not be sent bill will be returned.'
  ],
  [DeviceStatus.BILL_STACKED, 'Bill stacked.'],
  [DeviceStatus.BILL_RETURNED, 'Bill returned.']
]);
