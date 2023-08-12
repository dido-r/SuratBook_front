import styles from './EditInfo.module.css';
import { useForm } from '../../../hooks/useForm';
import { request } from '../../../services/request';
import { useState } from 'react';

export function EditInfo({
    setEdit,
    setInfo,
    info
}) {

    const [error, setError] = useState(false);
    const { values, onChangeHandler, resetValues } = useForm({
        town: info.town !== null ? info.town : "",
        address: info.address !== null ? info.address : "",
        country: info.country !== null ? info.country : "",
        university: info.university !== null ? info.university : "",
        universityDegreeId: info.universityDegree !== null ? info.universityDegreeId : 0,
        school: info.school !== null ? info.school : ""
    });

    const onEditInfoSubmit = async (e) => {

        e.preventDefault();
        
        let response = await request('post', 'api/user/edit-info', values);

        if (response.name === "AxiosError") {

            setError(`${response.response.data.message}`);

        } else {

            let degree = setValue(values.universityDegreeId)
            setInfo({ ...values, universityDegree: degree });
            setEdit(false);
            resetValues(e);
        }
    };

    const setValue = (param) => {

        let degree;

        switch (param) {
            case "1":
                degree = 'Doctor';
                break;
            case "2":
                degree = 'Master';
                break;
            case "3":
                degree = 'Bachelor';
                break;
            default:
                degree = '';
                break;
        };

        return degree;
    };

    return (
        <div className={`${styles['edit-card']} card bg-dark bg-gradient`}>
            <div className="card-body">
                <span className={styles['close-modal']} onClick={() => setEdit(false)}>&times;</span>
                <form onSubmit={(e) => onEditInfoSubmit(e)}>
                    <h4 className={styles['create-h']}>Edit your information</h4><hr />
                    {error !== false ? <div className={styles['error-msg']}>
                        {error}
                    </div> : null}
                    <input className={styles['create-input']} type="text" name="town" placeholder="Enter a town..." value={values.town} onChange={(e) => onChangeHandler(e)} /><br />
                    <input className={styles['create-input']} type="text" name="address" placeholder="Enter a address..." value={values.address} onChange={(e) => onChangeHandler(e)} /><br />
                    <input className={styles['create-input']} type="text" name="country" placeholder="Enter a country..." value={values.country} onChange={(e) => onChangeHandler(e)} /><br />
                    <input className={styles['create-input']} type="text" name="university" placeholder="Enter a university..." value={values.university} onChange={(e) => onChangeHandler(e)} /><br />
                    <select className={styles['create-input']} name="universityDegreeId" value={values.universityDegreeId} onChange={(e) => onChangeHandler(e)}>
                        <option value={0}> --- Please Select Degree --- </option>
                        <option value={1}>Doctor</option>
                        <option value={2}>Master</option>
                        <option value={3}>Bachelor</option>
                    </select>
                    <input className={styles['create-input']} type="text" name="school" placeholder="Enter a school..." value={values.school} onChange={(e) => onChangeHandler(e)} /><br />
                    <button type='submit' className="btn btn-outline-light">Edit</button>
                </form>
            </div>
        </div>
    );
}