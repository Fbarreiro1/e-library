import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShelfCurrentLoans from '../../../models/ShelfCurrentLoans';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { LoansModal } from './LoansModal';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

export const Loans = () => {
    const [httpError, setHttpError] = useState<string | null>(null);
    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
    const [checkout, setCheckout] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await getCurrentUser();
                console.log('Current User:', user); // Verifica el usuario
                if (user) {
                    const session = await fetchAuthSession();
                    const cognitoTokens = session.tokens;
                    console.log('Session Tokens:', cognitoTokens); // Verifica los tokens
    
                    const rawToken = cognitoTokens?.idToken?.toString();
                    setAccessToken(rawToken || null);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error fetching session or user:', error);
                setIsAuthenticated(false);
            }
        };
        checkUser();
    }, []);
    

    useEffect(() => {
        const fetchUserCurrentLoans = async () => {
            if (isAuthenticated && accessToken) {
                const url = `http://localhost:8080/api/books/currentloans?token=${accessToken}`;
const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

                try {
                    const response = await fetch(url, requestOptions);
                    if (!response.ok) {
                        throw new Error('Something went wrong!');
                    }
                    const data = await response.json();
                    console.log('User Current Loans:', data); // Verifica los datos
                    setShelfCurrentLoans(data);
                } catch (error: any) {
                    setHttpError(error.message);
                }
            }
            setIsLoadingUserLoans(false);
        };
        fetchUserCurrentLoans().catch((error: any) => {
            setIsLoadingUserLoans(false);
            setHttpError(error.message);
        });
    }, [isAuthenticated, accessToken, checkout]);
    

    if (isLoadingUserLoans) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    async function returnBook(bookId: number) {
        const url = `http://localhost:8080/api/books/secure/return/?bookId=${bookId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            setCheckout(!checkout);
        } catch (error: any) {
            setHttpError(error.message);
        }
    }

    async function renewLoan(bookId: number) {
        const url = `http://localhost:8080/api/books/secure/renew/loan/?bookId=${bookId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            setCheckout(!checkout);
        } catch (error: any) {
            setHttpError(error.message);
        }
    }

    return (
        <div>
            {/* Desktop */}
            <div className='d-none d-lg-block mt-2'>
                {shelfCurrentLoans.length > 0 ? (
                    <>
                        <h5>Current Loans: </h5>
                        {shelfCurrentLoans.map(shelfCurrentLoan => (
                            <div key={shelfCurrentLoan.book.id}>
                                <div className='row mt-3 mb-3'>
                                    <div className='col-4 col-md-4 container'>
                                        {shelfCurrentLoan.book?.img ? (
                                            <img src={shelfCurrentLoan.book.img} width='226' height='349' alt='Book' />
                                        ) : (
                                            <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt='Book' />
                                        )}
                                    </div>
                                    <div className='card col-3 col-md-3 container d-flex'>
                                        <div className='card-body'>
                                            <div className='mt-3'>
                                                <h4>Loan Options</h4>
                                                {shelfCurrentLoan.daysLeft > 0 && (
                                                    <p className='text-secondary'>Due in {shelfCurrentLoan.daysLeft} days.</p>
                                                )}
                                                {shelfCurrentLoan.daysLeft === 0 && (
                                                    <p className='text-success'>Due Today.</p>
                                                )}
                                                {shelfCurrentLoan.daysLeft < 0 && (
                                                    <p className='text-danger'>Past due by {shelfCurrentLoan.daysLeft} days.</p>
                                                )}
                                                <div className='list-group mt-3'>
                                                    <button
                                                        className='list-group-item list-group-item-action'
                                                        aria-current='true'
                                                        data-bs-toggle='modal'
                                                        data-bs-target={`#modal${shelfCurrentLoan.book.id}`}
                                                    >
                                                        Manage Loan
                                                    </button>
                                                    <Link to={'search'} className='list-group-item list-group-item-action'>
                                                        Search more books?
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <p className='mt-3'>Help others find their adventure by reviewing your loan.</p>
                                            <Link className='btn btn-primary' to={`/checkout/${shelfCurrentLoan.book.id}`}>
                                                Leave a review
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <LoansModal
                                    shelfCurrentLoan={shelfCurrentLoan}
                                    mobile={false}
                                    returnBook={returnBook}
                                    renewLoan={renewLoan}
                                />
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <h3 className='mt-3'>Currently no loans</h3>
                        <Link className='btn btn-primary' to={'search'}>
                            Search for a new book
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile */}
            <div className='container d-lg-none mt-2'>
                {shelfCurrentLoans.length > 0 ? (
                    <>
                        <h5 className='mb-3'>Current Loans: </h5>
                        {shelfCurrentLoans.map(shelfCurrentLoan => (
                            <div key={shelfCurrentLoan.book.id}>
                                <div className='d-flex justify-content-center align-items-center'>
                                    {shelfCurrentLoan.book?.img ? (
                                        <img src={shelfCurrentLoan.book.img} width='226' height='349' alt='Book' />
                                    ) : (
                                        <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt='Book' />
                                    )}
                                </div>
                                <div className='card d-flex mt-5 mb-3'>
                                    <div className='card-body container'>
                                        <div className='mt-3'>
                                            <h4>Loan Options</h4>
                                            {shelfCurrentLoan.daysLeft > 0 && (
                                                <p className='text-secondary'>Due in {shelfCurrentLoan.daysLeft} days.</p>
                                            )}
                                            {shelfCurrentLoan.daysLeft === 0 && (
                                                <p className='text-success'>Due Today.</p>
                                            )}
                                            {shelfCurrentLoan.daysLeft < 0 && (
                                                <p className='text-danger'>Past due by {shelfCurrentLoan.daysLeft} days.</p>
                                            )}
                                            <div className='list-group mt-3'>
                                                <button
                                                    className='list-group-item list-group-item-action'
                                                    aria-current='true'
                                                    data-bs-toggle='modal'
                                                    data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}
                                                >
                                                    Manage Loan
                                                </button>
                                                <Link to={'search'} className='list-group-item list-group-item-action'>
                                                    Search more books?
                                                </Link>
                                            </div>
                                        </div>
                                        <hr />
                                        <p className='mt-3'>Help others find their adventure by reviewing your loan.</p>
                                        <Link className='btn btn-primary' to={`/checkout/${shelfCurrentLoan.book.id}`}>
                                            Leave a review
                                        </Link>
                                    </div>
                                </div>
                                <hr />
                                <LoansModal
                                    shelfCurrentLoan={shelfCurrentLoan}
                                    mobile={true}
                                    returnBook={returnBook}
                                    renewLoan={renewLoan}
                                />
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <h3 className='mt-3'>Currently no loans</h3>
                        <Link className='btn btn-primary' to={'search'}>
                            Search for a new book
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};