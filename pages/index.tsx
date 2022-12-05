import type { NextPage } from 'next';
import { useState } from 'react';

const Home: NextPage = () => {
  const [state, setState] = useState(0);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {state}
      <button onClick={() => setState((s) => s + 1)}>+</button>
      <button onClick={() => setState((s) => s - 1)}>-</button>
    </div>
  )
}

export default Home
