import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { ToastContainer } from 'react-toastify';

ReactDom.render(
  <React.StrictMode>
    <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
)