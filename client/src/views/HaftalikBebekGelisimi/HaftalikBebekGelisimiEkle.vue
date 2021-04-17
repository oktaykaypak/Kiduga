<template>
  <div>
    <div>
      <md-tabs>
        <md-tab
          id="deneme"
          md-label="Türkçe"
          to="/hbebekgelisimi/haftalikbebekgelisimiekle"
        >
          <md-field>
            <label>Başlık</label>
            <md-input id="name" v-model="name"></md-input>
          </md-field>

          <md-field>
            <label>Açıklama</label>
            <md-textarea id="desc" v-model="desc"></md-textarea>
          </md-field>
          <md-button class="md-raised md-primary" @click="Add" style="margin-left:0%;width:135px;">Ekle</md-button>
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import haftalikbebekgelisimiservice from "../../services/haftalikbebekgelisimiservice";

export default {
  name: "Dashboard",
  data() {
    return {
      id: "",
      name: "",
      desc: "",
      nameEn: "",
      descEn: "",
    };
  },
  mounted() {},
  methods: {
    async Add() {
      await haftalikbebekgelisimiservice
        .addData(this.name, this.desc, this.nameEn, this.descEn)
        .then((res) => {
          if (res.status === 200) {
            this.id = res.data.id;
            window.location = `http://localhost:8080/#/hbebekgelisimi/haftalikbebekduzenle?id=${this.id}`;
          }
        });
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
