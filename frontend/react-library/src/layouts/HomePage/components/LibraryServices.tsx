import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';

export const LibraryServices = () => {
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
        <div className='container my-5'>
            <div className='row p-4 align-items-center border shadow-lg'>
                <div className='col-lg-7 p-3'>
                    <h1 className='display-4 fw-bold'>
                        Unveiling the Most Anticipated Book Releases of the Year


                    </h1>
                    <p className='lead'>
                    Mark your calendars! This year’s lineup of book releases is nothing short of spectacular. From gripping thrillers to heartwarming tales, the upcoming months are packed with literary gems waiting to be discovered. Keep an eye out for new works by acclaimed authors and debut novels that are sure to make waves in the literary world.
                    </p>
                    <div className='d-grid gap-2 justify-content-md-start mb-4 mb-lg-3'>
                        {isAuthenticated ? 
                            <Link 
                                to='/messages' 
                                type='button' 
                                className='btn btn-lg px-4 me-md-2 fw-bold text-white'
                                style={{
                                    backgroundColor: '#228B22', // Forest Green
                                    borderColor: '#228B22', // Forest Green border
                                }}
                            >
                                Library Services
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
                <div className='col-lg-4 offset-lg-1 shadow-lg lost-image'></div>
            </div>
        </div>
    );
}
