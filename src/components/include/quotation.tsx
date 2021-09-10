import { Component } from 'react'
import Grid from '../../helpers/grid.helper'
import RouterOutline from '../../helpers/router.helper'
// imports img
import Server from '../../assets/svg/brands/Server.svg'
import Printer from '../../assets/svg/brands/Printer.svg'
import Ubication from '../../assets/svg/brands/Ubication.svg'
import Truck from '../../assets/svg/brands/Truck.svg'
import Card from 'react-bootstrap/esm/Card'
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/esm/Button'

export class Quotation extends Component {

  render(): JSX.Element{
    const card = [
      {
        image: Server,
        tittle: 'CONECTA TU TIENDA',
        description: 'Sincronice todos sus canales de venta para gestionar fácilmente los pedidos en un solo lugar',
      },
      {
        image: Printer,
        tittle: 'GENERA ETIQUETAS ',
        description: 'Obtenga las tarifas más bajas de Proveedores particulares, Chile express, Correos de chile y otros.',
      },
      {
        image: Ubication,
        tittle: 'RASTREE LOS ENVÍOS',
        description: 'Seguimiento y notificaciones para mantenerle a usted y a sus clientes al día.',
        path: '/shipment-searcher'
      },
      {
        image: Truck,
        tittle: 'DEVOLUCIONES',
        description: 'Genere etiquetas de devolución automáticamente, de forma gratuita.',
      },
    ]
    return RouterOutline.set(
      <Grid.Container className='mt-5 mb-5'>
        <Grid.Row className='justify-content-center pt-5'>
          <Grid.Col xs='12' md='12' lg='12'>
            <h2 >¿Que encontraras en logística?</h2>
          </Grid.Col>
          {card.map((item, index) => (
            <Grid.Col key={index} xs='12' md='6' lg='3'>
              <Card>
                <Card.Img className='p-5' src={item.image}/>
                <Card.Body>
                  <Card.Title style={{ fontWeight: 'bold', color: '#FFC107' }}>{item.tittle}</Card.Title>
                  <Card.Text style={{ height: '6rem', marginTop: '1rem' }}>
                    {item.description}
                  </Card.Text>
                  <a href={item.path}>Leer Más</a>
                </Card.Body>
              </Card>
            </Grid.Col>
          ))}
          <Grid.Col xs='12' md='6' lg='3' className='pt-5'>
            <LinkContainer to="/calculator" >
              <Button variant='warning'>Generar Despacho</Button>
            </LinkContainer>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    )
  }
}
