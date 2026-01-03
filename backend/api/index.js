import { handler as createHandler } from 'serverless-http';
import app from '../server.js';
export const handler = createHandler(app);
