import styles from './EditGroupInfo.module.css';

export function EditGroupInfo({ setEdit }) {

    return (
        <div className={`${styles['edit-card']} card bg-dark bg-gradient`}>
            <div className="card-body">
                <form>
                    <h4 className={styles['create-h']}>Edit your information</h4><hr />
                    <input className={styles['create-input']} type="text" name="name" placeholder="Enter a name..." /><br />
                    <textarea className={styles['create-input']} type="text" name="description" placeholder="Enter a description..." /><br />
                    <button className="btn btn-outline-light" onClick={() => {setEdit(false)} }>Edit</button>
                </form>
            </div>
        </div>
    );
}