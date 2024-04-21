
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, ChakraProvider, Text } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './layouts/Layout';

const queryClient = new QueryClient();

import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
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
        <Layout>
          <Routes>
            <Route path="/" element={<Box><Text>Please enter some postcodes!</Text></Box>} />
            <Route path="crimes" element={<div>To Do</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>

    </QueryClientProvider>
  </ChakraProvider>
);