import { useEffect, useState } from "react";
import Header from "./components/Header";
import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient
} from "./services/clientService";
import "./App.css";

function App() {
  const [clients, setClients] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [message, setMessage] = useState("Chargement...");

  // Au premier affichage : demander les clients à l'API
  useEffect(() => {
    getClients()
      .then((data) => {
        setClients(data);
        setMessage("");
      })
      .catch((error) => setMessage(error.message));
  }, []);

  async function ajouterClient(nouveauClient) {
    try {
      const clientCree = await createClient(nouveauClient);
      setClients([clientCree, ...clients]);
      setMessage("Client ajouté !");
      return true;
    } catch (error) {
      setMessage(error.message);
      return false;
    }
  }

  async function changerStatut(id, statut) {
    try {
      const clientModifie = await updateClient(id, { statut });
      setClients(clients.map((c) => (c._id === id ? clientModifie : c)));
      setMessage("Statut modifié !");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function supprimerClient(id) {
    if (!window.confirm("Supprimer ce client ?")) {
      return;
    }
    try {
      await deleteClient(id);
      setClients(clients.filter((c) => c._id !== id));
      setMessage("Client supprimé !");
    } catch (error) {
      setMessage(error.message);
    }
  }

  // On garde uniquement les clients qui correspondent à la recherche
  const clientsFiltres = clients.filter((c) =>
    (c.nom + " " + c.email).toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div className="container">
      <Header total={clients.length} />
      <ClientForm onAjouter={ajouterClient} />
      {message && <p className="message">{message}</p>}
      <input
        className="recherche"
        placeholder="Rechercher par nom ou email..."
        value={recherche}
        onChange={(event) => setRecherche(event.target.value)}
      />
      <ClientList
        clients={clientsFiltres}
        onChangerStatut={changerStatut}
        onSupprimer={supprimerClient}
      />
    </div>
  );
}

export default App;