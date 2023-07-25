import styles from './Comment.module.css';

export function Comment({
    comments
}) {

    return (
        comments.map(x => (
            <div key={x.id} className={styles['comment']}>
                <div>
                    <img className={styles['card-user-comment-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
                </div>
                <div className={`${styles['comment-card']} text-light`}>
                    <p className={styles['comment-username']}>{x.ownerName}</p>
                    <p>{x.content}</p>
                </div>
            </div>
        ))
    );
}