<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <md-field>
        <label>Başlık</label>
        <md-input id="nameEn" v-model="nameEn"></md-input>
      </md-field>

      <md-field>
        <label>Açıklama</label>
        <md-textarea id="descEn" v-model="descEn"></md-textarea>
      </md-field>
    </div>
  </div>
</template>

<script>
import haftalikbebekgelisimiservice from "../../services/haftalikbebekgelisimiservice";
import axios from "axios";
import { VclFacebook, VclInstagram } from "vue-content-loading";

export default {
  name: "OyuncakDuzenleEn",
  components: {
    VclFacebook,
    VclInstagram,
  },
  data() {
    return {
      hbglist: this.hbglist,
      nameEn: null,
      descEn: null,
      isLoading: true,
    };
  },
  props: {
    hbglist: {
      type: Array,
    },
  },

  watch: {
    nameEn: function () {
      // Emit this information to the parents component
      this.$emit("EditEn", this.nameEn, this.descEn);
    },
    descEn: function () {
      // Emit this information to the parents component
      this.$emit("EditEn", this.nameEn, this.descEn);
    },
  },
  methods: {
    Doldur() {
      setTimeout(() => {
        try {
          this.nameEn = this.hbglist[0].detail.en.name;
          this.descEn = this.hbglist[0].detail.en.desc;
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
