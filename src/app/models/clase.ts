import { Atleta } from "../interfaces/clases.interfaces";

export interface Clase {
  id?: number,
  monitor_id: number,
  entreno_id: number|null,
  fecha_hora?: string,
  vacantes: number,
  atletas?: Atleta[]
}
