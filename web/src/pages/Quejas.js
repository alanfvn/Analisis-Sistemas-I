import { Button,Form, Container, Row, Col, Table} from 'react-bootstrap';
import Navigation from './components/Navigation';
import { useLocation,} from 'react-router-dom';

function Quejas(){

    const loc = useLocation();
    return(
        <div>
            <Navigation location={loc}/>
            <Container>
                <Row>
                        <h1 className="shadow-sm mt-5 mb-5 p-3 text-center rounded">Quejas</h1>

                        {/* apartado para visualizar comercios */}
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>ID Queja</th>
                                    <th>Comercio</th>
                                    <th>Fecha</th>
                                    <th>visualizar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td className='text-center'>
                                        <Button variant="info" onClick={()=>null}>Detalles</Button>
                                    </td>
                                </tr>        
                            </tbody>
                        </Table>
                    </Row>      
            </Container>
        </div>
    );
}

export default Quejas;