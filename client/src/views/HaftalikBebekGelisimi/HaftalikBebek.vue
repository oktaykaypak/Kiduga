<template>
  <div>
    <div>
      
      <md-tabs md-sync-route>
       
        <md-tab id="deneme" md-label="Türkçe" :to="`/hbebekgelisimi/haftalikbebekduzenle?id=${id}`" >
          <duzenle :hbglist="hbglist" @EditTr="trValue"></duzenle>
          <md-button class="md-raised md-primary" @click="Edit" style="margin-left:0%;width:135px;">Kaydet</md-button>
        </md-tab>

        <md-tab id="tab-pages" md-label="İNGİLİZCE" :to="`/hbebekgelisimi/haftalikbebekduzenleen?id=${id}`">
          <duzenleEn :hbglist="hbglist" @EditEn="enValue" ></duzenleEn>
          <md-button class="md-raised md-primary" @click="Edit" style="margin-left:0%;width:135px;">Kaydet</md-button>
        </md-tab>
        
        <!-- <md-tab id="tab-posts" md-label="Fotoğraflar" :to="`/hbebekgelisimi/haftalikbebekphotos?id=${id}`">
          <photos></photos>
        </md-tab> -->
      </md-tabs>
    </div>
  </div>
</template>

<script>
import haftalikbebekgelisimiservice from "../../services/haftalikbebekgelisimiservice";
import axios from "axios";
import HaftalikBebekGelisimiDuzenle from '@/views/HaftalikBebekGelisimi/HaftalikBebekGelisimiDuzenle'
import HaftalikBebekGelisimiDuzenleEn from '@/views/HaftalikBebekGelisimi/HaftalikBebekGelisimiDuzenleEn'
import HaftalikBebekGelisimiPhotos from '@/views/HaftalikBebekGelisimi/HaftalikBebekGelisimiPhotos'

export default {
  name: "HaftalikBebek",
  components:{
    "duzenle":HaftalikBebekGelisimiDuzenle,
    "duzenleEn":HaftalikBebekGelisimiDuzenleEn,
    "photos":HaftalikBebekGelisimiPhotos
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
      row_number:null
    };
  },
  mounted() {
  },
  methods: {
    async GetDatas(id) {
      this.hbglist = await haftalikbebekgelisimiservice.getData2(id);
    },
    async Edit() {
      await haftalikbebekgelisimiservice.updateData(
        this.id,
        this.name,
        this.desc,
        this.nameEn,
        this.descEn,
        this.row_number
      );
      window.location.reload(1);
    },
    enValue: function(nameEn,descEn) {
      this.nameEn = nameEn;
      this.descEn = descEn;
    },
    trValue: function(name,desc, row_number) {
      this.name = name;
      this.desc = desc;
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
