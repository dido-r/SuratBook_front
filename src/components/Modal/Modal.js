import styles from './Modal.module.css';

export function Modal({
    setModal,
    message
}) {

    const onCloseModal = () => {
        setModal(false);
    }

    return (
        <div className={styles['modal-background']}>
            <div className={styles['modal-content']}>
                <span className={styles['close-modal']} onClick={onCloseModal}>&times;</span>
                <p>{message}</p>
            </div>
        </div>

    );
}