export interface User {
  id?: number,
  name?: string,
  email: string,
  password?: string,
  role?: string,
  profile_photo_url?: string,
  suscripcion?: string,
}

export interface Pivot {
  clase_id:   number;
  user_id:    number;
  created_at: Date | null;
  updated_at: Date | null;
}
