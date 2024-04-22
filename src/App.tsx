
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, ChakraProvider, Text } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { extendTheme } from "@chakra-ui/react"
import { AppContainer } from './containers';
import { CrimesTable } from './features/crimes-table';
import { CrimesMap } from './features/crimes-map';
import { NotFound } from './features/not-found';

const queryClient = new QueryClient();

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
})

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContainer>
          <Routes>
            <Route path="crimes" element={<CrimesTable />} />
            <Route path="map" element={<CrimesMap />} />
            <Route path="*" element={<NotFound />}>
          </Route>
          </Routes>
        </AppContainer>
      </BrowserRouter>

    </QueryClientProvider>
  </ChakraProvider>
);