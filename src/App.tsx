import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import { UserProvider } from "./context/UserContext";
import "./App.css";

// ✅ BUENA PRÁCTICA: Componente principal bien estructurado
function App() {

  return (
    <UserProvider>
      <div className="app">
        {/* Navegación simple para la demo */}
        <nav className="simple-nav">
          <button className="active">
            Inicio
          </button>
        </nav>

        <MainLayout><Home /></MainLayout>
      </div>
    </UserProvider>
  );
}

export default App;
