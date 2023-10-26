import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import './App.css';
import configureStoreFunction from './redux/configureStore';
import theme from './themes/theme';
import MainRoutes from './routes/components/MainRoutes';
const initialState = {};
const store = configureStoreFunction(initialState);
function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Provider store={store}>
          <MainRoutes />
        </Provider>
      </div>

    </ThemeProvider>
  );
}

export default App;
