import { useEffect, useState } from 'react';
import { useDropBox } from '../../../../hooks/useDropbox';
import styles from './ImageView.module.css';

export function ImageView({
    setSelected,
    path
}) {

    const [src, setSrc] = useState('');
    const { getFile } = useDropBox();

    useEffect(() => {

        const fetchData = async () => {

            let res = await getFile(path);
            setSrc(URL.createObjectURL(res));
        }
        fetchData();

    }, []);

    return (

        <div className={styles['modal-background']}>
            <div className={styles['modal-content']}>
                <span className={styles['close-modal']} onClick={() => setSelected(undefined)}>&times;</span>
                <img className={styles['modal-img']} src={src} alt="img" />
            </div>
        </div>
    );
}