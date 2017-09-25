import FSM from './fsm';
import { isDigit } from './charUtils'

const States = {
    Initial: 1,
    Integer: 2,
    BeginNumberWithFractionalPart: 3,
    NumberWithFractionalPart: 4,
    BeginNumberWithExponent: 5,
    BeginNumberWithSignedExponent: 6,
    NumberWithExponent: 7,
    NoNextState: -1
};

const equalToState = current => stateName => current === States[stateName];

export default class NumberFSM extends FSM {
    constructor() {
        super(Object.values(States), States.Initial,
            [States.Integer, States.NumberWithFractionalPart, States.NumberWithExponent],
            States.NoNextState);
        this.states = States;
    }

    nextState(currentState, character) {

        const stateIs = equalToState(currentState)

        if (stateIs('Initial') && isDigit(character)) {
            return States.Integer;
        }

        if (character === '.') {
            return States.BeginNumberWithFractionalPart;
        }

        if (stateIs('NumberWithExponent') && isDigit(character))
            return States.NumberWithExponent

        if (stateIs('Integer')) {
            if (isDigit(character)) {
                return States.Integer;
            }

            if (character.toLowerCase() === 'e') {
                return States.BeginNumberWithExponent;
            }

        }

        if (stateIs('BeginNumberWithFractionalPart'))
            if (isDigit(character)) {
                return States.NumberWithFractionalPart;
            }

        if (stateIs('NumberWithFractionalPart')) {
            if (isDigit(character)) {
                return States.NumberWithFractionalPart;
            }

            if (character.toLowerCase() === 'e') {
                return States.BeginNumberWithExponent;
            }

        }

        if (stateIs('BeginNumberWithExponent')) {
            if (character === '+' || character === '-') {
                return States.BeginNumberWithSignedExponent;
            }

            if (isDigit(character)) {
                return States.NumberWithExponent;
            }

        };

        if (stateIs('BeginNumberWithSignedExponent'))
            if (isDigit(character)) {
                return States.NumberWithExponent;
            }

        return States.NoNextState;
    };
}