import { Component } from 'react'
import { CommonFunctions } from '../../helpers/common-functions.helper'
import Grid from '../../helpers/grid.helper'
import RouterOutline, { RouterComponent } from '../../helpers/router.helper'
import ProfileProvider from '../../providers/profile.provider'
import { EmptyProps, FormState, Profile as ProfileType } from '../../types'

type ProfileState = {
  profile: ProfileType
} & FormState

export default class Profile extends Component<EmptyProps, ProfileState> implements RouterComponent {

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

  public preload(): void {
    CommonFunctions.updatePathTitle('Profile')
  }

  public render(): JSX.Element {
    this.preload()
    return RouterOutline.set(
      <Grid.Container>
        <Grid.Row>
          <Grid.Col>
            <h1 className="font-weight-bold">
              Profile
            </h1>
            <hr />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>,
      'non-empty'
    )
  }
}
