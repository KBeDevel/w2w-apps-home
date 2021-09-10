import { Component } from 'react'
import Grid from '../../helpers/grid.helper'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import RouterOutline from '../../helpers/router.helper'
import ProfileProvider from '../../providers/profile.provider'
import { EmptyProps, Profile } from '../../types'
import '../../styles/dashboard.sass'
import { LinkContainer } from 'react-router-bootstrap'

import Marketplace from '../../assets/img/brands/marketplace.webp'
import Logistica from '../../assets/img/brands/logistica.webp'

type Operation = unknown & {
  open: boolean
}

type Invoice = unknown & {
  open: boolean
}

type DashboardState = {
  operations: Operation[],
  invoices: Invoice[],
  profile: Profile,
  profileProgress: number
}

export default class Dashboard extends Component<EmptyProps, DashboardState> {

  constructor(
    public readonly props: never
  ) {
    super(props)
    this.state = this.initState()
  }

  private initState(): DashboardState {
    return {
      operations: [],
      invoices: [],
      profile: ProfileProvider.EMPTY_PROFILE,
      profileProgress: 0
    }
  }

  public render(): JSX.Element {
    const service = [
      {
        tittle: 'Marketplace',
        path: '/',
        tittle2: 'GrillaMarket',
        pa2th: '/',
        descripcion: 'es un sitio donde los productos son ofrecidos por los comerciantes para ser adquiridos por consumidores, es decir, un mercado en el mundo online. En él, varios comerciantes colocan sus productos a la venta en un sólo canal.',
        image: Marketplace
      },
      {
        tittle: 'Logistica',
        path: '/quotation',
        tittle2: 'Grilla',
        pa2th: '/quotation/grid',
        descripcion: 'Contrata servicios de envíos, utiliza muestra logística de logística de punta a punta',
        image: Logistica
      },
    ]
  
    return RouterOutline.set(
      <Grid.Container className='justify-content-center bb-5'>
        <h1 className='Tittle pt-4' style={{ textAlign: 'center'}}>Nuestros Modulos</h1>
        <h4 className='subTittle' style={{ textAlign: 'center'}}> Explora a través de tus servicios habilitados. </h4>
        <hr className='solid mt-4'></hr>
        {service.map((item, index) => (
          <Grid.Row className='pb-5' key={index}>
            <Grid.Col xs='12' md='6' lg='4'>
              <Image style={{ width:'22rem', height:'11rem' }} src={item.image} />
            </Grid.Col>
            <Grid.Col xs='12' md='6' lg='8'>
              <h2>{item.tittle}</h2>
              <p>{item.descripcion}</p>
              <LinkContainer to={item.path}>
                <Button variant='warning' style={{ marginLeft:'6rem' }}>Ir a {item.tittle}</Button>
              </LinkContainer>
              <LinkContainer to={item.pa2th} >
                <Button variant='warning' className='ml-2' style={{ marginLeft:'6rem' }}>Ir a {item.tittle2}</Button>
              </LinkContainer>
            </Grid.Col>
            <hr className='solid mt-4'></hr>
          </Grid.Row>
        ))
        }
      </Grid.Container>,
      'non-empty'
    )
  }
}
