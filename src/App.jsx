import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AppLayout from './ui/AppLayout';

import DashboardPage from './pages/Dashboard.jsx';
import InventoryPage from './pages/Inventory.jsx';
import LoginPage from './pages/Login.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Sellers from './pages/Sellers.jsx';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './ui/ProtectedRoute';
import Companies from './pages/Companies.jsx';
import Invoice from './pages/Invoice.jsx';

import SingleInvoice from './pages/SingleInvoice.jsx';

import Loans from './pages/Loans.jsx';
import Ownership from './pages/Ownership.jsx';
import Settings from './pages/Settings.jsx';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            background: 'var(--color-grey-0)',
            color: 'var(--color-grey-7000)',
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="Inventory" element={<InventoryPage />} />
            <Route path="sellers" element={<Sellers />} />
            <Route path="companies" element={<Companies />} />

            <Route path="receipt" element={<Invoice />} />


            <Route path="SingleInvoice/:id" element={<SingleInvoice />} />

            <Route path="loans" element={<Loans />} />
            <Route path="ownership" element={<Ownership />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="invoice/:id" element={<Invoice />} />

          <Route path="login" element={<LoginPage />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
