import { createContext, useContext, useState } from 'react'

const cycleContext = createContext({} as any)

function CountDown() {
  const { activeCycle } = useContext(cycleContext)

  return <h1>CountDown: {activeCycle}</h1>
}

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(cycleContext)

  return (
    <h1>
      NewCycleForm: {activeCycle}
      <button
        onClick={() => {
          setActiveCycle(2)
        }}
      >
        Mudar ciclo ativo
      </button>
    </h1>
  )
}

export function Home() {
  const [activeCycle, setActiveCycle] = useState(0)

  return (
    <cycleContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <CountDown />
        <NewCycleForm />
      </div>
    </cycleContext.Provider>
  )
}
