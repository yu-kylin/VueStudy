<template>
  <!-- 底部 -->
  <div class="my-footer">
    <!-- 全选 -->
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="footerCheck" @click="clickAll" />
     <label class="custom-control-label" for="footerCheck"  :checked="tf">全选</label>
    </div>
    <!-- 合计 -->
    <div>
      <span>合计:</span>
      <span class="price">¥ {{ allPrice }}</span>
    </div>
    <!-- 按钮 -->
    <button type="button" class="footer-btn btn btn-primary" @click="closeAccount">结算{{ allPrice }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tf: false,
    };
  },
  props: {
    goods: {
      type: Array,
    },
  },
  computed: {
    allPrice() {
      let sum=0
      for(let i=0;i<this.goods.length;i++){
        if(this.goods[i].goods_state==true)
        sum+=this.goods[i].goods_count*this.goods[i].goods_price
      }
      return sum
    },
  },
  methods: {
    clickAll() {
      if(this.tf)
      this.tf=false
      else this.tf=true
      console.log(this.tf);
      return this.$emit("clickAll", this.tf);
    },
    closeAccount(){
      return this.$emit("closeAll",true)
    }
  },
};
</script>

<style lang="less" scoped>
.my-footer {
  position: fixed;
  z-index: 2;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background: #fff;

  .price {
    color: red;
    font-weight: bold;
    font-size: 15px;
  }
  .footer-btn {
    min-width: 80px;
    height: 30px;
    line-height: 30px;
    border-radius: 25px;
    padding: 0;
  }
}
</style>
