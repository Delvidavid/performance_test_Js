export function getCurrentUser() {
  const session = localStorage.getItem("user");
  return session ? JSON.parse(session) : null;
}



export function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "app/componts/login/login.html";
  }
  return user;

}

    
export function logout() {
  localStorage.removeItem("user");
  window.location.href = "app/componts/login/login.html";
}