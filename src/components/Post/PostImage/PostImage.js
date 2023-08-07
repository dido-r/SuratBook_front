import { useState } from "react";
import { useDropBox } from "../../../hooks/useDropbox";
import { useEffect } from "react";

export function PostImage({
    path
}) {

    const [source, setSource] = useState();
    const { getFile } = useDropBox();

    useEffect(() => {

        if (path !== null) {

            getFile(path).then(x => setSource(URL.createObjectURL(x)));

        }

    }, [path]);

    return (
        <img src={source} className="card-img-top" alt="..." />
    );
}