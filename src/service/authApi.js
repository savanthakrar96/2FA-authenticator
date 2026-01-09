import api from "./api";

/* ================= REGISTER ================= */
export const register = (username, password) => {
  return api.post("/auth/register", { username, password });
};

/* ================= LOGIN ================= */
export const loginUser = (username, password) => {
  return api.post("/auth/login", { username, password });
};

/* ================= AUTH STATUS ================= */
export const authStatus = () => {
  return api.get("/auth/status");
};

/* ================= LOGOUT ================= */
export const logoutUser = () => {
  return api.post("/auth/logout");
};

/* ================= 2FA SETUP ================= */
export const setup2FA = () => {
  return api.post("/auth/2fa/setup");
};

/* ================= 2FA VERIFY ================= */
export const verify2FA = (token) => {
  return api.post("/auth/2fa/verify", { token });
};

/* ================= 2FA RESET ================= */
export const reset2FA = () => {
  return api.post("/auth/2fa/reset");
};
