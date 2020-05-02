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

class App extends React.Component {
  state = {
    list: [],
    isLoading: false,
    pageNum: 0,
    success: true,
    totalPages: 0
  };

  searchCallback = (formData) => {
    console.log('make search');
    console.log(formData);
    const { title, year } = formData;
    const titleStr = title ? `&s=${title}` : '';
    const yearStr = year ? `&y=${year}` : '';
    const url = prefixUrl + titleStr + yearStr;
    console.log(url);
    // set page num
    this.setState({ isLoading: true });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
        this.setState({ isLoading: false, list: [] });
      });
  };

  handleChange = (event, value) => {
    console.log(`page = ${value}`);
  };

  render() {
    const { list, totalPages } = this.state;
    console.log(list);
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
                <Pagination
                  count={totalPages}
                  color="primary"
                  onChange={this.handleChange}
                />
                <div>
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
              </React.Fragment>
            )}
          />} />
          <Route path="/details/:id" component={Details} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Container>
    );
  }
}

export default App;
