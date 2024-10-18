import { useState } from "react";
import ShadCN from "./shadcn";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-red-500">
      <ShadCN />
    </div>
  );
}

export default App;
