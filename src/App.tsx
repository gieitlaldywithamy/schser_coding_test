
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, ChakraProvider, Text } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { extendTheme } from "@chakra-ui/react"
import { AppContainer } from './containers';
import { Crimes } from './features/crimes';

const queryClient = new QueryClient();

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
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
            <Route path="/" element={<Box><Text>Please enter some postcodes!</Text></Box>} />
            <Route path="crimes" element={<Crimes />} />
          </Routes>
        </AppContainer>
      </BrowserRouter>

    </QueryClientProvider>
  </ChakraProvider>
);