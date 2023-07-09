import styles from './CreatePost.module.css';

export function CreatePost() {

    return (

        <div className={`${styles['home-card']} card bg-dark bg-gradient`}>
                <div className="card-body">
                    <form>
                        <h4 className={styles['create-h']}>Create post</h4><hr />
                        <input className={styles['create-input']} type="text" name="title" placeholder="Enter a title..."/><br />
                        <textarea className={styles['create-ta']} name="content" rows="3" placeholder="Write your post here..." />
                        <input className={styles['create-file']} type="file"/><br/>
                        <button className={`${styles['post-create-btn']} btn btn-outline-light`}>Submit</button>
                    </form>
                </div>
            </div>
    );
}