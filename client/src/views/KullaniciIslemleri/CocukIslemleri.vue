<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <div class="row" style="margin-bottom: 10px">
        <h1 style="width: 85%; margin-left: 2%">Çocuklar</h1>
        <router-link
          tag="button"
          class="btn btn-success"
          style="font-size: 18px; width: 10%; height: 70%"
          :to="`/kullanici/cocukekle?id=${users[0]._id}`"
          >Ekle</router-link
        >
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
            <md-table-cell class="table-title"> Çocuk Adı </md-table-cell>
            <md-table-cell class="table-title"> Doğum Tarihi </md-table-cell>
            <md-table-cell class="table-title"> Seçenekler </md-table-cell>
          </md-table-row>

          <md-table-row
            class="table-row"
            slot="md-table-row"
            v-for="(users, i) in users[0].children"
            :key="i"
            :value="i"
          >
            <md-table-cell
              class="table-cell"
              md-label="Name"
              md-sort-by="name"
              >{{ users.name }}</md-table-cell
            >
            <md-table-cell
              class="table-cell"
              md-label="Email"
              md-sort-by="email"
              >{{ users.dateofbirth | abbreviate }}</md-table-cell
            >
            <md-table-cell
              class="table-cell"
              md-label="Gender"
              md-sort-by="gender"
            >
              <router-link
                tag="button"
                class="btn btn-outline-info"
                :to="`/kullanici/cocukduzenle?id=${id}&id2=${i}`"
                style="width: 45%"
                >Düzenle</router-link
              >
              <span
                ><button
                  v-on:click="Delete(users._id, i)"
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
     
      id: "",
      children: null,
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
      this.users = await kullaniciislemleriservice.getData2(this.id);
      console.log(this.users);
      this.isLoading = false;
    },
    async Delete(id, childId) {
      console.log(id, childId);
      await kullaniciislemleriservice.deleteChild(id, childId);
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
    this.id = this.$route.query.id;
    console.log(this.id);
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
