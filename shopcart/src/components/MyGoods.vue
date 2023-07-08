<template>
  <div v-if="goods.length > 0">
    <div class="my-goods-item" v-for="item in goods" :key="item.id">
      <div class="left">
        <div class="custom-control custom-checkbox" @click="clickSl(item)">
          <input
            type="checkbox"
            class="custom-control-input"
            :checked="item.goods_state"
          />
          <label class="custom-control-label">
            <img :src="item.goods_img" alt="" />
          </label>
        </div>
      </div>
      <div class="right">
        <div class="top">{{ item.goods_name }}</div>
        <div class="bottom">
          <span class="price">¥ {{ item.goods_price }}</span>
          <span>
            <MyCount :count="[item.goods_count, item.goods_id]" @setCount="handleSetCount"></MyCount>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="textOver" v-else-if="goods.length === 0">购物车没有物品！</div>
</template>

<script>
import MyCount from "./MyCount.vue";

export default {
  data() {
    return {
      checkeData: {
        tf: false,
        id: -1,
      },
    };
  },
  props: {
    goods: {
      type: Array,
    },
  },
  methods: {
    handleSetCount(getcount) {
      this.$emit("setCount", getcount);
    },
    clickSl(item) {
      if (item.goods_state) {
        this.checkeData.tf = false;
      } else {
        this.checkeData.tf = true;
      }
      this.checkeData.id = item.goods_id;
      this.$emit("clickSl", this.checkeData);
    },
    // toggleGoodsState(item) {
    //   item.goods_state = !item.goods_state;
    // },
  },
  components: {
    MyCount,
  },
};
</script>

<style lang="less" scoped>
.textOver {
  margin-top: 200px;
  display: flex;
  justify-content: center; //水平居中
  color: pink;
  font-family: "宋体";
  font-size: 60px;
}

.my-goods-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .left {
    img {
      width: 120px;
      height: 120px;
      margin-right: 8px;
      margin-left: 8px;
      border-radius: 10px;
    }
    .custom-control-label::before,
    .custom-control-label::after {
      top: 50px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      font-size: 14px;
      font-weight: 700;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      align-items: center;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
}
</style>
