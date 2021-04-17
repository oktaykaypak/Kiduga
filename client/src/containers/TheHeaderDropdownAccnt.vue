<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img src="img/avatars/profile.png" class="c-avatar-img" />
        </div>
      </CHeaderNavLink>
    </template>
    <!-- <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Hesap İşlemleri</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-bell"/> Duyurular
      <CBadge color="info" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-envelope-open" /> Mesajlar
      <CBadge color="success" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem> -->
    <CDropdownItem @click="User"> <CIcon name="cil-user" />{{ email }}</CDropdownItem>
    <CDropdownDivider />
    <CDropdownItem @click="logout">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import axios from "axios";
export default {
  name: "TheHeaderDropdownAccnt",
  data () {
    return { 
      email: "",
      id:""
    }
  },
  async created() {
    axios
      .get("http://localhost:5000/api/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.id = res.data.user.id;
        this.email = res.data.user.email;
      })
  },
  methods:{
    logout(){
      localStorage.clear();
      this.$router.push('/pages/login');
    },
    User(){
      window.location = `http://localhost:8080/#/yonetici/yoneticiduzenle?id=${this.id}`;
    }
  }
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>