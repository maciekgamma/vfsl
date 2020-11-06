export interface vMasterNode {
  getFullPath: () => string;
}

export const vMasterNode = () => {
  const getFullPath = () => {
    return '~';
  };
  return { getFullPath };
};
