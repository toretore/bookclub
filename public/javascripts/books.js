BookClub.Book = Class.create({

  initialize: function(el, c){
    this.element = el;
    this.container = c;
    this.b = new Broadcaster();
    this.observe();
    el.addClassName("enhanced");
  }, 
  
  getTitle: function(){ return this.element.innerHTML; },
  setTitle: function(t){ this.element.update(t); },
  
  getRead: function(){
    return this.element.hasClassName("read");
  },
  
  setRead: function(b){
    this.element[b ? "addClassName" : "removeClassName"]("read");
    this.b.fire("read changed", b);
  },

  isRead: function(){ return this.getRead(); },
  markRead: function(){ this.setRead(true); },
  markUnread: function(){ this.setRead(false); },
  
  toggleRead: function(){
    this.setRead(!this.getRead());
  },

  observe: function(){
    var book = this;//Close on "this" for the observer function

    book.element.observe('click', function(){
      book.toggleRead();
    });

    if (window.console && console.log) {
      book.b.listen("read changed", function(b){
        console.log('Book "'+book.getTitle()+'" is now ' + (b ? "read" : "unread"));
      });
    }
  }

});

//Find all books in the page. Will return an array of objects, where
//each object is a collection of books. The object's books are stored
//in the "items" property, while the container element is in the "container" property.
//
//Example: [{container: anElement, items: [aBook, aBook]}, {container: anElement, items: [aBook, aBook, aBook]}]
BookClub.Book.locate = function(){
  return $$('.books').map(function(container){
    return {
      container: container,
      items: container.select('.book').map(function(el){
        return new BookClub.Book(el, container);
      })
    };
  });
};

BookClub.b.listen("ready", function(){
  BookClub.books = BookClub.Book.locate();
});
