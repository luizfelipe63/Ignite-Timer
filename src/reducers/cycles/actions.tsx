import { cycle } from './reducer'

export enum ActionsTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  MARK_CURRENT_AS_FINISHED = 'MARK_CURRENT_AS_FINISHED',
}

export function addNewCycleAction(newCycle: cycle) {
  return {
    type: ActionsTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function markCurrentAsFinisehdAction() {
  return {
    type: ActionsTypes.MARK_CURRENT_AS_FINISHED,
  }
}

export function interrupCycleAction() {
  return {
    type: ActionsTypes.INTERRUPT_CYCLE,
  }
}
