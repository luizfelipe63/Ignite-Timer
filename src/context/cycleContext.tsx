import { createContext, ReactNode, useReducer, useState } from 'react'
import { ActionsTypes, cycle, cyclesReducer } from '../reducers/cycles'

interface CreatCycleData {
  task: string
  minutesAmount: number
}

interface cycleContextType {
  cycles: cycle[]
  activeCycle: cycle | undefined
  activeCycleId: string | null
  amountSecondesPassed: number
  setSecondPassed: (secondes: number) => void
  markCurrentCycleAsFinished: () => void
  createNewCycle: (data: CreatCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as cycleContextType)

interface CyclesContetexProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContetexProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })
  const [amountSecondesPassed, setAmountSecondPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondPassed(secondes: number) {
    setAmountSecondPassed(secondes)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: ActionsTypes.MARK_CURRENT_AS_FINISHED,
      payload: {
        activeCycleId,
      },
    })
  }

  function createNewCycle(data: CreatCycleData) {
    const id = String(new Date().getTime())

    const newCycle: cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      starteDate: new Date(),
    }

    dispatch({
      type: ActionsTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    })

    // setCycle((state) => [...state, newCycle])
    setAmountSecondPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: ActionsTypes.INTERRUPT_CYCLE,
      payload: {
        activeCycleId,
      },
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondesPassed,
        setSecondPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
