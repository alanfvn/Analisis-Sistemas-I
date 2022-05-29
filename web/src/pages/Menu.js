import { Button,Form, Container, Row, Col} from 'react-bootstrap';
import Navigation from './components/Navigation';
import { useLocation,} from 'react-router-dom';

function Menu(){

    const loc = useLocation();

    return(
        <div>
            <Navigation location={loc}/>
            <Container>
                <Form onSubmit={()=>console.log('hi')} className="mt-5">
                    <Row>

                        <Col>
                        <Form.Group className='mb-3'>
                        <Form.Label>Selecciona el departamento</Form.Label>
                        <Form.Control
                            name="departamento"
                            as="select"
                            onChange
                        >
                            <option value="-1">Selecciona un departamento</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Selecciona el municipio</Form.Label>
                        <Form.Control
                            disabled={true}
                            name="municipio"
                            as="select"
                            onChange
                        >
                            <option value="-1">Selecciona el municipio</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Selecciona el negocio</Form.Label>
                        <Form.Control
                            disabled={true}
                            name="negocio"
                            as="select"
                            onChange
                        >
                            <option value="-1">Selecciona el negocio</option>
                        </Form.Control>
                    </Form.Group>
                        </Col>
                        <Col/>
                        
                    </Row>

                    <Form.Group className='mb-3'>
                        <Form.Label>Ingresa tu queja</Form.Label>
                        <Form.Control as="textarea" rows={10}></Form.Control>
                    </Form.Group>

                    <Row className='mt-4'>
                        <Col>
                            <Button type="submit" variant="primary btn-block">Enviar</Button>
                        </Col>
                        <Col/>
                        <Col/>
                    </Row>
                 
                </Form>                

            </Container>
        </div>
    );
}

export default Menu;