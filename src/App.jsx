import { useState } from 'react'
import  useSimulation  from './hooks/useSimulation'
import Process from './components/Process';
import Processes from './components/Processes';
import { fillLots } from './helpers/FillLots';
import { totalProcesses } from './helpers/functions';

export default function App() {
  const [process, setProcess] = useState(false);
  const { lot, setLot, lots, setLots, count, setCount, startTimer, setIntervalId } = useSimulation()

  

  const handleClick = ()=> {
    if(lot.length > 0){
      const updateLots = [...lots, lot]
      setLots(updateLots)
      setLot([])
    }
    setProcess(true)
    setIntervalId(startTimer())
  }

  const handleClickFillProcesses = () => {
    const newLots = fillLots(12)
    setLots(newLots) 
    const totalProcess = totalProcesses(newLots)
    setCount(totalProcess)
  }


  return (
    <> 
      {!process ? (
        <div className='relative'>
          {(lot.length > 0 || lots.length > 0) ? (
            <button 
              className='absolute block w-full px-8 py-3 text-sm font-bold text-white bg-blue-500 md:w-auto md:left-0 top-[48px]'
              onClick={ handleClick}
            >
              Empezar Procesos
            </button>
          ) : null}

            <p className='absolute block w-full px-8 py-3 text-sm font-bold text-center text-white bg-green-700 md:w-auto md:right-0 top-[96px]'>Lotes: {count}  </p>

            <button className='absolute top-0 block w-full px-8 py-3 text-sm font-bold text-center text-white bg-orange-700 md:w-auto md:right-0' onClick={ handleClickFillProcesses}>Rellenar y simular procesos  </button>


          

          <div className='flex flex-col items-center justify-center h-screen pt-16 bg-gray-100 md:pt-2 md:p-5 lg:flex-row'>
            <h1 className="mt-10 text-4xl md:mt-0 md:mx-auto lg:w-1/3 text-bond">Procesamiento por lotes</h1>
            <Process />
          </div>
        </div>
      ) : (
        <Processes/>
      )}
    </>
  );
}
