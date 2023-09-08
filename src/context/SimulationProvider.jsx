import { createContext, useState } from "react"


// Crear el contexto
export const SimulationContext = createContext();

export function SimulationProvider({ children }) {
  
    const [ lot, setLot ] = useState([])
    const [ lots, setLots ] = useState([])
    const [ timeGlobal, setTimeGlobal ] = useState(false)
    const [ count, setCount ] = useState(0)
    const [ time, setTime ] = useState(0);
    const [ intervalId, setIntervalId ] = useState(0)
    const [ timeProcess, setTimeProcess ] = useState(0);
    const [ intervalIdProcess, setIntervalIdProcess ] = useState(0)
    const [ processesEnd, setProcessesEnd ] = useState([])

    const startTimer = () => {
        const intervalId = setInterval(() => {
          setTime(prevTime => prevTime + 1);
        }, 1000); // Actualiza cada segundo

        return intervalId;
    }
    const startProcessTimer = () => {
      const intervalIdProcess = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000); // Actualiza cada segundo

      return intervalIdProcess;
  };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const getArrayFull = () => {
      const arrayCurrent = lots
      
      return arrayCurrent.flat()
    }

    const updateArray = (array, element) => {
      for(let i = 0; i < array.length; ++i) {
        if(element.lot_id !== array[i + 1].lot_id) {
          array[i] = element
        }
        array[i] = array[i + 1]
      }
    }

  
    return (

        <SimulationContext.Provider
          value={{ 
            lot, 
            setLot, 
            lots, 
            setLots, 
            timeGlobal, 
            setTimeGlobal,
            count, 
            setCount,
            time,
            startTimer,
            formatTime,
            intervalId,
            setIntervalId,
            processesEnd,
            setProcessesEnd,
            getArrayFull,
            updateArray,
            timeProcess, 
            setTimeProcess,
            intervalIdProcess, 
            setIntervalIdProcess,
            startProcessTimer
          }}
        >
          {children}
        </SimulationContext.Provider>
  )
}


export default SimulationContext