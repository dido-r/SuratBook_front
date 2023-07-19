import styles from './EditInfo.module.css';
import { useForm } from '../../../hooks/useForm';
import { request } from '../../../services/request';

export function EditInfo({
    setEdit,
    setInfo,
    params
}) {


    const { values, onChangeHandler, resetValues } = useForm({
        town: '',
        address: '',
        country: '',
        university: '',
        universityDegree: 0,
        school: '',
        userId: params.id
    });

    const onEditInfoSubmit = async (e) => {

        e.preventDefault();
        setValue(values.universityDegree);
        await request('post', 'api/user/edit-info', values);
        setInfo({...values, universityDegree: values.universityDegree.degree});
        setEdit(false);
        resetValues(e);
    };

    const setValue = (param) => {

        let result = {
            id: '',
            degree: ''
        }

        switch (param) {
            case "1":
                result.degree = 'Doctor';
                result.id = 1;
                break;
            case "2":
                result.degree = 'Master';
                result.id = 2;
                break;
            case "3":
                result.degree = 'Bachelor';
                result.id = 3;
                break;
            default:
                result.degree = '';
                break;
        }
        
        values.universityDegree = result;
    };

    return (
        <div className={`${styles['edit-card']} card bg-dark bg-gradient`}>
            <div className="card-body">
                <form onSubmit={(e) => onEditInfoSubmit(e)}>
                    <h4 className={styles['create-h']}>Edit your information</h4><hr />
                    <input className={styles['create-input']} type="text" name="town" placeholder="Enter a town..." value={values.town} onChange={(e) => onChangeHandler(e)} /><br />
                    <input className={styles['create-input']} type="text" name="address" placeholder="Enter a address..." value={values.address} onChange={(e) => onChangeHandler(e)} /><br />
                    <input className={styles['create-input']} type="text" name="country" placeholder="Enter a country..." value={values.country} onChange={(e) => onChangeHandler(e)} /><br />
                    <input className={styles['create-input']} type="text" name="university" placeholder="Enter a university..." value={values.university} onChange={(e) => onChangeHandler(e)} /><br />
                    <select className={styles['create-input']} id="cars" name="universityDegree" value={values.universityDegree} onChange={(e) => onChangeHandler(e)}>
                        <option value=""> --- Please Select Degree --- </option>
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