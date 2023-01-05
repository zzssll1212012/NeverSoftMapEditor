<template>
  <div id="showType">
    <div class="title">地图名</div>
    <el-input v-model="mapName" placeholder="地图名" />
    <div class="title">描述</div>
    <el-input v-model="comment" placeholder="描述" />
    <div class="title">初始金币</div>
    <el-input-number v-model="startGold" />
    <div class="title">地图类型</div>
    <el-select v-model="tileset" placeholder="selection tool">
      <el-option v-for="item in tilesets" :key="item.value" :label="item.label" :value="item.value">
        <span>{{ item.label }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts" >
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  watch: {},
  setup() {
    const mapName = ref("");
    const comment = ref("");
    const startGold = ref("");
    const tileset = ref("0");
    // const layer = ref("0");
    const store = useStore(); // 使用useStore方法

    watch(mapName, () => {
      // console.log(mapName.value);
    });

    window.addEventListener("importMapMessage", (event: any) => {
      mapName.value = event.detail.title;
      comment.value = event.detail.comment;
      startGold.value = event.detail.startGold;
    });

    return {
      mapName,
      comment,
      startGold,
      tileset,
      tilesets: [
        {
          value: "0",
          label: "笔刷",
        },
        {
          value: "1",
          label: "笔刷-矩形",
        },
        {
          value: "2",
          label: "全部填充",
        },
        {
          value: "7",
          label: "区域填充",
        },
        {
          value: "8",
          label: "地块替换",
        },
        {
          value: "3",
          label: "橡皮",
        },
        {
          value: "4",
          label: "橡皮-矩形",
        }
      ]
    };
  }
});
</script>

<style lang="less" scoped>
/* 引入字体文件 */
@font-face {
  font-family: "BlackItalic";
  src: url("../assets/fonts/EskapadeFraktur-BlackItalic.OTF");
}

#showType {
  background-color: rgb(255, 255, 255);
  padding: 15px;
  border-top-width: 1px;
  border-top-color: #eeeeee;
  border-top-style: inset;
}
</style>
