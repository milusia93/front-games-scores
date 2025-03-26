import { Container, Nav, Navbar } from "react-bootstrap";
import "./AppNav.css";
import { Link } from "react-router";

const AppNav = () => {
    return (<div>
        <Navbar expand="lg" className="navbar-dark navbg" >
            <Container>
                <Navbar.Brand href="/">Przypinki</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Start</Nav.Link>
                        <Nav.Link as={Link} to="/players">Gracze</Nav.Link>
                        <Nav.Link as={Link} to="/players/add">Dodaj gracza</Nav.Link>
                        <Nav.Link as={Link} to="/games">Gry</Nav.Link>
                        <Nav.Link as={Link} to="/games/add">Dodaj grę</Nav.Link>
                        <Nav.Link as={Link} to="/gamesessions/add">Zagraj</Nav.Link>
                        <Nav.Link as={Link} to="/statistics">Statystyki</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    </div>
    )
}
export default AppNav;