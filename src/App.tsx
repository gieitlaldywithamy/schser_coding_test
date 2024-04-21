
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, ChakraProvider, Text } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './layouts/Layout';

const queryClient = new QueryClient();

export const App: React.FC = () => (
  <ChakraProvider>
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