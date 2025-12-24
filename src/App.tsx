import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { AuthContextProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthContextProvider>
      <div className="min-h-screen bg-brand-bg">
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          </Routes>
        </Router>
      </div>
    </AuthContextProvider>
  )
}

export default App
