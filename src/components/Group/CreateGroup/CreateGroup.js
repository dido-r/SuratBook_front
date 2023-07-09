import styles from './CreateGroup.module.css'

export function CreateGroup() {

    return (
        <div className={`${styles['create-card']} card bg-dark bg-gradient`}>
            <div className="card-body">
                <form>
                    <h4 className={styles['create-h']}>Create group</h4><hr />
                    <input className={styles['create-input']} type="text" name="title" placeholder="Enter a group name..." /><br />
                    <textarea className={styles['create-ta']} name="content" rows="3" placeholder="Group description..." /><br />
                    <button className="btn btn-outline-light">Create group</button>
                </form>
            </div>
        </div>
    );
}