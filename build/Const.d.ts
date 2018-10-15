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
export declare const SYNC = 2;
/**
 * Poly for CRC calculated.
 */
export declare const CRC_POLY = 33800;
/**
 * Bill to bill peripheral addresses.
 */
export declare const ADR_BILL_TO_BILL = 1;
/**
 * Coin changer peripheral addresses.
 */
export declare const ADR_COIN_CHANGER = 2;
/**
 * Bill validator peripheral addresses.
 */
export declare const ADR_BILL_VALIDATOR = 3;
/**
 * Card reader peripheral addresses.
 */
export declare const ADR_CARD_READER = 4;
/**
 * Indicates state of the bill validator and its activity.
 */
export declare enum DeviceStatus {
    POWER_UP = 16,
    POWER_UP_WITH_BILL_IN_VALIDATOR = 17,
    POWER_UP_WITH_BILL_IN_STACKER = 18,
    INITIALIZE = 19,
    IDLING = 20,
    ACCEPTING = 21,
    STACKING = 23,
    RETURNING = 24,
    UNIT_DISABLED = 25,
    HOLDING = 26,
    DEVICE_BUSY = 27,
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
    DROP_CASSETTE_FULL = 65,
    DROP_CASSETTE_OUT_OF_POSITION = 66,
    VALIDATOR_JAMMED = 67,
    DROP_CASSETTE_JAMMED = 68,
    CHEATED = 69,
    PAUSE = 70,
    STACK_MOTOR_FAILURE = 7180,
    TRANSPORT_MOTOR_SPEED_FAILURE = 7181,
    TRANSPORT_MOTOR_FAILURE = 7182,
    ALIGNING_MOTOR_FAILURE = 7183,
    INITIAL_CASSETTE_STATUS_FAILURE = 7184,
    OPTIC_CANAL_FAILURE = 7185,
    MAGNETIC_CANAL_FAILURE = 7186,
    CAPACITANCE_CANAL_FAILURE = 7195,
    ESCROW_POSITION = 128,
    BILL_STACKED = 129,
    BILL_RETURNED = 130
}
/**
 *
 */
export declare const DeviceStatusMessage: Map<DeviceStatus, string>;
/**
 *
 */
export declare const DeviceStatusDescription: Map<DeviceStatus, string>;
