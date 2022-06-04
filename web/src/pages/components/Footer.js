import React from 'react'

import '../../css/Footer.css'
import {Container, Row, Col} from 'react-bootstrap';

function Footer(){
    return (
        <div className="footer">
            <div className="sub-footer">
                <Container>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col>{new Date().getFullYear()} | Alan González López (GGMCB) </Col>
                    </Row>
                </Container>
            </div>
        </div>
    
    )
}



export default Footer