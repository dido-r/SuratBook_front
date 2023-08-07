import { useEffect, useState } from "react";
import { request } from "../../../services/request";
import { Spinner } from '../../Spinner/Spinner';
import { Modal } from '../../Modal/Modal';
import { ImageView } from './ImageView/ImageView';
import styles from './AllPosts.module.css';
import { Link } from "react-router-dom";

export function AllPosts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState(undefined);

    useEffect(() => {

        request('get', 'api/admin/all-posts').then(x => {
            setPosts(x.data);
            setLoading(false);
        });

    }, []);

    const onPostDelete = async (postId) => {
        
        let result = await request('post', `api/post/delete-post?postId=${postId.toLowerCase()}`);
        result.name === "AxiosError" ? setModal(true) :
            setPosts((current) => current.filter(x => x.id !== postId));
    }

    return (

        <div className={styles['table-container']}>
            {modal ? <Modal setModal={setModal} message='Could not delete the post'/> : null}
            {selected !== undefined ? <ImageView setSelected={setSelected} path={selected}/> : null}
            <h3 className="text-light">All posts</h3>
            {loading ? <Spinner /> :
                <table className="table table-striped table-dark table-hover">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Created on</th>
                            <th>Creator</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(x => (
                            <tr key={x.id}>
                                <td>{x.description}</td>
                                <td>{x.image !== null ? <Link onClick={() => setSelected(x.image)}>View image</Link> : null}</td>
                                <td>{x.createdOn}</td>
                                <td>{x.creator}</td>
                                <td><button className="btn btn-outline-danger" onClick={() => onPostDelete(x.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table >}
        </div>
    )
}