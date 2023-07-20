import styles from './CreateGroup.module.css'
import { useForm } from '../../../hooks/useForm';
import { request } from '../../../services/request';
import { useState } from 'react';
import { Modal } from '../../Modal/Modal';

export function CreateGroup() {

    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState('Successfully created group');
    const {values, onChangeHandler, resetValues} = useForm({
        name: '',
        groupInfo: '',
        accessId: 0
    });

    const onGroupCreate = async (e) => {

        e.preventDefault();

        try{

            console.log(values)
            await request('post', 'api/group/create', values);
            setModal(true)
            resetValues(e);

        }catch{

            setMessage('Somethung went wrong');
            setModal(true)
        }
    }

    return (
        <>
        {modal ? <Modal message={message} setModal={setModal}/> : null}
        <div className={`${styles['create-card']} card bg-dark bg-gradient`}>
            <div className="card-body">
                <form onSubmit={(e) => onGroupCreate(e)}>
                    <h4 className={styles['create-h']}>Create group</h4><hr />
                    <input className={styles['create-input']} type="text" name="name" placeholder="Enter a group name..." value={values.name} onChange={(e) => onChangeHandler(e)}/><br />
                    <select className={styles['create-input']} name="accessId" value={values.accessId} onChange={(e) => onChangeHandler(e)}>
                        <option value=""> --- Please Select Access --- </option>
                        <option value={1}>Private</option>
                        <option value={2}>Public</option>
                    </select>
                    <textarea className={styles['create-ta']} name="groupInfo" rows="3" placeholder="Group description..." value={values.groupInfo} onChange={(e) => onChangeHandler(e)}/><br />
                    <button className="btn btn-outline-light">Create group</button>
                </form>
            </div>
        </div>
        </>
    );
}