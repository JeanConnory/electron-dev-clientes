import { app, ipcMain } from "electron";
import PouchDb from "pouchdb";
import path from "node:path";
import fs from "node:fs";
import { Customer, NewCustomer } from "../shared/types/ipc";
import { randomUUID } from "node:crypto";

//Determinar caminho base para o banco de dados com base no SO
let dbPath;
if (process.platform === "darwin") {
    dbPath = path.join(app.getPath("appData"), "devclientes", "my_db"); //MacOS
}
else {
    dbPath = path.join(app.getPath("userData"), "my_db"); //Windows
}

//verificar e criar o diretório se não existir
const dirPath = path.dirname(dbPath);
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

//Inicializar o banco de dados PouchDB
const db = new PouchDb<Customer>(dbPath);

async function addCustomer(doc: NewCustomer): Promise<PouchDB.Core.Response | void> {
    const id = randomUUID();

    const newCustomer: Customer = {
        ...doc,
        _id: id
    }

    return db.put(newCustomer)
        .then(response => response)
        .catch(error => {
            console.error("Error adding customer:", error);
        });

}

//Manipulador IPC para adicionar um novo cliente
ipcMain.handle("add-customer", async (event, doc: Customer) => {
    const result = await addCustomer(doc);
    return result;
});

async function fetchAllCustomers(): Promise<Customer[]> {
    try {
        const result = await db.allDocs<Customer>({ include_docs: true });
        return result.rows.map(row => row.doc! as Customer);
    } catch (error) {
        console.error("Error fetching customers:", error);
        return [];
    }
}

ipcMain.handle("fetch-all-customers", async () => {
    return await fetchAllCustomers();
});

async function fetchCustomerById(docId: string): Promise<Customer | null> {
    return db.get<Customer>(docId)
        .then(doc => doc)
        .catch(error => {
            console.error("Error fetching customer by ID:", error);
            return null;
        });
}

ipcMain.handle("fetch-customer-by-id", async (event, docId: string) => {
    return await fetchCustomerById(docId);
});

async function deleteCustomer(docId: string): Promise<PouchDB.Core.Response | null> {
    try {
        const doc = await db.get<Customer>(docId);
        const response = await db.remove(doc._id, doc._rev!);
        return response;
    }
    catch (error) {
        console.error("Error deleting customer:", error);
        return null;
    }
}

ipcMain.handle("delete-customer", async (event, docId: string): Promise<PouchDB.Core.Response | null> => {
    return await deleteCustomer(docId);
});