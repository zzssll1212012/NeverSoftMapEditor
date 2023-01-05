/**
 * @file 用于导入数据
 *
 * @author alsritter(alsritter1@gmail.com)
 */

import GridManager from "./data/GridManager";
import StartAndEndPos from "./data/VO/StartAndEndPos";
import Grid from "./data/VO/Grid";
import BasePos from "./data/VO/BasePos";
import type { Store } from "vuex";
import type Decoration from "./data/VO/Decoration";
import type PrebuiltTrap from "./data/VO/PrebuiltTrap";
import TileImageMap from "./data/TileImageMap";

function constructData(
  layerData: string[],
  space: number,
  cols: number,
  rows: number
): GridManager {
  const tempMap: Grid[][] = [];

  // 因为生成数据时已经抹除了多余的信息，所以这里需要重新生成
  let h = layerData.length;
  let w = layerData[0].length;
  for (let i = 0; i < h + 2; i++) {
    const tempGrids: Grid[] = [];
    for (let j = 0; j < w + 2; j++) {
      // let x = i + 1;
      // let y = j + 1;
      if ((i <= 0 || i >= h + 1) || (j <= 0 || j >= w + 1)) {
        tempGrids.push(new Grid(j * space, i * space, null, null));
        continue;
      }
      let pos = TileImageMap.MapData.get(layerData[i - 1][j - 1])!;
      if (!pos) {
        console.log("发现未识别字符：" + layerData[i - 1][j - 1]);
        tempGrids.push(new Grid(j * space, i * space, null, null));
      } else {
        tempGrids.push(new Grid(j * space, i * space, pos.x, pos.y));
      }
    }
    tempMap.push(tempGrids);
  }

  const temp = new GridManager(space, cols, rows);
  temp.setMap(tempMap);

  return temp;
}

export function importData(
  $store: Store<any>,
  importButton: HTMLInputElement
): void {
  importButton.onchange = () => {
    // 读取文件
    // @ts-ignore：这里会非空的报错
    const file = importButton.files[0];

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      // 文件的原始数据
      const data: {
        title: string;
        comment: string;
        startGold: number;
        tileset: string;
        route: string[][];
        field: string[];
        decorations: Decoration[];
        PrebuiltTraps: PrebuiltTrap[];
      } = JSON.parse(reader.result as string);

      const newMap: GridManager[] = [];
      const rows = data.field.length;
      const cols = data.field[0].length;

      window.dispatchEvent(new CustomEvent("importMapMessage", { detail: data }));

      // 通知 Vuex 更变宽高
      $store.commit("changeNewCanvasSize", {
        cols: cols,
        rows: rows
      });

      let _space = GridManager.space;

      newMap.push(
        constructData(data.field, _space, cols, rows)
      );

      // 更新数据
      $store.commit("setMapData", {
        newMap: newMap,
        newSA: new StartAndEndPos(
          new BasePos(0, 0),
          new BasePos(0, 0)
        )
      });
    };
  };
}
