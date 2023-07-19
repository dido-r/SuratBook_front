import styles from './PhotoSelected.module.css';

export function PhotoSelected({
    setSelected,
    selectedSrc
}) {

    const onCloseModal = () => {
        setSelected(false);
    }

    return (
        <div className={styles['modal-background']}>
            <div className={styles['modal-content']}>
                <span className={styles['close-modal']} onClick={onCloseModal}>&times;</span>
                <img className={styles['modal-img']} src={selectedSrc} alt="img" />
                <span className="text-light">0 Likes</span>
                <span className="text-light">0 Comments</span>
                <div className={styles['modal-buttons']}>
                    <button className="btn btn-outline-light">Like</button>
                    <button className="btn btn-outline-light">Comment</button>
                    <button className={'btn btn-outline-danger'}>Delete</button>
                </div>
            </div>
        </div>

    );
}