import { Instance, SnapshotIn, SnapshotOut, types as t } from 'mobx-state-tree';
import {AuthStore} from './AuthStore';

export const RootStore = t
  .model({
    hydrated: t.optional(t.boolean, false), // метка что состояние хранилища восстановлено из сохраненного в localstorage
    auth: t.optional(AuthStore, {}),
  })
  .actions(self => ({
    setHydrated: (value: boolean) => {
      self.hydrated = value;
    },
  }));

export interface IRootStoreModel extends Instance<typeof RootStore> {}
export interface IRootStoreModelSnapshotIn extends SnapshotIn<typeof RootStore> {}
export interface IRootStoreModelSnapshotOut extends SnapshotOut<typeof RootStore> {}

