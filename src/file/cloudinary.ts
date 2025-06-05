import {v2} from 'cloudinary';

export const CloudnianaryProvider = {
    provide: "CLOUDINARY",
    useFactory: () => {
        return v2.config({
            cloud_name: "dmjz50jgy",
            api_key: "499538192146887",
            api_secret: "A_Iiooa7s8jNLixG8nvUqx5LmlI"
        })
    }
}