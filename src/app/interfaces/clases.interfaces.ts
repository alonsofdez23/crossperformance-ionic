export interface ClasesResponse {
  id:         number;
  monitor_id: number;
  entreno_id: number;
  fecha_hora: Date;
  vacantes:   number;
  created_at: Date;
  updated_at: Date;
  atletas:    Atleta[];
}

export interface Atleta {
  id:                number;
  name:              string;
  email:             string;
  email_verified_at: null;
  created_at:        Date;
  updated_at:        Date;
  pivot:             Pivot;
}

export interface Pivot {
  clase_id: number;
  user_id:  number;
}
