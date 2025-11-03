export interface Campo {
  id: string;
  campo: string;
  tipo: 'string' | 'number' | 'date' | 'boolean' | 'email';
  requerido: boolean;
  descripcion: string;
  validacion_cruzada?: boolean;
  regex?: string;
  min_length?: number;
  max_length?: number;
  min_value?: number;
  max_value?: number;
}

export interface ValidacionFija {
  id: string;
  nombre: string;
  descripcion: string;
  severidad: 'critical' | 'warning' | 'info';
}

export interface ValidacionConfigurable {
  id: string;
  nombre: string;
  descripcion: string;
  severidad: 'critical' | 'warning' | 'info';
  parametros_requeridos: string[];
  tipo_parametro: Record<string, 'string' | 'number' | 'boolean' | 'date'>;
}

export interface ConfiguracionArchivos {
  max_size_mb: number;
  allowed_formats: string[];
  procesamiento: {
    metodo: 'hibrido' | 'local' | 'directo';
    reglas_auto?: Record<string, string>;
  };
}

export interface DocumentType {
  id: string;
  nombre: string;
  identificador: string;
  version: number;
  descripcion?: string;
  activo: boolean;
  configuracion_archivos: ConfiguracionArchivos;
  campos_extraibles: Campo[];
  validaciones_fijas: ValidacionFija[];
  validaciones_configurables: ValidacionConfigurable[];
  prompt_template: string;
  configuracion_adicional?: Record<string, any>;
  created_at: string;
  updated_at: string;
}
