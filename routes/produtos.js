const express = require('express');
const router = express.Router();
const mysql = require('../mariadb').pool;

//Returna todos os produtos

router.get('/', (req, res, next) => {
     mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM PRODUTOS;',
            (error, resultado, fields) => {
                if (error) {return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    });
});

//Insere um produto

router.post('/', (req, res, next) => {
   mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO PRODUTOS (COD, DESCRICAO, PROCO_VEND, PRECO_CUSTO, COD_FORNECEDOR, SERIAL_NUMBER ,QTD_EST) VALUES (?,?,?,?,?,?,?)',
            [req.body.cod, req.body.descricao, req.body.preco_vend,
             req.body.preco_custo, req.body.cod_fornecedor,req.body.serial_number ,req.body.qtd_est],
            (error, resultado, field) => {
                conn.release();
                if (error) {return res.status(500).send({error: error})}

                res.status(201).send({
                    mensagem: "Produto cadastrado com sucesso",
                    id_produto: resultado.insertId
                });
            }
        )
    })

});

//Returna dado especifico de um produto

router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM PRODUTOS WHERE ID_PRODUTOS = ?;',
            [req.params.id_produto],
            (error, resultado, fields) => {
                if (error) {return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    });
});


// Altera um produto
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})}
        conn.query(
            `UPDATE PRODUTOS
                SET COD             = ?,
                    DESCRICAO       = ?
                    PROCO_VEND      = ?
                    PRECO_CUSTO     = ?
                    COD_FORNECEDOR  = ?
                    SERIAL_NUMBER   = ?
                    QTD_EST         = ?
                WHERE ID_PRODUTOS   = ?`,
            [
                req.body.cod,
                req.body.descricao,
                req.body.preco_vend,
                req.body.preco_custo,
                req.body.cod_fornecedor,
                req.body.serial_number,
                req.body.qtd_est,
                req.body.id_produto
            ],
            (error, resultado, field) => {
                conn.release();
                if (error) {return res.status(500).send({error: error})}

                res.status(201).send({
                    mensagem: "Produto cadastrado com sucesso",
                    id_produto: resultado.insertId
                });
            }
        )
    })
});

//Deleta um produto
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Deleta um produto',
    })
});



module.exports = router;