import { AdjList, State, deserialiseState, serialiseState } from "./parseModel.ts"

export function buildSentence(
    adjList: AdjList,
) {
    /* 
    Client side version of the tweet generator that was previously running 
    on the Flask server
    */

    let sentence: string[] = []

    let currentState = ["___BEGIN__","___BEGIN__"] as State

    while (currentState[1] !== "___END__") {
        const serialisedState = serialiseState(currentState)
        const nextStates = adjList[serialisedState]
        const totalFreq = nextStates.reduce((acc, [_, freq]) => acc + freq, 0)
        const rand = Math.random() * totalFreq
        let runningTotal = 0
        for (const [nextState, freq] of nextStates) {
            runningTotal += freq
            if (runningTotal >= rand) {
                sentence.push(nextState)
                currentState = [currentState[1], nextState]
                break
            }
        }
    }

    return sentence.slice(0, -1).join(" ")
}
