import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import { UserProvider } from "./context/UserContext";
import { StateManagementDemo } from "./components/examples/StateManagementDemo";
import { StateManagementLearning } from "./pages/StateManagementLearning";
import { BlogExample } from "./store/examples/HybridExample";
import "./App.css";

type View = 'home' | 'learning' | 'demo' | 'integration';

// ✅ BUENA PRÁCTICA: Componente principal bien estructurado
function App() {
  const [activeView, setActiveView] = useState<View>('learning');

  return (
    <UserProvider>
      <div className="app">
        {/* Navegación simple para la demo */}
        <nav className="simple-nav">
          <button 
            className={activeView === 'home' ? 'active' : ''}
            onClick={() => setActiveView('home')}
          >
            🏠 Inicio
          </button>
          <button 
            className={activeView === 'learning' ? 'active' : ''}
            onClick={() => setActiveView('learning')}
          >
            📚 Aprender
          </button>
          <button 
            className={activeView === 'demo' ? 'active' : ''}
            onClick={() => setActiveView('demo')}
          >
            🎯 Ejemplos TODO
          </button>
          <button 
            className={activeView === 'integration' ? 'active' : ''}
            onClick={() => setActiveView('integration')}
          >
            🤝 Integración
          </button>
        </nav>

        {activeView === 'home' && <MainLayout><Home /></MainLayout>}
        {activeView === 'learning' && <StateManagementLearning />}
        {activeView === 'demo' && <StateManagementDemo />}
        {activeView === 'integration' && <BlogExample />}
      </div>
    </UserProvider>
  );
}

export default App;
