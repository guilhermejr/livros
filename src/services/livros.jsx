import baseAPI from './api';

export default class LivrosService {

    constructor() {
        this.api = baseAPI();
    }

    async getAll(estante = 1, pagina = 0, quantidade = 24) {
        return await this.api.get('livros?estante='+ estante +'&page='+ pagina +'&size='+ quantidade);
    }

}