import React from 'react';
import MainNavbar from '../../components/navbar';
import Footer from '../../components/footer';

class RouterOutline {
  public static set(children: JSX.Element, className?: string | undefined): JSX.Element {
    return (
      <div>
        <MainNavbar></MainNavbar>
        <div className={className}>{children}</div>
        <Footer></Footer>
      </div>
    );
  }
}

export default RouterOutline;
