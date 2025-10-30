export function FormTestingDemo() {
  return (
    <div className="testing-section">
      <h2 className="testing-section-title">📝 Testing de Formularios</h2>
      <p className="testing-section-subtitle">
        Cómo testear formularios complejos, validaciones, y manejo de errores
      </p>

      {/* Conceptos básicos */}
      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          🎯 Conceptos Clave para Testing de Formularios
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              ✅ Qué Testear
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Renderizado de campos</li>
              <li>• Entrada y validación de datos</li>
              <li>• Mensajes de error</li>
              <li>• Envío del formulario</li>
              <li>• Estados de loading</li>
              <li>• Casos edge (campos vacíos, datos inválidos)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">
              🔧 Herramientas
            </h4>
            <ul className="text-sm space-y-1">
              <li>
                • <code>getByLabelText</code> para inputs
              </li>
              <li>
                • <code>user.type()</code> para entrada de texto
              </li>
              <li>
                • <code>user.click()</code> para submit
              </li>
              <li>
                • <code>waitFor()</code> para validaciones async
              </li>
              <li>
                • <code>getByText()</code> para mensajes
              </li>
              <li>• Mock de funciones de submit</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ejemplo de formulario simple */}
      <div className="testing-card">
        <h3 className="testing-card-title">📋 Formulario Simple</h3>

        <h4 className="font-semibold mb-2">Componente ContactForm:</h4>
        <div className="testing-code-block">
          {`// src/components/forms/ContactForm.tsx
import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  loading?: boolean;
}

export function ContactForm({ onSubmit, loading = false }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  
  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };
  
  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange('name')}
          className={\`border rounded px-3 py-2 w-full \${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }\`}
          disabled={loading}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1" role="alert">
            {errors.name}
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          className={\`border rounded px-3 py-2 w-full \${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }\`}
          disabled={loading}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1" role="alert">
            {errors.email}
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="message" className="block font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={handleChange('message')}
          rows={4}
          className={\`border rounded px-3 py-2 w-full \${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }\`}
          disabled={loading}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1" role="alert">
            {errors.message}
          </p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}`}
        </div>
      </div>

      {/* Tests del formulario */}
      <div className="testing-card">
        <h3 className="testing-card-title">🧪 Tests del ContactForm</h3>

        <div className="testing-code-block">
          {`// src/components/forms/__tests__/ContactForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../ContactForm';

describe('ContactForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  // Test de renderizado
  test('renders all form fields', () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  // Test de entrada de datos
  test('allows user to fill out the form', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Message');
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Hello, this is a test message.');
    
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(messageInput).toHaveValue('Hello, this is a test message.');
  });

  // Test de envío exitoso
  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Message'), 'Test message');
    
    await user.click(screen.getByRole('button', { name: 'Send Message' }));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    });
  });

  // Test de validación - campos requeridos
  describe('validation', () => {
    test('shows error for empty name', async () => {
      const user = userEvent.setup();
      render(<ContactForm onSubmit={mockOnSubmit} />);
      
      await user.click(screen.getByRole('button', { name: 'Send Message' }));
      
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test('shows error for empty email', async () => {
      const user = userEvent.setup();
      render(<ContactForm onSubmit={mockOnSubmit} />);
      
      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.click(screen.getByRole('button', { name: 'Send Message' }));
      
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test('shows error for invalid email', async () => {
      const user = userEvent.setup();
      render(<ContactForm onSubmit={mockOnSubmit} />);
      
      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'invalid-email');
      await user.type(screen.getByLabelText('Message'), 'Test message');
      
      await user.click(screen.getByRole('button', { name: 'Send Message' }));
      
      expect(screen.getByText('Email is invalid')).toBeInTheDocument();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test('shows error for empty message', async () => {
      const user = userEvent.setup();
      render(<ContactForm onSubmit={mockOnSubmit} />);
      
      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'john@example.com');
      await user.click(screen.getByRole('button', { name: 'Send Message' }));
      
      expect(screen.getByText('Message is required')).toBeInTheDocument();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test('clears error when user starts typing', async () => {
      const user = userEvent.setup();
      render(<ContactForm onSubmit={mockOnSubmit} />);
      
      // Trigger validation error
      await user.click(screen.getByRole('button', { name: 'Send Message' }));
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      
      // Start typing to clear error
      await user.type(screen.getByLabelText('Name'), 'J');
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });
  });

  // Test de estado loading
  describe('loading state', () => {
    test('disables form fields when loading', () => {
      render(<ContactForm onSubmit={mockOnSubmit} loading={true} />);
      
      expect(screen.getByLabelText('Name')).toBeDisabled();
      expect(screen.getByLabelText('Email')).toBeDisabled();
      expect(screen.getByLabelText('Message')).toBeDisabled();
      expect(screen.getByRole('button')).toBeDisabled();
    });

    test('shows loading text on submit button', () => {
      render(<ContactForm onSubmit={mockOnSubmit} loading={true} />);
      
      expect(screen.getByRole('button', { name: 'Sending...' })).toBeInTheDocument();
    });
  });

  // Test de accesibilidad
  describe('accessibility', () => {
    test('has proper labels for all inputs', () => {
      render(<ContactForm onSubmit={mockOnSubmit} />);
      
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
    });

    test('error messages have role="alert"', async () => {
      const user = userEvent.setup();
      render(<ContactForm onSubmit={mockOnSubmit} />);
      
      await user.click(screen.getByRole('button', { name: 'Send Message' }));
      
      const errorMessages = screen.getAllByRole('alert');
      expect(errorMessages).toHaveLength(3); // name, email, message errors
    });

    test('inputs have correct types', () => {
      render(<ContactForm onSubmit={mockOnSubmit} />);
      
      expect(screen.getByLabelText('Name')).toHaveAttribute('type', 'text');
      expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
    });
  });
});`}
        </div>
      </div>

      {/* Patrones avanzados */}
      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          🚀 Patrones Avanzados para Testing de Formularios
        </h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-blue-700 mb-2">
              Custom Render Helper
            </h4>
            <div className="testing-code-block">
              {`// utils/test-utils.tsx
import { render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

export function renderWithForm(ui: React.ReactElement, options = {}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  
  return render(ui, { wrapper: Wrapper, ...options });
}`}
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-green-700 mb-2">
              Testing Form Libraries (React Hook Form)
            </h4>
            <div className="testing-code-block">
              {`test('works with react-hook-form', async () => {
  const user = userEvent.setup();
  const mockSubmit = jest.fn();
  
  render(<HookFormComponent onSubmit={mockSubmit} />);
  
  // Llenar formulario
  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.click(screen.getByRole('button', { name: 'Submit' }));
  
  // Esperar a que se procese la validación
  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalledWith({ email: 'test@example.com' });
  });
});`}
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-purple-700 mb-2">
              Testing File Uploads
            </h4>
            <div className="testing-code-block">
              {`test('handles file upload', async () => {
  const user = userEvent.setup();
  const file = new File(['content'], 'test.txt', { type: 'text/plain' });
  
  render(<FileUploadForm />);
  
  const input = screen.getByLabelText('Choose file');
  await user.upload(input, file);
  
  expect(input.files[0]).toStrictEqual(file);
  expect(input.files).toHaveLength(1);
});`}
            </div>
          </div>
        </div>
      </div>

      {/* Best practices */}
      <div className="testing-card">
        <h3 className="testing-card-title">💡 Best Practices</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">✅ Hacer</h4>
            <ul className="text-sm space-y-1">
              <li>• Usar getByLabelText para encontrar inputs</li>
              <li>• Testear el flujo completo del usuario</li>
              <li>• Verificar mensajes de error y validaciones</li>
              <li>• Testear casos edge (datos inválidos)</li>
              <li>• Usar userEvent para interacciones realistas</li>
              <li>• Testear accesibilidad (labels, roles)</li>
              <li>• Verificar estados de loading</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-2">❌ Evitar</h4>
            <ul className="text-sm space-y-1">
              <li>• Testear implementación interna del estado</li>
              <li>• Usar selectores frágiles (data-testid)</li>
              <li>• Tests que dependan del orden de ejecución</li>
              <li>• Mockear validaciones (testear la real)</li>
              <li>• Ignorar casos de error</li>
              <li>• Tests demasiado específicos de UI</li>
              <li>• No testear la limpieza de errores</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
