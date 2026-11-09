function protegerPagina(rolesPermitidas = []) {
    const token = localStorage.getItem('edmusys_token');
    const role = localStorage.getItem('edmusys_role');

    if (!token) {
        alert('Sessão expirada ou não autenticada. Faça login para continuar.');
        window.location.href = 'landing_page_edmusys.html';
        return;
    }

    if (rolesPermitidas.length > 0 && !rolesPermitidas.includes(role)) {
        alert('Acesso negado: seu perfil não tem permissão para esta área.');
        window.location.href = 'landing_page_edmusys.html';
    }
}

function fazerLogout() {
    localStorage.removeItem('edmusys_token');
    localStorage.removeItem('edmusys_role');
    localStorage.removeItem('edmusys_user');
    localStorage.removeItem('edmusys_aluno_logado');
    localStorage.removeItem('edmusys_professor_logado');
    localStorage.removeItem('adminLogado');
    window.location.href = 'landing_page_edmusys.html';
}

function getAuthHeader() {
    const token = localStorage.getItem('edmusys_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}
