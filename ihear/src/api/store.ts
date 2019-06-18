import * as types from './types';

type Session = {
  assignments: types.Assignment[];
  brochureModelId: string;
  activeSection: number;
};

const KEY = 'IHEAR_CONFIGURATION_SESSION';

export const put = (obj: Session): string => {
  const json = JSON.stringify(obj);
  sessionStorage.setItem(KEY, json);
  return KEY;
};

export const get = (): Session | null => {
  const json = sessionStorage.getItem(KEY);
  if (!json) {
    return null;
  }
  return JSON.parse(json);
};

export const reset = () => {
  sessionStorage.removeItem(KEY);
};
