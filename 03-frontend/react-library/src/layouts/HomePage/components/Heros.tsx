import { SignUpInput, SignUpOutput, signUp, signOut, getCurrentUser } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export const Heros = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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

    return (
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Discover the Latest Bestseller That’s Captivating Readers Worldwide

</h1>
                            <p className='lead'>
                            If you haven’t yet heard of “Whispers of the Wind,” you’re missing out on one of this year’s most talked-about novels. This captivating tale of mystery and romance has topped the charts and sparked discussions across book clubs everywhere. Dive into a world where secrets unravel...
                            </p>
                            {isAuthenticated ?  
                                <Link 
                                    type='button' 
                                    className='btn btn-lg text-white'
                                    to='/search'
                                    style={{
                                        backgroundColor: '#228B22', // Forest Green
                                        borderColor: '#228B22', // Forest Green border
                                    }}
                                >
                                    Explore top books
                                </Link>
                                :
                                <Link 
                                    className='btn btn-lg text-white' 
                                    to='/login'
                                    style={{
                                        backgroundColor: '#228B22', // Forest Green
                                        borderColor: '#228B22', // Forest Green border
                                    }}
                                >
                                    Sign up
                                </Link>
                            }  
                        </div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Author Spotlight: Meet the Writer Behind the Latest Literary Sensation</h1>
                            <p className='lead'>
                            Get to know the genius behind the recent literary sensation, “Echoes of Eternity.” In our latest author spotlight, we delve into the life and inspiration of Jane Doe, whose evocative storytelling has captivated readers globally.
                            </p>
                            {isAuthenticated ?  
                                <Link 
                                    type='button' 
                                    className='btn btn-lg text-white'
                                    to='/search'
                                    style={{
                                        backgroundColor: '#228B22', // Forest Green
                                        borderColor: '#228B22', // Forest Green border
                                    }}
                                >
                                    Explore top books
                                </Link>
                                :
                                <Link 
                                    className='btn btn-lg text-white' 
                                    to='/login'
                                    style={{
                                        backgroundColor: '#228B22', // Forest Green
                                        borderColor: '#228B22', // Forest Green border
                                    }}
                                >
                                    Sign up
                                </Link>
                            }  
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'></div>
                    </div>
                </div>
            </div>

            {/* Mobile Heros */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div className='col-image-left'></div>
                        <div className='mt-2'>
                        <h1>Discover the Latest Bestseller That’s Captivating Readers Worldwide

</h1>
                            <p className='lead'>
                            If you haven’t yet heard of “Whispers of the Wind,” you’re missing out on one of this year’s most talked-about novels. This captivating tale of mystery and romance has topped the charts and sparked discussions across book clubs everywhere. Dive into a world where secrets unravel...
                            </p>
                            {isAuthenticated ? 
                                <Link 
                                    type='button' 
                                    className='btn btn-lg text-white'
                                    to='/search'
                                    style={{
                                        backgroundColor: '#228B22', // Forest Green
                                        borderColor: '#228B22', // Forest Green border
                                    }}
                                >
                                    Explore top books
                                </Link>
                                :
                                <Link 
                                    className='btn btn-lg text-white' 
                                    to='/login'
                                    style={{
                                        backgroundColor: '#228B22', // Forest Green
                                        borderColor: '#228B22', // Forest Green border
                                    }}
                                >
                                    Sign up
                                </Link>
                            }
                        </div>
                    </div>
                    <div className='m-2'>
                        <div className='col-image-right'></div>
                        <div className='mt-2'>
                        <h1>Author Spotlight: Meet the Writer Behind the Latest Literary Sensation</h1>
                            <p className='lead'>
                            Get to know the genius behind the recent literary sensation, “Echoes of Eternity.” In our latest author spotlight, we delve into the life and inspiration of Jane Doe, whose evocative storytelling has captivated readers globally.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
