{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    books: {
      list: '.books-list',
      image: '.book__image',
      filter: '.filters',
    },
  };

  const templates = {
    bookCollection: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML)
  };

  class Books {
    constructor() {
      const thisBooks = this;

      thisBooks.render();
      thisBooks.getElements();
      thisBooks.initActions();
      thisBooks.BooksFilters();
    }
    getElements(){
      const thisBooks = this;

      thisBooks.favoriteBooks = [];
      thisBooks.filters = [];
      thisBooks.booksList = document.querySelector(select.books.list);
      thisBooks.booksImage = document.querySelectorAll(select.books.image);
      thisBooks.filtersBook = document.querySelector(select.books.filter);
    }

    render() {
      const thisBooks = this;

      for (let book in dataSource.books) {

        thisBooks.rating = dataSource.books[book].rating;
        console.log(dataSource.books[book]);

        const ratingBgc = thisBooks.determineRatingBgc();
        const ratingWidth = thisBooks.rating * 10;

        dataSource.books[book].ratingBgc = ratingBgc;
        dataSource.books[book].ratingWidth = ratingWidth;

        const generatedHTML = templates.bookCollection(dataSource.books[book]);

        dataSource.books[book].element = utils.createDOMFromHTML(generatedHTML);
        //console.log(book, dataSource.books[book]);
        const menuContainer = document.querySelector(select.books.list);

        menuContainer.appendChild(dataSource.books[book].element);
      }
    }

    initActions(){
      const thisBooks = this;

      for(let listElem of thisBooks.booksImage){
        listElem.addEventListener('dblclick', function(event){
          event.preventDefault();

          listElem.classList.toggle('favorite');
          const DataId = listElem.getAttribute('data-id');

          if(listElem.classList.contains('favorite')){
            thisBooks.favoriteBooks.push(DataId);
          } else {
            const index = thisBooks.favoriteBooks.indexOf(DataId);
            if(index != -1){
              thisBooks.favoriteBooks.splice(index, 1);
            }
          }
          console.log(thisBooks.favoriteBooks);
        });
      }

      thisBooks.filtersBook.addEventListener('click', function(event){
        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter' && event.target.checked){
          //console.log(event.target.value);
          thisBooks.filters.push(event.target.value);
          console.log(thisBooks.filters);
        } else {
          thisBooks.filters = thisBooks.filters.filter((elem) => elem !== event.target.value);
          //thisBooks.filters.splice(event.target.value, 1);
          console.log(thisBooks.filters);
        }
        thisBooks.BooksFilters();
      });
    }

    BooksFilters(){
      const thisBooks = this;

      for(let book of dataSource.books){
        let shouldBeHidden = false;

        for(let filter of thisBooks.filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }

        const getBookToChange = document.querySelector(select.books.image + '[data-id="' + book.id + '"]');
        //console.log(shouldBeHidden);
        if (shouldBeHidden){
          getBookToChange.classList.add('hidden');
        } else {
          getBookToChange.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(){
      const thisBooks = this;
      //console.log(thisBooks.rating);
      if (thisBooks.rating < 6){
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (thisBooks.rating > 6 && thisBooks.rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (thisBooks.rating > 8 && thisBooks.rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (thisBooks.rating > 9){
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }
  new Books();
}
