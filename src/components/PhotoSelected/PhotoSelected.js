import styles from './PhotoSelected.module.css';

export function PhotoSelected({
    setModal
}) {

    const onCloseModal = () => {
        setModal(false);
    }

    return (
        <div className={styles['modal-background']}>
            <div className={styles['modal-content']}>
                <span className={styles['close-modal']} onClick={onCloseModal}>&times;</span>
                <span className={styles['modal-likes']}>
                    <span className="text-light">0 Likes</span>
                    <button className="btn btn-outline-light">Like</button>
                </span>
                <img className={styles['modal-img']} src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img"/>
            </div>
        </div>

    );
}