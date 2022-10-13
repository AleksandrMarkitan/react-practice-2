import { Component } from 'react';
import style from '../Modal/Modal.module.css';
export class Modal extends Component {
  closeByEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeByBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
    window.addEventListener('click', this.closeByBackdrop);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
    window.removeEventListener('click', this.closeByBackdrop);
  }

  render() {
    const {
      image: { src, alt },
      closeModal,
    } = this.props;
    return (
      <div className={style.backdrop} onClick={this.closeByBackdrop}>
        <div className={style.modal}>
          <img
            src={`https://image.tmdb.org/t/p/w500${src}
`}
            alt={alt}
          />
          <button className={style.closeButton} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    );
  }
}
