import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import './CloseButton.scss';

export class CloseButton extends React.Component {
  render() {
    return (
      <Link to="/">
        <CloseIcon className={'close-icon'} />
      </Link>
    );
  }
}
