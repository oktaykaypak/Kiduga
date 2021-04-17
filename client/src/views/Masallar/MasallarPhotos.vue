<template>
  <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
  <div v-else class="genel">
    <div class="row">
      <div class="card col-md-4" style="margin-left:auto;">
        <div class="card-body tex-center d-flex align-items-center flex-column">
          <img
            style="height: 250px; width: 250px;"
            class="img-responsive text-center mb-3"
            :src="
              product.selectedImage == null
                ? oyuncaklar[0].photos[0].img_url == false
                  ? 'http://localhost:5000/api/uploads/kare.png'
                  : 'http://localhost:5000/' + oyuncaklar[0].photos[0].img_url
                : product.selectedImage
            "
          />
          <input
            type="file"
            ref="file"
            name="file"
            style="display: none"
            @change="onChange($event)"
            class="form-control"
          />
          <button
            class="btn btn-success"
            type="button"
            @click="$refs.file.click()"
          >
            Listeleme Görseli Seçiniz
          </button>
          <md-button
            class="md-raised md-accent"
            style="margin-left: 10px !important; width: 135px"
            @click="Delete('list')"
            >DOSYAYI SİL</md-button
          >
        </div>
      </div>

      <div class="card col-md-4" style="margin-right:auto;">
        <div class="card-body tex-center d-flex align-items-center flex-column">
          <img
            style="height: 150px; width: 300px; margin-top: 10%;margin-bottom:auto;margin-left:auto;margin-right:auto;"
            class="img-responsive text-center mb-3"
            :src="
              product.selectedImage2 == null
                ? oyuncaklar[0].photos[1].img_url == false
                  ? 'http://localhost:5000/api/uploads/dikdortgen.png'
                  : 'http://localhost:5000/' + oyuncaklar[0].photos[1].img_url
                : product.selectedImage2
            "
          />
          <input
            type="file"
            ref="file2"
            name="file"
            style="display: none"
            @change="onChange2($event)"
            class="form-control"
          />
          <button
            class="btn btn-success"
            type="button"
            @click="$refs.file2.click()"
          >
            Detay Görseli Seçiniz
          </button>
          <md-button
            class="md-raised md-accent"
            style="margin-left: 10px !important; width: 135px"
            @click="Delete('detail')"
            >DOSYAYI SİL</md-button
          >
        </div>
      </div>
    </div>
    <br /><br />
    <div class="row">
      <div class="col">
        <md-button
          class="md-raised md-primary"
          style="margin-right: 35% !important; margin-left: 45% !important; width: 10%"
          @click="Add"
          >Dosyaları Ekle</md-button
        >
<!-- 
        <md-button
          class="md-raised md-accent"
          style="margin-left: 10px !important; width: 135px"
          @click="Delete('all')"
          >DOSYALARI SİL</md-button
        > -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import masallarservice from "../../services/masallarservice";
import { VclFacebook, VclInstagram } from "vue-content-loading";

export default {
  name: "MasallarPhotos",
  components: {
    VclFacebook,
    VclInstagram,
  },
  data() {
    return {
      oyuncaklar: [],
      product: {
        selectedImage: null,
        selectedImage2: null,
      },
      id: "",
      file: null,
      file2: null,
      img_url: null,
      img_url2: null,
      img_name: null,
      img_name2: null,
      isLoading: true,
    };
  },
  methods: {
    onChange(e) {
      let file = e.target.files[0];
      this.product.selectedImage = URL.createObjectURL(file);

      this.file = this.$refs.file.files[0];
      let tmpNameFormat = this.file.name.split(".")[1];
      let tmpName = this.getUniqid(16);

      this.img_url = "api/uploads/" + tmpName + "." + tmpNameFormat;
      this.img_name = tmpName + "." + tmpNameFormat;
    },
    onChange2(e) {
      let file2 = e.target.files[0];
      this.product.selectedImage2 = URL.createObjectURL(file2);

      this.file2 = this.$refs.file2.files[0];
      let tmpNameFormat = this.file2.name.split(".")[1];
      let tmpName = this.getUniqid(16);

      this.img_url2 = "api/uploads/" + tmpName + "." + tmpNameFormat;
      this.img_name2 = tmpName + "." + tmpNameFormat;
    },
    async Add() {
      if (this.file != null || this.file2 != null) {
        try {
          if (this.file != null) {
            const formData = new FormData();
            formData.append("file", this.file);
            await axios
              .post(
                `http://localhost:5000/api/uploads/${this.img_name}`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .then(function () {
                console.log("SUCCESS!!");
              })
              .catch(function () {
                console.log("FAILURE!!");
              });
          }
          if (this.file2 != null) {
            const formData = new FormData();
            formData.append("file", this.file2);
            await axios
              .post(
                `http://localhost:5000/api/uploads/${this.img_name2}`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .then(function () {
                console.log("SUCCESS!!");
              })
              .catch(function () {
                console.log("FAILURE!!");
              });
          }
          await masallarservice.addPhoto(this.id, this.img_url, this.img_url2);
          window.location.reload(1);
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Lütfen Görsel Ekleyiniz.");
      }
    },
    async Delete(language) {
      await masallarservice.deletePhoto(this.id, language);
      window.location.reload(1);
    },
    async Update(photoId) {
      await masallarservice.updatePhoto(
        this.id,
        photoId,
        this.type,
        this.row_number
      );
      window.location.reload(1);
    },
    authorization() {
      let token = {
        token: localStorage.getItem("token"),
      };

      axios.post("http://localhost:5000/api/login/2", token).then(
        (res) => {
          if (res.status === 200) {
          }
        },
        (err) => {
          localStorage.clear();
          this.$router.push("/pages/login");
        }
      );
    },
    async GetOyuncaklar(id) {
      this.oyuncaklar = await masallarservice.getData2(id);
      this.isLoading = false;
    },
    getUniqid(length) {
      let result = "";
      //var characters = '0123456789';
      //var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 1; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },

  async created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/pages/login");
    } else {
      this.authorization();
    }
    this.id = this.$route.query.id;
    this.GetOyuncaklar(this.id);
  },
};
</script>

<style>
.card {
  margin-right: 5px;
  margin-bottom: 5px;
  min-height: 400px;
  height: 55%;
}

.card:last-child {
  margin-right: 0px;
}

.col-md-2 {
  max-width: 15.666667% !important;
}

.col-md-3 {
  max-width: 24.562% !important;
}

.product-container {
  margin-left: 15px;
}

.genel {
  min-height: 450px;
}

.card-body {
  padding-bottom: 0rem !important;
  padding-top: 3rem !important;
}
</style>
