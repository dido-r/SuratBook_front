import { useState } from "react";

export function useForm(initValues) {

    const [values, setValues] = useState(initValues);

    const onChangeHandler = (e) => {

        if (e.target.type === 'checkbox') {

            setValues(x => ({ ...x, [e.target.name]: e.target.checked }));
            
        }else{

            setValues(x => ({ ...x, [e.target.name]: e.target.value }));
        }
    }

    return { values, onChangeHandler }
}