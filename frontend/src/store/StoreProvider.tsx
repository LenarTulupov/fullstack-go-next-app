'use client';

import { ReactNode } from 'react';
import { store } from './store';
import { Provider } from 'react-redux'

interface IStoreProvider {
  children: ReactNode;
}

export default function StoreProvider({ children }: IStoreProvider) {
  return (
    <Provider store={store}>
        { children }
    </Provider>
  )
};
