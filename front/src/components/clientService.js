const API_URL = process.env.REACT_APP_API_URL;
// Lire tous les clients

export async function getClients() {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    if(!response.ok) {
        throw new Error(data.message);
    }
    
    return data;
}

// Créer un client
export async function createClient(client) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client)
    });
    
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

// Modifier un client

export async function updateClient(id, modifications) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modifications)
    });
    
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
} 

// Supprimer un client

export async function deleteClient(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message);
    }return data;
}