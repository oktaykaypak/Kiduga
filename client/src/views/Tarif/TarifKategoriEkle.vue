<template>
  <div>
    <md-tabs>
      <md-tab id="deneme" md-label="EKLE" to="/tarifkategori/tarifkategoriekle">
        <md-field>
          <label>Kategori Adı (Türkçe)</label>
          <md-input id="name" v-model="name"></md-input>
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
import tarifservice from "../../services/tarifservice";

export default {
  name: "Dashboard",
  data() {
    return {
        id:"",
      name: "",
    };
  },
  mounted() {},
  methods: {
    async Add() {
      try{
          await tarifservice.addCategory(
            this.name,
          ).then((res) => {
            if (res.status === 200) {
              this.id = res.data.id;
              window.location = `http://localhost:8080/#/tarifkategori/tarifkategoriduzenle?id=${this.id}`;
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
