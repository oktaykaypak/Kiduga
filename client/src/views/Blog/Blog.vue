<template>
  <div>
    <div>
      <md-tabs md-sync-route>
        <md-tab
          id="deneme"
          md-label="Türkçe"
          :to="`/blog/blogduzenle?id=${id}`"
        >
          <duzenle
            :hbglist="hbglist"
            :categoryList="categoryList"
            @EditTr="trValue"
          ></duzenle>
          <md-button
            class="md-raised md-primary"
            @click="Edit"
            style="margin-left: 0%; width: 135px"
            >Kaydet</md-button
          >
        </md-tab>

        <md-tab
          id="tab-pages"
          md-label="İNGİLİZCE"
          :to="`/blog/blogduzenleen?id=${id}`"
        >
          <duzenleEn :hbglist="hbglist" @EditEn="enValue"></duzenleEn>
          <md-button
            class="md-raised md-primary"
            @click="Edit"
            style="margin-left: 0%; width: 135px"
            >Kaydet</md-button
          >
        </md-tab>

        <md-tab
          id="tab-postss"
          md-label="Görseller"
          :to="`/blog/blogphotos?id=${id}`"
        >
          <photos></photos>
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
import blogservice from "../../services/blogservice";
import axios from "axios";
import BlogDuzenle from "@/views/Blog/BlogDuzenle";
import BlogDuzenleEn from "@/views/Blog/BlogDuzenleEn";
import BlogPhotos from "@/views/Blog/BlogPhotos";

export default {
  name: "HaftalikBebek",
  components: {
    duzenle: BlogDuzenle,
    duzenleEn: BlogDuzenleEn,
    photos: BlogPhotos,
  },
  data() {
    return {
      hbglist: [],
      categoryList: [],
      categoryId: null,
      id: "",
      name: "",
      link: "",
      desc: "",
      nameEn: "",
      descEn: "",
      page: "",
      img_url: "",
      img_url2: "",
      showInPage: false,
      startDate: null,
      endDate: null,
      row_number: null,
    };
  },
  mounted() {},
  methods: {
    async GetCategory() {
      this.categoryList = await blogservice.getCategories();
    },
    async GetDatas(id) {
      this.hbglist = await blogservice.getData2(id);
    },
    async Edit() {
      if (this.categoryId != null) {
        await blogservice.updateBlog(
          this.id,
          this.name,
          this.desc,
          this.nameEn,
          this.descEn,
          this.categoryId,
          this.showInPage,
          this.startDate,
          this.endDate,
          this.row_number
        );
        window.location.reload(1);
      } else {
        alert("Lütfen Kategori Seçiniz.");
      }
    },
    enValue: function (nameEn, descEn) {
      this.nameEn = nameEn;
      this.descEn = descEn;
    },
    trValue: function (
      name,
      desc,
      categoryId,
      showInPage,
      startDate,
      endDate,
      row_number
      
    ) {
      this.name = name;
      this.desc = desc;
      this.categoryId = categoryId;
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

#tab-postss {
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

.md-raised {
  margin-top: 2%;
  width: 135px;
  margin-left: 0px;
}

/deep/ .md-tabs-navigation {
  border-radius: 20px 20px 0px 0px !important;
}

/deep/ .md-content {
  border-radius: 0px 0px 20px 20px !important;
}
</style>
