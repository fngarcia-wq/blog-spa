import { useState } from "react";

export function ButtonTestDemo() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="testing-section">
      <h2 className="testing-section-title">
        🔘 Primer Test - Componente Button
      </h2>
      <p className="testing-section-subtitle">
        Ejemplo completo: componente Button con todos sus tests y casos de uso
      </p>

      {/* Componente Button */}
      <div className="testing-card">
        <h3 className="testing-card-title">📝 El Componente Button</h3>
        
        <h4 className="font-semibold mb-2">Código del componente:</h4>
        <div className="testing-code-block">
{`// src/components/ui/Button.tsx
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  className = '',
  children,
  onClick,
  ...props
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  const isDisabled = disabled || loading;
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled && onClick) {
      onClick(e);
    }
  };
  
  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${className} \${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      }\`}
      disabled={isDisabled}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}`}
        </div>
      </div>

      {/* Demo Interactivo */}
      <div className="testing-demo-container">
        <h3 className="testing-demo-title">
          🎮 Demo Interactivo
        </h3>
        <div className="testing-demo-content">
          <div className="flex flex-wrap gap-4 mb-4">
            <DemoButton variant="primary" size="small">Primary Small</DemoButton>
            <DemoButton variant="secondary" size="medium">Secondary Medium</DemoButton>
            <DemoButton variant="danger" size="large">Danger Large</DemoButton>
            <DemoButton disabled>Disabled</DemoButton>
            <DemoButton loading>Loading</DemoButton>
          </div>
          
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="testing-button secondary"
          >
            {showDemo ? 'Ocultar' : 'Mostrar'} Código del Demo
          </button>
          
          {showDemo && (
            <div className="mt-4">
              <div className="testing-code-block">
{`// Componente demo simple para mostrar variantes
function DemoButton({ children, ...props }) {
  const [clicked, setClicked] = useState(false);
  
  return (
    <Button
      {...props}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 1000);
      }}
    >
      {clicked ? '✓' : children}
    </Button>
  );
}`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tests Completos */}
      <div className="testing-card">
        <h3 className="testing-card-title">🧪 Tests Completos del Button</h3>
        
        <h4 className="font-semibold mb-2">Archivo de tests:</h4>
        <div className="testing-code-block">
{`// src/components/ui/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button Component', () => {
  // Test básico de renderizado
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  // Test de variantes
  describe('variants', () => {
    test('renders primary variant by default', () => {
      render(<Button>Primary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-600');
    });

    test('renders secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-200');
    });

    test('renders danger variant', () => {
      render(<Button variant="danger">Danger</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-red-600');
    });
  });

  // Test de tamaños
  describe('sizes', () => {
    test('renders medium size by default', () => {
      render(<Button>Medium</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-4', 'py-2');
    });

    test('renders small size', () => {
      render(<Button size="small">Small</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-3', 'py-1.5');
    });

    test('renders large size', () => {
      render(<Button size="large">Large</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-6', 'py-3');
    });
  });

  // Test de estados
  describe('states', () => {
    test('handles disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    test('handles loading state', () => {
      render(<Button loading>Loading</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });

    test('loading state prevents click', () => {
      const handleClick = jest.fn();
      render(<Button loading onClick={handleClick}>Loading</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Test de eventos
  describe('events', () => {
    test('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('passes click event to handler', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
      expect(handleClick.mock.calls[0][0].type).toBe('click');
    });
  });

  // Test de accesibilidad
  describe('accessibility', () => {
    test('has correct role', () => {
      render(<Button>Accessible</Button>);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('supports custom aria attributes', () => {
      render(
        <Button aria-label="Custom label" aria-describedby="help-text">
          Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
      expect(button).toHaveAttribute('aria-describedby', 'help-text');
    });

    test('has focus ring classes', () => {
      render(<Button>Focusable</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
    });
  });

  // Test de props HTML nativas
  describe('HTML attributes', () => {
    test('passes through HTML props', () => {
      render(
        <Button 
          type="submit" 
          form="my-form"
          data-testid="submit-btn"
        >
          Submit
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('form', 'my-form');
      expect(button).toHaveAttribute('data-testid', 'submit-btn');
    });

    test('applies custom className', () => {
      render(<Button className="custom-class">Styled</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });
});`}
        </div>
      </div>

      {/* Casos de Uso Avanzados */}
      <div className="testing-card">
        <h3 className="testing-card-title">🚀 Casos de Uso Avanzados</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Testing con User Events</h4>
            <div className="testing-code-block">
{`import userEvent from '@testing-library/user-event';

test('handles complex user interactions', async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();
  
  render(<Button onClick={handleClick}>Interactive</Button>);
  
  const button = screen.getByRole('button');
  
  // Simular hover
  await user.hover(button);
  
  // Simular click
  await user.click(button);
  
  // Simular keyboard
  await user.keyboard('{Enter}');
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});`}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-700 mb-2">Testing en Formularios</h4>
            <div className="testing-code-block">
{`test('works in form context', async () => {
  const handleSubmit = jest.fn();
  const user = userEvent.setup();
  
  render(
    <form onSubmit={handleSubmit}>
      <input name="email" />
      <Button type="submit">Submit Form</Button>
    </form>
  );
  
  // Llenar el formulario
  await user.type(screen.getByRole('textbox'), 'test@example.com');
  
  // Submit con el botón
  await user.click(screen.getByRole('button', { name: 'Submit Form' }));
  
  expect(handleSubmit).toHaveBeenCalled();
});`}
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          💡 Best Practices para Testing de Componentes
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">✅ Hacer</h4>
            <ul className="text-sm space-y-1">
              <li>• Usar getByRole para elementos interactivos</li>
              <li>• Testear comportamiento del usuario</li>
              <li>• Verificar accesibilidad (aria-labels, roles)</li>
              <li>• Testear estados (loading, disabled, error)</li>
              <li>• Usar userEvent para interacciones realistas</li>
              <li>• Agrupar tests con describe</li>
              <li>• Nombres descriptivos para los tests</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-2">❌ Evitar</h4>
            <ul className="text-sm space-y-1">
              <li>• Testear implementación interna</li>
              <li>• Usar selectores de CSS/className</li>
              <li>• Tests muy específicos de estilos</li>
              <li>• Mockear todo innecesariamente</li>
              <li>• Tests que dependen de otros tests</li>
              <li>• Verificar props directamente</li>
              <li>• Snapshot testing excesivo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente demo simple para la demostración
function DemoButton({ children, loading: initialLoading = false, ...props }: any) {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(initialLoading);
  
  const handleClick = () => {
    if (initialLoading) {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    } else {
      setClicked(true);
      setTimeout(() => setClicked(false), 1000);
    }
  };
  
  return (
    <button
      {...props}
      onClick={handleClick}
      disabled={props.disabled || loading}
      className={`
        font-medium rounded-lg transition-colors focus:outline-none focus:ring-2
        ${props.variant === 'secondary' 
          ? 'bg-gray-200 text-gray-900 hover:bg-gray-300' 
          : props.variant === 'danger'
          ? 'bg-red-600 text-white hover:bg-red-700'
          : 'bg-blue-600 text-white hover:bg-blue-700'
        }
        ${props.size === 'small' 
          ? 'px-3 py-1.5 text-sm' 
          : props.size === 'large'
          ? 'px-6 py-3 text-lg'
          : 'px-4 py-2 text-base'
        }
        ${(props.disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {loading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : clicked ? '✓ Clicked!' : children}
    </button>
  );
}