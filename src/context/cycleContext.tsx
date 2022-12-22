import { createContext, ReactNode, useState } from 'react'

interface CreatCycleData {
  task: string
  minutesAmount: number
}

interface cycle {
  id: string
  task: string
  minutesAmount: number
  starteDate: Date
  interruptDate?: Date
  finishDate?: Date
}

interface cycleContextType {
  cycle: cycle[]
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
  const [cycle, setCycle] = useState<cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondesPassed, setAmountSecondPassed] = useState(0)

  const activeCycle = cycle.find((cycle) => cycle.id === activeCycleId)

  function setSecondPassed(secondes: number) {
    setAmountSecondPassed(secondes)
  }

  function markCurrentCycleAsFinished() {
    setCycle((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function createNewCycle(data: CreatCycleData) {
    const id = String(new Date().getTime())

    const newCycle: cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      starteDate: new Date(),
    }

    setCycle((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondPassed(0)
    // reset()
  }

  function interruptCurrentCycle() {
    setCycle((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycle,
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
