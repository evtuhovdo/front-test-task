import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { Store } from "antd/lib/form/interface";

export class GlobalActions {
  constructor(
    private store: Store,
    private apolloClient: ApolloClient<NormalizedCacheObject>
  ) {}

  logOut() {
    this.store.auth.clearState();
    this.apolloClient.clearStore();
  }
}

export default GlobalActions;
