import { Play } from 'phosphor-react'
import {
  CountContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Seperator,
  StartCountdownButton,
  TaskInput,
} from './styles'
import { useForm } from 'react-hook-form'

export function Home() {
  const { register, handleSubmit, watch } = useForm()

  function handleCreatNewCycle(data: any) {
    console.log(data)
  }

  const task = watch('task')
  const isSubimitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreatNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-sugesttions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-sugesttions">
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="Tarefa"></option>
          </datalist>

          <label htmlFor="minuteAmount">Durante</label>
          <MinutesAmountInput
            id="minuteAmount"
            type="number"
            placeholder="00"
            step={5}
            max={60}
            min={5}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountContainer>
          <span>0</span>
          <span>0</span>
          <Seperator>:</Seperator>
          <span>0</span>
          <span>0</span>
        </CountContainer>

        <StartCountdownButton disabled={isSubimitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
