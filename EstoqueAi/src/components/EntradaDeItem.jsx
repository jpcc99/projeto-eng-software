import {useState} from 'react';

function EntradaDeItem({estoque, setEstoque}){
    const [selectedItem, setSelectedItem] = useState('');
    const [isNewItem, setIsNewItem] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [status, setStatus] = useState('');


    const getCurrentDate = () => {
        const today = new Date ();
        return today.toISOString().split('T')[0]; //YYYY-MM-DD
    }

    const handRegistrarEntrada = () => {
        const itemName = isNewItem ? newItemName : selectedItem;

        if (!itemName || !quantity || !status) {
            alert('Preencha todos os campos')
            return;
        }

        const itemExistente = estoque.find(item => item.nome === itemName)
        
        if(itemExistente){
            //atualizar item existente
            const estoqueAtualizado = estoque.map(item =>{
                if (item.nome === itemName){
                    return{
                        ...item,
                        quantidade : item.quantidade + parseInt(quantity),
                        data : getCurrentDate(),
                        status: status,
                    };
                }
                return item;
            });
            setEstoque(estoqueAtualizado);
        } else {
            // Adicionar novo item
            const novoItem = {
                id : Date.now(),
                nome : itemName,
                quantidade : parseInt(quantity),
                status : status,
            };
            setEstoque([...estoque, novoItem])
        }

        //limpar os campos dps de registrar
        setSelectedItem('');
        setIsNewItem(false);
        setNewItemName('');
        setQuantity('');
        setStatus('');
    };


    return (
        <div>
            <h2>Entrada de Item</h2>

            <label>Item:</label>
            <select 
            value={selectedItem}
            onChange={(e) => {
                const value = e.target.value;
                if (value === 'new'){
                    setIsNewItem(true);
                    setSelectedItem('');
                } else {
                    setIsNewItem(false);
                    setSelectedItem(value);
                }
            }}
            >
                <option value = ""> Selecione um item</option>
                {estoque.map(item => (
                    <option key = {item.id} value = {item.nome}>
                        {item.nome}
                    </option>
                ))}
                <option value = "new"> + Adicionar Novo Item</option>
            </select>

            {isNewItem && (
                <div>
                    <label>Nome do Novo Item:</label>
                    <input
                        type = "text"
                        value = {newItemName}
                        onChange = {(e) => setNewItemName(e.target.value)}
                    />
                </div>
            )}

            <div>
                <label>Quantidade:</label>
                <input
                    type = "number"
                    value = {quantity}
                    onChange = {(e) => setQuantity(e.target.value)}
                />
            </div>

            <div>
                <label> Status:</label>
                <select
                value = {status}
                onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Selecione o status</option>
                    <option value="novo">Novo</option>
                    <option value="pendente">Pendente</option>
                    <option value="ocupado">Ocupado</option>
                    <option value="entregue">Entregue</option>
                </select>
            </div>

            <button onClick={handRegistrarEntrada}> Registrar Entrada</button>
        </div>
    )
}

export default EntradaDeItem