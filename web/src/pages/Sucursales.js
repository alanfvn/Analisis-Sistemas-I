import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HttpMan from '../util/HttpMan';

import { Button,Form, Container, Row, Col, Table} from 'react-bootstrap';
import { useLocation,} from 'react-router-dom';
//
import {getDepartamentos, getMunicipios} from '../util/CacheMan';

function Sucursales(){

    const loc = useLocation();
    const departamentos = getDepartamentos();
    //control de form.
    const [data, setData] = React.useState({
        "comercio": "-1",
        "departamento": "-1",
        "municipio": "-1",
        "sucursal": ""
    });


    //comercios
    const [comercios, setComercios] = React.useState([]);
    const [sucursales, setSucursales] = React.useState([]);

    const [munis, setMunis] = React.useState({
        "-1": "Seleccione un municipio"
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, 
            [name]: value
        });
        if(name === 'departamento'){
            setMunis(getMunicipios(value));
        }
    };  

    const cargar = React.useCallback(()=>{
        HttpMan.get(`/get_shops`).then(resp =>{
            setComercios(resp.data);
        });

        HttpMan.get(`/get_sucursals`).then(resp =>{
            setSucursales(resp.data);
        });

    }, []);
    


    const borrar = async (id) => {
        var resp = window.confirm("Deseas borrar la sucursal?");
        if (resp) {
            await HttpMan.delete('/delete_sucursal', { data: { id }});
            window.location.reload();
        }
    }

    const submit = async (e) =>{
        const {comercio, departamento, municipio, sucursal} = data;
        if(comercio === "-1" || departamento === "-1" || municipio === "-1" || sucursal === ""){
            e.preventDefault();
            alert('VERIFICA LOS DATOS PORFAVOR');
            return;
        }
        await HttpMan.post('/post_sucursal', {
            "id": -1,
            comercio,
            municipio,
            sucursal
        });
    }

    React.useEffect(()=>{
        cargar();
    }, [cargar]);
    

    return(
        <div>
            <Navigation location={loc}/>
            <Container>
                <Row>
                    <h1 className="shadow-sm mt-5 mb-5 p-3 text-center rounded">Sucursales</h1>
                    <Col lg={7} md={6} sm={12} className="p-3 mb-5 shadow-sm rounded">
                        <Form onSubmit={submit}>
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Selecciona el comercio</Form.Label>
                                        <Form.Control
                                            name="comercio"
                                            as="select"
                                            onChange={handleInput}
                                        >
                                            <option value="-1">Selecciona un comercio</option>
                                            {
                                                comercios.map(x =>{
                                                    const id = x["id_comercio"]
                                                
                                                    return <option key={id} value={id}>{x["nombre_comercio"]}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Selecciona el departamento</Form.Label>
                                        <Form.Control
                                            defaultValue="-1"
                                            name="departamento"
                                            as="select"
                                            onChange={handleInput}
                                        >
                                            <option key="-1" value="-1">Selecciona un departamento</option>
                                            {
                                                Object.keys(departamentos).map((k)=>{
                                                    return (<option key={k} value={k}>{departamentos[k]}</option>)
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Selecciona el municipio</Form.Label>
                                        <Form.Control
                                
                                            defaultValue="-1"
                                            disabled={(data["departamento"] ?? "-1") === "-1"}
                                            name="municipio"
                                            as="select"
                                            onChange={handleInput}
                                        >
                                            <option key="-1" value="-1">Selecciona un municipio</option>
                                            {
                                                Object.entries(munis).map(([k,v])=>{
                                                    return <option key={k} value={k}>{v}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Ingresa el nombre de la sucursal</Form.Label>
                                        <Form.Control
                                            name="sucursal"
                                            onChange={handleInput}
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
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                sucursales.map(data=>{
                                    const {id_sucursal, nombre_sucursal, nombre_comercio} = data;
                                    
                                    return (
                                        <tr key={id_sucursal}>
                                            <td>{id_sucursal}</td>
                                            <td>{nombre_sucursal}</td>
                                            <td>{nombre_comercio}</td>
                                            <td className='text-center'>
                                                <Button variant="danger" onClick={()=>borrar(id_sucursal)}>Borrar</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Row>   
            </Container>
            <Footer/>
        </div>
    );
}

export default Sucursales;