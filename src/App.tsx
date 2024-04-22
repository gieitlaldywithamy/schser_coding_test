
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppContainer } from './containers';
import { CrimesTable } from './features/crimes-table';
import { CrimesMap } from './features/crimes-map';
import { Error } from './components';

const queryClient = new QueryClient();

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContainer>
          <Routes>
            <Route path="crimes" element={<CrimesTable />} />
            <Route path="map" element={<CrimesMap />} />
            <Route path="*" element={<Error>Nothing found! Please search some postcodes!</Error>}>
          </Route>
          </Routes>
        </AppContainer>
      </BrowserRouter>

    </QueryClientProvider>
  </ChakraProvider>
);