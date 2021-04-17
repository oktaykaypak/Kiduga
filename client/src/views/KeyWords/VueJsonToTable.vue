<template>
  <div class="">
  
    <div
      v-for="(row, index) in arrData"
      :key="index"
      class="row-data m-2 d-flex"
    >
      <div class="key p-2 col-sm-4 text-capitalize d-inline-block">
        {{ keyTitle(row) }}
      </div>
      <div v-if="['string', 'number'].includes(checkValueType(data[row]))">
        <div class="value p-2  d-inline-block">
          <input type="text" class="form-control col-sm-12 " :id-B="row" :id-D="data[row]" v-model="data[row]"></div>
      </div>
      <div v-else-if="checkValueType(data[row]) === 'array'">
        <div v-for="(arrRow, index2) in data[row]" :key="index2" class="d-flex">
          <div class="mx-2">--</div>
          <div v-if="['string', 'number'].includes(checkValueType(arrRow))">
            {{ arrRow }}
          </div>
          <div v-else>
            <VueJsonToTable :data="arrRow" />
          </div>
        </div>
      </div>
      <div v-else>
        <VueJsonToTable :data="data[row]" />
      </div>
    </div>
  </div>
</template>

<script>
import VueJsonToTable from "./VueJsonToTable";

export default {
  name: "VueJsonToTable",
  components: {
    VueJsonToTable
  },
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    arrData() {
      return Object.keys(this.data);
    }
  },
  methods: {
    keyTitle(key) {
      return key.split("_").join(" ");
    },
    checkValueType(val) {
      if (typeof val !== "object") {
        return typeof val;
      }
      return Array.isArray(val) ? "array" : "object";
    }
  }
};
</script>

<style lang="scss" scoped>
.m-2 {
  margin: .5rem!important;
}

.mx-2 {
  margin-right: .5rem!important;
}

.p-2 {
  padding: .5rem!important;
  border-radius: 5px;
}

.d-flex {
  display: flex!important;
}

.d-inline-block {
  display: inline-block!important;
}

.text-capitalize {
  text-transform: capitalize!important;
}

.key {
 background:linear-gradient(45deg, #39f 0%, #2982cc 100%) !important;
 color:white
}

.table-main {
  .row-data {
    border: 1px solid grey;
    border-radius: 2px;
  }
}
</style>
