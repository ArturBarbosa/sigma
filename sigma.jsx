import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch
} from 'react-router-dom';
import './styles/main.css';

// import necessary components
import SubmitSequence from './components/submit-sequence/SubmitSequence.jsx';

class Sigma extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
      <div>
            <Switch>
            <Route exact path="/" component={SubmitSequence}/>
            </Switch>
      </div>
    </HashRouter>
    );
  }
}


ReactDOM.render(
  <Sigma />,
  document.getElementById('root'),
);
