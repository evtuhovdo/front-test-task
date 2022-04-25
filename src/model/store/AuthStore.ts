import {
  applySnapshot,
  types as t,
} from 'mobx-state-tree';

const initialAuthStore = {
  token: null,
  refresh: null,
  id: null,
  role: null,
  data: null,
};

export const AuthStore = t
  .model({
    token: t.maybeNull(t.string),
    refresh: t.maybeNull(t.string),
    id: t.maybeNull(t.string),
    role: t.maybeNull(t.string),
    data: t.maybeNull(t.model({
      firstName: t.string,
      lastName: t.string,
      color: t.string,
    })),
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
    setId: (id: string | null) => {
      self.id = id;
    },
    setTokenAndId(token: string | null, id: string | null) {
      self.token = token;
      self.id = id;
    },
    setTokenAndRefresh(token: string | null, refresh: string | null, callback: () => void) {
      self.token = token;
      self.refresh = refresh;

      if (callback) {
        callback();
      }
    },
    setRoleAndData(role: string | null, data: { firstName: string, lastName: string, color: string }) {
      self.role = role;
      self.data = data;
    },
  }));
