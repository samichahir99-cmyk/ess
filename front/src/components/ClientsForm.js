import { useState } from "react";

function ClientForm({ onAjouter }) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [entreprise, setEntreprise] = useState("");

  async function handleSubmit(event) {
    event.preventDefault(); // empêche le rechargement de la page

    const reussi = await onAjouter({ nom, email, entreprise });

    if (reussi) {
      setNom("");
      setEmail("");
      setEntreprise("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nom"
        value={nom}
        onChange={(event) => setNom(event.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <input
        placeholder="Entreprise"
        value={entreprise}
        onChange={(event) => setEntreprise(event.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default ClientForm;