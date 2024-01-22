type FreqList = { [key: string]: number }

export type State = [string, string]

type DeserialisedState = string

type Chain = [State, FreqList]

export type AdjList = { [key: DeserialisedState]: [string, number][] }

export function serialiseState(state: State) {
    return state.join('|||') as DeserialisedState
}

export function deserialiseState(state: string) {
    return state.split('|||') as State
}

function buildAdjList(
    model: Chain[],
) {
    const res: AdjList = {}
    
    for (let chain of model) {
        const [state, freqList] = chain
        const serialisedState = serialiseState(state)
        res[serialisedState] = []
        for (const [nextState, freq] of Object.entries(freqList)) {
            res[serialisedState].push([nextState, freq])
        }
    }

    return res
}


// let obamaResponse = JSON.parse(readFileSync('BarackObamaOriginalModel.json', 'utf8'))
// let obamaModel = JSON.parse(obamaResponse.currentModel)
// let obamaChains = JSON.parse(obamaModel.chain) as Chain[]
// let obamaAdjList = buildAdjList(obamaChains)

// writeFileSync('obamaAdjList.json', JSON.stringify(obamaAdjList))