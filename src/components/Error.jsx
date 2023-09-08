

export default function Error({message}) {
  return (
    <>
        <p className="p-1 text-lg text-center text-white bg-red-300 border border-red-700 rounded-md text-bold">{message}</p>
    </>
  )
}
