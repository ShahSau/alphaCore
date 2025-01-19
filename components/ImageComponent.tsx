import { Minus, Plus } from "lucide-react";
import { useControls } from "react-zoom-pan-pinch";

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="flex justify-between w-full mb-4">
      <button onClick={() => zoomIn()}>
        <Plus className="w-6 h-6" />
      </button>
      <button onClick={() => zoomOut()}>
        <Minus className="w-6 h-6" />
      </button>
      <button onClick={() => resetTransform()}>Reset</button>
    </div>
  );
};

export default Controls;
