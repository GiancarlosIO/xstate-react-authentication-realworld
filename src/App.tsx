import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider  } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'

import {AuthContextProvider} from './Contexts'

import './App.css';

const queryClient = new QueryClient()

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <div className="root">
            <Outlet />
          </div>
        </AuthContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
