// Verifica se o usuário está logado e se possui o perfil necessário para acessar a página
function protegerPagina(rolesPermitidas = []) {
    const token = localStorage.getItem('edmusys_token');
    const role = localStorage.getItem('edmusys_role');

    if (!token) {
        alert('Sessão expirada ou não autenticada. Faça login para continuar.');
        window.location.href = '/';
        return;
    }

    if (rolesPermitidas.length > 0 && !rolesPermitidas.includes(role)) {
        alert('Acesso negado: seu perfil não tem permissão para esta área.');
        window.location.href = '/';
    }
}

// Remove os tokens e encerra a sessão
function fazerLogout() {
    localStorage.removeItem('edmusys_token');
    localStorage.removeItem('edmusys_role');
    localStorage.removeItem('edmusys_user');
    window.location.href = '/';
}

// Função utilitária para enviar o token JWT em requisições protegidas
function getAuthHeader() {
    const token = localStorage.getItem('edmusys_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}