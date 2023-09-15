import { operations } from "../data";

const getRandomNum = (min, max) => {
    //console.log(Math.floor(Math.random() * (max - min) + min))
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export const fillLots = countProcess => {
    let lots = [];
    let lot = [];
    let count = 1;
  
    for (let i = 0; i < countProcess; ++i) {
      if (lot.length >= 3) {
        lots.push(lot);
        lot = []; // Reiniciar el lote después de agregarlo
      }
      
      const process = {};
      process.id = count++;
      process.operation = operations[getRandomNum(0, 18)];
      process.val1 = getRandomNum(0, 1000);
      process.val2 = getRandomNum(0, 1000);
      process.lot_id = lots.length + 1
  
      while (process.val2 === 0 && (process.operation === '/' || process.operation === '%')) {
        process.operation = getRandomNum(0, 18);
      }
  
      process.time = getRandomNum(4, 9);
      lot.push(process); // Agregar el proceso al lote actual
    }
  
    if (lot.length > 0) {
      lots.push(lot); // Asegurarse de que el último lote se agregue si no está vacío
    }
  
    return lots;
  };
  