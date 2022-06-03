import React from 'react'
import HttpMan from '../../util/HttpMan';


import {Modal, Button, Form, Row, Col} from 'react-bootstrap'
import {setCookie} from '../../util/CookieMan';
import {useNavigate} from 'react-router-dom';

function LoginModal(props){
    const nav = useNavigate();
    //props
    const shown = props.shown;
    const close = () => { setData({}); props.close()};
    //data control.
    const [data, setData] = React.useState({});

    const setValues = (e) => {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value,
            "error": false,
        });
    }
    //submit control.
    const submit = async () => {
        const {user, pass} = data;
        let username;

        try{
            const resp = await HttpMan.post('/login', {
                'user': user,
                'password': pass,
            });
            username = resp.data.username;

        }catch(err){}
        
        if(!username){
            setData({
                ...data,
                "error": true,
            });
            return;
        }
        setCookie('user', username);
        nav('/comercio');
    }

    return (
            <Modal
                show={shown}
                onHide={close}
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Iniciar sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg={8} className="m-auto ">
                            <Form>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Usuario:</Form.Label>
                                    <Form.Control name="user" placeholder="Usuario" onChange={(e)=>setValues(e)}/>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Contraseña:</Form.Label>
                                    <Form.Control name="pass" placeholder="Clave" type="password" onChange={(e)=>setValues(e)} isInvalid={ data["error"] ?? false }/>
                                    <Form.Control.Feedback type='invalid'>Clave incorrecta</Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={submit}>Iniciar sesión</Button>
                </Modal.Footer>
            </Modal>
    );
}

export default LoginModal;