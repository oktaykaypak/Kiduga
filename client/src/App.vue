<template>
  <router-view></router-view>
</template>

<script>

import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

Vue.material.locale.dateFormat = 'dd/MM/yyyy'
Vue.material.locale.months =['Ocak', 'Şubat', 'Mart', 'Nİsan', 'Mayıs', 'Hazİran', 'Temmuz', 'Ağustos', 'EylÜl', 'Ekİm', 'Kasım', 'Aralık']
Vue.material.locale.days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
Vue.material.locale.shortDays= ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
Vue.material.locale.shortMonths= ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
Vue.material.locale.shorterDays= ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'],
Vue.material.locale.firstDayOfAWeek= 1
Vue.material.locale.cancel= 'İptal'
Vue.material.locale.confirm= 'Kaydet'

export default {
  name: 'App',
  created(){
    if(localStorage.getItem('token') === null){
      this.$router.push('/pages/login');
    }
  }
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
