import {createTRPCReact} from '@trpc/react-query';

import type {AppRouter} from '../server/api';

export const trpc = createTRPCReact<AppRouter>();
