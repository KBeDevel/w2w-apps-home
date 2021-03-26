import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

/**
 * Use it to create an organized view using the bootstrap grid
 */
export default class Grid {
  /**
   * Alias for React Boostrap `Container`
   */
  public static Container = Container

  /**
   * Alias for React Boostrap `Row`
   */
  public static Row = Row

  /**
   * Alias for React Boostrap `Col`
   */
  public static Col = Col

  /**
   * Create a simple wrapper with a single boostrap column for a single element
   * @param element Inner element to be displayed as a child node
   * @param options Visualization options. Container type, Grid classes and responsive mode
   */
  public static createSimpleWrapper = (element: JSX.Element, options?: {
    fluid?: boolean | 'sm' | 'md' | 'lg' | 'xl' | undefined,
    customClass: {
      container?: string,
      row?: string,
      col?: string
    }
  }): JSX.Element => {
    return (
      <Grid.Container fluid={ options?.fluid } className={ options?.customClass?.container }>
        <Grid.Row className={ options?.customClass?.row }>
          <Grid.Col className={ options?.customClass?.col }>
            { element }
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    )
  }
}
