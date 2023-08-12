import styles from './SearchResults.module.css';
import { useLocation } from "react-router-dom";
import { Post } from '../Post/Post';
import { UserCard } from '../UserList/UserCard/UserCard';
import { GroupCard } from '../Group/GroupCard/GroupCard';
import { useEffect, useState } from 'react';
import { request } from '../../services/request';

export function SearchResults() {

    const location = useLocation();
    const [searched, setSearched] = useState([]);

    useEffect(() => {

        var search = location.state;
        
        if (location.pathname === '/search/users') {

            request('get', `api/user/search?name=${search}`).then(x => setSearched(x.data));
        }

        if (location.pathname === '/search/groups') {

            request('get', `api/group/search?name=${search}`).then(x => setSearched(x.data));
        }

        if (location.pathname === '/search/posts') {

            request('get', `api/post/search?name=${search}`).then(x => setSearched(x.data));
        }

    }, [location.state, location.pathname]);

    return (

        searched.length === 0 ?
            <div className={styles['no-results']}>
                <div>
                    <img src='/no-result.png' alt='not-found' />
                </div>

                <div className={styles['no-results-text']}>
                    <h1>OOPS!</h1>
                    <h5>NO RESULTS</h5>
                    <h5>FOUND</h5>
                </div>
            </div>
            :
            <>
                <div className={styles['search-container']}>
                    {location.pathname === '/search/users' ?
                        searched.map(x => (
                            <UserCard key={x.id} x={x} button={<button className="btn btn-outline-light">View</button>} />
                        )) : null}

                    {location.pathname === '/search/groups' ?
                        searched.map(x => (
                            <GroupCard key={x.id} x={x} />
                        )) : null}
                </div>
                
                {location.pathname === '/search/posts' ?
                    <Post posts={searched} setPosts={setSearched} /> : null}
            </>
    );
}