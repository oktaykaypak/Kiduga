<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <div class="row" style="margin-bottom: 10px">
        
          <h1 style="width: 85%;margin-left:2%">Oyuncak Listesi</h1>
        
        
          <button
            style="font-size: 18px; width: 10%;height:70%"
            class="btn btn-success"
            @click="$router.push('/oyuncakislemleri/oyuncakekle')"
          >
            Ekle
          </button>
        
      </div>
      <div>
        <md-table
          v-model="abglist"
          md-sort="name"
          md-sort-order="asc"
          md-card
          style="padding: 15px"
        >
          <md-table-row>
            <md-table-cell class="table-title"> Sıra</md-table-cell>
            <md-table-cell class="table-title"> Oyuncak Adı</md-table-cell>
            <md-table-cell class="table-title"> Oyuncak Bağlantısı </md-table-cell>
            <md-table-cell class="table-title"> Yaş Aralığı </md-table-cell>
            <md-table-cell class="table-title"> Göster / Gösterme </md-table-cell>
            <md-table-cell class="table-title"> Seçenekler </md-table-cell>
          </md-table-row>

          <md-table-row
            class="table-row"
            slot="md-table-row"
            v-for="oyuncak in orderedList"
            :key="oyuncak.id"
          >
            <md-table-cell
              class="table-cell"
              md-label="Name"
              md-sort-by="name"
              style="width:2%;"
              >{{ oyuncak.row_number != undefined ? oyuncak.row_number : "-"}}</md-table-cell
            >
            <md-table-cell
              class="table-cell"
              md-label="Name"
              md-sort-by="name"
              >{{ oyuncak.detail.tr.name }}</md-table-cell
            >
            <md-table-cell
              class="table-cell"
              md-label="Email"
              md-sort-by="email"
              >{{ oyuncak.link | abbreviate }}</md-table-cell
            >
            <md-table-cell
              class="table-cell"
              md-label="Email"
              md-sort-by="email"
              >{{oyuncak.startDate != undefined ? oyuncak.startDate +" - "+ oyuncak.endDate : "Değer Girilmemiştir."}}</md-table-cell
            >
            <md-table-cell
              class="table-cell"
              md-label="Name"
              md-sort-by="name"
              >{{ showQuery(oyuncak.showInPage) }}</md-table-cell
            >
            <md-table-cell
              class="table-cell"
              md-label="Gender"
              md-sort-by="gender"
            >
              <router-link
                tag="button"
                class="btn btn-outline-info"
                :to="`/oyuncakislemleri/oyuncakduzenle?id=${oyuncak._id}`"
                style="width: 45%"
                >Düzenle</router-link
              >
              <span
                ><button
                  v-on:click="Delete(oyuncak._id)"
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
import oyuncaklarservice from "../../services/oyuncaklarservice";
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
      oyuncaklar: [],
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
    return _.orderBy(this.oyuncaklar, 'row_number')
  }
},
  mounted() {},
  methods: {
    async GetOyuncaklar() {
      this.oyuncaklar = await oyuncaklarservice.getData();
      this.isLoading = false;
    },
    showQuery(value){
      if(value == true){
        return "Evet"
      }else{
        return "Hayır"
      }
        
    },
    async Delete(id) {
      await oyuncaklarservice.deleteData(id);
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
    await this.GetOyuncaklar();
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
