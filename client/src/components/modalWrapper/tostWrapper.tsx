import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';

const ToastWrapper = () => {
  return (
    <div>
      {createPortal(
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          style={{ zIndex: 9999 }}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />,
        document.getElementById('toast') as HTMLElement,
      )}
    </div>
  );
};

export default ToastWrapper;
