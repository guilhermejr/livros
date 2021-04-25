import baseAPI from './API';

export default class UsuariosService {

    constructor() {
        this.api = baseAPI();
    }

    async login(email, senha) {
        return await this.api.post('auth', {email: email, senha: senha});
    }

}