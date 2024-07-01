import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/constants.data';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </QueryClientProvider>);
}

export default App;
