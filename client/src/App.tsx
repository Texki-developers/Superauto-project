import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/constants.data';
import 'react-toastify/dist/ReactToastify.css';
import ToastWrapper from './components/modalWrapper/tostWrapper';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ToastWrapper />

    </QueryClientProvider>);
}

export default App;
