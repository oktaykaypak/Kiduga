<template>
  <div>
    <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
    <div v-else>
      <h1 class="text-center">Fotoğraf Yükle</h1>
      <hr />
      <div class="row">
        <div class="card offset-2 col-md-4">
          <div
            class="card-body tex-center d-flex align-items-center flex-column"
          >
            <img
              style="height: 200px; width: 400px; margin-top: 10%; margin-left:auto; margin-right:auto;margin-bottom:auto;"
              class="img-responsive text-center mb-3"
              :src="
                product.selectedImage == null
                  ? 'http://localhost:5000/api/uploads/dikdortgen.png'
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
              Resim Seç
            </button>
          </div>
        </div>
        <div class="col-md-5">
          <div class="col-md-11 card">
            <div class="card-body">
              <div class="form-group">
                <label>Görsel Sırası</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="1"
                  v-model="row_number"
                />
              </div>
              <div
                class="sau-select lg center"
                :class="{ selected: type === 'list' }"
              >
                <label for="windows">
                  <input
                    type="radio"
                    v-model="type"
                    :checked="type == 'list'"
                    id="list"
                    value="list"
                  />
                  Listeleme (1x1)
                </label>
              </div>
              <div
                class="sau-select lg center"
                :class="{ selected: type === 'detail' }"
              >
                <label for="linux">
                  <input
                    type="radio"
                    v-model="type"
                    :checked="type == 'detail'"
                    id="detail"
                    value="detail"
                  />
                  Detay (1x2)
                </label>
              </div>

              <button class="btn btn-info btn-block" @click="Add">
                Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
      <br /><br />
      <h3 class="text-center">Eklenen Fotoğraflar</h3>
      <hr />
      <div class="row" v-if="oyuncaklar != null">
        <div
        style="margin-left:5%;margin-right:2%;margin-bottom:2%"
          class="col-md-3 card"
          v-for="(oyuncak, i) in oyuncaklar[0].photos"
          :key="i"
          :value="i"
        >
          <img
            class="card-img-top"
            :src="'http://localhost:5000/' + oyuncak.img_url"
            alt="Card image cap"
            style="height: 200px; width: 400px; margin-top: 8%; margin-left:auto; margin-right:auto;"
          />
          <div class="card-body">
            <small>
              <strong>Görsel Url : </strong
              ><a
                :href="'http://localhost:5000/' + oyuncak.img_url"
                target="_blank"
                >http://localhost:5000/{{ oyuncak.img_url }}</a
              ></small
            >
            <br />
            <small> <strong>Görsel Tipi : </strong> {{ oyuncak.type }} </small>
            <br />
            <small>
              <strong>Görsel Sırası : </strong> {{ oyuncak.row_number }}
            </small>
            <br />
            <button
              type="button"
              class="btn btn-warning"
              data-toggle="modal"
              :data-target="'#exampleModal' + i"
              style="margin-right: 2%; width: 50%; margin-top:7%;"
              @click="deneme(i)"
            >
              Düzenle
            </button>
            <button
              class="btn btn-danger"
              @click="Delete(i)"
              style="width: 48%; margin-top:7%;"
            >
              Sil
            </button>
            <!-- Button trigger modal -->

            <!-- Modal -->
            <div
              class="modal fade"
              :id="'exampleModal' + i"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Görsel</h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <!-- Model Body Başlangıç-->

                    <img
                      class="card-img-top"
                      :src="'http://localhost:5000/' + oyuncak.img_url"
                      alt="Card image cap"
                      style="height: 200px; width: 400px;margin-left:7%"
                    />
                    <div class="card-body">
                      <small>
                        <strong>Görsel Url : </strong
                        ><a
                          :href="'http://localhost:5000/' + oyuncak.img_url"
                          target="_blank"
                          >http://localhost:5000/{{ oyuncak.img_url }}</a
                        ></small
                      >
                      <br />
                      <div>
                        <div class="form-group">
                          <label>Görsel Sırası</label>
                          <input
                            type="number"
                            class="form-control"
                            placeholder="1"
                            v-model="row_number"
                          />
                        </div>
                        <div
                          class="sau-select lg center"
                          :class="{ selected: type === 'list' }"
                        >
                          <label for="windows">
                            <input
                              type="radio"
                              v-model="type"
                              :checked="type == 'list'"
                              id="list"
                              value="list"
                            />
                            Listeleme (1x1)
                          </label>
                        </div>
                        <div
                          class="sau-select lg center"
                          :class="{ selected: type === 'detail' }"
                        >
                          <label for="linux">
                            <input
                              type="radio"
                              v-model="type"
                              :checked="type == 'detail'"
                              id="detail"
                              value="detail"
                            />
                            Detay (1x2)
                          </label>
                        </div>
                      </div>
                    </div>
                    <!-- Model Body Bitiş-->
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Çıkış
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="Update(i)"
                    >
                      Değişiklikleri Kaydet
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Modal Finish-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import oyuncaklarservice from "../../services/oyuncaklarservice";
import { VclFacebook, VclInstagram } from "vue-content-loading";

export default {
  name: "OyuncakPhotos",
  components: {
    VclFacebook,
    VclInstagram,
  },
  data() {
    return {
      oyuncaklar: null,
      product: {
        selectedImage: null,
      },
      id: "",
      file: "",
      type: "",
      row_number: "",
      photoId: "",
      img_url: "",
      img_name: "",
      isLoading: true,
    };
  },
  methods: {
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
      if (this.file != null && this.file != undefined && this.file != "") {
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

          await oyuncaklarservice.addPhoto(
            this.id,
            this.img_url,
            this.type,
            this.row_number
          );
          window.location.reload(1);
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Lütfen Görsel Ekleyiniz.");
      }
    },
    async Delete(photoId) {
      await oyuncaklarservice.deletePhoto(this.id, photoId);
      window.location.reload(1);
    },
    async Update(photoId) {
      await oyuncaklarservice.updatePhoto(
        this.id,
        photoId,
        this.type,
        this.row_number
      );
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
    async GetOyuncaklar(id) {
      this.oyuncaklar = await oyuncaklarservice.getData2(id);
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
    async deneme(photoId) {
      this.row_number = this.oyuncaklar[0].photos[photoId].row_number;
      this.type = this.oyuncaklar[0].photos[photoId].type;
      var div1 = document.querySelector("#exampleModal" + photoId);
      var div2 = document.querySelector("body");
      div2.append(div1);
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
</style>
