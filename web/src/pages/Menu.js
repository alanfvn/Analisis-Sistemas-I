import React from 'react';
import HttpMan from '../util/HttpMan';

import { Button,Form, Container, Row, Col} from 'react-bootstrap';
import Navigation from './components/Navigation';
import { useLocation,} from 'react-router-dom';

function Menu(){

    const loc = useLocation();
    //control de form.
    const [data, setData] = React.useState({
        sucursal: "-1", 
        categoria: "-1", 
        queja: ""
    });

    //comercios
    const [sucursal, setSucu] = React.useState([]);
    const [cats, setCats] = React.useState([]);

    //munis

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, 
            [name]: value
        });
    };  

    const cargar = React.useCallback(()=>{
        HttpMan.get(`/get_sucursals`).then(resp =>{
            setSucu(resp.data);
        });
       HttpMan.get(`/get_categories`).then(resp =>{
          setCats(resp.data);
        });

    }, []);
    


    const submit = async (e) =>{
    
        const {sucursal, categoria, queja} = data;

        if(sucursal=== "-1" || categoria === "-1" || queja === ""){
            alert('VERIFICA LOS CAMPOS PORFAVOR');
            e.preventDefault();
            return;
        }
        await HttpMan.post('/post_queja', {
            sucursal,
            categoria,
            queja
        })
      
    }

    React.useEffect(()=>{
        cargar();
    }, [cargar]);




  
    return(
        <div>
            <Navigation location={loc}/>
            <Container>
                    <Row className='mt-5'>
                        <Col lg={7} md={6} sm={12} className="p-3 m-auto shadow-sm rounded-lg">
                            <Form onSubmit={submit}>
                                <Row>
                                    <Col>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Selecciona el negocio</Form.Label>
                                            <Form.Control
                                                name="sucursal"
                                                as="select"
                                                onChange={handleInput}
                                            >
                                                <option key={"-1"} value="-1">Selecciona el negocio</option>
                                                {
                                                    sucursal.map(data =>{
                                                        const{id_sucursal, nombre_sucursal, nombre_comercio} = data;
                                                        
                                                        return (
                                                            <option key={id_sucursal} value={id_sucursal}>
                                                                    {nombre_comercio} - ({nombre_sucursal})
                                                            </option>
                                                        )
                                                    })
                                                }
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
                                                name="categoria"
                                                as="select"
                                                onChange={handleInput}
                                            >
                                                <option value="-1">Selecciona la categoria</option>
                                                {
                                                    cats.map(x =>{
                                                        const id = x["id_categoria_queja"]
                                                        return <option key={id} value={id}>{x["nombre_queja"]}</option>
                                                    })
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className='mb-3'>
                                    <Form.Label>Ingresa tu queja</Form.Label>
                                    <Form.Control 
                                        name="queja"
                                        as="textarea" 
                                        rows={10}
                                        onChange={handleInput}
                                    ></Form.Control>
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