<template>
  <el-select v-model="currentValue" filterable @change="change" :multiple="multiple">
    <el-option v-for="(item,index) in data" :value="item[valueKey]" :label="item[labelKey]" :key="index"/>
  </el-select>
</template>

<script>
  export default {
    name: "select-config-type",
    props: {
      value: {
        default: '',
        type: [String, Number, Array]
      },
      method: {
        default: 'get',
        type: String
      },
      api: {
        default: '',
        type: String
      },
      valueKey: {
        default: 'id',
        type: String
      },
      labelKey: {
        default: 'name',
        type: String
      },
      multiple: {
        default: false,
        type: Boolean
      }
    },
    data() {
      return {
        data: [],
        currentValue: ``
      };
    },
    created() {
      this.currentValue = this.value;
      this.getData();
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      getData() {
        const { api, method } = this;
        this.$axios({
          url: api,
          method
        }).then((res) => {
          const { data } = res;
          this.data = data.list;
          this.$emit('loaded', this.data);
        });
      },
      change(data) {
        this.$emit('change', data);
      }
    }
  }
</script>
