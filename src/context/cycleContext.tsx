import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  ActionsTypes,
  addNewCycleAction,
  interrupCycleAction,
  markCurrentAsFinisehdAction,
} from '../reducers/cycles/actions'
import { cycle, cyclesReducer } from '../reducers/cycles/reducer'

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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialValue) => {
      const storedStateAsJSON = localStorage.getItem(
        '@igniste-timer:cycles-state-1.0.0',
      )

      if (!storedStateAsJSON) return initialValue
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondesPassed, setAmountSecondPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.starteDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@igniste-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function setSecondPassed(secondes: number) {
    setAmountSecondPassed(secondes)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentAsFinisehdAction())
  }

  function createNewCycle(data: CreatCycleData) {
    const id = String(new Date().getTime())

    const newCycle: cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      starteDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    // setCycle((state) => [...state, newCycle])
    setAmountSecondPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interrupCycleAction())
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
