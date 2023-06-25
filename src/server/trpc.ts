import {initTRPC} from '@trpc/server';

const t = initTRPC.create();

export const middleware = t.middleware;
export const router = t.router;

const loggerMiddleware = middleware(async opts => {
  const start = performance.now();

  const result = await opts.next();

  const duration = performance.now() - start;
  const meta = {
    path: opts.path,
    duration,
    input: opts.rawInput,
    output: result,
  };

  result.ok ? console.log(meta) : console.error(meta);

  return result;
});

export const publicProcedure = t.procedure.use(loggerMiddleware);
