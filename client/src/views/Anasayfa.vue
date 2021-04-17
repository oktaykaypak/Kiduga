<template>
  <vcl-facebook v-if="isLoading == true"> </vcl-facebook>
  <div v-else>
    <div class="container" id="mainCont">
      <!--card1--baslangic-->
      <div class="row">
        <div class="col-md-4">
          <button
            id="toys"
            class="home-card bg_pic bg_pic"
            @click="$router.push('/oyuncakislemleri/oyuncaklar')"
          >
            <img src="" />
            Oyuncaklar
          </button>
        </div>
        <div class="col-md-4">
          <button
            id="stories"
            class="home-card bg_pic"
            @click="$router.push('/masalislemleri/masallar')"
          >
            Masallar
          </button>
        </div>
        <div class="col-md-4">
          <button
            id="blog"
            class="home-card bg_pic"
            @click="$router.push('/blog/blogislemleri')"
          >
            Blog
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <button
            id="tarif"
            class="home-card bg_pic"
            @click="$router.push('/tarif/tarifislemleri')"
          >
            Blog
          </button>
        </div>
        <div class="col-md-4">
          <button
            id="music"
            class="home-card bg_pic"
            @click="$router.push('/muzikler/muzikislemleri')"
          >
            Müzikler
          </button>
        </div>
        <div class="col-md-4">
          <button
            id="mbaby"
            class="home-card bg_pic"
            @click="$router.push('/abebekgelisimi/aylikbebekgelisimi')"
          >
            Aylık Bebek Gelişimi
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <button
            id="wbaby"
            class="home-card bg_pic"
            @click="$router.push('/hbebekgelisimi/haftalikbebekgelisimi')"
          >
            Haftalık Bebek Gelişimi
          </button>
        </div>
        <div class="col-md-4">
          <button
            id="admin"
            class="home-card bg_pic"
            @click="$router.push('/yonetici/yoneticiislemleri')"
          >
            Yönetici İşlemleri
          </button>
        </div>
        <div class="col-md-4">
          <button
            id="user"
            class="home-card bg_pic"
            @click="$router.push('/kullanici/kullaniciislemleri')"
          >
            Kullanıcı İşlemleri
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VclFacebook, VclInstagram } from "vue-content-loading";
import axios from "axios";
export default {
  name: "Dashboard",
  components: {
    VclFacebook,
    VclInstagram,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
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
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  },
};
</script>

<style>
.home-card {
  background: #333333;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
  color: #ffffff;
  background: #333333;
  text-align: center;
  padding-top: 25%;
  padding-bottom: 30%;
  font-size: 30px;
  height: 90%;
  width: 100%;
  border-radius: 8px !important;
  border: 0;
}
.bg_pic {
  background-position: center;
  background-size: cover;
  transition-duration: 0.25s;
}
.bg_pic:hover {
  transition-duration: 0.25s;
  transform: scale(1.03);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
}
#toys {
  background-image: url(../../public/img/toys.jpg);
}
#stories {
  background-image: url(../../public/img/stories.jpg);
}
#blog {
  background-image: url(../../public/img/blog.jpg);
}
#tarif {
  background-image: url(../../public/img/tarif.jpg);
}
#music {
  background-image: url(../../public/img/music.jpg);
}
#mbaby {
  background-image: url(../../public/img/mbaby.jpg);
}
#wbaby {
  background-image: url(../../public/img/wbaby.jpg);
}
#admin {
  background-image: url(../../public/img/admin.png);
}
#user {
  background-image: url(../../public/img/user.jpg);
  background-position: top;
}
</style>