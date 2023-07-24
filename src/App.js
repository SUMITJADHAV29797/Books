import { useEffect, useContext } from "react";
import Bookcreate from "./components/BookCreate";
import BookList from "./components/BookList";
import BooksContext from "./context/books"; 

function App() {
    const { fetchBooks } = useContext(BooksContext);
    useEffect(()=> {
        fetchBooks();
    },[fetchBooks])
    return(
        <div className="App"> 
            <h1>Reading List</h1>
            <BookList />
            <Bookcreate />
        </div> 
    )
}

export default App;