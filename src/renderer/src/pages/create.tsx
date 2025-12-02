export function Create() {

    async function handleAddCustomer() {
        const doc = {
            name: "Dunha Mcgregor",
            email: "dunha@mail.com",
            phone: "1234567890",
            address: "123 Main St, City, Country",
            role: "customer",
            status: true
        }

        const response = await window.api.addCustomer(doc);
        console.log('Add Customer Response:', response);
    }

    return (
        <div>
            <h1>Welcome to the Create Page</h1>

            <button onClick={handleAddCustomer}>
                Cadastrar
            </button>
        </div>
    )
}