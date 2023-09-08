import { useEffect, useState } from "react";
import useSimulation from "../hooks/useSimulation";
import { functions, definitions } from "../helpers/functions";

export default function Processes() {
  const {
    time,
    formatTime,
    count,
    setCount,
    getArrayFull,
    intervalId,
    updateArray
  } = useSimulation();

  const [arrayFull, setArrayFull] = useState(getArrayFull());
  const [arreglosTerminados, setArreglosTerminados] = useState([]);
  const [currentElementIndex, setCurrentElementIndex] = useState(0);

  const [processStates, setProcessStates] = useState(Array(arrayFull.length).fill("en ejecucion"));

  useEffect(() => {
    console.log(arrayFull)
    const delay = (arrayFull[currentElementIndex]?.time * 1000) > 0 ? (arrayFull[currentElementIndex].time * 1000) : null
    if(delay === null) clearInterval(intervalId)
    if (currentElementIndex < arrayFull.length && delay) {
      if (processStates[currentElementIndex] === "en ejecucion") { // Verifica el estado antes de ejecutar
        const timer = setTimeout(() => {
          const elementToMove = arrayFull[currentElementIndex];
          const { val1, val2, operation } = elementToMove;
          elementToMove.result = functions(operation, val1, val2);
          setArreglosTerminados((prevArreglosTerminados) => [
            ...prevArreglosTerminados,
            elementToMove,
          ]);

          setCurrentElementIndex((prevIndex) => prevIndex + 1);
          if ((currentElementIndex + 1) % 3 === 0) {
            setCount((prev) => prev - 1);
          }
        }, delay);
        
        return () => clearTimeout(timer);
      }
      if(processStates[currentElementIndex] === "error") {
        const elementToMove = arrayFull[currentElementIndex];
          const { val1, val2, operation } = elementToMove;
          elementToMove.result = functions(operation, val1, val2);
          elementToMove.error = "Error en ejecucion"
          setArreglosTerminados((prevArreglosTerminados) => [
            ...prevArreglosTerminados,
            elementToMove,
          ]);

          setCurrentElementIndex((prevIndex) => prevIndex + 1);
          if ((currentElementIndex + 1) % 3 === 0) {
            setCount((prev) => prev - 1);
          }
      }
      
    }
  }, [arrayFull, currentElementIndex, processStates]);

   // Función para pausar un proceso
   const handlePause = (index) => {
    const updatedStates = [...processStates];
    updatedStates[index] = "pausado";
    setProcessStates(updatedStates);
  };

  // Función para continuar un proceso
  const handleContinue = (index) => {
    const updatedStates = [...processStates];
    updatedStates[index] = "en ejecucion";
    setProcessStates(updatedStates);

  };
  
  const handleError = (index) => {
    const updatedStates = [...processStates];
    updatedStates[index] = "error";
    setProcessStates(updatedStates);

  };

  const handleInterruption = (index) => {
    // const updatedStates = [...processStates];
    // updatedStates[index] = "interrupcion";
    //setProcessStates(updatedStates);
    const arrayProv = [...arrayFull]
    const arrayFinal = updateArray(arrayProv ,index)
    setArrayFull(arrayFinal)

  };

  return (
    <>
      <div className="relative">
        <p className="absolute block w-full px-8 py-3 text-sm font-bold text-center text-white bg-blue-700 md:w-auto md:left-0 top-20">
          Tiempo Global: {formatTime(time)}
        </p>

        <p className="absolute block w-full px-8 py-3 text-sm font-bold text-center text-white bg-green-700 md:w-auto md:right-0 top-20">
          Lotes Pendientes: {count}
        </p>

        <main className="flex items-center justify-between w-4/5 h-screen gap-5 mx-auto">
          <section className="w-2/5 overflow-y-auto max-h-[400px] p-2">
            <h2 className="my-3 text-3xl font-bold">Procesos Terminados</h2>
            <div className="space-y-3">
              {arreglosTerminados.map((element, index) => (
                <div
                  className="p-2 bg-gray-500 border border-gray-800 rounded-md"
                  key={index}
                >
                  <p className="font-bold text-center text-white text-md">
                    Numero del proceso:{" "}
                    <span className="font-normal text-md">{element.id}</span>
                  </p>
                  <p className="font-bold text-center text-white text-md">
                    Operacion:{" "}
                    <span className="font-normal text-md">
                      {definitions[element.operation]}
                    </span>
                  </p>

                  <p className="font-bold text-center text-white text-md">
                    {" "}
                    Valor 1:{" "}
                    <span className="font-normal text-md">{element.val1}</span>
                  </p>
                  <p className="font-bold text-center text-white text-md">
                    {" "}
                    Valor 2:{" "}
                    <span className="font-normal text-md">{element.val2}</span>
                  </p>

                  {/* <p className="font-bold text-center text-white text-md">Tiempo final: <span className="font-normal text-md">{element.time}</span></p> */}

                  {element?.error?.length > 0 ? (
                    <p className="font-bold text-center text-white text-md">
                    Resultado:{" "}
                    <span className="font-normal text-red-600 text-md">
                      {element.error}
                    </span>
                  </p>
                  ) : (
                    <p className="font-bold text-center text-white text-md">
                    Resultado:{" "}
                    <span className="font-normal text-md">
                      {element.result}
                    </span>
                  </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="w-3/5">
            <h2 className="text-3xl font-bold">Proceso en ejecucion</h2>
            {currentElementIndex < arrayFull.length ? (
              <div className="flex flex-col w-full p-3 space-y-3 rounded-lg shadow-lg bg-slate-100">
                <p>Numero del Proceso: {arrayFull[currentElementIndex]?.id}</p>

                <p className="">
                  Operacion: {arrayFull[currentElementIndex]?.val1}
                  <span className="text-xl font-bold">
                    {arrayFull[currentElementIndex]?.operation}
                  </span>
                  {arrayFull[currentElementIndex]?.val2}
                </p>

                <p>
                  Tiempo Estimado:{" "}
                  <span>{arrayFull[currentElementIndex]?.time}</span>
                </p>

                {processStates[currentElementIndex] === "pausado" ? (
                  <p className="w-1/3 p-2 font-bold text-center text-white border rounded-md bg-amber-600 borde-amber-700">En pausa</p>
                ) : null}

                <div className="flex justify-between w-full">
                  <button onClick={() => handleInterruption(currentElementIndex)} className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 border border-indigo-800 rounded-md cursor-pointer hover:bg-indigo-800">
                    Interrumpir
                  </button>
                  <button onClick={() => handleError(currentElementIndex)} className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 border border-indigo-800 rounded-md cursor-pointer hover:bg-indigo-800">
                    Error
                  </button>
                  <button onClick={() => handlePause(currentElementIndex)} className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 border border-indigo-800 rounded-md cursor-pointer hover:bg-indigo-800">
                    Pausa
                  </button>
                  <button onClick={() => handleContinue(currentElementIndex)} className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 border border-indigo-800 rounded-md cursor-pointer hover:bg-indigo-800">
                    Continuar
                  </button>
                </div>
              </div>
            ) : (
              <p className="p-2 mt-4 font-bold text-white bg-green-300 border-2 border-green-700 rounded-md text-md">
                Todos los procesos han terminado
              </p>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
