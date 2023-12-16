import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [randomColor, setRandomColor] = useState(getRandomColor());

  // Function to generate random RGB values
  function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  }

  // Function to set random colors
  const setRandomColors = () => {
    const newColor = getRandomColor();
    setRandomColor(newColor);

    document.body.style.backgroundColor = newColor;
    document.getElementById('tweet-quote').style.backgroundColor = newColor;
    document.getElementById('new-quote').style.backgroundColor = newColor;
    document.getElementById('text').style.color = newColor;
    document.getElementById('author').style.color = newColor;
  };

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
      });
  }, []);

  const New_quote = () => {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
        setRandomColors(); // Set random colors when a new quote is fetched
      });
  };

  return (
    <div id="quote-box" className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', overflow: 'hidden', maxWidth: '600px' }}>
      <div className="text-center p-5 fade show" style={{ borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', backgroundColor: 'white' }}>
      <div id="text" className="w-100 fade show">
        <div className="row">
          <div className="col">
            <p>{quote}</p>
          </div>
        </div>
        <div className="row">
          <div className="col text-end">
            <small id="author">{author}</small>
          </div>
        </div>
      </div>
        <div className="row">
          <div className="col ms-6">
            <a id="tweet-quote" href="https://twitter.com/intent/tweet" className="btn btn-primary fade show m-4" role="button" onClick={setRandomColors}>
              <i className="bi bi-twitter"></i> Tweet
            </a>
          </div>
          <div className="col ms-6">
            <button id="new-quote" className="btn btn-primary fade show m-4" onClick={New_quote}>
              New Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
