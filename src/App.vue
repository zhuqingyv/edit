<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-13 18:14:50
 * @LastEditTime: 2020-10-16 18:50:44
 * @LastEditors: zhuqingyu
-->
<template>
  <div id="app" @click="globalClick" v-if="getData">
    <tools-view class="toolsView"/>
    <div class="main">
      <forld-view />
      <content-view />
    </div>
    <globalTip />
    <right-click-box />
    <miniTip />
  </div>
</template>

<script>
import {mapActions, mapGetters}  from 'vuex';
import Event from 'event'

import api from "./api/index.js";
import contentView from "./components/contents/content";
import forldView from "./components/forld/forld";
import toolsView from "./components/tools/toolsView";
import rightClickBox from "./components/common/rightClickBox/rightClickBox"
import globalTip from "./components/common/tip/tip"
import miniTip from "./components/common/mimiTip/miniTip"

export default {
  name: "App",
  data() {
    return {
      json_: null,
      apiList: null,
      tempData: null
    };
  },

  components: { contentView, forldView, toolsView, rightClickBox, globalTip, miniTip },

  computed: {
    ...mapGetters(['getData']),
    json: {
      get() {
        return this.json_;
      },
      set(val) {
        this.json_ = val;
      },
    },
  },

  watch: {
    getData: {
      handler(val) {
        this.tempData = val
      },
      deep: true
    }
  },

  methods: {
    ...mapActions(['updateData']),
    getJson() {
      const $this = this;
      api({ method: "post", url: "/getApi", data: { a: 1 } })
        .then((response) => {
          const data = JSON.parse(response.data.json)
          data.dirty = false
          $this.updateData(data)
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    globalClick() {
      Event.$emit('globalClick')
    },

    update() {
      this.updateData()
    }
  },

  mounted() {
    this.getJson();
    Event.$on('UPDATE_DATA', this.update)
  },
};
</script>

<style lang="scss">
#app{
  width:100%;
  height:100%;
  border:5px solid rgba(0,0,0,0.5);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .toolsView{
    flex-grow: 1;
    box-sizing: border-box;
    border-bottom: 2px solid #ccc;
    box-shadow: 0px 4px 4px #ccc;
  }
  .main{
    display: flex;
    flex-grow:40;
  }
}
</style>
