import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../..'
import { CountContainer, Seperator } from './styles'

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondPassed,
    amountSecondesPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondesPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const secondes = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${secondes}`
    }
  }, [minutes, secondes, activeCycle])

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.starteDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondPassed,
  ])

  return (
    <CountContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Seperator>:</Seperator>
      <span>{secondes[0]}</span>
      <span>{secondes[1]}</span>
    </CountContainer>
  )
}
