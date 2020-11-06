import { vFolder } from './index';

export interface vFileSystem {
  homeFolder: vFolder;
}

export const vFileSystem = () => {
  const homeFolder = vFolder('~');
  const inf = { homeFolder };
  return inf;
};
