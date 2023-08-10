import { useState, useEffect } from 'react';
import { useDropBox } from '../../../hooks/useDropbox';
import styles from './CommentUserImage.module.css';

export function CommetnUserImage({
    path
}){

    const [source, setSource] = useState('https://cdn-icons-png.flaticon.com/512/149/149071.png');
    const { getFile } = useDropBox();

    useEffect(() => {

        if(path !== null && path !== '' && path !== undefined) {
            
            getFile(path).then(x => setSource(URL.createObjectURL(x)));

        }
    
},[path]);

    return (
        <img className={styles['card-user-comment-img']} src={source} alt="img" />
    );
}