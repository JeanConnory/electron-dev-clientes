import { Link } from "react-router-dom"

export function Home() {

    async function handleAdd() {
        const response = await window.api.fetchAllCustomers();
        console.log(response);
    }

    async function handleCustomerById() {
        const docId = "b0337c46-5b88-4d38-be6c-ee2d4da78010"; // Substitua pelo ID real do cliente que deseja buscar
        const response = await window.api.fetchCustomerById(docId);
        console.log(response);
    }

    async function handleDeleteCustomer() {
        const docId = "2303664e-6b5a-4ee1-8ed9-90814502c2f0"; // Substitua pelo ID real do cliente que deseja deletar
        const response = await window.api.deleteCustomer(docId);
        console.log('Delete Customer Response:', response);
    }

    return (
        <div>
            <h1>Página Home</h1>
            <Link to="/create">Go to Create Page</Link>
            <br />
            <br />

            <button onClick={handleAdd}>
                Buscar Clientes
            </button>
            <br />
            <br />
            <button onClick={handleCustomerById}>
                Buscar Clientes pelo ID
            </button>

              <br />
            <br />
            <button onClick={handleDeleteCustomer}>
                Deletar Cliente
            </button>
        </div>        
    )
}