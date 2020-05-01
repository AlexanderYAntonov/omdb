import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

export class Details extends React.Component {
  componentDidMount() {
    console.log('read details data');
  }

  render() {
    return (
      <React.Fragment>
        <p>Details info</p>
        <Link to="/" className={'icon-link'}>
          <KeyboardBackspaceIcon className={'icon'} />Вернуться к поиску
        </Link>
      </React.Fragment>
    );
  }
}
