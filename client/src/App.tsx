import { Switch, Route } from "wouter";
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Posts from "@/pages/posts";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Posts} />
    </Switch>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
