import { useEffect, useState } from "react";
import { request } from "../../../services/request";
import { Spinner } from '../../Spinner/Spinner';
import styles from './AllGroups.module.css';
import { Link } from "react-router-dom";
import { ImageView } from "../ImageView/ImageView";
import { Modal } from "../../Modal/Modal";

export function AllGroups() {

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(undefined);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        request('get', 'api/admin/all-groups').then(x => {
            setGroups(x.data);
            setLoading(false);
        });
    }, []);

    const onGroupDelete = async (groupId) => {

        let result = await request('post', `api/group/delete-group?groupId=${groupId.toLowerCase()}`);
        result.name === "AxiosError" ? setModal(true) :
            setGroups(current => current.map(x => x.id === groupId ? ({ ...x, isDeleted: true }) : x));
    }

    const onGroupActivate = async (groupId) => {

        let result = await request('post', `api/admin/activate-group?groupId=${groupId.toLowerCase()}`);
        result.name === "AxiosError" ? setModal(true) :
        setGroups(current => current.map(x => x.id === groupId ? ({ ...x, isDeleted: false }) : x));
    }

    return (

        loading ? <Spinner /> :
            <div className={styles['table-container']}>
                {modal ? <Modal setModal={setModal} message='Could not perform the action' /> : null}
                {selected !== undefined ? <ImageView setSelected={setSelected} path={selected} /> : null}
                <h3 className="text-light">All groups</h3>
                <table className="table table-striped table-dark table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Group Info</th>
                            <th>Home page image</th>
                            <th>Created on</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map(x => (
                            <tr key={x.id}>
                                <td>{x.name}</td>
                                <td>{x.groupInfo}</td>
                                <td>{x.mainPhoto !== null ? <Link onClick={() => setSelected(x.mainPhoto)}>View image</Link> : null}</td>
                                <td>{x.createdOn}</td>
                                <td>
                                    {x.isDeleted ? <button className="btn btn-outline-success" onClick={() => onGroupActivate(x.id)}>Activate</button>
                                    : <button className="btn btn-outline-danger" onClick={() => onGroupDelete(x.id)}>Delete</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div>
    )
}