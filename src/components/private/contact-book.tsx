import { Component } from 'react'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import Grid from '../../helpers/grid.helper'
import RouterOutline from '../../helpers/router.helper'
import ContactBookProvider from '../../providers/contact-book.provider'
import { Button, Table } from 'react-bootstrap'
import { ContactNotebook as NotebookType, EmptyProps } from '../../types'

type BookState = {
  contactBook: NotebookType[]
}

export default class ContactsBooker extends Component<EmptyProps, BookState>{
  constructor(
    props: never
  ) {
    super(props)
    this.state = this.initState()
  }

  private initState(): BookState {
    return {
      contactBook: ContactBookProvider.EMPTY_CONTACTBOOK
    } as BookState
  }

  public async componentDidMount() {
    CommonFunctions.updatePathTitle('ContactBook')
    this.setState( {contactBook: (await ContactBookProvider.getUserContactBook()).value} )
    console.log(this.state)
  }

  public componentDidCatch(reason: unknown): void {
    console.error(reason)
  }

  public getRowsFromObject(obj: unknown, parentKey?: string): JSX.Element[] {
    const object = obj as { [k: string]: unknown }
    const rows: JSX.Element[] = []
    for (const key in object) {
      const value = object[key]
      if (value) {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          rows.push(
            <tr key={ parentKey ? parentKey + '_' + key : key }>
              <th scope="row">{ CommonFunctions.capitalize(key, 'full', true) }</th>
              <td>{
                typeof value === 'string'
                  ? CommonFunctions.capitalize(value, 'full')
                  : typeof value === 'boolean'
                    ? (value ? 'Yes': 'No')
                    : value
              }</td>
            </tr>
          )
        } else {
          this.getRowsFromObject(object[key], parentKey ? parentKey + ' ' + key : key).map(row => rows.push(row))

        }
      }
    }
    return rows
  }

  public getNotebookData(): JSX.Element {
    return <>
      { this.state.contactBook.map((item, index)=>(
        <tr key={index}>
          <td>{item.contact?.name}</td>
          <td>{item.street.name + ' ' + item.street.number}</td>
          <td>
            <Grid.Row>
              <Grid.Col>
                <Button variant='warning'>Seleccionar</Button>
                {/* <Button variant='warning' className='mr-2'>Editar</Button> */}
              </Grid.Col>
              <Grid.Col>
              </Grid.Col>
            </Grid.Row>
          </td>
        </tr>
      )) }
    </>
  }
  
  render():JSX.Element{
    return RouterOutline.set(
      <Grid.Container className='pt-5 pb-5  '>
        <Grid.Row>
          <Grid.Col xs='12' md='12' lg='6'>
            <h3>Datos de Despacho</h3>
          </Grid.Col>
          <Grid.Col xs='12' md='12' lg='6'>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          {
            this.state.contactBook
              ? <Grid.Col xs="12" lg>
                <h3>Organization</h3><br/>
                <Table striped borderless hover size="sm">
                  <thead>
                    <td>Nombre</td>
                    <td>Dirección</td>
                    <td>Acciones</td>
                  </thead>
                  <tbody>
                    { this.getNotebookData() }
                  </tbody>
                </Table>
              </Grid.Col>
              : null
          }
        </Grid.Row>
      </Grid.Container>,
      'non-empty'
    )
  }
}
