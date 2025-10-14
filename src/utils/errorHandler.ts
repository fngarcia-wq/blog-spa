import { AxiosError } from 'axios';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          return new ApiError(
            data.message || 'Solicitud inválida',
            400,
            data
          );

        case 401:
          return new ApiError(
            'Sesión expirada. Por favor inicia sesión',
            401,
            data
          );

        case 403:
          return new ApiError(
            'No tienes permisos para realizar esta acción',
            403,
            data
          );

        case 404:
          return new ApiError(
            data.message || 'Recurso no encontrado',
            404,
            data
          );

        case 422:
          // Errores de validación
          const validationErrors = data.errors || {};
          const errorMessages = Object.values(validationErrors)
            .flat()
            .join(', ');
          return new ApiError(
            errorMessages || 'Error de validación',
            422,
            data
          );

        case 429:
          return new ApiError(
            'Demasiadas peticiones. Por favor espera un momento',
            429,
            data
          );

        case 500:
          return new ApiError(
            'Error del servidor. Por favor intenta más tarde',
            500,
            data
          );

        case 502:
        case 503:
        case 504:
          return new ApiError(
            'Servicio temporalmente no disponible',
            status,
            data
          );

        default:
          return new ApiError(
            data.message || `Error ${status}`,
            status,
            data
          );
      }
    } else if (error.request) {
      return new ApiError(
        'No se pudo conectar con el servidor. Verifica tu conexión',
        0,
        null
      );
    } else {
      return new ApiError(
        error.message || 'Error al realizar la petición',
        0,
        null
      );
    }
  }

  return new ApiError('Error desconocido', 0, null);
}
