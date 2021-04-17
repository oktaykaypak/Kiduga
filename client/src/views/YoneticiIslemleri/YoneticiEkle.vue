<template>
  <div>
    <div>
      
      <md-tabs>
        <md-tab id="deneme" md-label="Yönetici" to="/yonetici/yoneticiekle">
          <md-field>
            <label>Ad Soyad</label>
            <md-input id="name" v-model="name"></md-input>
          </md-field>

          <md-field>
            <label>Email</label>
            <md-input id="email" v-model="email"></md-input>
          </md-field>

          <md-field>
            <label>Telefon</label>
            <md-input id="phone" v-model="phone"></md-input>
          </md-field>

          <md-field>
            <label>Şifre</label>
            <md-input id="password" v-model="password" type="password"></md-input>
          </md-field>

          <md-button class="md-raised md-primary" @click="Add" style="margin-left:0%;width:135px;">Ekle</md-button>
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import yoneticiislemleriservice from "../../services/yoneticiislemleriservice";

export default {
  name: "Dashboard",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      password: "",
    };
  },
  mounted() {},
  methods: {
    async Add() {
      
      try {
        await yoneticiislemleriservice.addData(
          this.name,
          this.email,
          this.phone,
          this.password
        ).then((res) => {
            if (res.status === 200) {
              this.id = res.data.id;
              window.location = `http://localhost:8080/#/yonetici/yoneticiduzenle?id=${this.id}`;
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    authorization() {
      let token = {
        token:localStorage.getItem('token')
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
  },
  
  async created() {
    if(localStorage.getItem('token') === null){
      this.$router.push('/pages/login');
    }else{
      this.authorization()
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
}
</style>
