import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import Services from './components/services';
import NotFound from './components/notfound';
import ContactUs from './components/contact-us';
import About from './components/about';

const Routes: () => JSX.Element = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/home" exact component={Home}/>
      <Route path="/services" exact component={Services}/>
      <Route path="/about" exact component={About}/>
      <Route path="/contact" exact component={ContactUs}/>
      <Route path="**" component={NotFound}/>
    </Switch>
  );
}

export default Routes;
