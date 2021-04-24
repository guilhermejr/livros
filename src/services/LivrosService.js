import baseAPI from './API';

export default class LivrosService {

    constructor() {
        this.api = baseAPI();
    }

    async getAll(estante = 1, pagina = 0, quantidade = 24) {
        return await this.api.get('livros?estante='+ estante +'&page='+ pagina +'&size='+ quantidade);
    }

    async get(id) {
        return await this.api.get('livros/'+ id);
    }

    async pesquisar(estante, texto) {
        return await this.api.get('livros/pesquisar/'+ estante +'/'+ texto);
    }

}