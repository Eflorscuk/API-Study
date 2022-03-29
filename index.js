const express = require('express') // Importa o express
const server = express() // Cria uma variável chamada server que chama a
// função express

server.use(express.json()) // faz com que o express entenda JSON

const geeks = ['Elemento 01', 'Elemento 02', 'Elemento 03'] 
// As informações ficarão dentro deste array

server.use((req, res, next) => { //server.use cria o middleware global
    console.time('Request') // marca o início da requisição
    console.log(`Método: ${req.method}; URL: ${req.url}`) //retorna qual o método
    //url foi chamado

    next() // função que chama as próximas ações

    console.log('Finalizou') // Será chamado após a requisição ser concluída
    console.timeEnd('Request') // marca o fim da requisição
})

function checkGeekExists(req, res, next) {
    const geek = geek[req.params.index]
    if (!req.body.name) { // middleware local que irá checar se a propriedade name foi
        //informada corretamente
        return res.status(400).json({ error: 'geek does not exist'}) // caso negativo, irá
        //retornar um erro 400 - BAD REQUEST
    }

    req.geek = geek

    return next() //se o nome for informado corretamente, a função next() chama as
    // próximas ações
}

function checkGeekInArray(req, res, next) {
    const geek = geeks[req.params.index]
    if (!geek) {
        return res.status(400).json({ error: 'geek does not exist in array'})
    } // verifica se o Geek existe no array, caso negativo informa que o index não existe
    req.geek = geek
    
    return next()
}

server.get('/geeks', (req, res) => {
    return res.json(geeks)
}) // rota para listar todos os geeks

server.get('/geeks/:index', checkGeekInArray, (req, res) => res.json(req.geek))

server.post('/geeks', checkGeekExists, (req, res) => {
    const {name} = req.body // buscar o nome informado dentro do body da requisição
    geeks.push(name)

    return res.json(geeks) // retorna a informação da variável geeks
})

server.put('/geeks/:index', checkGeekInArray, checkGeekExists, (req, res) => {
    const {index} = req.params //recupera o index com os dados
    const {name} = req.body

    geeks[index] = name //sobrepõe o index obtido na rota de acordo com o novo valor

    return res.json(geeks)
}) // Retorna novamente os geeks atualizados após o update

server.delete('/geeks/:index', checkGeekInArray, (req, res) => {
    const {index} = req.params // recupera o index com os dados

    geeks.splice(index, 1) // percorre o vetor até o index selecionado e deleta uma
    //posição no Array

    return res.send()
}) // retorna os dados após a exclusão

server.listen(3000) // faz com que o servidor seja executado na porta 3000 do seu
// localhost