import axios from "axios";
import { Cookies } from "react-cookie";

const host = 'http://localhost:5000/';

export async function request(method, path, obj, mimeType) {

    var cookies = new Cookies();
    var token = cookies.get('surat_token');

    let options = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
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

                return err;
            }
            default: break;
      }
}