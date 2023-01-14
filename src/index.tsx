import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n/i18n';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <BrowserRouter>
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </BrowserRouter>
  </RecoilRoot>
  // </React.StrictMode>
);