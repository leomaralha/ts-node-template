import * as http from 'http';

interface User {
  id: number;
  name: string;
}

// module augmentation
declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    context?: {
      user: User;
    };
  }
}

