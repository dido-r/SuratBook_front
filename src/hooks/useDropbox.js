import { useParams } from 'react-router-dom';
import { Dropbox, DropboxAuth } from '../../node_modules/dropbox/dist/Dropbox-sdk.js';
import { useCurrentUser } from '../hooks/useCookies.js';

export function useDropBox() {

    const param = useParams();
    const user = useCurrentUser()

    let auth = new DropboxAuth({
        clientId: '5jhx44i9i2u7m7g',
        clientSecret: 'jwz7qss6sfotdpf',
        accessToken: "",
        refreshToken: "HoCNfBc0yDkAAAAAAAAAAb6WeQTjejNJjl2t-XpOMjEsi05ZCTlERpH4po-FVx_r",
        accessTokenExpiresAt: new Date("1995-12-17T03:24:00"),
    });

    let dbx = new Dropbox({ auth: auth });

    const uploadFile = async (file) => {

        try {

            let dboPath = param.id === undefined ? `/${user.userId}/` : `/${param.id}/`
            let res = await dbx.filesUpload({ path: dboPath + file.name, contents: file, mode: "add"});
            return res.result;

        } catch (error) {
            console.log(error)
            console.log(error.error)
            return new Error();
        }
    }

    const getFile = async (filePath) => {
        try {

            let res = await dbx.filesGetThumbnail({ path: filePath, size: 'w640h480' });
            return res.result.fileBlob;

        } catch (error) {

            return new Error();
        }
    }

    const deleteFile = async (filePath) => {
        try {

            await dbx.filesDelete({ path: filePath});

        } catch (error) {

            return new Error();
        }
    }

    return { uploadFile, getFile, deleteFile };
}