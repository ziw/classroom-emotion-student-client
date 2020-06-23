import { atom } from 'recoil';
export * from './restUtils';

export const authState = atom({
  key: 'authentication',
  default: '',
});
