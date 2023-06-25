import './App.css';

import viteLogo from '/vite.svg';

import reactLogo from './assets/react.svg';
import {trpc} from './utils/trpc';

function App() {
  const count = trpc.getCount.useQuery();
  const setCount = trpc.setCount.useMutation({
    onSuccess() {
      count.refetch();
    },
  });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + borpa</h1>
      <div className="card">
        <button
          disabled={setCount.isLoading}
          onClick={() => setCount.mutate(count.data! + 1)}>
          count is {count.isFetched ? count.data : '?'}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
