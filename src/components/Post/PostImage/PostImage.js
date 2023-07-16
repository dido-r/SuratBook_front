import { useState } from "react";
import { useDropBox } from "../../../hooks/useDropbox";
import { useEffect } from "react";

export function PostImage({
    path
}) {
    
    const [source, setSource] = useState();
    const { getFile } = useDropBox();

    useEffect(() => {

            try {
                
                getFile(path).then(x => setSource(URL.createObjectURL(x)));

            } catch(error) {

                console.log(error)
            }
        
    },[path]);

    return (
        <img src={source} className="card-img-top" alt="..." />
    );
}