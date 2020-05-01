import React from 'react';
import PropTypes from 'prop-types';
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
        tmpl = (
          <div key={item['imdbID']} className="list__media">
            <img className="list__image" src={item['Poster']} />
            <div className="list__description">
              <p>{item['Title']}</p>
              <p>{item['Year']}</p>
            </div>
          </div>
        );
        // if (item.short) {
        //   tmpl = (
        //     <div key={item.id}>
        //       <p>{item['Title']}</p>
        //       <p>{item['Year']}</p>
        //     </div>
        //   );
        // } else {
        //   tmpl = (
        //     <div key={item.id}>
        //       <p>{item.title}</p>
        //       <p>{item.year}</p>
        //       <p>{item.genre}</p>
        //     </div>
        //   );
        // }
        return tmpl;
      });
    }
    return tmpl;
  }

  render() {
    // const data = [
    //   { id: '1', title: 'title1', year: 2018, short: true },
    //   { id: '2', title: 'title2', year: 2019, short: false, genre: 'action' }
    // ];
    const { list } = this.props;
    return <React.Fragment>{this.buildTemplate(list)}</React.Fragment>;
  }
}

List.propTypes = {
  list: PropTypes.array.isRequired
};
