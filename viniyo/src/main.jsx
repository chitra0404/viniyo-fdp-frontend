import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

import store from './Redux/store.js'
import App from './App.jsx'
import './index.css'
import {RestaurantProvider} from './context/RestaurantContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
    <RestaurantProvider>
    <App />
    </RestaurantProvider> 
    </Provider>
  </React.StrictMode>,
)
