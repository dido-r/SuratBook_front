import styles from './CreateComment.module.css';

export function CreateComment() {

    return (
        <div className={styles['create-comment']}>
            <hr className={styles['comment-hr']} />
                <form className={styles['comment-form']}>
                    <input className={styles['create-input']} type="text" name="title" placeholder="Enter a comment..." />
                </form>
            <hr className={styles['comment-hr']} />
        </div>
    );
}