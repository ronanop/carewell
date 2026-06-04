/** Client-safe session shape (mirrors backend admin-session). */
export type AdminSession = {
  sub: string;
  exp: number;
};
