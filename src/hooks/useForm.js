import { useState } from "react";

export function useForm(initValues) {

    const [values, setValues] = useState(initValues);

    const onChangeHandler = (e) => {

        setValues(x => ({ ...x, [e.target.name]: e.target.value }));
    }

    const resetValues = (e) => {

        setValues(initValues);
        let input = e.target.getElementsByTagName('input')[0];
        let select = e.target.getElementsByTagName('select')[0];
        
        if (input === undefined) {

            return;
        }

        if (input.type === 'file') {

            input.value = null;
        }

        if (select !== undefined) {

            select.selectedIndex = 0;
        }
    }

    return { values, onChangeHandler, resetValues }
}