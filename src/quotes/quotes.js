let currentOffset = 0;

function fetchItems(searchTerm, offset, limit) {
  const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.fisenko.net/v1/quotes/en?query=${searchTerm}&offset=${offset}&limit=${limit}`;

  console.log(apiUrl);
  fetch(apiUrl, {
    method: 'GET',
    mode: 'cors', 
    headers: {
      'Content-Type': 'application/json',
    },
  })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response)
        return response.json();
      })
      .then((data) => {
        console.log(data)
        displayQuote(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } 


function fetchNewQuote() {
  currentOffset += 1;
  fetchItems('woman', currentOffset, 1); 
  }
  
  function displayQuote(quoteData) {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
  
    if (quoteData && quoteData.length > 0) {
      const quote = quoteData[0];
      quoteText.textContent = `«${quote.text}»`;
      quoteAuthor.textContent = quote.author.name;
  } else {
      quoteText.textContent = 'No quote available';
      quoteAuthor.textContent = '';
  }
  }
  
  const quoteButton = document.getElementById('quote-button');
  quoteButton.addEventListener('click', () => {
    fetchNewQuote();
  });
  
  fetchNewQuote();
  
