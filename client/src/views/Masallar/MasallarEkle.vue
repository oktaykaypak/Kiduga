<template>
  <div>
    <md-tabs>
      <md-tab id="deneme" md-label="Türkçe" to="/masalislemleri/masallarekle">
        <md-field>
          <label>Başlık</label>
          <md-input id="name" v-model="name"></md-input>
        </md-field>

        <md-field>
          <label>Açıklama</label>
          <md-textarea id="desc" v-model="desc"></md-textarea>
        </md-field>

        <md-button class="md-raised md-primary" @click="Add" style="margin-left:0%;width:135px;"
          >Ekle</md-button
        >
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import axios from "axios";
import masallarservice from "../../services/masallarservice";

export default {
  name: "Dashboard",
  data() {
    return {
      name: "",
      product: {
        selectedImage: null,
        selectedImage2: null,
      },
      desc: "",
      nameEn: "",
      descEn: "",
      file: null,
      file2: null,
      file3: null,
      file4: null,
      img_url: "",
      img_name: "",
      img_url2: "",
      img_name2: "",
      mp3_url: "",
      mp3_name: "",
      mp3_url2: "",
      mp3_name2: "",
    };
  },
  mounted() {},
  methods: {
    async Add() {
      try{
          await masallarservice.addData(
            this.name,
            this.desc,
            this.nameEn,
            this.descEn,
            this.img_url,
            this.img_url2,
            this.mp3_url,
            this.mp3_url2
          ).then((res) => {
            if (res.status === 200) {
              this.id = res.data.id;
              window.location = `http://localhost:8080/#/masalislemleri/masallarduzenle?id=${this.id}`;
            }
          });
        } catch (err) {
          console.log(err);
        }
       
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
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
.row {
  * {
    margin-bottom: 15px;
    width: 100%;
  }
}

/deep/ .md-tabs-navigation {
  border-radius: 20px 20px 0px 0px !important;
}

/deep/ .md-content{
  border-radius: 0px 0px 20px 20px !important;
  height: auto !important;
}
</style>
