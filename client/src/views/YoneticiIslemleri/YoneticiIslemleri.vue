<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <div class="row" style="margin-bottom: 10px">
        
          <h1 style="width: 85%;margin-left:2%">Yönetici Listesi</h1>
          
          <button
            style="font-size: 18px; width: 10%;height:70%"
            class="btn btn-success"
            @click="$router.push('/yonetici/yoneticiekle')"
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
            <md-table-cell class="table-title"> Ad Soyad </md-table-cell>
            <md-table-cell class="table-title"> Email </md-table-cell>
            <md-table-cell class="table-title"> Seçenekler </md-table-cell>
          </md-table-row>

          <md-table-row
            class="table-row"
            slot="md-table-row"
            v-for="admin in adminList"
            :key="admin.id"
          >
            <md-table-cell
              class="table-cell"
              md-label="Name"
              md-sort-by="name"
              >{{ admin.name }}</md-table-cell
            >
            <md-table-cell
              class="table-cell"
              md-label="Email"
              md-sort-by="email"
              >{{ admin.email | abbreviate }}</md-table-cell
            >
            <md-table-cell
              class="table-cell"
              md-label="Gender"
              md-sort-by="gender"
            >
              <router-link
                tag="button"
                class="btn btn-outline-info"
                :to="`/yonetici/yoneticiduzenle?id=${admin._id}`"
                style="width: 45%"
                >Düzenle</router-link
              >
              <span
                ><button
                  v-if="admin.email != 'admin@kiduga.com'"
                  v-on:click="Delete(admin._id)"
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
import yoneticiislemleriservice from "../../services/yoneticiislemleriservice";
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
      adminList: [],
      isLoading: true,
    };
  },
  filters: {
    abbreviate(text) {
      return text && text.slice(0, 60);
    },
  },
  mounted() {},
  methods: {
    async GetAdmins() {
      this.adminList = await yoneticiislemleriservice.getData();
      this.isLoading = false;
    },
    async Delete(id) {
      await yoneticiislemleriservice.deleteData(id);
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
    await this.GetAdmins();
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
