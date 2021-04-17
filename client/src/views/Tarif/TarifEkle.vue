<template>
  <div>
    <md-tabs>
      <md-tab id="deneme" md-label="Türkçe" to="/tarif/tarifekle">
        <div class="row">
          <div class="col-sm-12">
            <md-field>
              <label>Başlık</label>
              <md-input id="name" v-model="name"></md-input>
            </md-field>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12"><ckeditor v-model="desc"></ckeditor></div>
        </div>
        <div class="row">
          <div class="col-sm-12">
      
            <br />
            <md-button
              class="md-raised md-primary"
              @click="Add"
              style="margin-left: 0%; width: 135px"
              >Ekle</md-button
            >
          </div>
        </div>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import axios from "axios";
import tarifservice from "../../services/tarifservice";
import CKEditor from "ckeditor4-vue";
import Vue from "vue";
Vue.use(CKEditor);
export default {
  name: "Dashboard",
  data() {
    return {
     
      name: "",
      desc: "",
    };
  },
  mounted() {},
  methods: {
   
    async Add() {
     
        try {
          await tarifservice
            .addTarif(this.name, this.desc)
            .then((res) => {
              if (res.status === 200) {
                this.id = res.data.id;
                window.location = `http://localhost:8080/#/tarif/tarifduzenle?id=${this.id}`;
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

/deep/ .md-content {
  border-radius: 0px 0px 20px 20px !important;
  height: auto !important;
}
</style>
