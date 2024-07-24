import { Link } from "react-router-dom";
import '../../../App.css'; // Ensure to import the CSS file

export const ExploreTopBooks = () => {
    return (
        <div className='explore-top-books-container p-5 mb-4 bg-dark header'>
            <div className='container-fluid py-5 text-white d-flex flex-column justify-content-center align-items-center text-center'>
                <div>
                    <h1 className='display-5 fw-bold'>Welcome to E-Library</h1>
                    <p className='display-6'> Explore the magic of books</p>
                    <Link
                        type='button'
                        className='btn btn-lg text-white'
                        to='/search'
                        style={{
                            backgroundColor: '#228B22', // Forest Green
                            borderColor: '#228B22', // Forest Green border
                        }}
                    >
                        Explore all books
                    </Link>
                </div>
            </div>
        </div>
    );
}
