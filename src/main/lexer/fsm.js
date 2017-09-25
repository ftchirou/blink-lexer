export default class FSM {
    constructor(states, initialState, acceptingStates, NoNextState, nextState = this.nextState) {
        this.states = Array.isArray(states) ? new Set(states) : states;
        this.initialState = initialState;
        this.acceptingStates = Array.isArray(acceptingStates) ? new Set(acceptingStates) : acceptingStates;
        this.NoNextState = NoNextState;
        this.nextState = nextState;
    }

    run(input) {
        let currentState = this.initialState;
        let length = 0;

        input.split('').every(
            (character, i) => {
                let nextState = this.nextState(currentState, character);

                if (nextState === this.NoNextState) {
                    return false;
                }

                currentState = nextState;
                length = i;
                return true
            });

        return {
            recognized: this.acceptingStates.has(currentState),
            value: input.slice(0, length + 1),
            state: currentState
        };
    }
}


