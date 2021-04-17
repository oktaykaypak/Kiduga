const axios = require('axios')
const url = 'http://localhost:5000/api/keywords/';

class keyWords {

    static getData() {
        return new Promise(async (resolve, reject) => {
            try {

                const res = await axios.get(`${url}`, {});
                const data = res.data;
                resolve(
                    data.map(oyuncak => ({
                        ...oyuncak
                    }))
                );


            } catch (err) {
                reject(err);
            }

        });

    }
    static getData2() {
        return new Promise(async (resolve, reject) => {
            try {

                const res = await axios.get(`${url}2`, {});
                const data = res.data;
                resolve(
                    data.map(oyuncak => ({
                        ...oyuncak
                    }))
                );


            } catch (err) {
                reject(err);
            }

        });

    }
    static addPhoto(img_url, id) {
        return axios.put(`${url}photo`, {
            id: id,
            img_url: img_url,
        });
    }

    static updateApi(keys) {
        return axios.put(`${url}uApi`, {

            keys: keys,
        });
    }


    static updatePop(trTitle, trMessage, trOkay, trCancel, enTitle, enMessage, enOkay, enCancel) {
        return axios.put(`${url}uPop`, {

            tr: {
                title: trTitle,
                message: trMessage,
                okay: trOkay,
                cancel: trCancel,
            },
            en: {
                title: enTitle,
                message: enMessage,
                okay: enOkay,
                cancel: enCancel,
            }
        });
    }

    static updateKeyWord(keys) {
        return axios.put(`${url}uKeyWord`, {

            keys: keys,
        });
    }


    static deletePhoto(id) {
        return axios.delete(`${url}photo`, {
            params: {
                id: id,
            }
        });
    }

}
export default keyWords;