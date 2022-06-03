import React from 'react'
import QuejaModal from './modals/QuejaModal'
import Navigation from './components/Navigation';
import HttpMan from '../util/HttpMan';
import GT_FORMAT from '../util/Util';

import { getDepartamentos,getMunicipios } from '../util/CacheMan';

import { Button,Form, Container, Row, Col, Table} from 'react-bootstrap';
import { useLocation,} from 'react-router-dom';

function Quejas(){ 
 
      const departamentos = getDepartamentos();
      //control de form.
      const [data, setData] = React.useState({});
      const [form, setForm] = React.useState({});
      const [show, setShow] = React.useState(false);
  
      //comercios
      const [quejas, setQuejas] = React.useState([]);
      const [comercios, setComercios] = React.useState([]);
      const [cats, setCats] = React.useState([]);

      //munis
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
          HttpMan.get(`/get_quejas`).then(resp =>{
              setQuejas(resp.data);
          });

          HttpMan.get(`/get_shops`).then(resp =>{
            setComercios(resp.data);
         });

         HttpMan.get(`/get_categories`).then(resp =>{
            setCats(resp.data);
            });

      }, []);
      
  
      const abrirForm = (data) =>{
          setShow(true);
          setForm(data);
      }
  
      const submit = () =>{
  
      }
  
      React.useEffect(()=>{
          cargar();
      }, [cargar]);
  



    const loc = useLocation();
    return(
        <div>
            <Navigation location={loc}/>
            <Container>
                <Row className='mt-5'>
                    <h1 className="shadow-sm mb-5 p-3 text-center rounded">Quejas</h1>
                    <Col className="p-3 mb-5 m-auto shadow-sm rounded-lg">
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
                            {/* categoria de queja */}
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Seleccione una categoria</Form.Label>
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

                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Seleccione la fecha inicial</Form.Label>
                                        <Form.Control 
                                            name="fecha1"
                                            type="date" 
                                            onChange={handleInput}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Seleccione la fecha final</Form.Label>
                                        <Form.Control 
                                            name="fecha2"
                                            type="date" 
                                            onChange={handleInput}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Seleccione el departamento</Form.Label>
                                        <Form.Control 
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
                                        <Form.Label>Seleccione el municipio</Form.Label>
                                        <Form.Control 
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

                            <Row className='mt-4'>
                                <Col >
                                    <Button type="submit" variant="primary">Filtrar información</Button>
                                </Col>
                            </Row>
                        </Form>                               
                    </Col>

                    {/* apartado para visualizar comercios */}
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>ID Queja</th>
                                <th>Comercio</th>
                                <th>Fecha</th>
                                <th>Detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                quejas.map(data =>{
                                    const {id_queja, nombre_comercio, fecha_queja} = data;
                                    return (
                                        <tr key={id_queja}>
                                            <td>{id_queja}</td>
                                            <td>{nombre_comercio}</td>
                                            <td>{GT_FORMAT.format(Date.parse(fecha_queja))}</td>
                                            <td className='text-center'>
                                                <Button variant="info" onClick={()=>abrirForm(data)}>Detalles</Button>
                                            </td>
                                        </tr>     
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </Row> 
                <QuejaModal shown={show} queja={form} close={()=>setShow(false)}/>
            </Container>
        </div>
    );
}

export default Quejas;