import React from 'react'
import {GT_FORMAT} from '../../util/DUtil';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'

function QuejaModal(props){
    //props data.
    const {shown, close, queja} = props;
    const hideForm = () => {close()};

    return (
            <Modal
                show={shown}
                onHide={hideForm}
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Visualizando Queja</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="m-auto ">
                            <Form>
                                <Form.Group className='mb-3'>
                                    <Form.Label>ID Queja</Form.Label>
                                    <Form.Control 
                                        defaultValue={queja.queja_id}
                                        disabled={true}
                                    />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Comercio</Form.Label>
                                            <Form.Control 
                                                defaultValue={queja.comercio_nombre}
                                                disabled={true}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Sucursal</Form.Label>
                                            <Form.Control 
                                                defaultValue={queja.sucursal_nombre}
                                                disabled={true}/>
                                        </Form.Group>
                                    </Col>
                                </Row>

                          
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Categoria de queja</Form.Label>
                                            <Form.Control 
                                                defaultValue={queja.queja_categoria}
                                                disabled={true}
                                            />
                                        </Form.Group>
                             
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Fecha de queja</Form.Label>
                                            <Form.Control 
                                                defaultValue={queja.queja_fecha == null ? "" : GT_FORMAT.format(Date.parse(queja.queja_fecha))}
                                                disabled={true}
                                            />
                                        </Form.Group>
                         
                                <Form.Group className='mb-3'>
                                    <Form.Label>Queja</Form.Label>
                                    <Form.Control 
                                        defaultValue={queja.queja_text}
                                        as="textarea" 
                                        disabled={true}
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={hideForm}>Ok</Button>
                </Modal.Footer>
            </Modal>
    );
}

export default QuejaModal;