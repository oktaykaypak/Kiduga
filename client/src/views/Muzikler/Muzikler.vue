<template>
  <div>
    <div>
      
      <md-tabs md-sync-route>
       
        <md-tab id="deneme" md-label="Türkçe" :to="`/muzikler/muzikduzenle?id=${id}`" >
        
          <duzenle :hbglist="hbglist" :categoryList="categoryList" @EditTr="trValue"></duzenle>
          <md-button class="md-raised md-primary" @click="Edit" style="margin-left:0%;width:135px;">Kaydet</md-button>
        </md-tab>

        <md-tab id="tab-pages" md-label="İNGİLİZCE" :to="`/muzikler/muzikduzenleen?id=${id}`">
        
          <duzenleEn :hbglist="hbglist" @EditEn="enValue" ></duzenleEn>
          <md-button class="md-raised md-primary" @click="Edit" style="margin-left:0%;width:135px;">Kaydet</md-button>
        </md-tab>
        
        <md-tab id="tab-postss" md-label="SES DOSYALARI" :to="`/muzikler/muzikmp3?id=${id}`">
            <mp3></mp3>
        </md-tab>

        <md-tab id="tab-postsss" md-label="FOTOĞRAFLAR" :to="`/muzikler/muzikphotos?id=${id}`">
            <photos></photos>
        </md-tab>
      
      </md-tabs>
    </div>
  </div>
</template>

<script>
import muzikservice from "../../services/muzikservice";
import axios from "axios";
import MuziklerDuzenle from '@/views/Muzikler/MuziklerDuzenle'
import MuzikDuzenleEn from '@/views/Muzikler/MuzikDuzenleEn'
import MuzikPhotos from '@/views/Muzikler/MuzikPhotos'
import MuzikMp3 from '@/views/Muzikler/MuzikMp3'

export default {
  name: "HaftalikBebek",
  components:{
    "duzenle":MuziklerDuzenle,
    "duzenleEn":MuzikDuzenleEn,
    "photos":MuzikPhotos,
    "mp3":MuzikMp3
  },
  data() {
    return {
      hbglist: [],
      categoryList:[],
      categoryId:null,
      id: "",
      name: "",
      link: "",
      desc: "",
      nameEn: "",
      descEn: "",
      page:"",
      img_url:"",
      img_url2:"",
      showInPage:false,
      row_number:null
    };
  },
  mounted() {
  },
  methods: {
    async GetCategory(){
      this.categoryList = await muzikservice.getCategories();
    },
    async GetDatas(id) {
      this.hbglist = await muzikservice.getData2(id);
    },
    async Edit() {
      if(this.categoryId != null){
      await muzikservice.updateMuzik(
        this.id,
        this.name,
        this.desc,
        this.nameEn,
        this.descEn,
        this.categoryId,
        this.showInPage,
        this.row_number
      );
      window.location.reload(1);}else{alert("Lütfen Kategori Seçiniz.")}
    },
    enValue: function(nameEn,descEn) {
      this.nameEn = nameEn;
      this.descEn = descEn;
    },
    trValue: function(name,categoryId, desc, showInPage, row_number) {
      this.name = name;
      this.desc = desc;
      this.categoryId = categoryId;
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

#tab-postsss{
  min-height: 550px;
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
  margin-top: 2%;
  margin-left: 0px;
  width:135px;

}

/deep/ .md-tabs-navigation {
  border-radius: 20px 20px 0px 0px !important;
}

/deep/ .md-content{
  border-radius: 0px 0px 20px 20px !important;
}
</style>
