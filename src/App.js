import React from 'react';
import { List } from './components/List';
import { Search } from './components/Search';
import Pagination from '@material-ui/lab/Pagination';

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
    // const listData = [];
    const { list, totalPages } = this.state;
    return (
      <Container maxWidth="md">
        <Search callback={this.searchCallback} />
        <List data={list} />
        <Pagination
          count={totalPages}
          color="primary"
          onChange={this.handleChange}
        />
      </Container>
    );
  }
}

export default App;
