import { Component } from 'react'
import '../../styles/footer.sass'

export default class MainFooter extends Component {
  public render(): JSX.Element {
    return (
      <footer className="bg-dark text-white text-justify text-lg-start">
        <div className="container p-4">
          <div className="row p-5">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase text-white">Proyecto Luminant</h5>
              <p className='text-white'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
                molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam
                voluptatem veniam, est atque cumque eum delectus sint!
              </p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase" style={{ color: '#FCB800' }}>Links</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">Políticas</a>
                </li>
                <li>
                  <a href="#!" className="text-white">Términos y condiciones</a>
                </li>
                <li>
                  <a href="#!" className="text-white">FAQs</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase" style={{ color: '#FCB800' }}>Links</h5>

              <ul className="list-unstyled  mb-0">
                <li>
                  <a href="#!" className="text-white">Nosotros</a>
                </li>
                <li>
                  <a href="#!" className="text-white">Mi cuenta</a>
                </li>
                <li>
                  <a href="#!" className="text-white">Tienda</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2020 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/"> luminant.com</a>
        </div>
      </footer>
    )
  }
}
