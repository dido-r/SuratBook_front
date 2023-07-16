import axios from "axios";
import { Cookies } from "react-cookie";

const host = 'https://localhost:7062/';

export async function request(method, path, obj) {

    var cookies = new Cookies();
    var token = cookies.get('surat_token');

    let options = {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        withCredentials: true
    };

    switch (method) {
        case 'get':
            try {
                let response = await axios.get(host + path, options);

                if (response.ok === false) {

                    throw new Error();
                }

                return response;

            } catch (err) {

                throw new Error();
            }
        case 'post':
            try {
                let response = await axios.post(host + path, obj, options);

                if (response.ok === false) {

                    throw new Error();
                }

                return response;

            } catch (err) {

                throw new Error();
            }
        case 'put':
            try {
                let response = await axios.put(host + path, obj, options);

                if (response.ok === false) {

                    throw new Error();
                }

                return response;

            } catch (err) {

                throw new Error();
            }
        case 'delete':
            try {
                let response = await axios.delete(host + path, options);

                if (response.ok === false) {

                    throw new Error();
                }

                return response;

            } catch (err) {

                throw new Error();
            }
            default: break;
      }
}