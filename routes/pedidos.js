const express = require('express');
const router = express.Router();

//Visualiza todos pedidos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Returna todos os pedidos',
    });
});


//Insere um pedido
router.post('/', (req, res, next) => {
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade,
    }
    res.status(201).send({
        mensagem: 'Insere um pedido',
        pedidoCriado: pedido
    });
});


//Returna dados de um pedido
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido
    res.status(200).send({
        mensagem: 'Returna dados do pedido',
    });
    
});


// Altera um produto
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Altera um produto',
    });
});


//Deleta pedido
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Deleta pedido',
    });
});

module.exports = router;