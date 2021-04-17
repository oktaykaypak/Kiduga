const axios = require('axios')
const url = 'http://localhost:5000/api/kullaniciislemleri/';

class kullaniciislemleriservice {

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
    static addData(name, link, desc, nameEn, descEn) {
        return axios.post(`${url}`, {
            name: name,
            link: link,
            desc: desc,
            nameEn: nameEn,
            descEn: descEn
        });
    }

    static addDataChild(id, name, dateofbirth, gender, img_url) {
        return axios.post(`${url}2`, {
            id: id,
            name: name,
            dateofbirth: dateofbirth,
            gender: gender,
            img_url: img_url
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

    static deleteChild(id, childId) {
        return axios.delete(`${url}2`, {
            params: {
                id: id,
                childId: childId
            }
        });
    }

    //ileti guncelle(PUT)
    static updateData(id, name, email, password, phone) {
        return axios.put(`${url}`, {
            id: id,
            name: name,
            email: email,
            password: password,
            phone: phone

        });
    }

    static updateChild(id, arrayId, name, dateofbirth, gender, img_url) {
        return axios.put(`${url}2`, {
            id: id,
            arrayId: arrayId,
            name: name,
            dateofbirth: dateofbirth,
            gender: gender,
            img_url: img_url

        });
    }

}
export default kullaniciislemleriservice;