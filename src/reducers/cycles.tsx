export interface cycle {
  id: string
  task: string
  minutesAmount: number
  starteDate: Date
  interruptDate?: Date
  finishDate?: Date
}

interface CyclesState {
  cycles: cycle[]
  activeCycleId: string | null
}

export enum ActionsTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  MARK_CURRENT_AS_FINISHED = 'MARK_CURRENT_AS_FINISHED',
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionsTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }
    case ActionsTypes.INTERRUPT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    case ActionsTypes.MARK_CURRENT_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    default:
      return state
  }
}
