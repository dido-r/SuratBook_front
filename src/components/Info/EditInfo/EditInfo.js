import styles from './EditInfo.module.css';

export function EditInfo({ setEdit }) {

    return (
        <div className={`${styles['edit-card']} card bg-dark bg-gradient`}>
            <div className="card-body">
                <form>
                    <h4 className={styles['create-h']}>Edit your information</h4><hr />
                    <input className={styles['create-input']} type="text" name="name" placeholder="Enter a name..." /><br />
                    <input className={styles['create-input']} type="text" name="town" placeholder="Enter a town..." /><br />
                    <input className={styles['create-input']} type="text" name="address" placeholder="Enter a address..." /><br />
                    <input className={styles['create-input']} type="text" name="country" placeholder="Enter a country..." /><br />
                    <input className={styles['create-input']} type="text" name="university" placeholder="Enter a university..." /><br />
                    <input className={styles['create-input']} type="text" name="degree" placeholder="Enter a uni degree..." /><br />
                    <input className={styles['create-input']} type="text" name="school" placeholder="Enter a school..." /><br />
                    <button className="btn btn-outline-light" onClick={() => {setEdit(false)} }>Edit</button>
                </form>
            </div>
        </div>
    );
}