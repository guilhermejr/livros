import baseAPI from './API';

export default class EstantesService {

    constructor() {
        this.api = baseAPI();
    }

    async getAll() {
        return await this.api.get('estantes');
    }

    async mudar(livro, estante) {
        return await this.api.put('livros/'+ livro +'/estante/'+ estante, { headers: { 'Content-Type': 'application/json' } });
    }

}