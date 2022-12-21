import { createContext, useState } from 'react'
import { Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { CycleForm } from './components/newCycleForm'
import { CountDown } from './components/countDown'

interface cycle {
  id: string
  task: string
  minutesAmount: number
  starteDate: Date
  interruptDate?: Date
  finishDate?: Date
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCicleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface cycleContextType {
  activeCycle: cycle | undefined
  activeCycleId: string | null
  amountSecondesPassed: number
  setSecondPassed: (secondes: number) => void
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as cycleContextType)

export function Home() {
  const [cycle, setCycle] = useState<cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondesPassed, setAmountSecondPassed] = useState(0)

  const newCycleForm = useForm<NewCicleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

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

  function handleCreateNewCycle(data: NewCicleFormData) {
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
    reset()
  }

  function handleInterruptCycle() {
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

  console.log(cycle)

  const task = watch('task')
  const isSubimitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondesPassed,
            setSecondPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <CycleForm />
          </FormProvider>
          <CountDown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <Play size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubimitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
