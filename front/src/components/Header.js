function Header({ total }) {
    return (
        <header>
            <h1>Mon CRM</h1>
            <p>{total} client(s) enregistré(s)</p>
        </header>
    );
}

export default Header;