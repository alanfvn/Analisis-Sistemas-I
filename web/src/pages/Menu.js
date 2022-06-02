import { Button,Form, Container, Row, Col} from 'react-bootstrap';
import Navigation from './components/Navigation';
import { useLocation,} from 'react-router-dom';

function Menu(){

    const loc = useLocation();
    //dsadasda
    return(
        <div>
            <Navigation location={loc}/>
            <Container>
                    <Row className='mt-5'>
                        <Col lg={7} md={6} sm={12} className="p-3 m-auto shadow-sm rounded-lg">
                            <Form onSubmit={()=>console.log('hi')}>
                                <Row>
                                    <Col>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Selecciona el comercio</Form.Label>
                                            <Form.Control
                                                name="comercio"
                                                as="select"
                                                onChange
                                            >
                                                <option value="-1">Selecciona un comercio</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Selecciona la sucursal</Form.Label>
                                            <Form.Control
                                                disabled={true}
                                                name="sucursal"
                                                as="select"
                                                onChange
                                            >
                                                <option value="-1">Selecciona la sucursal</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {/* categoria de queja */}
                                <Row>
                                    <Col>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Eliga una categoria</Form.Label>
                                            <Form.Control
                                                disabled={true}
                                                name="categoria"
                                                as="select"
                                                onChange
                                            >
                                                <option value="-1">Selecciona la categoria</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className='mb-3'>
                                    <Form.Label>Ingresa tu queja</Form.Label>
                                    <Form.Control as="textarea" rows={10}></Form.Control>
                                </Form.Group>

                                <Row className='mt-4'>
                                    <Col >
                                        <Button type="submit" variant="primary">Enviar información</Button>
                                    </Col>
                                </Row>
                            </Form>                               
                        </Col>
                    </Row>         
            </Container>
        </div>
    );
}

export default Menu;