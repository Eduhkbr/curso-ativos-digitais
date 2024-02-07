/*
SPDX-License-Identifier: CC-BY-4.0
(c) Desenvolvido por Eduhkbr
This work is licensed under a Creative Commons Attribution 4.0 International License.
*/
pragma solidity 0.8.19;

import "./owner.sol";
import "./titulo.sol";

/// @author Eduhkbr
/// @title Um exemplo de contrato de CCB
/// endereço: 0xA2a55cfD56EacA5FAF7b27A68beC4904F014Edf4
contract CCB is Titulo, Owner  {
    string _denominacao;
    string _emissor;
    string _localEmissao;
    uint256 immutable _dataEmissao;
    uint256 _valor;
    uint8 immutable _decimais;
    uint256 _prazoPagamento;

    constructor() {
        _denominacao = "Cedula de Credito Bancario";
        _emissor = "Nuclea SA";
        _dataEmissao = block.timestamp;
        _localEmissao = "Blockchain Nuclea";
        _valor = 100000000;
        _decimais = 2;
        _prazoPagamento = _dataEmissao + 90 days;
        emit NovoPrazoPagamento(_dataEmissao, _prazoPagamento);
    }

    /**
     * @dev Retorna o valor nominal.
     */
    function valorNominal() external view returns (uint256) {
        return _valor;
    }

    /**
     * @dev Retorna o local de emissao.
     */
    function localEmissao() external view returns (string memory){
        return _localEmissao;
    }
    
    /**
     * @dev Retorna a denominacao.
     */
    function denominacao() external view returns (string memory){
        return _denominacao;
    }


    /**
     * @dev Retorna o nome do Emissor.
     */
    function nomeEmissor() external view returns (string memory) {
        return _emissor;
    }

    /**
     * @dev Retorna a data da emissao.
     */
    function dataEmissao() external view returns (uint256) {
        return _dataEmissao;
    }

    /**
     * @dev Retorna o prazo de pagamento.
     */
    function prazoPagamento() external view returns (uint256) {
        return _prazoPagamento;
    }

    /**
    * @dev muda o prazo de pagamento
    * @notice dependendo da situacao economica o prazo de pagamento pode mudar
    * @param prazoPagamento_ novo prazo de pagamentos a ser adicionado. Em segundos
    */
    function mudaDataPagamento(uint256 prazoPagamento_) external onlyOwner returns (uint256) {
        emit NovoPrazoPagamento(_prazoPagamento, _prazoPagamento + prazoPagamento_);
        _prazoPagamento = _prazoPagamento + prazoPagamento_;
        return _prazoPagamento;
    }

}