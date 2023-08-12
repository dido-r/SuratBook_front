import { useState } from "react";
import { useDropBox } from "../../../hooks/useDropbox";
import { useEffect } from "react";
import styles from './PostImage.module.css';

export function PostImage({
    path
}) {

    const [source, setSource] = useState();
    const { getFile } = useDropBox();

    useEffect(() => {
        
        if (path !== null && path !== undefined && path !== '') {

            getFile(path).then(x => setSource(URL.createObjectURL(x)));

        }

    }, [path]);

    return (
        <img src={source} className={`${styles['post-img']} card-img-top`} alt="..." />
    );
}