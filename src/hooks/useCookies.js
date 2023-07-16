import { Cookies } from "react-cookie";

export function useCurrentUser() {

    var cookies = new Cookies();
    var id = cookies.get('surat_auth');
    var name = cookies.get('surat_name');
    var token = cookies.get('surat_token');
    
    let user = {
        userId: id,
        userName: name,
        userToken: token
    };

    return user;
}