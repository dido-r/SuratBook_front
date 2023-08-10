import { useState, useEffect } from 'react';
import styles from './PostUserImage.module.css';
import { useDropBox } from '../../../hooks/useDropbox';

export function PostUserImage({
    path
}) {

    const [src, setSrc] = useState('https://cdn-icons-png.flaticon.com/512/149/149071.png');
    const { getFile } = useDropBox();

    useEffect(() => {

        const fetchData = async (path) => {

           
            if (path !== null && path !== '' && path !== undefined) {

                let res = await getFile(path);
                setSrc(URL.createObjectURL(res));
            }
        }
        fetchData(path);
    }, [path]);

    return (
        <img className={styles["card-user-img"]} src={src} alt="img" />
    );
}