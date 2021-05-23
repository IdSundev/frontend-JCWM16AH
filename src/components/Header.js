import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function Header() {
  return (
    <Container>
      <Row>
        <Col className="text-center header-app">
          <h2>INVENTORY BARANG</h2>
        </Col>
      </Row>
    </Container>
  )
}
