import { Container, Nav, Navbar } from "react-bootstrap";
import "./AppNav.css";

const AppNav = () => {
    return (<div>
        <Navbar expand="lg" className="navbar-dark navbg" >
            <Container>
                <Navbar.Brand href="/">Przypinki</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="me-auto">
                        <Nav.Link href="/">Start</Nav.Link>
                        <Nav.Link href="/players">Gracze</Nav.Link>
                        <Nav.Link href="/players/add">Dodaj gracza</Nav.Link>
                        <Nav.Link href="/games">Gry</Nav.Link>
                        <Nav.Link href="/games/add">Dodaj grę</Nav.Link>
                        <Nav.Link href="/gamesessions/add">Zagraj</Nav.Link>
                        <Nav.Link href="/statistics">Statystyki</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    </div>
    )
}
export default AppNav;