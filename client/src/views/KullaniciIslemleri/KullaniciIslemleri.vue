<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <div class="row" style="margin-bottom: 10px">
        <div class="col">
          <h1>Kullanıcı Listesi</h1>
        </div>
      </div>
      <div>
        <md-table
          md-sort="name"
          md-sort-order="asc"
          md-card
          style="padding: 15px"
        >
          <md-table-row>
            <md-table-cell class="table-title"> Kullanıcı Adı </md-table-cell>
            <md-table-cell class="table-title"> Email </md-table-cell>
            <md-table-cell class="table-title"> Seçenekler </md-table-cell>
          </md-table-row>

          <md-table-row
            class="table-row"
            slot="md-table-row"
            v-for="user in users"
            :key="user.id"
          >
            <md-table-cell
              class="table-cell"
              md-label="Name"
              md-sort-by="name"
              >{{ user.name }}</md-table-cell
            >
            <md-table-cell
              class="table-cell"
              md-label="Email"
              md-sort-by="email"
              >{{ user.email | abbreviate }}</md-table-cell
            >
            <md-table-cell
              class="table-cell"
              md-label="Gender"
              md-sort-by="gender"
            >
              <router-link
                tag="button"
                class="btn btn-outline-info"
                :to="`/kullanici/kullaniciduzenle?id=${user._id}`"
                style="width: 30%"
                >Düzenle</router-link
              >
              <router-link
                tag="button"
                class="btn btn-outline-primary"
                :to="`/kullanici/cocukislemleri?id=${user._id}`"
                style="margin-left: 5%; width: 30%"
                >Çocuklar</router-link
              >
              <span
                ><button
                  v-on:click="Delete(user._id)"
                  class="btn btn-outline-danger"
                  style="margin-left: 5%; width: 30%"
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
import kullaniciislemleriservice from "../../services/kullaniciislemleriservice";
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
      users: [],
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
    async GetUsers() {
      this.users = await kullaniciislemleriservice.getData();
      this.isLoading = false;
    },
    async Delete(id) {
      await kullaniciislemleriservice.deleteData(id);
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
    this.GetUsers();
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
