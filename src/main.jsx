import ReactDOM from 'react-dom/client';
import './index.scss';
import { Loader } from './components/Loader/Loader.jsx';
import { Cursor } from './components/Cursor/Cursor.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Cursor />
    <Loader />
    <App />
  </>
);
