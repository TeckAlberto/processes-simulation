import { useContext } from "react";
import SimulationContext from "../context/SimulationProvider";

const useSimulation = () => {
    return useContext(SimulationContext)
}

export default useSimulation