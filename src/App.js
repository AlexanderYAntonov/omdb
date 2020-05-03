import React from 'react';
import { List } from './components/List';
import { Search } from './components/Search';
import { Details } from './components/Details';
import { ScrollButton } from './components/ScrollButton';
import { Preloader } from './components/Preloader';
import Pagination from '@material-ui/lab/Pagination';
import { Switch, Route, Redirect } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import './App.scss';

const apiKey = '1977b733';
const prefixUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;

const LOCAL = {
  'Movie not found!': 'Фильм не найден',
  'Too many results.': 'Слишком много результатов'
};

const ERROR_TEXT = 'Ошибка выполнения запроса';

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
    errorMsg: '',
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
        const totalPages = this.calcPages(data);
        this.checkPoster(data['Search']);
        const errorMsg = this.checkError(data);

        this.setState({
          isLoading: false,
          list: data['Search'] || [],
          success: data['Response'] === 'True',
          errorMsg,
          totalPages
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          isLoading: false,
          list: [],
          success: false,
          errorMsg: ERROR_TEXT
        });
      });
  }

  calcPages(data) {
    return data['totalResults'] ? Math.ceil(data['totalResults'] / 10) : 0;
  }

  checkPoster(list = []) {
    list = list.map((item) => {
      if (!/^http/.test(item['Poster'])) {
        item['Poster'] = '/assets/icons/logo.svg';
      }
      return item;
    });
  }

  checkError(data) {
    let msg = '';
    if (data['Error']) {
      msg = LOCAL[data['Error']] || ERROR_TEXT;
    }
    return msg;
  }

  paginatorWrapper() {
    let tmpl = null;
    const { totalPages, pageNum } = this.state;
    if (totalPages > 1) {
      tmpl = (
        <Pagination
          count={totalPages}
          page={pageNum}
          color="primary"
          onChange={this.handleChange}
          className={'app__paginator'}
        />
      );
    }
    return tmpl;
  }

  listWrapper() {
    let tmpl = null;
    const { list, success, errorMsg } = this.state;
    if (success) {
      tmpl = <List list={list} />;
    } else {
      tmpl = <p className="error">{errorMsg}</p>;
    }
    return tmpl;
  }

  routerTemplate = (isLoading) => {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <div className={'app__main'}>
                <Search callback={this.searchCallback} />
                {isLoading ? <Preloader /> : this.listWrapper()}
                {!isLoading ? this.paginatorWrapper() : null}
              </div>
              {IconsCopyright()}
              <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
            </React.Fragment>
          )}
        />
        <Route path="/details/:id" component={Details} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Container maxWidth="md" className="app__container">
        {this.routerTemplate(isLoading)}
      </Container>
    );
  }
}

export default App;
