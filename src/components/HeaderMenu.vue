<template>
  <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="rgb(56, 56, 56)"
    text-color="#fff" active-text-color="#fff">
    <el-sub-menu index="1">
      <template #title>文件</template>
      <el-menu-item index="1-1">
        <i class="icon-import iconfont"></i>
        <template #title>导入</template>
        <input type="file" id="btn_file" style="display:none" />
      </el-menu-item>
      <el-menu-item index="1-2">
        <i class="icon-Import iconfont"></i>
        <template #title>导出</template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>编辑</template>
      <el-menu-item index="2-1">
        <i class="icon-xingzhuang iconfont"></i>
        <template #title>地图设置</template>
      </el-menu-item>
      <el-menu-item index="2-2" disabled>
        <i class="icon-xingzhuang iconfont"></i>
        <template #title>Canvas Settings</template>
      </el-menu-item>
      <el-menu-item index="2-3">
        <i class="icon-qingkong iconfont"></i>
        <template #title>清空当前层</template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>视图</template>
      <el-menu-item index="3-1">
        <el-radio v-model="isShowAllLayer" label="1">显示所有层</el-radio>
      </el-menu-item>
      <el-menu-item index="3-2">
        <el-radio v-model="isShowAllLayer" label="0">只显示当前层</el-radio>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="4" disabled>Help</el-menu-item>
  </el-menu>
  <!-- 设置画布的大小 -->
  <el-dialog title="TileMap Setting" v-model="dialogVisible" width="325px" @closed="closeDialogVisible">
    <div class="c-input">
      <label for="c-width">宽 (格子数)</label>
      <el-input-number id="c-width" v-model="tempCols" controls-position="right" :min="4" :max="100"></el-input-number>
    </div>
    <div class="c-input">
      <label for="c-height">高 (格子数)</label>
      <el-input-number id="c-height" v-model="tempRows" controls-position="right" :min="4" :max="100"></el-input-number>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialogVisible">取消</el-button>
        <el-button type="primary" @click="subNewCanvasSize">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";

import { importData } from "../ts/importMapData";

export default defineComponent({
  setup() {
    const $store = useStore(); // 使用useStore方法

    const isShowAllLayer = ref("1");
    const dialogVisible = ref(false);

    // 用来记录临时数据
    const tempCols = ref(25);
    const tempRows = ref(25);

    watch(isShowAllLayer, () => {
      $store.commit("changeShowModel", isShowAllLayer.value == "1");
    });

    function handleSelect(index: string) {
      // 导入文件
      if (index === "1-1") {
        const importBtn = document.getElementById(
          "btn_file"
        ) as HTMLInputElement;
        importBtn.click();
        importData($store, importBtn);
      }
      // 导出文件
      else if (index === "1-2") {
        // 导出文件事件
        window.dispatchEvent(new CustomEvent("exportData"));
      }
      // 画布设置
      else if (index === "2-1") {
        dialogVisible.value = true;
      }
      // 清空画布
      else if (index === "2-3") {
        // 发出清空画布事件
        window.dispatchEvent(new CustomEvent("cleanCanvas"));
      }
    }

    return {
      isShowAllLayer,
      handleSelect,
      dialogVisible,
      tempCols,
      tempRows,
      closeDialogVisible() {
        // 关闭之后更新临时数据
        tempCols.value = $store.state.canvasColSize;
        tempRows.value = $store.state.canvasRowSize;

        dialogVisible.value = false;
      },
      subNewCanvasSize() {
        $store.commit("changeNewCanvasSize", {
          cols: tempCols.value,
          rows: tempRows.value
        });
        dialogVisible.value = false;
      }
    };
  }
});
</script>

<style lang="less" scoped>
.el-menu.el-menu--horizontal {
  border-bottom: none;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}

.iconfont {
  margin-left: 10px;
  margin-right: 10px;
  color: rgb(173, 173, 173);
  font-size: 10px;
}

.c-input {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*实现垂直居中*/
}
</style>

<style>
.el-dialog__header {
  background-color: #3b3b3b;
}

.el-dialog__title {
  color: white !important;
  font-weight: bold;
}

.el-popper.is-light {
  border: none !important;
  background: none !important;
}
</style>
