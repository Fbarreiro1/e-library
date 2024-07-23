import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import ReviewModel from "../../models/ReviewModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { LatestReviews } from "./LatestReviews";
import { getCurrentUser, signOut, fetchAuthSession} from 'aws-amplify/auth';
import ReviewRequestModel from "../../models/ReviewRequestModel";

export const BookCheckoutPage = () => {
    const [book, setBook] = useState<BookModel>();
    const [httpError, setHttpError] = useState<string | null>(null);
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await getCurrentUser();
                setIsAuthenticated(!!user);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkUser();
    }, []);

    const getAuthenticatedUser = async () => {
        const {
          username,
          signInDetails
        } = await getCurrentUser();
      
        const {
          tokens: session
        } = await fetchAuthSession();
      
        // Note that session will no longer contain refreshToken and clockDrift
        return {
          username,
          session,
          
        };
      }

    useEffect(() => {
        if (!bookId) {
            setHttpError("Book ID is not provided in the URL.");
            return;
        }

        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;
            try {
                const response = await fetch(baseUrl);
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const responseJson = await response.json();
                const loadedBook: BookModel = {
                    id: responseJson.id,
                    title: responseJson.title,
                    author: responseJson.author,
                    description: responseJson.description,
                    copies: responseJson.copies,
                    copiesAvailable: responseJson.copies_available,
                    category: responseJson.category,
                    img: responseJson.img,
                };
                setBook(loadedBook);
            } catch (error: any) {
                setHttpError(error.message);
            }
        };

        fetchBook();
    }, [bookId, isCheckedOut]);

    useEffect(() => {
        if (!bookId) return;

        const fetchBookReviews = async () => {
            const reviewUrl = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
            try {
                const responseReviews = await fetch(reviewUrl);
                if (!responseReviews.ok) {
                    throw new Error('Something went wrong!');
                }
                const responseJsonReviews = await responseReviews.json();
                const responseData = responseJsonReviews._embedded.reviews;
                const loadedReviews: ReviewModel[] = [];
                let weightedStarReviews: number = 0;
                for (const key in responseData) {
                    loadedReviews.push({
                        id: responseData[key].id,
                        userEmail: responseData[key].userEmail,
                        date: responseData[key].date,
                        rating: responseData[key].rating,
                        book_id: responseData[key].bookId,
                        reviewDescription: responseData[key].reviewDescription,
                    });
                    weightedStarReviews = weightedStarReviews + responseData[key].rating;
                }
                if (loadedReviews.length > 0) {
                    const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                    setTotalStars(Number(round));
                }
                setReviews(loadedReviews);
            } catch (error: any) {
                setHttpError(error.message);
            }
        };

        fetchBookReviews();
    }, [bookId, isReviewLeft]);

    

    useEffect(() => {
        if (!isAuthenticated || !bookId) return;

        const fetchUserReviewBook = async () => {
            try {
                const { session } = await getAuthenticatedUser();
                const accessToken = await session?.accessToken;
                const url = `http://localhost:8080/api/books/reviews/user/book/?bookId=${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const userReview = await fetch(url, requestOptions);
                if (!userReview.ok) {
                    throw new Error('Something went wrong');
                }
                const userReviewResponseJson = await userReview.json();
                setIsReviewLeft(userReviewResponseJson);
            } catch (error: any) {
                setHttpError(error.message);
            }
        };

        fetchUserReviewBook();
    }, [isAuthenticated, bookId]);

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchUserCurrentLoansCount = async () => {
            try {
                const { session } = await getAuthenticatedUser();
                const accessToken = await session?.accessToken;
                const url = `http://localhost:8080/api/books/currentloans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: { 
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                     }
                };
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if (!currentLoansCountResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                setCurrentLoansCount(currentLoansCountResponseJson);
            } catch (error: any) {
                setHttpError(error.message);
            }
        };

        fetchUserCurrentLoansCount();
    }, [isAuthenticated, isCheckedOut]);

    useEffect(() => {
        if (!isAuthenticated || !bookId) return;

        const fetchUserCheckedOutBook = async () => {
            try {
                const { session } = await getAuthenticatedUser();
                const accessToken = await session?.accessToken;
                const url = `http://localhost:8080/api/books/ischeckedout/byuser/?bookId=${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const bookCheckedOut = await fetch(url, requestOptions);
                if (!bookCheckedOut.ok) {
                    throw new Error('Something went wrong!');
                }
                const bookCheckedOutResponseJson = await bookCheckedOut.json();
                setIsCheckedOut(bookCheckedOutResponseJson);
            } catch (error: any) {
                setHttpError(error.message);
            }
        };

        fetchUserCheckedOutBook();
    }, [isAuthenticated, bookId]);

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    async function checkoutBook() {
        const { session } = await getAuthenticatedUser();
        const accessToken = await session?.accessToken;
        const url = `http://localhost:8080/api/books/checkout/?bookId=${book?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const checkoutResponse = await fetch(url, requestOptions);
        if (!checkoutResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setIsCheckedOut(true);
    }

    async function submitReview(starInput: number, reviewDescription: string) {
        let bookId: number = 0;
        if (book?.id) {
            bookId = book.id;
        }

        const reviewRequestModel = new ReviewRequestModel(starInput, bookId, reviewDescription);
        const { session } = await getAuthenticatedUser();
        const accessToken = await session?.accessToken;
        const url = `http://localhost:8080/api/reviews/`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewRequestModel)
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setIsReviewLeft(true);
    }

    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        {book?.img ?
                            <img src={book?.img} width='226' height='349' alt='Book' />
                            :
                            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt='Book' />
                        }
                    </div>
                    <div className='col-4 col-md-4 container'>
                        <div className='ml-2'>
                            <h2 className='card-title' style={{ color: 'forestgreen' }}>{book?.title}</h2>
                            <h5 style={{ color: 'forestgreen' }}>{book?.author}</h5>
                            <p className='lead'>{book?.description}</p>
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox
                        book={book}
                        mobile={false}
                        currentLoansCount={currentLoansCount}
                        isAuthenticated={isAuthenticated}
                        isCheckedOut={isCheckedOut}
                        checkoutBook={checkoutBook}
                        isReviewLeft={isReviewLeft}
                        submitReview={submitReview}
                    />
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
            </div>
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center align-items-center'>
                    {book?.img ?
                        <img src={book?.img} width='226' height='349' alt='Book' />
                        :
                        <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt='Book' />
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{book?.title}</h2>
                        <h5 style={{ color: 'forestgreen' }}>{book?.author}</h5>
                        <p className='lead'>{book?.description}</p>
                        <StarsReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox
                    book={book}
                    mobile={true}
                    currentLoansCount={currentLoansCount}
                    isAuthenticated={isAuthenticated}
                    isCheckedOut={isCheckedOut}
                    checkoutBook={checkoutBook}
                    isReviewLeft={isReviewLeft}
                    submitReview={submitReview}
                />
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
            </div>
        </div>
    );
    
}
