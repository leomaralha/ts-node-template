import { devConnection } from './getDevConnection';
import { prodConnection } from './getProdConnection';

type EnvTypes = 'production' | 'development';
const env: EnvTypes =
  (process.env.NODE_ENV?.toLowerCase() as EnvTypes) || 'development';

const connGetters = {
  development: devConnection,
  production: prodConnection,
};

const connGetter = connGetters[env] || devConnection;

export { connGetter };
