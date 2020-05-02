import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
import './Details.scss';

const apiKey = '1977b733';
const prefixUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;

const LOCAL = {
  Title: 'Название',
  Year: 'Год',
  Rated: 'Рейтинг',
  Released: 'Дата выхода',
  Runtime: 'Продолжительность',
  Genre: 'Жанр',
  Director: 'Режиссер',
  Writer: 'Автор сценария',
  Actors: 'Актёры',
  Plot: 'Сюжет',
  Language: 'Язык',
  Country: 'Страна',
  Awards: 'Награды',
  imdbID: 'IMDB id',
  Type: 'Тип',
  DVD: 'Дата выхода на DVD',
  BoxOffice: 'Сборы',
  Production: 'Производство',
  Website: 'Сайт'
};
export class Details extends React.Component {
  state = {
    data: {},
    isLoading: false,
    success: true
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(`read details data for ${id}`);
    const idStr = id ? `&i=${id}` : '';
    const plotStr = '&plot=full';
    const url = prefixUrl + idStr + plotStr;
    console.log(url);

    this.setState({ isLoading: true });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          isLoading: false,
          data: data || [],
          success: data['Response']
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false, success: false });
      });
  }

  detailsTemplate = () => {
    const keys = Object.keys(LOCAL);
    const { data } = this.state;
    console.log(data);
    const { Poster, Title } = data;
    // <CardMedia className={'details__image'} image={Poster} title={Title} />
    const posterTmpl = Poster ? (
      <img src={Poster} alt={Title} className={'details__image'} />
    ) : null;
    const textTmpl = keys.map((key) => (
      <div key={key} className="details__item">
        <h3>{LOCAL[key]}</h3>
        <p>{data[key]}</p>
      </div>
    ));
    const tmpl = (
      <Card className={'details__card shadow-drop-2-center scale-up-center'}>
        {posterTmpl}
        <CardContent className={'details__content'}>{textTmpl}</CardContent>
      </Card>
    );
    return tmpl;
  };

  render() {
    return (
      <React.Fragment>
        {this.detailsTemplate()}

        <Link to="/" className={'icon-link'}>
          <KeyboardBackspaceIcon className={'icon'} />Вернуться к поиску
        </Link>
      </React.Fragment>
    );
  }
}
