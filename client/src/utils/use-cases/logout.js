export default function logout() {
    localStorage.removeItem('token'); // elimina el token del almacenamiento local
    window.location.reload();
}