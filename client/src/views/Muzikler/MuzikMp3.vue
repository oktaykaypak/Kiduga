<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <div class="row">
        <div class="col-md-2"></div>
        <div
          class="col-md-4"
          style="
            border: 1px rgb(216, 219, 224) solid;
            padding-bottom: 10px;
            align-items: center;
            justify-content: center;
            text-align: center;
            float: right;
            overflow: hidden;
            margin-right: 15px;
          "
        >
          <br />
          <h5>Türkçe Ses Dosyası</h5>
          <div class="col">
            <div class="row">
              <audio
                controls
                v-if="masallar != null"
                style="margin-left: 10%; margin-right: 10%; width: 80%"
              >
                <source
                  :src="
                    'http://localhost:5000/' + masallar[0].detail.tr.mp3_url
                  "
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </div>
            <br />
            <div class="row">
              <input
                type="file"
                ref="file"
                name="file"
                @change="onChange()"
                style="margin-left: 30%; margin-right: 30%; width: 40%"
              />
            </div>
            <div class="row">
              <md-button
                class="md-raised md-accent"
                style="
                  margin-left: 35%;
                  margin-right: 35%;
                  width: 30% !important;
                "
                @click="Delete('tr')"
                >DOSYAYI SİL</md-button
              >
            </div>
          </div>
        </div>
        <div
          class="col-md-4"
          style="
            border: 1px rgb(216, 219, 224) solid;
            padding-bottom: 10px;
            align-items: center;
            justify-content: center;
            text-align: center;
            float: left;
            overflow: hidden;
            margin-left: 15px;
          "
        >
          <br />
          <h5>İngilizce Ses Dosyası</h5>
          <div class="col">
            <div class="row">
              <audio
                controls
                v-if="masallar != null"
                style="margin-left: 10%; margin-right: 10%; width: 80%"
              >
                <source
                  :src="
                    'http://localhost:5000/' + masallar[0].detail.en.mp3_url
                  "
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </div>
            <br />
            <div class="row">
              <input
                type="file"
                ref="file2"
                name="file"
                @change="onChange2()"
                style="margin-left: 30%; margin-right: 30%; width: 40%"
              />
            </div>
            <div class="row">
              <md-button
                class="md-raised md-accent"
                style="
                  margin-left: 35%;
                  margin-right: 35%;
                  width: 30% !important;
                "
                @click="Delete('en')"
                >DOSYAYI SİL</md-button
              >
            </div>
          </div>
        </div>
      </div>
      <br /><br />
      <div class="row">
        <md-button
          class="md-raised md-primary"
          style="
            margin-right: 35% !important;
            margin-left: 45% !important;
            width: 10%;
          "
          @click="Add"
          >Dosyaları Ekle</md-button
        ><!-- 
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
import muzikservice from "../../services/muzikservice";
import { VclFacebook, VclInstagram } from "vue-content-loading";

export default {
  name: "MuzikMp3",
  components: {
    VclFacebook,
    VclInstagram,
  },
  data() {
    return {
      masallar: null,
      product: {
        selectedImage: null,
        selectedImage2: null,
      },
      id: "",
      file: null,
      file2: null,
      mp3_url: null,
      mp3_url2: null,
      mp3_name: null,
      mp3_name2: null,
      isLoading: true,
    };
  },
  methods: {
    onChange(e) {
      this.file = this.$refs.file.files[0];
      let tmpNameFormat = this.file.name.split(".")[1];
      let tmpName = this.getUniqid(16);

      this.mp3_url = "api/uploads/" + tmpName + "." + tmpNameFormat;
      this.mp3_name = tmpName + "." + tmpNameFormat;
    },
    onChange2(e) {
      this.file2 = this.$refs.file2.files[0];
      let tmpNameFormat = this.file2.name.split(".")[1];
      let tmpName = this.getUniqid(16);

      this.mp3_url2 = "api/uploads/" + tmpName + "." + tmpNameFormat;
      this.mp3_name2 = tmpName + "." + tmpNameFormat;
    },
    async Add() {
      if (this.file != null || this.file2 != null) {
        try {
          if (this.file != null) {
            const formData = new FormData();
            formData.append("file", this.file);
            await axios
              .post(
                `http://localhost:5000/api/uploads/${this.mp3_name}`,
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
                `http://localhost:5000/api/uploads/${this.mp3_name2}`,
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
          await muzikservice.addMP3(this.id, this.mp3_url, this.mp3_url2);
          window.location.reload(1);
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Lütfen Ses Dosyası Ekleyiniz.");
      }
    },
    async Delete(language) {
      await muzikservice.deleteMP3(this.id, language);
      window.location.reload(1);
    },
    async Update(photoId) {
      await muzikservice.updatePhoto(
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
      this.masallar = await muzikservice.getData2(id);
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

input[type="file"] {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 250px;
  padding-bottom: 15px;
}

audio:not(.md-image) {
  height: 46px !important;
}
</style>
