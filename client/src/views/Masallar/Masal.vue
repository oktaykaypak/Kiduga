<template>
  <div>
    <div>
      
      <md-tabs md-sync-route>
       
        <md-tab id="deneme" md-label="Türkçe" :to="`/masalislemleri/masallarduzenle?id=${id}`" >
        
          <duzenle :hbglist="hbglist" @EditTr="trValue"></duzenle>
          <md-button class="md-raised md-primary" @click="Edit" style="margin-left:0%;width:135px;">Kaydet</md-button>
        </md-tab>

        <md-tab id="tab-pages" md-label="İNGİLİZCE" :to="`/masalislemleri/masallarduzenleen?id=${id}`">
        
          <duzenleEn :hbglist="hbglist" @EditEn="enValue" ></duzenleEn>
          <md-button class="md-raised md-primary" @click="Edit" style="margin-left:0%;width:135px;">Kaydet</md-button>
        </md-tab>
        
        <md-tab id="tab-postss" md-label="SES DOSYALARI" :to="`/masalislemleri/masallarmp3?id=${id}`">
          <mp3></mp3>
        </md-tab>

        <md-tab id="tab-posts" md-label="Fotoğraflar" :to="`/masalislemleri/masallarphotos?id=${id}`">
          <photos></photos>
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
import masallarservice from "../../services/masallarservice";
import axios from "axios";
import MasallarDuzenle from '@/views/Masallar/MasallarDuzenle'
import MasallarDuzenleEn from '@/views/Masallar/MasallarDuzenleEn'
import MasallarPhotos from '@/views/Masallar/MasallarPhotos'
import MasallarMp3 from '@/views/Masallar/MasallarMp3'

export default {
  name: "HaftalikBebek",
  components:{
    "duzenle":MasallarDuzenle,
    "duzenleEn":MasallarDuzenleEn,
    "photos":MasallarPhotos,
    "mp3":MasallarMp3
  },
  data() {
    return {
      hbglist: [],
      id: "",
      name: "",
      desc: "",
      nameEn: "",
      descEn: "",
      page:"",
      img_url:"",
      img_url2:"",
      mp3_url:null,
      mp3_url2:null,
      showInPage:false,
      row_number:null
    };
  },
  mounted() {
  },
  methods: {
    async GetDatas(id) {
      this.hbglist = await masallarservice.getData2(id);
      this.mp3_url = this.hbglist[0].detail.tr.mp3_url
      this.mp3_url2 = this.hbglist[0].detail.en.mp3_url
    },
    async Edit() {
      await masallarservice.updateData(
        this.id,
        this.name,
        this.desc,
        this.nameEn,
        this.descEn,
        this.img_url,
        this.img_url2,
        this.mp3_url,
        this.mp3_url2,
        this.showInPage,
        this.row_number
      );
      window.location.reload(1);
    },
    enValue: function(nameEn,descEn) {
      this.nameEn = nameEn;
      this.descEn = descEn;
    },
    trValue: function(name,desc, showInPage, row_number) {
      this.name = name;
      this.desc = desc;
      this.showInPage = showInPage;
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
    if(localStorage.getItem('token') === null){
      this.$router.push('/pages/login');
    }else{
      this.authorization()
    }
    this.id = this.$route.query.id;
    this.GetDatas(this.id)
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
