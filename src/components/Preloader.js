import React from 'react';
import './Preloader.scss';

export class Preloader extends React.Component {
  render() {
    return (
      <div className={'lds-container'}>
        <div className={'lds-ellipsis'}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}
