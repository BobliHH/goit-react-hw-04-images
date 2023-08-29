import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import axios from 'axios';
import Loader from './Loader/Loader';
import './App.css';
import Modal from './Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = () => {
    const { query, page } = this.state;
    const API_KEY = '36858023-bcc8002212b119e45a3b53208';

    this.setState({ isLoading: true });

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        const { hits, totalHits } = response.data;

        if (hits.length === 0) {
          return alert(
            'Sorry, there are no images matching your request...',
            {}
          );
        }

        const modifiedHits = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        this.setState(prevState => ({
          images: [...prevState.images, ...modifiedHits],
          page: prevState.page + 1,
          isLastPage:
            prevState.images.length + modifiedHits.length >= totalHits,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  const handleSearchSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({
      query: query,
      page: 1,
      images: [],
      error: null,
      isLastPage: false,
    });
  };

  const handleImageClick = image => {
    this.setState({ selectedImage: image, showModal: true });
  };

  const handleModalClose = () => {
    this.setState({ selectedImage: null, showModal: false });
  };

  return (
    <div className="App">
      <SearchBar onSubmit={this.handleSearchSubmit} />
      {error && <p>Error: {error}</p>}
      <ImageGallery images={images} onItemClick={this.handleImageClick} />
      {isLoading && <Loader />}
      {!isLoading && images.length > 0(<Button onClick={this.fetchImages} />)}
      {showModal && (
        <Modal image={selectedImage} onClose={this.handleModalClose} />
      )}
    </div>
  );
};

export default App;
