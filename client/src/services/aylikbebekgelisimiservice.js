const axios = require('axios')
const url = 'http://localhost:5000/api/aylikbebekgelisimi/';

class aylikbebekgelisimiservice {

    static getData() {
        return new Promise(async(resolve, reject) => {
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

    static getData2(id) {
            return new Promise(async(resolve, reject) => {
                try {

                    const res = await axios.get(`${url}${id}`, {});
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
        //ileti ekle (POST)
    static addData(name, desc, nameEn, descEn) {
        return axios.post(`${url}`, {
            name: name,
            desc: desc,
            nameEn: nameEn,
            descEn: descEn
        });
    }

    static addPhoto(id, img_url, type, row_number) {
        return axios.post(`${url}2`, {
            id: id,
            img_url: img_url,
            type: type,
            row_number: row_number
        });
    }

    //ileti sil (DELETE)
    static deleteData(id) {
        return axios.delete(`${url}`, {
            params: {
                id: id,
            }
        });
    }

    static deletePhoto(id, photoId) {
        return axios.delete(`${url}2`, {
            params: {
                id: id,
                photoId: photoId
            }
        });
    }

    //ileti guncelle(PUT)
    static updateData(id, name, desc, nameEn, descEn, row_number, foodDesc, sleepDesc, toiletDesc, activityDesc, foodDescEn, sleepDescEn, toiletDescEn, activityDescEn) {
        return axios.put(`${url}`, {
            id: id,
            name: name,
            desc: desc,
            nameEn: nameEn,
            descEn: descEn,
            row_number: row_number,
            foodDesc: foodDesc,
            sleepDesc: sleepDesc,
            toiletDesc: toiletDesc,
            activityDesc: activityDesc,
            foodDescEn: foodDescEn,
            sleepDescEn: sleepDescEn,
            toiletDescEn: toiletDescEn,
            activityDescEn: activityDescEn,

        });
    }

    static updatePhoto(id, photoId, type, row_number) {
        return axios.put(`${url}2`, {
            id: id,
            photoId: photoId,
            type: type,
            row_number: row_number

        });
    }

}
export default aylikbebekgelisimiservice;