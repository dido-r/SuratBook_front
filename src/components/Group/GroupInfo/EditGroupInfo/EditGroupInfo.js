import styles from './EditGroupInfo.module.css';
import { useForm } from '../../../../hooks/useForm';
import { useParams } from 'react-router-dom';
import { request } from '../../../../services/request';
import { useState } from 'react';
import { Modal } from '../../../Modal/Modal';

export function EditGroupInfo({
    setEdit,
    setGroupData
}) {

    const params = useParams();
    const [modal, setModal] = useState(false);
    const { values, onChangeHandler, resetValues } = useForm({
        id: params.id,
        name: '',
        groupInfo: ''
    });

    const onEditInfoSubmit = async (e) => {

        e.preventDefault();
        try {

            await request('post', 'api/group/edit-info', values);
            setGroupData(values);
            setEdit(false);
            resetValues(e);

        } catch {

            setModal(true);
        }
    };

    return (
        <>
            {modal ? <Modal message={'Something went wrong'} setModal={setModal}/> : null}
            <div className={`${styles['edit-card']} card bg-dark bg-gradient`}>
                <div className="card-body">
                    <span className={styles['close-modal']} onClick={() => setEdit(false)}>&times;</span>
                    <form onSubmit={(e) => onEditInfoSubmit(e)}>
                        <h4 className={styles['create-h']}>Edit group information</h4><hr />
                        <input className={styles['create-input']} required='required' type="text" name="name" placeholder="Enter a new group name..." value={values.name} onChange={(e) => onChangeHandler(e)} /><br />
                        <textarea className={styles['create-input']} required='required' type="text" name="groupInfo" placeholder="Enter a description..." value={values.groupInfo} onChange={(e) => onChangeHandler(e)} /><br />
                        <button className="btn btn-outline-light">Edit</button>
                    </form>
                </div>
            </div>
        </>
    );
}