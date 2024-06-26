import { Atleta } from "../interfaces/clases.interfaces";
import { Entreno } from "./entreno";
import { User } from "./user";

export interface Clase {
  id?: number,
  monitor: User,
  entreno: Entreno,
  fecha_hora?: string,
  vacantes: number,
  atletas?: Atleta[]
}

export interface ClaseStore {
  id?: number,
  monitor_id: number,
  entreno_id: number | undefined,
  fecha_hora?: string,
  vacantes: number,
  atletas?: Atleta[]
}
