<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <md-tabs>
        <md-tab
          id="deneme"
          md-label="DÜZENLE"
          to="/blogkategori/blogkategoriduzenle"
        >
          <md-field>
            <label>Kategori Adı (Türkçe)</label>
            <md-input id="name" v-model="name"></md-input>
          </md-field>
          <md-field>
            <label>Kategori Adı (İngilizce)</label>
            <md-input id="nameEn" v-model="nameEn"></md-input>
          </md-field>

          <md-button class="md-raised md-primary" @click="Edit" style="margin-left:0%;width:135px;"
            >Kaydet</md-button
          >
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import blogservice from "../../services/blogservice";
import { VclFacebook, VclInstagram } from "vue-content-loading";

export default {
  name: "BlogKategoriDuzenle",
  components: {
    VclFacebook,
    VclInstagram,
  },
  data() {
    return {
      categories: null,
      id: "",
      name: "",
      nameEn: "",
      isLoading: true,
    };
  },
  mounted() {},
  methods: {
    async GetCategories(id) {
      this.categories = await blogservice.getCategoriesWId(id);
      this.name = this.categories[0].detail.tr.name;
      this.nameEn = this.categories[0].detail.en.name;
      this.isLoading = false;
    },
    async Edit() {
      try {
        await blogservice
          .updateCategory(this.id, this.name, this.nameEn)
          .then((res) => {
            if (res.status === 200) {
              window.location = `http://localhost:8080/#/blogkategoriislemleri`;
            }
          });
      } catch (err) {
        console.log(err);
      }
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
    getUniqid(length) {
      let result = "";
      //var characters = '0123456789';
      //var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 1; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },

  async created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/pages/login");
    } else {
      this.authorization();
    }
    this.id = this.$route.query.id;
    this.GetCategories(this.id);
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
