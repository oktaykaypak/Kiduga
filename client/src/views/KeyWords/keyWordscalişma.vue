<template>
  <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
  <div v-else class="genel">
    <div class="row">
      <div class="card card-body col-md-12">
        <h4>Banner Görsel Yükleme</h4>
        <br />
        <div class="row">
          <div class="col-sm-4">
            <img
              class=""
              :src="
                product.selectedImage == null
                  ? oyuncaklar[0].banner == false
                    ? 'http://localhost:5000/api/uploads/dikdortgen.png'
                    : 'http://localhost:5000/' + oyuncaklar[0].banner
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
          </div>
          <div class="col-sm-1">
            <div class="row">
              <div class="col-sm-12">
                <button
                  class="btn pull-left btn-light"
                  type="button"
                  @click="$refs.file.click()"
                >
                  <img
                    width="30px"
                    title="Görsel Seç"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNjAwcHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAtMTAgNjAwIDYwMCIgd2lkdGg9IjYwMHB0Ij4KPGcgaWQ9InN1cmZhY2UxIj4KPHBhdGggZD0iTSA2MDAgMzkwIEwgNjAwIDEwIEMgNjAwIDQuNDc2NTYyIDU5NS41MjM0MzggMCA1OTAgMCBMIDEwIDAgQyA0LjQ3NjU2MiAwIDAgNC40NzY1NjIgMCAxMCBMIDAgMzkwIEMgMCAzOTUuNTIzNDM4IDQuNDc2NTYyIDQwMCAxMCA0MDAgTCAzMDMgNDAwIEMgMjkwLjY4MzU5NCA0NTkuOTUzMTI1IDMxNi4wMjM0MzggNTIxLjM2NzE4OCAzNjcuMDMxMjUgNTU1LjE5MTQwNiBDIDQxOC4wMzkwNjIgNTg5LjAxNTYyNSA0ODQuNDc2NTYyIDU4OC40NjA5MzggNTM0LjkwNjI1IDU1My43ODkwNjIgQyA1ODUuMzQzNzUgNTE5LjExNzE4OCA2MDkuNjUyMzQ0IDQ1Ny4yODUxNTYgNTk2LjMzNTkzOCAzOTcuNTQ2ODc1IEMgNTk4LjYyODkwNiAzOTUuNzA3MDMxIDU5OS45NjQ4NDQgMzkyLjkzMzU5NCA2MDAgMzkwIFogTSA1ODAgMjAgTCA1ODAgMjc1Ljg1OTM3NSBMIDQ5Ny4wNzAzMTIgMTkyLjkyOTY4OCBDIDQ5My41NTA3ODEgMTg5LjQxMDE1NiA0ODcuOTg0Mzc1IDE4OS4wMTU2MjUgNDg0IDE5MiBMIDM2OS4wODIwMzEgMjc4LjE4NzUgTCAxNjYuMzI4MTI1IDExMi4yNjE3MTkgQyAxNjQuMDM5MDYyIDExMC4zODY3MTkgMTYxLjAzMTI1IDEwOS42MjUgMTU4LjEyMTA5NCAxMTAuMTc5Njg4IEMgMTU1LjIxNDg0NCAxMTAuNzM0Mzc1IDE1Mi42OTkyMTkgMTEyLjU1NDY4OCAxNTEuMjU3ODEyIDExNS4xNDA2MjUgTCAyMCAzNTEuNDEwMTU2IEwgMjAgMjAgWiBNIDI3IDM4MCBMIDE2Mi45Mjk2ODggMTM1LjMyMDMxMiBMIDM2OSAzMDQgQyAzNDEuMDg1OTM4IDMyMS45OTYwOTQgMzE5LjkwMjM0NCAzNDguNzE0ODQ0IDMwOC43NSAzODAgWiBNIDQ1MCA1NjAgQyAzNzguMjAzMTI1IDU2MCAzMjAgNTAxLjc5Njg3NSAzMjAgNDMwIEMgMzIwIDM1OC4yMDMxMjUgMzc4LjIwMzEyNSAzMDAgNDUwIDMwMCBDIDUyMS43OTY4NzUgMzAwIDU4MCAzNTguMjAzMTI1IDU4MCA0MzAgQyA1NzkuOTE3OTY5IDUwMS43NjE3MTkgNTIxLjc2MTcxOSA1NTkuOTE3OTY5IDQ1MCA1NjAgWiBNIDQ1MCAyODAgQyA0MjguNTcwMzEyIDI4MC4wMTk1MzEgNDA3LjM5MDYyNSAyODQuNjY0MDYyIDM4Ny45MjE4NzUgMjkzLjYxNzE4OCBMIDM4NS4wMDc4MTIgMjkxLjI0MjE4OCBMIDQ4OS4wNTg1OTQgMjEzLjI0MjE4OCBMIDU4MCAzMDQuMTQwNjI1IEwgNTgwIDM1NS40ODgyODEgQyA1NTMuMzEyNSAzMDguODYzMjgxIDUwMy43MjY1NjIgMjgwLjA3MDMxMiA0NTAgMjgwIFogTSA0NTAgMjgwICIgc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigwJSwwJSwwJSk7ZmlsbC1vcGFjaXR5OjE7IiAvPgo8cGF0aCBkPSJNIDQyMCAxNDAgQyA0NDcuNjEzMjgxIDE0MCA0NzAgMTE3LjYxMzI4MSA0NzAgOTAgQyA0NzAgNjIuMzg2NzE5IDQ0Ny42MTMyODEgNDAgNDIwIDQwIEMgMzkyLjM4NjcxOSA0MCAzNzAgNjIuMzg2NzE5IDM3MCA5MCBDIDM3MC4wMzUxNTYgMTE3LjYwMTU2MiAzOTIuMzk4NDM4IDEzOS45NjQ4NDQgNDIwIDE0MCBaIE0gNDIwIDYwIEMgNDM2LjU2NjQwNiA2MCA0NTAgNzMuNDMzNTk0IDQ1MCA5MCBDIDQ1MCAxMDYuNTY2NDA2IDQzNi41NjY0MDYgMTIwIDQyMCAxMjAgQyA0MDMuNDMzNTk0IDEyMCAzOTAgMTA2LjU2NjQwNiAzOTAgOTAgQyAzOTAgNzMuNDMzNTk0IDQwMy40MzM1OTQgNjAgNDIwIDYwIFogTSA0MjAgNjAgIiBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDAlLDAlLDAlKTtmaWxsLW9wYWNpdHk6MTsiIC8+CjxwYXRoIGQ9Ik0gNDYwIDMzMCBMIDQ0MCAzMzAgTCA0NDAgNDIwIEwgMzUwIDQyMCBMIDM1MCA0NDAgTCA0NDAgNDQwIEwgNDQwIDUyMCBMIDQ2MCA1MjAgTCA0NjAgNDQwIEwgNTUwIDQ0MCBMIDU1MCA0MjAgTCA0NjAgNDIwIFogTSA0NjAgMzMwICIgc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigwJSwwJSwwJSk7ZmlsbC1vcGFjaXR5OjE7IiAvPgo8L2c+Cjwvc3ZnPg=="
                  />
                </button>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-sm-12">
                <button class="btn btn-light" @click="Add">
                  <img
                    width="30px"
                    title="Görseli Yükle"
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik00NzIsMzEyLjY0MnYxMzljMCwxMS4wMjgtOC45NzIsMjAtMjAsMjBINjBjLTExLjAyOCwwLTIwLTguOTcyLTIwLTIwdi0xMzlIMHYxMzljMCwzMy4wODQsMjYuOTE2LDYwLDYwLDYwaDM5Mg0KCQkJYzMzLjA4NCwwLDYwLTI2LjkxNiw2MC02MHYtMTM5SDQ3MnoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBvbHlnb24gcG9pbnRzPSIyNTYsMC4zNTggMTMxLjcxNiwxMjQuNjQyIDE2MCwxNTIuOTI2IDIzNiw3Ni45MjYgMjM2LDM4OC42NDIgMjc2LDM4OC42NDIgMjc2LDc2LjkyNiAzNTIsMTUyLjkyNiANCgkJCTM4MC4yODQsMTI0LjY0MiAJCSIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card card-body col-md-12">
        <div class="row">
          <div class="col-sm-4">
            <h4>popUp</h4>
            <br />
            <div class="row">
              <div class="col-sm-12">
                <select
                  name=""
                  id="TPsel3"
                  @change="evelevel"
                  class="col-sm-12 text-capitalize form-control"
                >
                  <option value="none" selected disabled>Seçiniz..</option>
                  <option
                    value=""
                    v-for="(data, i) in oyuncaklar[0].popUp"
                    :key="data"
                    :value="i"
                    class="text-capitalize"
                  >
                    {{ i }}
                  </option>
                </select>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-sm-6">
                <vuetable :data="getPopDatatr"></vuetable>
              </div>
              <div class="col-sm-6">
                <vuetable :data="getPopDataen"> </vuetable>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <button @click="UpdatePop" class="btn btn-success">
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vuetable from "./VueJsonToTable";
import keyWords from "../../services/keyWordservice";
import { VclFacebook, VclInstagram } from "vue-content-loading";

export default {
  name: "BlogPhotos",
  components: {
    VclFacebook,
    VclInstagram,
    vuetable,
  },
  data() {
    return {
      oyuncaklar: [],
      api: [],
      idD: [],
      idB: [],
      dataString: "",
      PopdataJson: {
        tr: {
          title: "",
          message: "",
          okey: "",
          cancel: "",
        },
        en: {
          title: "",
          message: "",
          okey: "",
          cancel: "",
        },
      },
      product: {
        selectedImage: null,
      },
      id: "",
      file: null,
      img_url: null,
      img_name: null,
      isLoading: true,
      getKeyWordsDatatr: [],
      getKeyWordsDataen: [],
      getApiDatatr: [],
      getApiDataen: [],
      getPopDatatr: [],
      getPopDataen: [],

      Gelid: null,
      Gelid2: null,
      Gelid3: null,
    };
  },
  methods: {
    async UpdatePop() {
      await keyWords.updatePop(
        this.PopdataJson.tr.title,
        this.PopdataJson.tr.message,
        this.PopdataJson.tr.okay,
        this.PopdataJson.tr.cancel,
        this.PopdataJson.en.title,
        this.PopdataJson.en.message,
        this.PopdataJson.en.okay,
        this.PopdataJson.en.cancel,
      );
    },
    async UpdateKey() {
      this.idD = document.querySelectorAll("input[id-d]");
      this.idB = document.querySelectorAll("input[id-b]");
      this.dataString = "{";
      for (var i = 0; i < this.idB.length; i++) {
        this.dataString += `"${this.idB[i].getAttribute("id-b")}"`;
        this.dataString += ":";
        this.dataString += `"${this.idD[i].getAttribute("id-d")}"`;
        this.dataString += ",\n\r";
      }
      this.dataString += "}";
      //this.dataJson=JSON.parse(this.dataString);

      console.log(this.dataString);
    },
    async evelevel() {
      // Nereden çekecek
      this.Gelid = TPsel3.options[TPsel3.selectedIndex].getAttribute("value");
      console.log(this.Gelid);
      try {
        //İçerik Değiştirme
        this.getPopDatatr = this.oyuncaklar[0].popUp[this.Gelid].tr;
        this.getPopDataen = this.oyuncaklar[0].popUp[this.Gelid].en;
        console.log(this.getKeyWordsDatatr);
      } catch {}
    },
    async evelevel2() {
      // Nereden çekecek
      this.Gelid2 = TPsel4.options[TPsel4.selectedIndex].getAttribute("value");
      console.log(this.Gelid2);
      try {
        //İçerik Değiştirme
        if (this.Gelid2 == "cocukYasi") {
        } else {
          this.getApiDatatr = this.api[0].api[this.Gelid2].tr;
          this.getApiDataen = this.api[0].api[this.Gelid2].en;
        }
        console.log(this.getApiDatatr);
      } catch {}
    },
    async evelevel3() {
      // Nereden çekecek
      this.Gelid3 = TPsel5.options[TPsel5.selectedIndex].getAttribute("value");
      console.log(this.Gelid3);
      try {
        //İçerik Değiştirme
        if (this.Gelid3 == "language") {
        } else {
          this.getKeyWordsDatatr = this.oyuncaklar[0].keywords[this.Gelid3].tr;
          this.getKeyWordsDataen = this.oyuncaklar[0].keywords[this.Gelid3].en;
          this.idD = document.querySelectorAll("input[id-d]");
          console.log(this.idD);
        }
      } catch {}
    },
    async getTitle(key) {
      return key.split("_").join(" ");
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
        try {
          const formData = new FormData();
          formData.append("file", this.file);
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

          await keyWords.addPhoto(this.img_url);
          window.location.reload(1);
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Lütfen Görsel Ekleyiniz.");
      }
    },
    async Delete() {
      await keyWords.deletePhoto(this.id);
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
    async GetOyuncaklar() {
      this.oyuncaklar = await keyWords.getData();
      this.api = await keyWords.getData2();
      console.log(this.oyuncaklar);
      this.isLoading = false;
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
    this.GetOyuncaklar(this.id);
  },
};
</script>

<style>
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

.container {
  min-height: 500px;
}
</style>
