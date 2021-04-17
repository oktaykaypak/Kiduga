<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <md-field>
        <label>Başlık</label>
        <md-input id="name" v-model="name"></md-input>
      </md-field>
      Sıra Numarası:
      <md-input
        v-model="row_number"
        type="number"
        style="margin-bottom: 1%; margin-right: 2%; width: 10%"
      ></md-input>

      <md-field>
        <label>Açıklama</label>
        <md-textarea id="desc" v-model="desc"></md-textarea>
      </md-field>
    </div>
  </div>
</template>

<script>
import haftalikbebekgelisimiservice from "../../services/haftalikbebekgelisimiservice";
import axios from "axios";

import { VclFacebook, VclInstagram } from "vue-content-loading";

export default {
  name: "HaftalikBebekGelisimiDuzenle",
  components: {
    VclFacebook,
    VclInstagram,
  },
  data() {
    return {
      hbglist: this.hbglist,
      name: "",
      desc: "",
      isLoading: true,
      row_number: null,
    };
  },
  props: {
    hbglist: {
      type: Array,
    },
  },

  watch: {
    name: function () {
      // Emit this information to the parents component
      this.$emit("EditTr", this.name, this.desc, this.row_number);
    },
    desc: function () {
      // Emit this information to the parents component
      this.$emit("EditTr", this.name, this.desc, this.row_number);
    },
    row_number: function () {
      // Emit this information to the parents component
      this.$emit("EditTr", this.name, this.desc, this.row_number);
    },
  },
  methods: {
    Doldur() {
      setTimeout(() => {
        try {
        this.name = this.hbglist[0].detail.tr.name;
        this.desc = this.hbglist[0].detail.tr.desc;
        this.row_number = this.hbglist[0].row_number;
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
    this.Doldur();
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
</style>
