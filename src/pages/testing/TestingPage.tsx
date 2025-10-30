import { useState } from "react";
import "./TestingPage.css";

// Componentes educativos
import { TestingIntroduction } from "../../components/testing/TestingIntroduction";
import { JestSetup } from "../../components/testing/JestSetup";
import { ReactTestingLibraryIntro } from "../../components/testing/ReactTestingLibraryIntro";
import { ButtonTestDemo } from "../../components/testing/ButtonTestDemo";
import { FormTestingDemo } from "../../components/testing/FormTestingDemo";
import { LoginFormTests } from "../../components/testing/LoginFormTests";
import { AsyncTestingDemo } from "../../components/testing/AsyncTestingDemo";
import { MockingExamples } from "../../components/testing/MockingExamples";
import { TodoAppIntegration } from "../../components/testing/TodoAppIntegration";
import { TodoAppTests } from "../../components/testing/TodoAppTests";
import { CoverageAndBestPractices } from "../../components/testing/CoverageAndBestPractices";
import { UsefulMatchers } from "../../components/testing/UsefulMatchers";
import { DebuggingTools } from "../../components/testing/DebuggingTools";
import { TestingChecklist } from "../../components/testing/TestingChecklist";

type TestingSection =
  | "introduction"
  | "jest-setup"
  | "rtl-intro"
  | "button-test"
  | "form-testing"
  | "loginform-tests"
  | "async-testing"
  | "mocking"
  | "todo-integration"
  | "todo-tests"
  | "coverage"
  | "matchers"
  | "debugging"
  | "checklist";

export function TestingPage() {
  const [activeSection, setActiveSection] =
    useState<TestingSection>("introduction");

  const sections = [
    { id: "introduction", title: "Introducción al Testing", icon: "🧪" },
    { id: "jest-setup", title: "Jest - Setup", icon: "🃏" },
    { id: "rtl-intro", title: "React Testing Library", icon: "⚛️" },
    { id: "button-test", title: "Primer Test - Button", icon: "🔘" },
    { id: "form-testing", title: "Testing de Formularios", icon: "📝" },
    { id: "loginform-tests", title: "Tests del LoginForm", icon: "🔐" },
    { id: "async-testing", title: "Testing Asíncrono", icon: "⏳" },
    { id: "mocking", title: "Mocking de Módulos", icon: "🎭" },
    { id: "todo-integration", title: "TodoApp - Componente", icon: "📋" },
    { id: "todo-tests", title: "TodoApp - Tests", icon: "✅" },
    { id: "coverage", title: "Coverage y Best Practices", icon: "📊" },
    { id: "matchers", title: "Matchers Útiles", icon: "🎯" },
    { id: "debugging", title: "Herramientas y Debugging", icon: "🔧" },
    { id: "checklist", title: "Checklist Final", icon: "📋" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "introduction":
        return <TestingIntroduction />;
      case "jest-setup":
        return <JestSetup />;
      case "rtl-intro":
        return <ReactTestingLibraryIntro />;
      case "button-test":
        return <ButtonTestDemo />;
      case "form-testing":
        return <FormTestingDemo />;
      case "loginform-tests":
        return <LoginFormTests />;
      case "async-testing":
        return <AsyncTestingDemo />;
      case "mocking":
        return <MockingExamples />;
      case "todo-integration":
        return <TodoAppIntegration />;
      case "todo-tests":
        return <TodoAppTests />;
      case "coverage":
        return <CoverageAndBestPractices />;
      case "matchers":
        return <UsefulMatchers />;
      case "debugging":
        return <DebuggingTools />;
      case "checklist":
        return <TestingChecklist />;
      default:
        return <TestingIntroduction />;
    }
  };

  return (
    <div className="testing-page">
      {/* Header */}
      <div className="testing-header">
        <div className="testing-header-content">
          <h1 className="testing-title">
            🧪 Testing con Jest y React Testing Library
          </h1>
          <p className="testing-subtitle">
            Aprende testing desde cero: pirámide de tests, Jest, RTL, mocking,
            tests de integración y mejores prácticas
          </p>
        </div>
      </div>

      <div className="testing-container">
        {/* Sidebar */}
        <div className="testing-sidebar">
          <div className="testing-nav">
            <h3 className="testing-nav-title">Contenidos</h3>
            <div className="testing-nav-list">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as TestingSection)}
                  className={`testing-nav-item ${
                    activeSection === section.id ? "active" : ""
                  }`}
                >
                  <span className="testing-nav-icon">{section.icon}</span>
                  <span className="testing-nav-text">{section.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Progress tracker */}
          <div className="testing-progress">
            <h4 className="testing-progress-title">Progreso</h4>
            <div className="testing-progress-bar">
              <div
                className="testing-progress-fill"
                style={{
                  width: `${
                    ((sections.findIndex((s) => s.id === activeSection) + 1) /
                      sections.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <span className="testing-progress-text">
              {sections.findIndex((s) => s.id === activeSection) + 1} de{" "}
              {sections.length}
            </span>
          </div>

          {/* Quick tips */}
          <div className="testing-tips">
            <h4 className="testing-tips-title">💡 Tips Rápidos</h4>
            <ul className="testing-tips-list">
              <li>
                Usa <code>screen.debug()</code> para ver el DOM
              </li>
              <li>El patrón AAA: Arrange, Act, Assert</li>
              <li>Testa comportamiento, no implementación</li>
              <li>
                Usa <code>waitFor</code> para operaciones async
              </li>
              <li>Mock solo lo necesario</li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="testing-content">{renderContent()}</div>
      </div>
    </div>
  );
}
