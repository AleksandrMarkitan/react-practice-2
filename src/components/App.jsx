import { Component } from 'react';
import { MoviesGallery } from './MoviesGallery/MoviesGallery';
import { maper } from '../utils/maper';
import { Modal } from './Modal/Modal';
import { fetchApi } from '../api/api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    movies: [],
    currentImage: null,
    page: 1,
    isLoading: false,
    error: null,
    isShown: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { isShown, page } = this.state;
    if ((prevState.isShown !== isShown && isShown) || prevState.page !== page) {
      this.fetchMovies();
    }
  }

  deleteMovie = movieId => {
    const updateMovies = this.state.movies.filter(({ id }) => id !== movieId);
    this.setState({ movies: updateMovies });
  };

  updateCurrentImage = data => {
    this.setState({ currentImage: data });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  showFilms = () => {
    if (this.state.isShown) {
      this.setState({ movies: [] });
    }
    this.setState(prevState => ({
      isShown: !prevState.isShown,
    }));
  };

  fetchMovies = () => {
    this.setState({ isLoading: true });
    fetchApi(this.state.page)
      .then(respons => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...maper(respons.data.results)],
        }));
      })
      .catch(err => {
        this.setState({ error: err.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { movies, currentImage, isShown, isLoading, error } = this.state;
    return (
      <>
        <Button
          text={!isShown ? 'Show movies' : 'Hide movies'}
          clickHandler={this.showFilms}
        />
        {isShown && (
          <>
            <MoviesGallery
              movies={movies}
              deleteMovie={this.deleteMovie}
              openModal={this.updateCurrentImage}
            />
            {!isLoading && !error && (
              <Button text="Load more" clickHandler={this.loadMore} />
            )}
            {isLoading && <Loader />}
            {error && <Notification msg={error} />}
          </>
        )}
        {currentImage && (
          <Modal image={currentImage} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
