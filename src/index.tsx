import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

// reac-query 사용하기 위한 설정
const qureyClient = new QueryClient();

//RecoilRoot : recoil 사용하기 위한 설정

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <QueryClientProvider client = {qureyClient}>
      <App/>
    </QueryClientProvider>
  </RecoilRoot>
);


