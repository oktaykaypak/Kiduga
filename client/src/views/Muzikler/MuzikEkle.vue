<template>
  <div>
    <md-tabs>
      <md-tab id="deneme" md-label="Türkçe" to="/muzikler/muzikekle">
        <md-field>
          <label>Başlık</label>
          <md-input id="name" v-model="name"></md-input>
        </md-field>

        <select
          name="siltpid"
          id="TPsel3"
          @change="category"
          class="form-control"
        >
          <option disabled selected>Seçiniz...</option>
          <option v-for="(category, i) in categoryList" :key="i" :value="i">
            {{ category.detail.tr.name }}
          </option>
        </select>
        <br />
          <md-button
            class="md-raised md-primary"
            @click="Add"
            style="margin-left:0%;width:135px;"
            >Ekle</md-button
          >
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import axios from "axios";
import muzikservice from "../../services/muzikservice";

export default {
  name: "Dashboard",
  data() {
    return {
      categoryList: null,
      categoryId: null,
      name: "",
    };
  },
  mounted() {},
  methods: {
    async GetCategory() {
      this.categoryList = await muzikservice.getCategories();
    },
    async category() {
      var selectedkey = TPsel3.options[TPsel3.selectedIndex].getAttribute(
        "value"
      );
      this.categoryId = this.categoryList[selectedkey]._id;
    },
    async Add() {
      if (this.categoryId != null) {
        try {
          await muzikservice
            .addMuzik(this.name, this.categoryId)
            .then((res) => {
              if (res.status === 200) {
                this.id = res.data.id;
                window.location = `http://localhost:8080/#/muzikler/muzikduzenle?id=${this.id}`;
              }
            });
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Lütfen Kategori Seçiniz.");
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
    await this.GetCategory();
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
  height: auto !important;
}
</style>
