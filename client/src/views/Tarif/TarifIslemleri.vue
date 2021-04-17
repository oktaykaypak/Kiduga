<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <div class="row" style="margin-bottom: 10px">
        <h1 style="width: 85%; margin-left: 2%">Tarif İşlemleri</h1>
        <button
          style="font-size: 18px; width: 10%; height: 70%"
          class="btn btn-success"
          @click="$router.push('/tarif/tarifekle')"
        >
          Ekle
        </button>
      </div>
      <div>
        <md-table
          
          md-sort="name"
          md-sort-order="asc"
          md-card
          style="padding: 15px"
        >
          <md-table-row>
       
            <md-table-cell class="table-title"> İçerik Adı </md-table-cell>
       
            <md-table-cell class="table-title"> Hazırlanması Gereken Gün </md-table-cell>
         
            <md-table-cell class="table-title"> Seçenekler </md-table-cell>
          </md-table-row>

          <md-table-row
            class="table-row"
            slot="md-table-row"
            v-for="masal in orderedList"
            :key="masal.id"
          >
          
            <md-table-cell
              class="table-cell"
              md-label="Name"
              md-sort-by="name"
              >{{ masal.detail.tr.title }}</md-table-cell
            >
         
            <md-table-cell
              class="table-cell"
              md-label="Email"
              md-sort-by="email"
              >{{masal.aylik != undefined ? masal.aylik +". Ay "+ masal.gunluk+". Gün " : "Değer Girilmemiştir."}}</md-table-cell
            >
         
         
            <md-table-cell
              class="table-cell"
              md-label="Gender"
              md-sort-by="gender"
            >
              <router-link
                tag="button"
                class="btn btn-outline-info"
                :to="`/tarif/tarifduzenle?id=${masal._id}`"
                style="width: 45%"
                >Düzenle</router-link
              >
              <span
                ><button
                  v-on:click="Delete(masal._id)"
                  class="btn btn-outline-danger"
                  style="margin-left: 10%; width: 45%"
                >
                  Sil
                </button></span
              ></md-table-cell
            >
          </md-table-row>
        </md-table>
      </div>
    </div>
  </div>
</template>

<script>
var _ = require('lodash');
import tarifservice from "../../services/tarifservice";
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
      masallar: [],
      isLoading: true,
    };
  },
  filters: {
    abbreviate(text) {
      return text && text.slice(0, 60);
    },
  },
  computed: {
    orderedList: function () {
      return _.orderBy(this.masallar, "row_number");
    },
  },
  mounted() {},
  methods: {
    categoryQuery(value) {
      for (let i = 0; i < this.categoryList.length; i++) {
        if (value == this.categoryList[i]._id) {
          let category = this.categoryList[i].detail.tr.name;
          return category;
        }
      }
      return "Kategori Seçilmemiştir";
    },
    showQuery(value){
      if(value == true){
        return "Evet"
      }else{
        return "Hayır"
      }
        
    },
    async GetMasallar() {
      this.masallar = await tarifservice.getData();
      console.log(this.masallar);
      this.isLoading = false;
    },
    async Delete(id) {
      await tarifservice.deleteData(id);
      window.location.reload(1);
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
    await this.GetMasallar();
  },
};
</script>

<style lang="scss" scoped>
.table-title {
  pointer-events: none !important;
  border: 1px black solid !important;
  background: rgb(60, 75, 85);
  color: #ffffff;
  font-size: 18px;
}

.table-row {
  &:nth-of-type(2n) {
    background-color: #eeeeee;
  }
}

.table-row:hover {
  background-color: #e6e6e6 !important;
}

.table-cell {
  border: 0.5px gray solid !important;
  font-size: 15px;
  width: 3000px;
}
.md-title {
  font-style: bold;
}
</style>
