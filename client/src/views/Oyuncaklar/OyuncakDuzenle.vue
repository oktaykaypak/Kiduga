<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <md-field>
        <label>Başlık</label>
        <md-input id="name" v-model="name"></md-input>
      </md-field>

      <md-field>
        <label>Link</label>
        <md-input id="link" v-model="link"> </md-input>
      </md-field>
      <md-checkbox v-model="showInPage"
        >Ana Sayfada Gösterilsin Mi ?</md-checkbox
      ><br />
      Yaş Aralığı Başlangıç (Ay):
      <md-input
        v-model="startDate"
        type="number"
        style="margin-bottom: 1%; margin-right: 2%; width: 10%"
      ></md-input>
      Yaş Aralığı Bitiş (Ay):
      <md-input
        v-model="endDate"
        type="number"
        style="margin-bottom: 1%; margin-right: 2%; width: 10%"
      ></md-input>
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
  name: "OyuncakDuzenle",
  components: {
    VclFacebook,
    VclInstagram,
  },
  data() {
    return {
      hbglist: this.hbglist,
      name: "",
      link: "",
      desc: "",
      isLoading: true,
      showInPage: false,
      startDate: null,
      endDate: null,
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
      this.$emit(
        "EditTr",
        this.name,
        this.desc,
        this.link,
        this.showInPage,
        this.startDate,
        this.endDate,
        this.row_number
      );
    },
    desc: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditTr",
        this.name,
        this.desc,
        this.link,
        this.showInPage,
        this.startDate,
        this.endDate,
        this.row_number
      );
    },
    link: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditTr",
        this.name,
        this.desc,
        this.link,
        this.showInPage,
        this.startDate,
        this.endDate,
        this.row_number
      );
    },
    showInPage: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditTr",
        this.name,
        this.desc,
        this.link,
        this.showInPage,
        this.startDate,
        this.endDate,
        this.row_number
      );
    },
    startDate: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditTr",
        this.name,
        this.desc,
        this.link,
        this.showInPage,
        this.startDate,
        this.endDate,
        this.row_number
      );
    },
    endDate: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditTr",
        this.name,
        this.desc,
        this.link,
        this.showInPage,
        this.startDate,
        this.endDate,
        this.row_number
      );
    },
    row_number: function () {
      // Emit this information to the parents component
      this.$emit(
        "EditTr",
        this.name,
        this.desc,
        this.link,
        this.showInPage,
        this.startDate,
        this.endDate,
        this.row_number
      );
    },
  },
  methods: {
    Doldur() {
      setTimeout(() => {
        try {
          this.name = this.hbglist[0].detail.tr.name;
          this.desc = this.hbglist[0].detail.tr.desc;
          this.link = this.hbglist[0].link;
          this.showInPage = this.hbglist[0].showInPage;
          this.startDate = this.hbglist[0].startDate;
          this.endDate = this.hbglist[0].endDate;
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
