<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Giriş Ekranı</h1>
                  <p class="text-muted">Hesabınıza giriş yapınız</p>
                  <CInput placeholder="E-posta" v-model="email" type="email">
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Şifre"
                    type="password"
                    v-model="password"
                    v-on:keyup.enter="signin"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="info" class="px-4" v-on:click="signin"
                        >Giriş</CButton
                      >
                    </CCol>
                  </CRow>
                </CForm>
                <br />
                <h6 style="color:red;font-family: serif;font-weight:bold;">{{error}}</h6>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <img src="http://localhost:5000/api/uploads/logo.png" />
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    signin() {
      let user = {
        email: this.email,
        password: this.password,
      };

      axios.post("http://localhost:5000/api/login", user).then(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/");
          }
        },
        (err) => {
          this.error = err.response.data.error;
        }
      );
    },
  },
};
</script>

<style>
.bg-primary{
  background-color:#007bff !important;
}
</style>