import { createReducer, on } from '@ngrx/store';
import { setPlayCount } from '../actions/player.action';

export type playCount = {
  // count  增加购物单数
  count: number;
};

export const initialCount: playCount = {
  count: 0,
};

const reducer = createReducer(
  initialCount,
  on(setPlayCount, (state, ({ count }) => ({ ...state, count })))
);
