namespace API {
  export namespace BookShelf {
    type Instance = {
      books: ({ bookId: number } & API.Book.Instance)[];
    } & API.Library.Instance;
  }
}
