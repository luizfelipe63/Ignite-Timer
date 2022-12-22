import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../../../context/cycleContext'
import { useFormContext } from 'react-hook-form'

export function CycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-sugesttions"
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        step={5}
        max={60}
        min={5}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
