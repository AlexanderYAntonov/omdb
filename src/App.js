import React from 'react';
import { List } from './components/List';
import { Search } from './components/Search';
import { Details } from './components/Details';
import Pagination from '@material-ui/lab/Pagination';
import { Switch, Route, Redirect } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import './App.css';

const apiKey = '1977b733';
const prefixUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;

function IconsCopyright() {
  return (
    <div className="icons-copyright">
      Icons made by{' '}
      <a
        href="https://www.flaticon.com/authors/pixel-perfect"
        title="Pixel perfect"
      >
        Pixel perfect
      </a>{' '}
      from{' '}
      <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </a>
    </div>
  );
}

class App extends React.Component {
  state = {
    list: [],
    isLoading: false,
    pageNum: 0,
    success: true,
    totalPages: 0,
    formData: {}
  };

  searchCallback = (formData) => {
    this.setState({ formData, pageNum: 1 });
    this.getData(formData);
  };

  handleChange = (event, value) => {
    const { formData } = this.state;
    this.setState({ pageNum: value });
    this.getData(formData, value);
  };

  getData(formData, pageNum = 0) {
    const { title, year } = formData;
    const titleStr = title ? `&s=${title}*` : '';
    const yearStr = year ? `&y=${year}` : '';
    const pageStr = pageNum > 0 ? `&page=${pageNum}` : '';
    const url = prefixUrl + titleStr + yearStr + pageStr;
    this.setState({ isLoading: true });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const totalPages = data['totalResults']
          ? Math.ceil(data['totalResults'] / 10)
          : 0;
        this.setState({
          isLoading: false,
          list: data['Search'] || [],
          success: data['Response'],
          totalPages
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false, list: [], success: false });
      });
  }

  paginatorWrapper() {
    let tmpl = null;
    const { totalPages, pageNum } = this.state;
    console.log(totalPages);
    if (totalPages > 1) {
      tmpl = (
        <Pagination
          count={totalPages}
          page={pageNum}
          color="primary"
          onChange={this.handleChange}
        />
      );
    }
    return tmpl;
  }

  render() {
    const { list } = this.state;
    return (
      <Container maxWidth="md">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <Search callback={this.searchCallback} />
                <List list={list} />
                {this.paginatorWrapper()}
                {IconsCopyright()}
              </React.Fragment>
            )}
          />
          <Route path="/details/:id" component={Details} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Container>
    );
  }
}

export default App;
