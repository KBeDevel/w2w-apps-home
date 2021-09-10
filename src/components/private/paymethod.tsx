import { Component } from 'react'
import { Table } from 'react-bootstrap'
import Grid from '../../helpers/grid.helper'

export default class PayMethod extends Component {
  render():JSX.Element{
    return(
      <Grid.Container>
        <Grid.Row>
          <Grid.Col>
            <Table>
              <thead>
                <th>Metodos de pago</th>
              </thead>
              <tbody>
                <td>insetar lista</td>
              </tbody>
            </Table>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    )
  }
}
