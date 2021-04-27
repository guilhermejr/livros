import jwt_decode from 'jwt-decode';

export const TOKEN = 'livros-token';

export const isAutenticado = () => {
    
    const token = localStorage.getItem(TOKEN);

    if (token === null) {
        return false;
    } else {
        const jwt = jwt_decode(token);
        
        const agora = new Date();
        const tokenExpiracao = jwt.exp * 1000;

        if (agora.getTime() > tokenExpiracao) {

            logout();

            const dateObject = new Date(tokenExpiracao);
            console.log("Expirou em: " + dateObject.toLocaleString());
            
            return false;
        }

        return true;
    }
}

export const getToken = () => localStorage.getItem(TOKEN);

export const login = (token) => localStorage.setItem(TOKEN, token);

export const logout = () => localStorage.removeItem(TOKEN);