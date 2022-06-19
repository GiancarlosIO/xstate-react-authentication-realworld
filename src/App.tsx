import { Outlet, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'


import {AuthContextProvider} from './Contexts'

import './App.css';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <div className="root">
          <div>
            <header>
              <div><Link to='/auth/login/'>Login</Link></div>
              <div><Link to="/auth/register/">Register</Link></div>
              <div><Link to="/private/">Private</Link></div>
            </header>
          </div>
          <Outlet />
        </div>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
