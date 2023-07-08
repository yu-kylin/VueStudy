<template>
  <div class="my-header" :style="{backgroundColor: header[0],color:header[1]}" >{{header[2]}}</div>
</template>

<script>
export default {
  props:{
    header:{
      type:Array,
      required:true
    }
  }
};
</script>

<style lang="less" scoped>
.my-header {
  height: 45px;
  line-height: 45px;
  font-family: '宋体';
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  // background-color: #1d7bff;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}
</style>
