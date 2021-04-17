<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <div class="row">
        <div class="col-sm-12">
          <input
            id="name"
            v-model="nameEn"
            class="form-control col-sm-12"
            placeholder="Başlık"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <ckeditor v-model="descEn"></ckeditor>
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
  name: "BlogDuzenle",
  components: {
    VclFacebook,
    VclInstagram,
  },
  data() {
    return {
      hbglist: this.hbglist,
      nameEn: "",
      descEn: "",
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
