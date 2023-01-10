import { createAction, props } from '@ngrx/store';

export const setPlayCount = createAction(
  '[player] Set PlayCount',
  props<{ count: number }>()
);
