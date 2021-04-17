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

      <md-field>
        <label>Beslenme Düzeni</label>
        <md-textarea id="foodDescEn" v-model="foodDescEn"></md-textarea>
      </md-field>

      <md-field>
        <label>Uyku Düzeni</label>
        <md-textarea id="sleepDescEn" v-model="sleepDescEn"></md-textarea>
      </md-field>

      <md-field>
        <label>Tuvalet Düzeni</label>
        <md-textarea id="toiletDescEn" v-model="toiletDescEn"></md-textarea>
      </md-field>

      <md-field>
        <label>Etkinlik Önerileri</label>
        <md-textarea id="activityDescEn" v-model="activityDescEn"></md-textarea>
      </md-field>
    </div>
  </div>
</template>

<script>
import haftalikbebekgelisimiservice from "../../services/haftalikbebekgelisimiservice";
import axios from "axios";
import { VclFacebook, VclInstagram } from "vue-content-loading";

export default {
  name: "AylikBebekGelisimiDuzenleEn",
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
      foodDescEn: null,
      sleepDescEn: null,
      toiletDescEn: null,
      activityDescEn: null,
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
      this.$emit(
        "EditEn",
        this.nameEn,
        this.descEn,
        this.foodDescEn,
        this.sleepDescEn,
        this.toiletDescEn,
        this.activityDescEn
      );
    },
    descEn: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditEn",
        this.nameEn,
        this.descEn,
        this.foodDescEn,
        this.sleepDescEn,
        this.toiletDescEn,
        this.activityDescEn
      );
    },
    foodDescEn: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditEn",
        this.nameEn,
        this.descEn,
        this.foodDescEn,
        this.sleepDescEn,
        this.toiletDescEn,
        this.activityDescEn
      );
    },
    sleepDescEn: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditEn",
        this.nameEn,
        this.descEn,
        this.foodDescEn,
        this.sleepDescEn,
        this.toiletDescEn,
        this.activityDescEn
      );
    },
    toiletDescEn: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditEn",
        this.nameEn,
        this.descEn,
        this.foodDescEn,
        this.sleepDescEn,
        this.toiletDescEn,
        this.activityDescEn
      );
    },
    activityDescEn: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditEn",
        this.nameEn,
        this.descEn,
        this.foodDescEn,
        this.sleepDescEn,
        this.toiletDescEn,
        this.activityDescEn
      );
    },
  },
  methods: {
    Doldur() {
      setTimeout(() => {
        try {
          this.nameEn = this.hbglist[0].detail.en.name;
          this.descEn = this.hbglist[0].detail.en.desc;
          this.foodDescEn = this.hbglist[0].detail.en.foodDesc;
          this.sleepDescEn = this.hbglist[0].detail.en.sleepDesc;
          this.toiletDescEn = this.hbglist[0].detail.en.toiletDesc;
          this.activityDescEn = this.hbglist[0].detail.en.activityDesc;
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
