
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext";
import global from 'global';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
