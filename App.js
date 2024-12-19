import React from 'react';
import { store } from './components/store';
import { Provider } from 'react-redux'
import Navigation from './Navigation';
 function App() {
  return (
<>
  <Navigation/>
</>     
  );
}



export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
