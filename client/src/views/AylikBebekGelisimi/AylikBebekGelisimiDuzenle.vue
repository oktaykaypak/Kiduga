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
      <md-field>
        <label>Beslenme Düzeni</label>
        <md-textarea id="foodDesc" v-model="foodDesc"></md-textarea>
      </md-field>
      <md-field>
        <label>Uyku Düzeni</label>
        <md-textarea id="sleepDesc" v-model="sleepDesc"></md-textarea>
      </md-field>
      <md-field>
        <label>Tuvalet Düzeni</label>
        <md-textarea id="toiletDesc" v-model="toiletDesc"></md-textarea>
      </md-field>
      <md-field>
        <label>Etkinlik Önerileri</label>
        <md-textarea id="activityDesc" v-model="activityDesc"></md-textarea>
      </md-field>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { VclFacebook, VclInstagram } from "vue-content-loading";

export default {
  name: "AylikBebekGelisimiDuzenle",
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
      foodDesc: null,
      sleepDesc: null,
      toiletDesc: null,
      activityDesc: null,
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
      this.$emit(
        "EditTr",
        this.name,
        this.desc,
        this.row_number,
        this.foodDesc,
        this.sleepDesc,
        this.toiletDesc,
        this.activityDesc
      );
    },
    desc: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditTr",
        this.name,
        this.desc,
        this.row_number,
        this.foodDesc,
        this.sleepDesc,
        this.toiletDesc,
        this.activityDesc
      );
    },
    row_number: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditTr",
        this.name,
        this.desc,
        this.row_number,
        this.foodDesc,
        this.sleepDesc,
        this.toiletDesc,
        this.activityDesc
      );
    },
    foodDesc: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditTr",
        this.name,
        this.desc,
        this.row_number,
        this.foodDesc,
        this.sleepDesc,
        this.toiletDesc,
        this.activityDesc
      );
    },
    sleepDesc: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditTr",
        this.name,
        this.desc,
        this.row_number,
        this.foodDesc,
        this.sleepDesc,
        this.toiletDesc,
        this.activityDesc
      );
    },
    toiletDesc: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditTr",
        this.name,
        this.desc,
        this.row_number,
        this.foodDesc,
        this.sleepDesc,
        this.toiletDesc,
        this.activityDesc
      );
    },
    activityDesc: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditTr",
        this.name,
        this.desc,
        this.row_number,
        this.foodDesc,
        this.sleepDesc,
        this.toiletDesc,
        this.activityDesc
      );
    },
  },
  methods: {
    Doldur() {
      setTimeout(() => {
        try {
          this.name = this.hbglist[0].detail.tr.name;
          this.desc = this.hbglist[0].detail.tr.desc;
          this.foodDesc = this.hbglist[0].detail.tr.foodDesc;
          this.sleepDesc = this.hbglist[0].detail.tr.sleepDesc;
          this.toiletDesc = this.hbglist[0].detail.tr.toiletDesc;
          this.activityDesc = this.hbglist[0].detail.tr.activityDesc;
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
