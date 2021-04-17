<template>
  <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
  <div v-else class="genel">
    <div class="row">
      <div class="card offset-4 col-md-4">
        <div class="card-body tex-center d-flex align-items-center flex-column">
          <img
            style="height: 250px"
            class="img-responsive text-center mb-3"
            :src="
              product.selectedImage == null
                ? oyuncaklar[0].img_url == false
                  ? 'http://localhost:5000/api/uploads/dikdortgen.png'
                  : 'http://localhost:5000/' + oyuncaklar[0].img_url
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
            Görsel Seçiniz
          </button>
        </div>
      </div>
    </div>
    <br /><br />
    <div class="row">
      <div class="col">
        <md-button
          class="md-raised md-primary"
          style="
            margin-right: 1% !important;
            margin-left: 39% !important;
            width: 10%;
          "
          @click="Add"
          >Yükle</md-button
        >

        <md-button
          class="md-raised md-accent"
          style="
            margin-right: 39% !important;
            margin-left: 1% !important;
            width: 10%;
          "
          @click="Delete"
          >Sil</md-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import tarifservice from "../../services/tarifservice";
import { VclFacebook, VclInstagram } from "vue-content-loading";

export default {
  name: "TarifPhotos",
  components: {
    VclFacebook,
    VclInstagram,
  },
  data() {
    return {
      oyuncaklar: [],
      product: {
        selectedImage: null,
      },
      id: "",
      file: null,
      img_url: null,
      img_name: null,
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
    async Add() {
      if (this.file != null) {
        try {
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

          await tarifservice.addPhoto(this.id, this.img_url);
          window.location.reload(1);
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Lütfen Görsel Ekleyiniz.");
      }
    },
    async Delete() {
      await tarifservice.deletePhoto(this.id);
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
      this.oyuncaklar = await tarifservice.getData2(id);
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

.container {
  min-height: 500px;
}
</style>
