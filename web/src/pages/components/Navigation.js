import React from 'react'

import {
    Nav, Navbar,
    NavDropdown,Container,
}   from 'react-bootstrap'

import {getCookie,cleanCookies} from '../../util/CookieMan';
import {useNavigate} from 'react-router-dom';

import LoginModal from '../modals/LoginModal';

function Navigation({location}){

    const user = getCookie('user') ?? false;
    const nav = useNavigate();
    //controlador del modal de login
    const [show, setShow] = React.useState(false);

    const cerrarSesion = () => {
        setShow(false);
        cleanCookies();
        nav('/');
    }



    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img
                    alt=""
                    src="/logo_diaco.png"
                    width="45"
                    height="45"
                    className="d-inline-block align-center"
                />{' '}DIACO
                </Navbar.Brand>        
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {
                            //opciones extra.
                            user &&
                            <>
                                <Nav.Link href="/quejas">Quejas</Nav.Link>
                                <NavDropdown title="Comercios" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/comercio">Comercios</NavDropdown.Item>
                                    <NavDropdown.Item href="/sucursales">Sucursales</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="/about">Acerca de</Nav.Link>
                            </>
                        }
                    </Nav>
                    <Nav>
                        {
                            //opciones de acceso sesion.
                            user ? 
                            <Nav.Link href="" onClick={cerrarSesion}>Cerrar sesión</Nav.Link> :
                            <Nav.Link href="" onClick={()=> setShow(true)}>Iniciar sesión</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
                <LoginModal shown={show} close={()=>setShow(false)}/>
            </Container>
        </Navbar>
    )
}


export default Navigation