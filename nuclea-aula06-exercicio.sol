/*
SPDX-License-Identifier: CC-BY-4.0
(c) Desenvolvido por Eduhkbr
This work is licensed under a Creative Commons Attribution 4.0 International License.
*/
pragma solidity 0.8.19;

/// @author Eduhkbr
/// @title Um exemplo de contrato de Investimento
/// endereço: 0xD2e70749fFAcD9D3B5F32cb8C6360B488BAaA5a8
contract Investimento {

    mapping(address=>uint8) public investimento;
    mapping(address=>uint8) public ultimoRendimento;
    uint8 valorDoRendimento;

    event aconteceuUmRendimento(address investidor, uint8 valorAtualizado);
    
    // @notice Obtem o valor atual do investimento atualizado com rendimento
    // @dev retorna em wei o conteúdo da variavel de valorDoRendimento
    // @return valor atual do investimento atualizado
    function atribuirValor() public returns (uint8){
        require(ultimoRendimento[msg.sender] == 0, "Sinto muito. Voce ja teve sua chance");
        require(valorDoRendimento < 256, "Sinto muito. Voce ja teve sua chance");
        valorDoRendimento++;
        investimento[msg.sender] = valorDoRendimento;
        emit aconteceuUmRendimento(msg.sender, valorDoRendimento);
        return valorDoRendimento;
    }
    
}