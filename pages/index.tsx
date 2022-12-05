import type { NextPage } from 'next';
import { useState } from 'react';

const Home: NextPage = () => {
  const [state, setState] = useState(0);
  const btnClass = "bg-blue-700 px-5 rounded text-white";
  return (
    <div className="flex min-h-screen  items-center justify-center py-2 gap-10">
      {state}
      <button onClick={() => setState((s) => s + 1)} className={btnClass}>+</button>
      <button onClick={() => setState((s) => s - 1)} className={btnClass}>-</button>
    </div>
  )
}

export default Home
