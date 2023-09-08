
export const functions = (operation, value1, value2) => {

    if(operation === "+") return value1 + value2
    if(operation === "-") return value1 - value2
    if(operation === "/") return value1 / value2
    if(operation === "^") return Math.pow(value1, value2)
    if(operation === "*") return value1 * value2
    if(operation === "%") return value1 % value2
}

export const definitions = {
    "+": "Suma",
    "-": "Resta",
    "/": "Division",
    "*": "Multiplicacion",
    "^": "Potencia",
    "%": "Residuo",
}

export const totalProcesses = (processes) => {
    
    return processes.length
}