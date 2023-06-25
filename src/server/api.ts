import 'dotenv/config';

import {applyWSSHandler} from '@trpc/server/adapters/ws';
import {WebSocketServer} from 'ws';
import {z} from 'zod';

import {db} from './db';
import {publicProcedure, router} from './trpc';

const appRouter = router({
  getCount: publicProcedure.query(() => db.getCount()),
  setCount: publicProcedure
    .input(z.number())
    .mutation(({input}) => db.setCount(input)),
});

export type AppRouter = typeof appRouter;

const port = 3000;
const wss = new WebSocketServer({
  port,
});
const handler = applyWSSHandler({wss, router: appRouter});
wss.on('connection', ws => {
  console.log(`++ Connection (${wss.clients.size})`);
  ws.once('close', () => {
    console.log(`-- Connection (${wss.clients.size})`);
  });
});
console.log(`ws://localhost:${port}`);

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  handler.broadcastReconnectNotification();
  wss.close();
});
