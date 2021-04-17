<template>
  <CFooter :fixed="false">
    <div id="poweredText" class="col-md-12">
      <span class="mr-1">Powered by</span>
      <a id="freelanceIstanbul" href="https://github.com/freelancer-istanbul" target="_blank">Freelancer İstanbul</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
<style>

#poweredText{
  text-align: center;
  font-weight: bold;
}

#freelanceIstanbul{
  font-style: italic!important;
}
</style>