import styles from './EditGroupInfo.module.css';
import { useForm } from '../../../../hooks/useForm';
import { useParams } from 'react-router-dom';
import { request } from '../../../../services/request';
import { useState } from 'react';

export function EditGroupInfo({
    setEdit,
    setGroupData,
    groupData
}) {

    const params = useParams();
    const [error, setError] = useState(undefined);
    const { values, onChangeHandler, resetValues } = useForm({
        id: params.id,
        name: groupData.name,
        groupInfo: groupData.groupInfo
    });

    const onEditInfoSubmit = async (e) => {

        e.preventDefault();
        let response = await request('post', 'api/group/edit-info', values);

        if (response.name === "AxiosError") {

            setError(`${response.response.data.message}`);

        } else {

            setGroupData(x => x.id === groupData.id ? ({...x, name: values.name, groupInfo: values.groupInfo}) : null);
            setEdit(false);
            resetValues(e);
        }
    };

    return (

        <div className={`${styles['edit-card']} card bg-dark bg-gradient`}>
            <div className="card-body">
                <span className={styles['close-modal']} onClick={() => setEdit(false)}>&times;</span>
                <form onSubmit={(e) => onEditInfoSubmit(e)}>
                    <h4 className={styles['create-h']}>Edit group information</h4><hr />
                    {error !== undefined ? <div className={styles['error-msg']}>
                        {error}
                    </div> : null}
                    <input className={styles['create-input']} required='required' type="text" name="name" placeholder="Enter a new group name..." value={values.name} onChange={(e) => onChangeHandler(e)} /><br />
                    <textarea className={styles['create-input']} required='required' type="text" name="groupInfo" placeholder="Enter a description..." value={values.groupInfo} onChange={(e) => onChangeHandler(e)} /><br />
                    <button className="btn btn-outline-light">Edit</button>
                </form>
            </div>
        </div>
    );
}