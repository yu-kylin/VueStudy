<template>
  <div class="app-container">
    <my-header :header="[textBcColor,textColor,textTitle]"></my-header>
    <my-goods :goods="list" @setCount="setCount" @clickSl="tfSl"></my-goods>
    <my-footer :goods="list" @clickAll="tfAll" @closeAll="closeAll"></my-footer>
  </div>
</template>

<script>
// 目标1: 自定义头部
// 1.1 在 MyHeader 中定义 props
// 1.2 在 props 中加一些限制条件(类型/默认值/必选项)
// 1.3 子组件中使用这些数据
// 1.4 父组件中传入这些数据, 根据需求来传递(标题内容/文字颜色/背景色)

// 目标2: 获取数据
// 2.1 下包, 在 main.js 中引入
// 2.2 设置 baseURL
// 2.3 将 axios 挂载到 Vue 的原型上
// 2.4 在 App.vue 中 created 时调用全局属性 this.$http, 请求 /api/cart

// 目标3: 渲染数据
// 3.1 App.vue 中将获取的数据保存到 data 中
// 3.2 使用 v-for 循环渲染 MyGoods 组件
// 3.3 循环时将循环的数据传递给 MyGoods (父传子)
// 3.4 子组件接收到数据后, 使用即可

// 目标4: 勾选状态处理
// 4.1 在 MyGoods.vue 中双向绑定 goods_state 给复选框
// 4.2 动态绑定 id 给复选框
// 4.3 动态绑定相同的 id 给 label 的 for 属性

// 目标5: 商品数量
// 5.1 将 goods 从 MyGoods.vue 中传给 MyCount.vue (建议直接传对象, 否则数据同步很麻烦)
// 5.2 在 MyCount.vue 中使用 v-model 进行双向绑定
// 5.3 给按钮实现自增或自减(做边界处理)
// 5.4 使用 watch 强行修改超出边界的数据

// 目标6: 全选功能
// 6.1 在 MyFooter.vue 中使用 v-model 双向绑定一个计算属性 isAll
// 6.2 在 App.vue 中将 list 传递给 MyFooter.vue
// 6.3 在 set 方法中修改所有小选框状态
// 6.4 在 get 方法中使用 every 统计所有小选框状态并返回

// 目标7: 数量统计
// 7.1 在 MyFooter.vue 定义计算属性 allCount
// 7.2 遍历数组中所有的数据, 判断勾选状态
// 7.3 如果勾选了就累加商品数量并求和
// 7.4 使用插值表达式渲染在指定区域

// 目标8: 总价统计
// 8.1 在 MyFooter.vue 定义计算属性 allPrice
// 8.2 遍历数组中所有的数据, 判断勾选状态
// 8.3 如果勾选了就累加商品数量和单价的乘积
// 8.4 使用插值表达式渲染在指定区域

// 引入组件
import MyHeader from "./components/MyHeader.vue";
import MyGoods from "./components/MyGoods.vue";
import MyFooter from "./components/MyFooter.vue";

// goods_count   2
// goods_id  1
// goods_img  "https://yanxuan-item.nosdn.127.net/3a56a913e687dc2279473e325ea770a9.jpg"
// goods_name   "低帮城市休闲户外鞋天然牛皮COOLMAX纤维"
// goods_price   128
// goods_state  true
export default {
  name: "ShopcartApp",
  data() {
    return {
      list: [],
      // goods_count:-1,
      // goods_id:-1,
      // goods_img:'',
      // goods_name:'',
      // goods_price:-1,
      // goods_state:'true',
      textTitle:'购物车demo',
      textBcColor:'skyblue',
      textColor:'black' // 商品所有数据
    };
  },
  created() {
    // 不必在自己引入axios变量, 而是直接使用全局属性$axios
    this.$axios({
      url: "/api/cart",
    }).then((res) => {
      console.log(res);
      this.list = res.data.list;
    });
  },
  methods:{
    /**
     * 
     * @param {*} getcount
     * 监听 my-goods组件，用来修改商品的数量
     */
    setCount(getcount){
      for(let i=0;i<this.list.length;i++){
        if(this.list[i].goods_id==getcount.id)
        this.list[i].goods_count=getcount.count
      }
    },
    /**
     * 
     * @param {*} tf
     * 用来监听my-footer组件，主要是修改所有商品的goods_state属性的布尔值 
     */
    tfAll(tf){
      for(let i=0;i<this.list.length;i++){
        this.list[i].goods_state=tf
      }
      console.log(this.list);
    },
    /**
     * 
     * @param {*} item
     * 用来监听my-goods组件，当用户勾选或取消单个物品标签使修改这个物品当前的goods_state属性。 
     */
    tfSl(item){
      for(let i=0;i<this.list.length;i++){
        if(this.list[i].goods_id==item.id)
        this.list[i].goods_state=item.tf
      }
    },
    /**
     * 
     * @param {*} tf
     * 监听my0-footer组件，当用户结算的时候，清空购物车已经勾选的物品 
     */
    closeAll(tf){
      tf
      for(let i=0;i<this.list.length;){
        if(this.list[i].goods_state==true)
        this.list.splice(i,1)
        else i++
      }
    }
  },
  components: {
    MyHeader,
    MyGoods,
    MyFooter,
  },
};
</script>

<style lang="less" scoped>
.app-container {
  padding: 45px 0 50px 0;
}
</style>
