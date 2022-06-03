import React from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';

function SucursalModal(props){
    //props data.
    const {shown, close, sucursal} = props;
    const nav = useNavigate();

    const hideForm = () => { setData({}); close()};
    //data control.
    const [data, setData] = React.useState({});

    const setValues = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value,"error": false});
    }
    //submit control.
    const submit = () => {
        const {owners, cname} = data;
        if(!owners || !cname){
            setData({ ...data, "error": true});
            return;
        }
        nav('/comercio');
    }

    return (
            <Modal
                show={shown}
                onHide={hideForm}
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Editar sucursal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg={8} className="m-auto ">
                            <Form>
                                <Form.Group className='mb-3'>
                                    <Form.Label>ID Sucursal</Form.Label>
                                    <Form.Control name="id" disabled={true}/>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Nombre de sucursal:</Form.Label>
                                    <Form.Control name="sucursal" onChange={(e)=>setValues(e)}/>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Departamento:</Form.Label>
                                    <Form.Control name="departamento" as="select" onChange={(e)=>setValues(e)}>
                                        <option value="-1">Selecciona el departamento</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Municipio:</Form.Label>
                                    <Form.Control name="municipio" as="select" onChange={(e)=>setValues(e)}>
                                        <option value="-1">Selecciona el municipio</option>
                                    </Form.Control>
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

export default SucursalModal;