<template>
  <div>
    <div>
      <md-tabs md-sync-route>
        <md-tab id="deneme"  md-label="Türkçe" :to="`/oyuncakislemleri/oyuncakduzenle?id=${id}`">
          <duzenle :hbglist="hbglist" @EditTr="trValue"></duzenle>
          <md-button class="md-raised md-primary" @click="Edit" style="margin-left:0%;width:135px;"
            >Kaydet</md-button
          >
        </md-tab>

        <md-tab
          id="tab-pages"
          md-label="İNGİLİZCE"
          :to="`/oyuncakislemleri/oyuncakduzenleen?id=${id}`"
        >
          <duzenleEn :hbglist="hbglist" @EditEn="enValue"></duzenleEn>
          <md-button class="md-raised md-primary" @click="Edit" style="margin-left:0%;width:135px;"
            >Kaydet</md-button
          >
        </md-tab>

        <md-tab
          id="tab-posts"
          md-label="Fotoğraflar"
          :to="`/oyuncakislemleri/oyuncakphotos?id=${id}`"
        >
          <photos></photos>
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
import oyuncaklarservice from "../../services/oyuncaklarservice";
import axios from "axios";
import OyuncakDuzenle from "@/views/Oyuncaklar/OyuncakDuzenle";
import OyuncakDuzenleEn from "@/views/Oyuncaklar/OyuncakDuzenleEn";
import OyuncakPhotos from "@/views/Oyuncaklar/OyuncakPhotos";

export default {
  name: "HaftalikBebek",
  components: {
    duzenle: OyuncakDuzenle,
    duzenleEn: OyuncakDuzenleEn,
    photos: OyuncakPhotos,
  },
  data() {
    return {
      hbglist: [],
      id: "",
      name: "",
      link: "",
      desc: "",
      nameEn: "",
      descEn: "",
      page: "",
      startDate: null,
      endDate: null,
      showInPage:false,
      row_number:null
    };
  },
  mounted() {},
  methods: {
    async GetDatas(id) {
      this.hbglist = await oyuncaklarservice.getData2(id);
    },
    async Edit() {
      await oyuncaklarservice.updateData(
        this.id,
        this.name,
        this.link,
        this.desc,
        this.nameEn,
        this.descEn,
        this.showInPage,
        this.startDate,
        this.endDate,
        this.row_number
      );
      window.location.reload(1);
    },
    enValue: function (nameEn, descEn) {
      this.nameEn = nameEn;
      this.descEn = descEn;
    },
    trValue: function (name, desc, link, showInPage, startDate, endDate, row_number) {
      this.name = name;
      this.desc = desc;
      this.link = link;
      this.showInPage = showInPage;
      this.startDate = startDate;
      this.endDate = endDate;
      this.row_number = row_number;
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
    this.GetDatas(this.id);
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

.md-raised{
  width:135px;
  margin-left: 0px;
}

/deep/ .md-tabs-navigation {
  border-radius: 20px 20px 0px 0px !important;
}

/deep/ .md-content{
  border-radius: 0px 0px 20px 20px !important;
}

</style>
