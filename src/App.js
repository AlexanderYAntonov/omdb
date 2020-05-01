import React from 'react';
import { List } from './components/List';
import { Search } from './components/Search';
// import Pagination from '@material-ui/lab/Pagination';

import Container from '@material-ui/core/Container';
import './App.css';

class App extends React.Component {
  searchCallback = (formData) => {
    // set page num

    console.log('make search');
    console.log(formData);
  };

  handleChange = (event, value) => {
    console.log(`page = ${value}`);
  };

  render() {
    const listData = [];
    return (
      <Container maxWidth="md">
        <Search callback={this.searchCallback} />
        <List data={listData} />
        {/* <Pagination count={10} color="primary" onChange={this.handleChange} /> */}
      </Container>
    );
  }
}

export default App;
