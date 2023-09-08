import { useContext, createRef, useState } from 'react'
import { SimulationContext } from '../context/SimulationProvider'
import Error from './Error'
export default function Process() {

  const { lot, setLot, lots, setLots, count, setCount } = useContext(SimulationContext)
  const [ errors, setErrors ] = useState([])
  const nameRef = createRef()
  const operationRef = createRef()
  const timeRef = createRef()
  const val1Ref = createRef()
  const val2Ref = createRef()

  
  const handleSubmitProcess = (e) => {
      e.preventDefault()
      
      if ([nameRef, operationRef, val1Ref, val2Ref, timeRef].some(ref => !ref.current?.value)) {
        
        const errs  = ['Por favor llene todos los campos.']
        setErrors([...errs])
        return;
      }
      setErrors([])

      if((operationRef.current?.value.toString() === '/' || operationRef.current?.value.toString() === '%') && Number(val2Ref.current?.value) === 0 ) {
        const errs  = ['Por favor corrija los datos de la funcion.']
        setErrors([...errs])
        return;
      }
      setErrors([])
      
      
      

      
      const lotData = {
        id: count,
        name: nameRef.current?.value.toString(),
        operation: operationRef.current?.value.toString(),
        val1: Number(val1Ref.current?.value),
        val2: Number(val2Ref.current?.value),
        time: Number(timeRef.current?.value)
      }
      setCount(prev => prev + 1)
      
      const updatedLot = [...lot, lotData];
      setLot(updatedLot);

      if (updatedLot.length >= 4) {
        // Move the accumulated items to the lots array
        setLots([...lots, updatedLot]);
        setLot([]);
      }
      
      nameRef.current.value = '';
      operationRef.current.value = '';
      val1Ref.current.value = '';
      val2Ref.current.value = '';
      timeRef.current.value = '';
      return
  }

  
  
  return (
    <main className="w-2/3 mx-auto mt-10">
      <form className='p-4 mx-auto bg-white rounded-lg shadow-lg lg:w-2/3' noValidate onSubmit={handleSubmitProcess}>

        <h2 className='mb-5 text-4xl font-bold text-center text-violet-400'>Lote: {lots.length + 1}</h2>

        <div className='space-y-3'>
          {errors.length > 0 ? (
            errors.map( message => 
            <Error 
              key={message}
              message={message}
            />
            
          )) : null}
        </div>

        <div className="my-5">
          <label className='text-xl font-bold text-violet-600' htmlFor="name">Nombre del Programador</label>

          <input 
            name="name" 
            placeholder='Nombre del programador'
            className='block w-full p-2 my-1 border rounded-md bg-gray-50 focus:border-indigo-700 focus:outline-none'
            id="name" 
            type="text" 
            formNoValidate
            ref={nameRef}
          />
        </div>

        <div className="mb-5">
          <label className='text-xl font-bold text-violet-600' htmlFor="val1">Valor 1</label>

          <input 
            name="val1" 
            placeholder='Valor 1'
            className='block w-full p-2 my-1 border rounded-md bg-gray-50 focus:border-indigo-700 focus:outline-none'
            id="val1" 
            type="number"
            formNoValidate
            ref={val1Ref} 
          />
        </div>

        <div className="mb-5">
          <label className='text-xl font-bold text-violet-600' htmlFor="operation">Operacion</label>

          <select
            className='block w-full p-2 my-1 border rounded-md bg-gray-50 focus:border-indigo-700 focus:outline-none'
            name="operation"
            id="operation"
            ref={operationRef}
          >
            <option value="">Seleccione el tipo de operacion</option>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="/">/</option>
            <option value="*">*</option>
            <option value="%">%</option>
            <option value="^">^</option>
          </select>
        </div>

        <div className="mb-5">
          <label className='text-xl font-bold text-violet-600' htmlFor="val2">Valor 2</label>

          <input 
            name="val2" 
            placeholder='Valor 2'
            className='block w-full p-2 my-1 border rounded-md bg-gray-50 focus:border-indigo-700 focus:outline-none'
            id="val2" 
            type="number"
            formNoValidate
            ref={val2Ref} 
          />
        </div>

        <div className="mb-5">
          <label className='text-xl font-bold text-violet-600' htmlFor="time">Tiempo estimado(segundos)</label>

          <input 
            name="time" 
            placeholder='Tiempo estimado'
            className='block w-full p-2 my-1 border rounded-md bg-gray-50 focus:border-violet-700 focus:outline-none'
            id="time" 
            type="number"
            formNoValidate
            ref={timeRef} 
          />
        </div>

        <input type="submit" className='w-full p-3 text-sm text-white uppercase bg-indigo-600 rounded cursor-pointer hover:bg-indigo-800' value="Agregar Proceso"/>
        

      </form>
    </main>
  )
}
