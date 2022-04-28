import {
  applySnapshot,
  types as t,
} from 'mobx-state-tree';

const initialAuthStore = {
  token: null,
  refresh: null,
};

export const AuthStore = t
  .model({
    token: t.maybeNull(t.string),
    refresh: t.maybeNull(t.string),
  })
  .views((self => ({
    get hasAuthToken() {
      return !!self.token;
    },
  })))
  .actions((self) => ({
    clearState: () => {
      applySnapshot(self, initialAuthStore);
    },
    setToken: (token: string | null) => {
      self.token = token;
    },
    setRefresh: (refresh: string | null) => {
      self.refresh = refresh;
    },
  }));
