import styles from './Comment.module.css';

export function Comment() {

    return (
        <div className={styles['comment']}>
            <div>
                <img className={styles['card-user-comment-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
            </div>
            <div className={`${styles['comment-card']} text-light`}>
                <p className={styles['comment-username']}>Username</p>
                <p>Some comment text</p>
            </div>
        </div>
    );
}