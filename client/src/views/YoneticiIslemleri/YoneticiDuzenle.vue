<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <md-tabs>
        <md-tab id="deneme" md-label="Yönetici" to="/yonetici/yoneticiduzenle">
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
            <md-input
              id="password"
              v-model="password"
              type="password"
            ></md-input>
          </md-field>

          <md-button
            class="md-raised md-primary"
            @click="Edit"
            style="margin-left: 0%; width: 135px"
            >Kaydet</md-button
          >
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
import yoneticiislemleriservice from "../../services/yoneticiislemleriservice";
import axios from "axios";
import { VclFacebook, VclInstagram } from "vue-content-loading";

export default {
  name: "Dashboard",
  components: {
    VclFacebook,
    VclInstagram,
  },
  data() {
    return {
      adminList: [],
      id: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      isLoading: true,
    };
  },
  mounted() {
    
      this.Doldur();
      
    
  },
  methods: {
    async GetAdmins(id) {
      this.adminList = await yoneticiislemleriservice.getData2(id);
    },
    async Edit() {
      await yoneticiislemleriservice.updateData(
        this.id,
        this.name,
        this.email,
        this.phone,
        this.password
      );
      window.location.reload(1);
    },
    async Doldur() {
      setTimeout(() => {
        try {
          this.name = this.adminList[0].name;
          this.email = this.adminList[0].email;
          this.phone = this.adminList[0].phone;
          this.password = this.adminList[0].password;
          this.isLoading = false;
        } catch {
          this.Doldur();
        }
      }, 1000);
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
  },
  async created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/pages/login");
    } else {
      this.authorization();
    }
    this.id = this.$route.query.id;
    this.GetAdmins(this.id);
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

.md-raised {
  width: 135px;
  margin-left: 0px;
}

/deep/ .md-tabs-navigation {
  border-radius: 20px 20px 0px 0px !important;
}

/deep/ .md-content {
  border-radius: 0px 0px 20px 20px !important;
}
</style>
