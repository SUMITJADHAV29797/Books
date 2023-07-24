import { createContext, useState, useCallback} from "react";
import axios from "axios";

const BooksContext = createContext();

const URL = "https://books-backend-ctlt.onrender.com"
// const URL = "http://localhost:3001"

function Provider({children}) {
    const [books, setBooks] = useState([]);

    const fetchBooks = useCallback(async()=> {
        const response = await axios.get(`${URL}/books`);
        setBooks(response.data);
    }, []);
    const editBookById = async(id, newTitle) => {
        const response = await axios.put(`${URL}/books/${id}`,{
            title: newTitle
        });
        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return { ...book, ...response.data}
            }
            return book;
        });
        setBooks(updatedBooks);
    };
    const deleteBookById = async(id) => {
        await axios.delete(`${URL}/books/${id}`)
        const updatedBooks = books.filter((book)=> {
            return book.id !== id;
        });
        setBooks(updatedBooks);
    }
    const createBook = async(title) => {
        const response = await axios.post(`${URL}/books`, {
            title,
        })
        const updatedBooks = [...books,response.data]
        setBooks(updatedBooks);
    } 
    const valueToShare = {
        books,
        deleteBookById,
        editBookById,
        createBook,
        fetchBooks
    };
    return(
        <BooksContext.Provider value={ valueToShare }>
            {children}
        </BooksContext.Provider>
    )

}

export {Provider};
export default BooksContext;