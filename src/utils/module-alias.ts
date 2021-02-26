import * as path from 'path';
import moduleAlias from 'module-alias';
const root = path.resolve(__dirname, '..', '..');

moduleAlias.addAliases({
  '@src': path.join(root, 'src'),
  '@test': path.join(root, 'test'),
});