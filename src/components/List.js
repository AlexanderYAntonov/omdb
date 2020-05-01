import React from 'react';

export class List extends React.Component {
  requestDataByTitle(title, year, pageNum) {
    console.log(`request data for ${title} ${year} ${pageNum}`);
  }

  buildTemplate(data) {
    return data.map((item) => {
      let tmpl = null;
      if (item.short) {
        tmpl = (
          <div key={item.id}>
            <p>{item.title}</p>
            <p>{item.year}</p>
          </div>
        );
      } else {
        tmpl = (
          <div key={item.id}>
            <p>{item.title}</p>
            <p>{item.year}</p>
            <p>{item.genre}</p>
          </div>
        );
      }
      return tmpl;
    });
  }

  render() {
    const data = [
      { id: '1', title: 'title1', year: 2018, short: true },
      { id: '2', title: 'title2', year: 2019, short: false, genre: 'action' }
    ];
    return <React.Fragment>{this.buildTemplate(data)}</React.Fragment>;
  }
}
