import './index.css';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {createWSClient, loggerLink, wsLink} from '@trpc/client';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import {trpc} from './utils/trpc';

const queryClient = new QueryClient();
const wsClient = createWSClient({
  url: `ws://localhost:3000`,
});
const trpcClient = trpc.createClient({
  links: [
    loggerLink({
      enabled: () => import.meta.env.DEV,
    }),
    wsLink({
      client: wsClient,
    }),
  ],
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
        {import.meta.env.DEV && <ReactQueryDevtools />}
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>,
);
