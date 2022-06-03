import React from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';

function ComercioModal(props){
    //props data.
    const {shown, close, comercio} = props;
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
                    <Modal.Title>Editar comercio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg={8} className="m-auto ">
                            <Form>
                                <Form.Group className='mb-3'>
                                    <Form.Label>ID Comercio</Form.Label>
                                    <Form.Control name="id" disabled={true}/>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Nombre de comercio:</Form.Label>
                                    <Form.Control name="cname" onChange={(e)=>setValues(e)}/>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Dueños:</Form.Label>
                                    <Form.Control 
                                        name="owners" 
                                        as="textarea"
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