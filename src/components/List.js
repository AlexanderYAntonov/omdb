import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './List.scss';

export class List extends React.Component {
  buildTemplate(data) {
    let tmpl = null;
    if (data) {
      tmpl = data.map((item) => {
        const linkUrl = `/details/${item['imdbID']}`;
        tmpl = (
          <Link key={item['imdbID']} to={linkUrl}>
            <div className="list__media">
              <div className="list__poster">
                <img
                  className="list__image"
                  src={item['Poster']}
                  alt="Постер"
                />
              </div>
              <div className="list__description">
                <p>
                  <span className={'list__description-title'}>
                    {item['Title']}
                  </span>, <span>{item['Year']}</span>
                </p>
              </div>
            </div>
          </Link>
        );
        return tmpl;
      });
    }
    return tmpl;
  }

  render() {
    const { list } = this.props;
    return <React.Fragment>{this.buildTemplate(list)}</React.Fragment>;
  }
}

List.propTypes = {
  list: PropTypes.array.isRequired
};
