import { Dropbox, DropboxAuth } from '../../node_modules/dropbox/dist/Dropbox-sdk.js';
import { useCurrentUser } from '../hooks/useCookies.js'

export function useDropBox() {

    const user = useCurrentUser();

    let auth = new DropboxAuth({
        clientId: '5jhx44i9i2u7m7g',
        clientSecret: 'jwz7qss6sfotdpf',
        accessToken: "",
        refreshToken: "HoCNfBc0yDkAAAAAAAAAAb6WeQTjejNJjl2t-XpOMjEsi05ZCTlERpH4po-FVx_r",
        accessTokenExpiresAt: new Date("1995-12-17T03:24:00"),
    });

    let dbx = new Dropbox({ auth: auth });

    const uploadFile = async (file) => {

        //let file = e.target.getElementsByTagName('input')[0].files[0];

        try {

            let res = await dbx.filesUpload({ path: `/${user.userId}/` + file.name, contents: file });
            return res.result;

        } catch (error) {

            return new Error();
        }
    }

    const getFile = async (filePath) => {
        try {

            let res = await dbx.filesGetThumbnail({ path: filePath, size: 'w640h480' });
            return res.result.fileBlob;
            //setSrc(URL.createObjectURL(res.result.fileBlob));

        } catch (error) {

            return new Error();
        }
    }

    return { uploadFile, getFile };
}