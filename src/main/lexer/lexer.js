import { Token } from './token'
import { TokenType } from './tokentype'
import { isNewLine, isDigit, isLetter, isWhitespaceOrNewLine } from './charUtils'
import FSM from './fsm'
import StringFSM from './fsmString'
export class Lexer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.line = 0;
        this.column = 0;
    }

    tokenize() {
        let tokens = [];
        let token = this.nextToken();

        while (token.type !== TokenType.EndOfInput) {
            tokens.push(token);
            token = this.nextToken();
        }

        return tokens;
    }

    currentState() {
        return { position: this.position, line: this.line, column: this.column }
    }

    updateState(lineOffset = 0, columnOffset = 0, positionOffset = 0) {

        this.line = this.line + lineOffset;
        this.column = columnOffset < 0 ? 0 : this.column + columnOffset;
        this.position = this.position + positionOffset;
    }

    recognizeNewLine() {
        const { line, column } = this.currentState();
        this.updateState(1, -1, 1)
        return new Token(TokenType.Newline, '\n', line, column);
    }

    recognizeIdentifier() {
        const { position, line, column } = this.currentState();
        const foundChars = [];
        let char = this.input.charAt(position + foundChars.length);

        while (isLetter(char)) {
            foundChars.push(char);
            char = this.input.charAt(position + foundChars.length);
        }

        this.updateState(0, foundChars.length, foundChars.length);
        return new Token(TokenType.Identifier, foundChars.join(''), line, column)

    }

    recognizeString() {
        const { position, line, column } = this.currentState();
        const fsm = new StringFSM();
        const { value, recognized } = fsm.run(this.input.substring(position))
        this.updateState(0, value.length, value.length);
        return new Token(TokenType.String, value, line, column)
    }

    makeNumberFSM() {

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

        const nextState = (currentState, character) => {

            if (currentState === States.Initial && isDigit(character)) {
                return States.Integer;
            }

            if (character === '.') {
                return States.BeginNumberWithFractionalPart;
            }

            if (currentState === States.NumberWithExponent && isDigit(character))
                return States.NumberWithExponent

            if (currentState === States.Integer) {
                if (isDigit(character)) {
                    return States.Integer;
                }

                if (character.toLowerCase() === 'e') {
                    return States.BeginNumberWithExponent;
                }

            }

            if (currentState === States.BeginNumberWithFractionalPart)
                if (isDigit(character)) {
                    return States.NumberWithFractionalPart;
                }

            if (currentState === States.NumberWithFractionalPart) {
                if (isDigit(character)) {
                    return States.NumberWithFractionalPart;
                }

                if (character.toLowerCase() === 'e') {
                    return States.BeginNumberWithExponent;
                }

            }

            if (currentState === States.BeginNumberWithExponent) {
                if (character === '+' || character === '-') {
                    return States.BeginNumberWithSignedExponent;
                }

                if (isDigit(character)) {
                    return States.NumberWithExponent;
                }

            };

            if (currentState === States.BeginNumberWithSignedExponent)
                if (isDigit(character)) {
                    return States.NumberWithExponent;
                }

            return States.NoNextState;
        };

        const fsm = new FSM(Object.values(States), States.Initial, [States.Integer, States.NumberWithFractionalPart, States.NumberWithExponent], States.NoNextState, nextState);
        fsm.states = States;
        return fsm;
    }

    recognizeNumber() {
        const { position, line, column } = this.currentState();
        const fsm = this.makeNumberFSM();
        let { recognized, value, state } = fsm.run(this.input.substring(this.position));

        if (recognized) {
            this.updateState(0, value.length, value.length);
            const type = state === fsm.states.Integer
                ? TokenType.Integer
                : TokenType.Decimal;

            return new Token(type, value, line, column);
        }
    }


    nextToken() {
        if (this.position >= this.input.length) {
            return new Token(TokenType.EndOfInput);
        }

        let character = this.input.charAt(this.position);

        if (isLetter(character)) {
            return this.recognizeIdentifier();
        }

        if (isDigit(character) || character === '.') {
            return this.recognizeNumber();
        }

        if (character === '"') {
            return this.recognizeString();
        }

        if (isNewLine(character)) {
            return this.recognizeNewLine();
        }

        throw new Error(`Unrecognized character ${character} at line ${this.line} and column ${this.column}.`);
    }
}
