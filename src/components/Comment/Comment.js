import styles from './Comment.module.css';
import { CommetnUserImage } from './CommetnUserImage/CommetnUserImage';

export function Comment({
    comments
}) {

    return (
        comments.map(x => (
            <div key={x.id} className={styles['comment']}>
                <div>
                    <CommetnUserImage path={x.ownerImage}/>
                </div>
                <div className={`${styles['comment-card']} text-light`}>
                    <p className={styles['comment-username']}>{x.ownerName}</p>
                    <p>{x.content}</p>
                </div>
            </div>
        ))
    );
}