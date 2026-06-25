import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import PostDetail from './pages/PostDetail.jsx'
import EditorPanel from './pages/EditorPanel.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import { useTheme } from './context/ThemeContext.jsx'
import './App.css'

function App() {
  const { theme } = useTheme()

  return (
    <div className={`app ${theme}`}>
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:id" element={<PostDetail />} />

            {/* Rotas protegidas - REPORTER e EDITOR */}
            <Route element={<PrivateRoute roles={['REPORTER', 'EDITOR', 'ADMIN']} />}>
              <Route path="/editor" element={<EditorPanel />} />
            </Route>

            {/* Rotas protegidas - apenas ADMIN */}
            <Route element={<PrivateRoute roles={['ADMIN']} />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App