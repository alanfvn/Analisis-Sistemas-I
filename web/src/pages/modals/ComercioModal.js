import React from 'react'
import HttpMan from '../../util/HttpMan';


import {Modal, Button, Form, Row, Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';

function ComercioModal(props){
    //props data.
    const [data, setData] = React.useState({});
    const {shown, close, comercio} = props;
    const nav = useNavigate();
    
    const hideForm = () => { setData({}); close()};
    //data control.
    
    const setValues = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }
    //submit control.
    const submit = async () => {
        const {id, comercio, propietarios} = data;
        await HttpMan.post('/post_comercio', {
            id,
            comercio,
            propietarios
        })
        nav('/');
    }

    const cargar = React.useCallback(()=>{
        setData({
            "id": comercio.id_comercio,
            "comercio": comercio.nombre_comercio,
            "propietarios": comercio.propietarios,
        });
    }, [comercio]);

    React.useEffect(()=>{
        cargar();
    }, [cargar]);


    return (
            <Modal
                show={shown}
                onHide={hideForm}
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Editar comercio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg={8} className="m-auto ">
                            <Form>
                                <Form.Group className='mb-3'>
                                    <Form.Label>ID Comercio</Form.Label>
                                    <Form.Control 
                                        name="id" 
                                        defaultValue={comercio.id_comercio}
                                        disabled={true}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Nombre de comercio:</Form.Label>
                                    <Form.Control 
                                        name="comercio" 
                                        defaultValue={comercio.nombre_comercio}
                                        onChange={(e)=>setValues(e)}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Dueños:</Form.Label>
                                    <Form.Control 
                                        name="propietarios" 
                                        as="textarea"
                                        defaultValue={comercio.propietarios}
                                        onChange={(e)=>setValues(e)} 
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideForm}>Cancelar</Button>
                    <Button variant="primary" onClick={submit}>Editar información</Button>
                </Modal.Footer>
            </Modal>
    );
}

export default ComercioModal;