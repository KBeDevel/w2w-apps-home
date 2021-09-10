import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

import Grid from '../../helpers/grid.helper'
import RouterOutline from '../../helpers/router.helper'

export default class QuotationGrid extends Component  {

  render():JSX.Element{
    return RouterOutline.set(
      <Grid.Container>
        <Grid.Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nro orden</th>
                <th>Courier</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Grid.Row>
      </Grid.Container>
    )
  }
}
