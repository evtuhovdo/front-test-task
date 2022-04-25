import { IRootStoreModel, RootStore } from './RootStore';
import persist from 'mst-persist';
import { Instance } from 'mobx-state-tree';

const STORE_IN_LOCAL_STORAGE_KEY = 'sk-consult-store';

export class Store {
  static create(): IRootStoreModel {
    const StoreInstance = RootStore.create({});

    persist(
      STORE_IN_LOCAL_STORAGE_KEY,
      StoreInstance,
      {
        jsonify: true,
        whitelist: [ // перечисление ключей хранилища которые надо сохранять между сессиями
          'auth',
        ],
      },
    ).finally(() => {
      StoreInstance.setHydrated(true);
    });

    return StoreInstance;
  }
}

export interface Store extends Instance<typeof RootStore> {}
