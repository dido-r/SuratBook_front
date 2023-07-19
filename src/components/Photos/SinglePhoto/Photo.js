import { useEffect, useState } from "react";
import styles from './Photo.module.css'
import { useDropBox } from "../../../hooks/useDropbox";
import { PhotoSelected } from "../PhotoSelected/PhotoSelected";

export function Photo({
    pic,
    setPhotos
}) {

    const { getFile } = useDropBox();
    const [src, setSrc] = useState('');
    const [selectedSrc, setSelectedSrc] = useState('');
    const [selected, setSelected] = useState(false);

    useEffect(() => {

        const fetchData = async () => {

            let res = await getFile(pic.dropboxPath)
            setSrc(URL.createObjectURL(res));
        }
        fetchData();
    }, [pic.dropboxPath]);

    const onSelect = (e) => {
        
        setSelectedSrc(e.target.src);
        setSelected(true);
    }

    return (
        <>
            {selected ? <PhotoSelected setPhotos={setPhotos} setSelected={setSelected} selectedSrc={selectedSrc} pic={pic}/> : null}
            <img className={styles['user-list-img']} src={src} alt="img" onClick={(e) => onSelect(e)} />
        </>
    );
}