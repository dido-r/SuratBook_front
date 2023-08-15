import styles from './SearchResults.module.css';
import { useLocation } from "react-router-dom";
import { Post } from '../Post/Post';
import { UserCard } from '../UserList/UserCard/UserCard';
import { GroupCard } from '../Group/GroupCard/GroupCard';
import { useEffect, useState } from 'react';
import { request } from '../../services/request';
import { Spinner } from '../Spinner/Spinner';

export function SearchResults() {

    const location = useLocation()
    const [results, setResults] = useState([]);
    const [current, setCurrent] = useState('');

    useEffect(() => {

        setCurrent('');
        let url;

        if (location.pathname === '/search/users') {

            url = `api/user/search?name=${location.state}`;

        } else if (location.pathname === '/search/groups') {

            url = `api/group/search?name=${location.state}`;

        } else if (location.pathname === '/search/posts') {

            url = `api/post/search?name=${location.state}`;
        }

        request('get', url).then(x => {
            setResults(x.data);
            setCurrent(url.split('/')[1]);
        });

    }, [location.pathname, location.state]);

    return (

        <div className={`${styles['search-container']} ${current === 'user' || current === 'group' ? styles['search-margin'] : null}`}>
            {current === '' ? <Spinner /> : results.length === 0 ?
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
                    {location.pathname === '/search/users' ?
                        current !== 'user' ? <Spinner /> : results.map(x => (
                            <UserCard key={x.id} x={x} button={<button className="btn btn-outline-light">View</button>} />
                        )) : null}

                    {location.pathname === '/search/groups' ?
                        current !== 'group' ? <Spinner /> : results.map(x => (
                            <GroupCard key={x.id} x={x} />
                        )) : null}

                    {location.pathname === '/search/posts' ?
                        current !== 'post' ? <Spinner /> : <Post posts={results} setPosts={setResults} /> : null}
                </>}
        </div>
    );
}