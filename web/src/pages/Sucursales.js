import { Button,Form, Container, Row, Col, Table} from 'react-bootstrap';
import Navigation from './components/Navigation';
import { useLocation,} from 'react-router-dom';

function Sucursales(){

    const loc = useLocation();
    return(
        <div>
            <Navigation location={loc}/>
            <Container>
                <Row>
                        <h1 className="shadow-sm mt-5 mb-5 p-3 text-center rounded">Sucursales</h1>

                        <Col lg={7} md={6} sm={12} className="p-3 mb-5 shadow-sm rounded">
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
                                </Row>
    
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
                                    </Col>
                                    <Col>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Selecciona el municipio</Form.Label>
                                            <Form.Control
                                                name="municipio"
                                                as="select"
                                                onChange
                                            >
                                                <option value="-1">Selecciona el municipio</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Ingresa el nombre del comercio</Form.Label>
                                            <Form.Control
                                                name="nombre"
                                                onChange
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
    
                                <Row className='mt-4'>
                                    <Col >
                                        <Button type="submit" variant="primary">Agregar comercio</Button>
                                    </Col>
                                </Row>
                            </Form>                               
                        </Col>

                        {/* apartado para visualizar comercios */}
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>ID Sucursal</th>
                                    <th>Sucursal</th>
                                    <th>Comercio</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td className='text-center'>
                                        <Button variant="secondary" onClick={()=>null}>Editar</Button>
                                    </td>
                                    <td className='text-center'>
                                        <Button variant="danger" onClick={()=>null}>Borrar</Button>
                                    </td>
                                </tr>        
                            </tbody>
                        </Table>
                    </Row>      
            </Container>
        </div>
    );
}

export default Sucursales;