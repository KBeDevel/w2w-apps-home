import React, { Component} from 'react'
import { Card, Form, Button, Table } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Grid from '../../helpers/grid.helper'
import RouterOutline from '../../helpers/router.helper'

export default class ShipmentSearcher extends Component {
  render():JSX.Element {
    return RouterOutline.set(
      <Grid.Container className="align-self-center pt-5 pb-5">
        <Grid.Row className='justify-content-center'>
          <Grid.Col xs='12' md='6' lg='6'>
            <Card className='p-4'>
              <Card.Title className='Tittle'><h3>Rastrea tus encomiendas</h3></Card.Title>
              <Card.Body>
                <Grid.Row>
                  <Grid.Col lg='10'>
                    <Form.Label>Ingrese su numero de rastreo</Form.Label>
                    <Form.Control type="text" placeholder="Inserta orden de rastreo" />
                  </Grid.Col>
                  <Grid.Col lg='2' style={{ marginTop: '1.9rem' }}>
                    <Button variant='warning' ><FontAwesomeIcon icon={faSearch} /></Button>
                  </Grid.Col>
                </Grid.Row>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Table>
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Grid.Row>
      </Grid.Container>
    )
  }
}
