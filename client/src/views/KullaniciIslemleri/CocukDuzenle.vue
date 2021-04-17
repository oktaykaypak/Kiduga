<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <h1>Çocuk Düzenle</h1>
      <div class="row">
        <div class="col-md-6">
          <div>
            <md-tabs>
              <md-tab
                id="cocukEdit"
                md-label="Çocuk"
                to="/kullanici/cocukduzenle"
              >
                <md-field>
                  <label>Ad Soyad</label>
                  <md-input id="name" v-model="name"></md-input>
                </md-field>

                <md-datepicker id="dateofbirth" v-model="dateofbirth"
                  ><label>Select date</label></md-datepicker
                >

                <md-radio
                  type="radio"
                  v-model="gender"
                  :checked="gender == 'girl'"
                  id="girl"
                  value="girl"
                  >Kız</md-radio
                >
                <md-radio
                  type="radio"
                  v-model="gender"
                  :checked="gender == 'boy'"
                  id="boy"
                  value="boy"
                  class="md-primary"
                  >Erkek</md-radio
                >
                <br /><br />
                <md-button class="md-raised md-primary" @click="Add"
                  >Kaydet</md-button
                >
              </md-tab>
            </md-tabs>
          </div>
        </div>
        <div class="col-md-6" v-if="users != null">
          <md-tabs>
            <md-tab
              id="cocukEdit"
              md-label="GÖRSEL"
              to="/kullanici/cocukduzenle"
            >
              <div
                class="card-body tex-center d-flex align-items-center flex-column"
              >
                <img
                  style="height: 250px; width: 250px; margin: auto"
                  class="img-responsive text-center mb-3"
                  :src="
                    product.selectedImage == null
                      ? users[0].children[arrayId].img_url == false
                        ? 'http://localhost:5000/api/uploads/default.png'
                        : 'http://localhost:5000/' +
                          users[0].children[arrayId].img_url
                      : product.selectedImage
                  "
                />

                <input
                  type="file"
                  ref="file"
                  name="file"
                  style="display: none"
                  @change="onChange($event)"
                  class="form-control"
                />
                <button
                  class="btn btn-success"
                  type="button"
                  @click="$refs.file.click()"
                >
                  Çocuğun Resmi
                </button>
              </div>
            </md-tab>
          </md-tabs>
        </div>
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
      users: null,
      product: {
        selectedImage: null,
      },
      id: "",
      arrayId: "",
      name: "",
      gender: "",
      dateofbirth: "",
      file: null,
      img_url: null,
      img_name: null,
      isLoading: true,
    };
  },
  mounted() {},
  methods: {
    async GetUsers() {
      this.users = await kullaniciislemleriservice.getData2(this.id);
      console.log(this.users)
      setTimeout(() => {
        if (this.users[0].children[this.arrayId].gender == "boy") {
          this.gender = "boy";
        } else if (this.users[0].children[this.arrayId].gender == "girl") {
          this.gender = "girl";
        }
        this.name = this.users[0].children[this.arrayId].name;
        this.dateofbirth = this.users[0].children[this.arrayId].dateofbirth;
        this.isLoading = false;
      }, 1500);
    },
    onChange(e) {
      let file = e.target.files[0];
      this.product.selectedImage = URL.createObjectURL(file);

      this.file = this.$refs.file.files[0];
      let tmpNameFormat = this.file.name.split(".")[1];
      let tmpName = this.getUniqid(16);

      this.img_url = "api/uploads/" + tmpName + "." + tmpNameFormat;
      this.img_name = tmpName + "." + tmpNameFormat;
    },
    async Add() {
      if (this.file != null) {
        const formData = new FormData();
        formData.append("file", this.file);

        try {
          await axios
            .post(
              `http://localhost:5000/api/uploads/${this.img_name}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then(function () {
              console.log("SUCCESS!!");
            })
            .catch(function () {
              console.log("FAILURE!!");
            });

          await kullaniciislemleriservice.updateChild(
            this.id,
            this.arrayId,
            this.name,
            this.dateofbirth,
            this.gender,
            this.img_url
          );
          window.location.reload(1);
        } catch (err) {
          console.log(err);
        }
      } else {
        await kullaniciislemleriservice.updateChild(
          this.id,
          this.arrayId,
          this.name,
          this.dateofbirth,
          this.gender,
          this.img_url
        );
        window.location.reload(1);
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
    this.arrayId = this.$route.query.id2;
    this.GetUsers();
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

.card {
  margin-right: 5px;
  margin-bottom: 5px;
  min-height: 400px;
  height: 55%;
}

.card:last-child {
  margin-right: 0px;
}

.col-md-2 {
  max-width: 15.666667% !important;
}

.col-md-3 {
  max-width: 24.562% !important;
}

.product-container {
  margin-left: 15px;
}

#cocukEdit {
  height: 425px !important;
}

.md-raised {
  width: 135px;
  margin-left: 0px;
}

/deep/ .md-tabs-navigation {
  border-radius: 20px 20px 0px 0px !important;
}

/deep/ .md-content {
  border-radius: 0px 0px 20px 20px !important;
}

/deep/ .md-radio {
  background-color: #ffffff !important;
}
</style>
