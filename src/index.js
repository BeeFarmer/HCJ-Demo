import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router , Route} from 'react-router-dom';

import './index.css';
import App from './App';
import ReactAssi from './reactAssi'



ReactDOM.render(

  
  <Router>
    <div>
      <Route exact path="/" component={App} />

      <Route  path="/reactAssi.js" component={ReactAssi} />
    </div>
  </Router>,

 
  document.getElementById('root')
);

