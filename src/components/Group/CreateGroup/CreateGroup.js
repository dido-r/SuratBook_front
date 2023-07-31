import styles from './CreateGroup.module.css'
import { useForm } from '../../../hooks/useForm';
import { request } from '../../../services/request';
import { useState } from 'react';
import { Modal } from '../../Modal/Modal';

export function CreateGroup() {

    const [error, setError] = useState(undefined);
    const [modal, setModal] = useState(false);
    const { values, onChangeHandler, resetValues } = useForm({
        name: '',
        groupInfo: '',
        accessId: 1
    });

    const onGroupCreate = async (e) => {

        e.preventDefault();
        let response = await request('post', 'api/group/create', values);

        if(response.name === "AxiosError"){

            setError(`${response.response.data.message}`)
        }else{

            setModal(true);
            setError(undefined  )
            resetValues(e);
        }
    }

    return (
        <>
            {modal ? <Modal message='Successfully created group' setModal={setModal} /> : null}
            <div className={`${styles['create-card']} card bg-dark bg-gradient`}>
                <div className="card-body">
                    <form onSubmit={(e) => onGroupCreate(e)}>
                        <h4 className={styles['create-h']}>Create group</h4><hr />
                        {error !== undefined ? <div className={styles['error-msg']}>
                            {error}
                        </div> : null}
                        <input className={styles['create-input']} required='required' type="text" name="name" placeholder="Enter a group name..." value={values.name} onChange={(e) => onChangeHandler(e)} /><br />
                        <select className={styles['create-input']} name="accessId" value={values.accessId} onChange={(e) => onChangeHandler(e)}>
                            <option value={1}>Private</option>
                            <option value={2}>Public</option>
                        </select>
                        <textarea className={styles['create-ta']} required='required' name="groupInfo" rows="3" placeholder="Group description..." value={values.groupInfo} onChange={(e) => onChangeHandler(e)} /><br />
                        <button className="btn btn-outline-light">Create group</button>
                    </form>
                </div>
            </div>
        </>
    );
}