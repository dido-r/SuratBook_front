import styles from './SearchResults.module.css';
import { Link, useLocation } from "react-router-dom";
import { Post } from '../Post/Post';

export function SearchResults() {

    const location = useLocation();

    return (

        location.state.length === 0 ?
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
            <div className={styles['search-container']}>
                {location.pathname === '/search/users' ?
                    location.state.map(x => (
                        <section key={x.id} className={`${styles['search-container-section']} bg-dark bg-gradient text-center`}>
                            <Link to={`/user/${x.id}`} className={styles['search-container-link']}>
                                <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                                <div className="card-body">
                                    <h5 className="text-light">{x.name}</h5>
                                </div>
                                <button className="btn btn-outline-light">View</button>
                            </Link>
                        </section>)) : null}

                {location.pathname === '/search/groups' ?
                    location.state.map(x => (
                        <section key={x.id} className={`${styles['search-container-section']} bg-dark bg-gradient text-center`}>
                            <Link to={`/group/${x.id}`} className={styles['search-container-link']}>
                                <img className="card-img-top" src="https://www.shutterstock.com/image-illustration/social-group-friends-3d-rendered-600w-74877187.jpg" alt="img" />

                                <div className="card-body">
                                    <h5 className="text-light">{x.name}</h5>
                                </div>
                                <button className="btn btn-outline-light">View</button>
                            </Link>
                        </section>)) : null}

                {location.pathname === '/search/posts' ?
                    <Post posts={location.state} /> : null}
            </div>
    );
}