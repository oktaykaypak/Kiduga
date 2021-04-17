const axios = require('axios')
const url = 'http://localhost:5000/api/blog/';

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

    static getCategories() {
        return new Promise(async(resolve, reject) => {
            try {

                const res = await axios.get(`${url}categories`, {});
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

    static getCategoriesWId(id) {
        return new Promise(async(resolve, reject) => {
            try {

                const res = await axios.get(`${url}categories/${id}`, {});
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
    static addBlog(name, desc, categoryId) {
        return axios.post(`${url}`, {
            name: name,
            desc: desc,
            categoryId: categoryId,
        });
    }

    static addCategory(name) {
        return axios.post(`${url}addcategory`, {
            name: name,
        });
    }

    static addPhoto(id, img_url) {
        return axios.put(`${url}photo`, {
            id: id,
            img_url: img_url,
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

    static deleteMP3(id) {
        return axios.delete(`${url}mp3`, {
            params: {
                id: id,
            }
        });
    }

    static deletePhoto(id) {
        return axios.delete(`${url}photo`, {
            params: {
                id: id,
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

    static deleteCategories(id) {
        return axios.delete(`${url}categories`, {
            params: {
                id: id
            }
        });
    }

    //ileti guncelle(PUT)
    static updateBlog(id, name, desc, nameEn, descEn, categoryId, showInPage, startDate, endDate, row_number) {
        return axios.put(`${url}`, {
            id: id,
            name: name,
            desc: desc,
            nameEn: nameEn,
            descEn: descEn,
            categoryId: categoryId,
            showInPage: showInPage,
            startDate: startDate,
            endDate: endDate,
            row_number: row_number
        });
    }

    //ileti guncelle(PUT)
    static updateCategory(id, name, nameEn) {
        return axios.put(`${url}category`, {
            id: id,
            name: name,
            nameEn: nameEn,

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