import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import './App.css';
import Modal from './Modal/Modal';
import { fetchImages } from './FetchImages/FetchImages';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [total, setTotal] = useState(1);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!query) return;
    async function getImages() {
      try {
        setIsLoading(true);
        setShowButton(true);
        const responseImages = await fetchImages(query, page);
        if (!responseImages.hits.length) {
          return alert('Sorry, there are no images matching your request...');
        }
        const modifiedHits = responseImages.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        setImages(prevImages => [...prevImages, ...modifiedHits]);
        setTotal(responseImages.total);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [page, query]);

  const handleSearchSubmit = newQuery => {
    if (query === newQuery) {
      return;
    }
    // this.setState({
    //   query: query,
    //   page: 1,
    //   images: [],
    //   error: null,
    //   isLastPage: false,
    // });
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setTotal(1);
    setIsLoading(false);
    setError(null);
  };

  const handleImageClick = image => {
    // this.setState({ selectedImage: image, showModal: true });
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleModalClose = () => {
    // this.setState({ selectedImage: null, showModal: false });
    setSelectedImage(null);
    setShowModal(false);
  };

  const loadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <p>Error: {error}</p>}
      <ImageGallery images={images} onItemClick={handleImageClick} />
      {isLoading && <Loader />}
      {!isLoading && total / 12 > page && showButton && (
        <Button onClick={loadMoreBtn} />
      )}
      {showModal && <Modal image={selectedImage} onClose={handleModalClose} />}
    </div>
  );
};

export default App;
