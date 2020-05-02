import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import './List.scss';

export class List extends React.Component {
  requestDataByTitle(title, year, pageNum) {
    console.log(`request data for ${title} ${year} ${pageNum}`);
  }

  buildTemplate(data) {
    let tmpl = null;
    console.log(data);
    if (data) {
      tmpl = data.map((item) => {
        const linkUrl = `/details/${item['imdbID']}`;
        tmpl = (
          <Link to={linkUrl}>
            <div key={item['imdbID']} className="list__media">
              <div className="list__poster">
                <img
                  className="list__image"
                  src={item['Poster']}
                  alt="Постер"
                />
                {/* <CardMedia
                  className={'list__image'}
                  image={item['Poster']}
                  title={item['Title']}
                /> */}
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
