const axios = require('axios')
const url = 'http://localhost:5000/api/masallar/';

class masallarservice {

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
    static addData(name, desc, nameEn, descEn, img_url, img_url2, mp3_url, mp3_url2) {
        return axios.post(`${url}`, {
            name: name,
            desc: desc,
            nameEn: nameEn,
            descEn: descEn,
            img_url: img_url,
            img_url2: img_url2,
            mp3_url: mp3_url,
            mp3_url2: mp3_url2
        });
    }

    static addPhoto(id, img_url, img_url2) {
        return axios.put(`${url}photo`, {
            id: id,
            img_url: img_url,
            img_url2: img_url2
        });
    }

    static addMP3(id, mp3_url, mp3_url2) {
        return axios.put(`${url}mp3`, {
            id: id,
            mp3_url: mp3_url,
            mp3_url2: mp3_url2
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

    static deleteMP3(id, language) {
        return axios.delete(`${url}mp3`, {
            params: {
                id: id,
                language: language
            }
        });
    }

    static deletePhoto(id, language) {
        return axios.delete(`${url}photo`, {
            params: {
                id: id,
                language: language
            }
        });
    }

    static deleteData2(id) {
        return axios.delete(`${url}2`, {
            params: {
                id: id
            }
        });
    }

    //ileti guncelle(PUT)
    static updateData(id, name, desc, nameEn, descEn, img_url, img_url2, mp3_url, mp3_url2, showInPage, row_number) {
        return axios.put(`${url}`, {
            id: id,
            name: name,
            desc: desc,
            nameEn: nameEn,
            descEn: descEn,
            img_url: img_url,
            img_url2: img_url2,
            mp3_url: mp3_url,
            mp3_url2: mp3_url2,
            showInPage: showInPage,
            row_number: row_number

        });
    }

    static updateData2(id, name, desc, nameEn, descEn, img_url, img_url2, mp3_url, mp3_url2) {
        return axios.put(`${url}2`, {
            id: id,
            name: name,
            desc: desc,
            nameEn: nameEn,
            descEn: descEn,
            img_url: img_url,
            img_url2: img_url2,
            mp3_url: mp3_url,
            mp3_url2: mp3_url2

        });
    }

}
export default masallarservice;