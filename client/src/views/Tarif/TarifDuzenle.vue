<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <div class="row">
        <div class="col-sm-12">
          <md-field>
            <label>Başlık</label>
            <md-input id="name" v-model="name"></md-input>
          </md-field>
        </div>
      </div>
      <div class="row">
    
      </div>
      <div class="row">
        <div class="col-sm-12">
          Ay
          <md-input
            v-model="startDate"
            type="number"
            style="margin-bottom: 1%; margin-right: 2%; width: 10%"
          ></md-input>
         Gün
          <md-input
            v-model="endDate"
            type="number"
            style="margin-bottom: 1%; margin-right: 2%; width: 10%"
          ></md-input>
        
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <ckeditor v-model="desc"></ckeditor>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
       
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import masallarservice from "../../services/masallarservice";
import { VclFacebook, VclInstagram } from "vue-content-loading";
import CKEditor from "ckeditor4-vue";
import Vue from "vue";
Vue.use(CKEditor);

export default {
  name: "TarifDuzenle",
  components: {
    VclFacebook,
    VclInstagram,
  },
  data() {
    return {
     

      name: "",
      desc: "",
      isLoading: true,
      selected: null,
      showInPage: false,
      startDate: null,
      endDate: null,
      row_number: null,
      selected: null,
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
          this.name = this.hbglist[0].detail.tr.title;
          this.desc = this.hbglist[0].detail.tr.desc;
      
          this.startDate = this.hbglist[0].aylik;
          this.endDate = this.hbglist[0].gunluk;
         
          console.log(this.hbglist);
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
