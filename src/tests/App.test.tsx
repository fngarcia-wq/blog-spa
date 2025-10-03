import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

// ✅ BUENA PRÁCTICA: Mockear módulos externos
vi.mock("../hooks/useCounter", () => ({
  useCounter: () => ({
    count: 0,
    increment: vi.fn(),
    decrement: vi.fn(),
    reset: vi.fn(),
  }),
}));

// ✅ BUENA PRÁCTICA: Tests descriptivos y organizados
describe("App Component", () => {
  it("should render without crashing", () => {
    render(<App />);
    expect(screen.getByText(/Blog de React/i)).toBeInTheDocument();
  });

  it("should display the main navigation", () => {
    render(<App />);

    // Verificar que los enlaces de navegación estén presentes
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/Hooks/i)).toBeInTheDocument();
    expect(screen.getByText(/Componentes/i)).toBeInTheDocument();
    expect(screen.getByText(/Buenas Prácticas/i)).toBeInTheDocument();
    expect(screen.getByText(/Acerca de/i)).toBeInTheDocument();
  });

  it("should have a header and footer", () => {
    render(<App />);

    // Verificar estructura básica
    const header = screen.getByRole("banner");
    const footer = screen.getByRole("contentinfo");

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it("should display counter demo", () => {
    render(<App />);

    // Buscar elementos del contador demo
    expect(screen.getByText(/Demo Rápido/i)).toBeInTheDocument();
    expect(screen.getByText(/Contador:/i)).toBeInTheDocument();
  });

  it("should have interactive buttons", () => {
    render(<App />);

    // Verificar que existan botones interactivos
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);

    // Verificar que al menos haya botones del contador
    const incrementButton = screen.getByText("+1");
    const decrementButton = screen.getByText("-1");
    const resetButton = screen.getByText("Reset");

    expect(incrementButton).toBeInTheDocument();
    expect(decrementButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  it("should handle counter button clicks", () => {
    const mockIncrement = vi.fn();
    const mockDecrement = vi.fn();
    const mockReset = vi.fn();

    // Mockear el hook useCounter para esta prueba específica
    vi.doMock("../hooks/useCounter", () => ({
      useCounter: () => ({
        count: 5,
        increment: mockIncrement,
        decrement: mockDecrement,
        reset: mockReset,
      }),
    }));

    render(<App />);

    const incrementButton = screen.getByText("+1");
    const decrementButton = screen.getByText("-1");
    const resetButton = screen.getByText("Reset");

    // Simular clicks
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);
    fireEvent.click(resetButton);

    // Verificar que las funciones fueron llamadas
    expect(mockIncrement).toHaveBeenCalledTimes(1);
    expect(mockDecrement).toHaveBeenCalledTimes(1);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("should display learning sections", () => {
    render(<App />);

    // Verificar que las secciones de aprendizaje estén presentes
    expect(screen.getByText(/useState/i)).toBeInTheDocument();
    expect(screen.getByText(/useEffect/i)).toBeInTheDocument();
    expect(screen.getByText(/useContext/i)).toBeInTheDocument();
    expect(screen.getByText(/useReducer/i)).toBeInTheDocument();
  });

  it("should have proper accessibility attributes", () => {
    render(<App />);

    // Verificar atributos de accesibilidad
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();

    // Verificar que haya headings apropiados
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);

    // Verificar el heading principal
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toBeInTheDocument();
  });

  it("should display good and bad practice examples", () => {
    render(<App />);

    // Buscar indicadores de buenas y malas prácticas
    const goodPracticeElements = screen.getAllByText(/✅/);
    const badPracticeElements = screen.getAllByText(/❌/);

    expect(goodPracticeElements.length).toBeGreaterThan(0);
    expect(badPracticeElements.length).toBeGreaterThan(0);
  });
});

// ✅ BUENA PRÁCTICA: Tests para casos edge
describe("App Component - Edge Cases", () => {
  it("should handle missing props gracefully", () => {
    // Test que la app funciona sin props específicas
    expect(() => render(<App />)).not.toThrow();
  });

  it("should maintain responsive design", () => {
    render(<App />);

    // Verificar clases CSS responsivas
    const container = screen.getByText(/Blog de React/i).closest(".container");
    expect(container).toBeInTheDocument();
  });
});

// ✅ BUENA PRÁCTICA: Tests de integración básicos
describe("App Component - Integration", () => {
  it("should render all hook examples", () => {
    render(<App />);

    // Verificar que todos los ejemplos de hooks estén renderizados
    const exampleSections = [
      "useState",
      "useEffect",
      "useContext",
      "useReducer",
      "useRef",
    ];

    exampleSections.forEach((hookName) => {
      expect(screen.getByText(new RegExp(hookName, "i"))).toBeInTheDocument();
    });
  });

  it("should have consistent styling across components", () => {
    render(<App />);

    // Verificar que existan elementos con clases de estilo consistentes
    const cardElements = screen
      .getAllByText(/✅|❌/)
      .map((el) => el.closest(".card, .good-practice, .bad-practice"))
      .filter(Boolean);

    expect(cardElements.length).toBeGreaterThan(0);
  });
});
