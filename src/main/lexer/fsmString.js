import FSM from './fsm';


const State = {
    Initial: 1,
    String: 2,
    Escaped: 3,
    Closing: 4,
    NoNextState: -1
}

const equalToState = current => stateName => current === State[stateName];

export default class StringFSM extends FSM {
    constructor() {
        super(Object.values(State), State.Initial, [State.String], State.NoNextState)
    }

    nextState(currentState, character) {

        const stateIs = equalToState(currentState);

        if (stateIs('Initial') && character === '"') {
            return State.String
        }

        if (character === '\\') {
            return State.Escaped
        }

        if (stateIs('Escaped')) {
            return State.String
        }

        if (stateIs('String') && character !== '"') {
            return State.String
        }

        if (stateIs('String')) {
            return State.Closing
        }

        return State.NoNextState
    }
}