function ClientList({ clients, onChangerStatut, onSupprimer }) {
  if (clients.length === 0) {
    return <p>Aucun client à afficher.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Entreprise</th>
          <th>Statut</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client._id}>
            <td>{client.nom}</td>
            <td>{client.email}</td>
            <td>{client.entreprise}</td>
            <td>
              <select
                value={client.statut}
                onChange={(event) =>
                  onChangerStatut(client._id, event.target.value)
                }
              >
                <option value="prospect">Prospect</option>
                <option value="client">Client</option>
                <option value="inactif">Inactif</option>
              </select>
            </td>
            <td>
              <button onClick={() => onSupprimer(client._id)}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ClientList;