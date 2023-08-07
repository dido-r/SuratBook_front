import { useEffect, useState } from "react";
import { request } from "../../../services/request";
import { Spinner } from '../../Spinner/Spinner';
import styles from './AllUsers.module.css';

export function AllUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        request('get', 'api/admin/all-users').then(x => {
            setUsers(x.data);
            setLoading(false);
        });
    });

    return (

        loading ? <Spinner /> :
            <div className={styles['table-container']}>
                <h3 className="text-light">All users</h3>
                <table className="table table-striped table-dark table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Date of birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(x => (
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td>{x.email}</td>
                                <td>{x.firstName}</td>
                                <td>{x.lastName}</td>
                                <td>{x.dateOfBirth}</td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div>
    )
}