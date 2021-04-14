import { Component } from 'react'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import Grid from '../../helpers/grid.helper'
import RouterOutline from '../../helpers/router.helper'
import ProfileProvider from '../../providers/profile.provider'
import Table from 'react-bootstrap/Table'
import { EmptyProps, FormState, Profile as ProfileType } from '../../types'

type ProfileState = {
  profile: ProfileType
} & FormState

export default class Profile extends Component<EmptyProps, ProfileState> {

  constructor(
    props: never
  ) {
    super(props)
    this.state = this.initState()
  }

  private initState(): ProfileState {
    return {
      isFormValid: false,
      isSubmitting: false,
      profile: ProfileProvider.EMPTY_PROFILE
    } as ProfileState
  }

  public componentDidMount(): void {
    CommonFunctions.updatePathTitle('Profile')
    ProfileProvider.getUserProfile().then(profile => this.setState({
      ...this.state,
      profile: profile.value
    }))
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

  public getRepresentativeData(): JSX.Element {
    return <>
      <tr>
        <th scope="row">Complete Name</th>
        <td>{ this.state.profile.representative.firstName + ' ' + this.state.profile.representative.lastName }</td>
      </tr>
      <tr>
        <th scope="row">Role</th>
        <td>{ this.state.profile.representative.corporativePosition || 'N/A' }</td>
      </tr>
      <tr>
        <th scope="row">Identification Number</th>
        <td>{ '[' + this.state.profile.representative.identification.type + '] ' + this.state.profile.representative.identification.number }</td>
      </tr>
      <tr>
        <th scope="row">Email</th>
        <td>{ this.state.profile.representative.contactData.email }</td>
      </tr>
      <tr>
        <th scope="row">Phone</th>
        <td>{ this.state.profile.representative.contactData.phone?.code ? '(' + this.state.profile.representative.contactData.phone?.code + ') ' + this.state.profile.representative.contactData.phone?.number : 'N/A' }</td>
      </tr>
    </>
  }

  public getOrganizationData(): JSX.Element {
    return <>
      <tr>
        <th scope="row">Name</th>
        <td>{ this.state.profile.organization.name || 'N/A' }</td>
      </tr>
      <tr>
        <th scope="row">Social Reason</th>
        <td>{ this.state.profile.organization.socialReason || 'N/A' }</td>
      </tr>
      <tr>
        <th scope="row">Tax ID</th>
        <td>{ '[' + this.state.profile.organization.identification.type + '] ' + this.state.profile.organization.identification.number }</td>
      </tr>
      <tr>
        <th scope="row">Employees</th>
        <td>{ this.state.profile.organization.employeesQuantity || 'N/A' }</td>
      </tr>
      <tr>
        <th scope="row">Business Years</th>
        <td>{ this.state.profile.organization.businessYears || 'N/A' }</td>
      </tr>
      <tr>
        <th scope="row">Estimated Anual Sales Value</th>
        <td>USD { this.state.profile.organization.anualSales || '0.00' }</td>
      </tr>
    </>
  }

  public getBillingAddress(): JSX.Element {
    return <>
      <tr>
        <th scope="row">Street Name / Route</th>
        <td>{ this.state.profile.organization.billingAddress.street.name }</td>
      </tr>
      <tr>
        <th scope="row">Street Number / Building</th>
        <td>{ this.state.profile.organization.billingAddress.street.number }</td>
      </tr>
      <tr>
        <th scope="row">Door / Office / Apartment</th>
        <td>{ this.state.profile.organization.billingAddress.door || ' ' }</td>
      </tr>
      <tr>
        <th scope="row">Neighborhood</th>
        <td>{ this.state.profile.organization.billingAddress.neighborhood || ' ' }</td>
      </tr>
      <tr>
        <th scope="row">City</th>
        <td>{ this.state.profile.organization.billingAddress.city }</td>
      </tr>
      <tr>
        <th scope="row">State / Region / Province</th>
        <td>{ this.state.profile.organization.billingAddress.state }</td>
      </tr>
      <tr>
        <th scope="row">Postal Code</th>
        <td>{ this.state.profile.organization.billingAddress.postalCode || ' ' }</td>
      </tr>
      <tr>
        <th scope="row">Complement</th>
        <td>{ this.state.profile.organization.billingAddress.complement || ' ' }</td>
      </tr>
      <tr>
        <th scope="row">Country</th>
        <td>{ this.state.profile.organization.billingAddress.country.name }</td>
      </tr>
    </>
  }

  public render(): JSX.Element {
    return RouterOutline.set(
      <Grid.Container>
        <Grid.Row>
          <Grid.Col xs="12" lg>
            <h1 className="font-weight-bold">
              Profile
            </h1>
            <hr />
          </Grid.Col>
        </Grid.Row>
        <div className="py-2" />
        <Grid.Row>
          {
            this.state.profile?.organization
              ? <Grid.Col xs="12" lg>
                <h3>Organization</h3><br/>
                <Table striped borderless hover size="sm">
                  <tbody>
                    { this.getOrganizationData() }
                  </tbody>
                </Table>
              </Grid.Col>
              : null
          }
        </Grid.Row>
        <div className="py-2" />
        <Grid.Row>
          {
            this.state.profile?.organization
              ? <Grid.Col xs="12" lg>
                <h3>Representative</h3><br/>
                <Table striped borderless hover size="sm">
                  <tbody>
                    { this.getRepresentativeData() }
                  </tbody>
                </Table>
              </Grid.Col>
              : null
          }
        </Grid.Row>
        <div className="py-2" />
        <Grid.Row>
          {
            this.state.profile?.organization
              ? <Grid.Col xs="12" lg>
                <h3>Billing Address</h3><br/>
                <Table striped borderless hover size="sm">
                  <tbody>
                    { this.getBillingAddress() }
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
