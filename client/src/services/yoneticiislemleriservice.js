const axios = require('axios')
const url = 'http://localhost:5000/api/yoneticiislemleri/';

class yoneticiislemleriservice {

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
    static addData(name, email, phone, password) {
        return axios.post(`${url}`, {
            name: name,
            email: email,
            phone: phone,
            password: password
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

    //ileti guncelle(PUT)
    static updateData(id, name, email, phone, password) {
        return axios.put(`${url}`, {
            id: id,
            name: name,
            email: email,
            phone: phone,
            password: password,

        });
    }

}
export default yoneticiislemleriservice;