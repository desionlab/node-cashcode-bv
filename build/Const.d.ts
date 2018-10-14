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
    POWER_UP = "10",
    POWER_UP_WITH_BILL_IN_VALIDATOR = "11",
    POWER_UP_WITH_BILL_IN_STACKER = "12",
    INITIALIZE = "13",
    IDLING = "14",
    ACCEPTING = "15",
    STACKING = "17",
    RETURNING = "18",
    UNIT_DISABLED = "19",
    HOLDING = "1a",
    DEVICE_BUSY = "1b",
    REJECTING_DUE_TO_INSERTION = "1c60",
    REJECTING_DUE_TO_MAGNETIC = "1c61",
    REJECTING_DUE_TO_REMAINED_BILL_IN_HEAD = "1c62",
    REJECTING_DUE_TO_MULTIPLYING = "1c63",
    REJECTING_DUE_TO_CONVEYING = "1c64",
    REJECTING_DUE_TO_IDENTIFICATION = "1c65",
    REJECTING_DUE_TO_VERIFICATION = "1c66",
    REJECTING_DUE_TO_OPTIC = "1c67",
    REJECTING_DUE_TO_INHIBIT = "1c68",
    REJECTING_DUE_TO_CAPACITY = "1c69",
    REJECTING_DUE_TO_OPERATION = "1c6a",
    REJECTING_DUE_TO_LENGTH = "1c6c",
    REJECTING_DUE_TO_UNRECOGNISED_BARCODE = "1c92",
    REJECTING_DUE_TO_UV = "1c6d",
    REJECTING_DUE_TO_INCORRECT_NUMBER_OF_CHARACTERS_IN_BARCODE = "1c93",
    REJECTING_DUE_TO_UNKNOWN_BARCODE_START_SEQUENCE = "1c94",
    REJECTING_DUE_TO_UNKNOWN_BARCODE_STOP_SEQUENCE = "1c95",
    DROP_CASSETTE_FULL = "41",
    DROP_CASSETTE_OUT_OF_POSITION = "42",
    VALIDATOR_JAMMED = "43",
    DROP_CASSETTE_JAMMED = "44",
    CHEATED = "45",
    PAUSE = "46",
    STACK_MOTOR_FAILURE = "4750",
    TRANSPORT_MOTOR_SPEED_FAILURE = "4751",
    TRANSPORT_MOTOR_FAILURE = "4752",
    ALIGNING_MOTOR_FAILURE = "4753",
    INITIAL_CASSETTE_STATUS_FAILURE = "4754",
    OPTIC_CANAL_FAILURE = "4755",
    MAGNETIC_CANAL_FAILURE = "4756",
    CAPACITANCE_CANAL_FAILURE = "475f",
    ESCROW_POSITION = "80",
    BILL_STACKED = "81",
    BILL_RETURNED = "82"
}
/**
 *
 */
export declare const DeviceStatusMessage: Map<DeviceStatus, string>;
/**
 *
 */
export declare const DeviceStatusDescription: Map<DeviceStatus, string>;
