import FSM from './fsm';


const State = {
    Initial: 1,
    String: 2,
    Escaped: 3,
    Closing: 4,
    NoNextState: -1
}

const equalTo = current => x => current === x;

export default class StringFSM extends FSM {
    constructor() {
        super(Object.values(State), State.Initial, [State.String], State.NoNextState)
    }

    nextState(currentState, character) {

        const stateIs = equalTo(currentState);

        if (stateIs(State.Initial) && character === '"') {
            return State.String
        }

        if (character === '\\') {
            return State.Escaped
        }

        if (stateIs(State.Escaped)) {
            return State.String
        }

        if (stateIs(State.String) && character !== '"') {
            return State.String
        }

        if (stateIs(State.String)) {
            return State.Closing
        }

        return State.NoNextState
    }
}