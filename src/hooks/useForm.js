import { useState } from "react";

export function useForm(initValues) {

    const [values, setValues] = useState(initValues);

    const onChangeHandler = (e) => {

        // if (e.target.type === 'checkbox') {

        //     setValues(x => ({ ...x, [e.target.name]: e.target.checked }));
        // }

        setValues(x => ({ ...x, [e.target.name]: e.target.value }));
    }

    const resetValues = (e) => {

        let input = e.target.getElementsByTagName('input')[0];
        
        if (input.type === 'file') {

            input.value = null;
        }

        setValues(initValues);
    }

    return { values, onChangeHandler, resetValues }
}