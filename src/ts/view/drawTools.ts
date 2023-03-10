/**
 * @file 存放绘制工具
 *
 * @author alsritter(alsritter1@gmail.com)
 */

import type GridManager from "../data/GridManager";
import type TileManager from "../data/TileManager";

export default class DrawTools {
  /**
   * 绘制网格
   *
   * @param {CanvasRenderingContext2D} ctx 传入 canvas 的 Context
   * @param {Number} space 一个格子的大小
   * @param {Number} width 画布的宽度
   * @param {Number} height 画布的高度
   * @param {Number} gridWithSize 一行多少个格子
   * @param {Number} gridHeightSize 一列有多少个格子
   */
  static drawGrid(
    ctx: CanvasRenderingContext2D,
    space: number,
    width: number,
    height: number,
    gridWithSize: number,
    gridHeightSize: number
  ): void {
    let gw: number = gridWithSize;
    let gh: number = gridHeightSize;

    // 采用遍历的方式，绘画x轴的线条
    for (let i = 0; i < gw; i++) {
      ctx.clearRect(space * i, 0, space, space);
      ctx.clearRect(space * i, height - space, space, space);
      if (i != 0 && i != gw - 1) {
        ctx.beginPath();
        ctx.strokeStyle = "#000000"; // 设置颜色
        ctx.font = '28px serif';// 设置字体大小
        let textWidth = ctx.measureText((i - 1).toString()).width;
        let fix = ctx.measureText((i - 1).toString()).actualBoundingBoxAscent + ctx.measureText((i - 1).toString()).actualBoundingBoxDescent;
        ctx.fillText((i - 1).toString(), space * (i + 0.5) - textWidth / 2, space / 2 + fix / 2);// 绘制 "实心" 文字
        ctx.beginPath();
        ctx.fillText((i - 1).toString(), space * (i + 0.5) - textWidth / 2, height - space + space / 2 + fix / 2);// 绘制 "实心" 文字
      }

      ctx.beginPath(); // 开启路径，设置不同的样式
      ctx.moveTo(space * i - 0.5, space); // -0.5是为了解决像素模糊问题
      ctx.lineTo(space * i - 0.5, height - space);
      if ((gw % 2 == 0 && (i == gw / 2)) || (gw % 2 == 1 && ((i == Math.floor(gw / 2)) || (i == Math.floor(gw / 2) + 1)))) {
        ctx.setLineDash([8, 1]); //绘制虚线
      } else {
        ctx.strokeStyle = "#2a2a2a"; // 设置每个线条的颜色
        ctx.setLineDash([1, 4]); //绘制虚线
      }
      ctx.stroke();
    }

    // 同理y轴
    for (let i = 0; i < gh; i++) {
      ctx.clearRect(0, space * i, space, space);
      ctx.clearRect(width - space, space * i, space, space);
      if (i != 0 && i != gh - 1) {
        ctx.beginPath();
        ctx.strokeStyle = "#000000"; // 设置颜色
        ctx.font = '28px serif';// 设置字体大小
        let textWidth = ctx.measureText((gh - i - 2).toString()).width;
        let fix = ctx.measureText((gh - i - 2).toString()).actualBoundingBoxAscent + ctx.measureText((gh - i - 2).toString()).actualBoundingBoxDescent;
        ctx.fillText((gh - i - 2).toString(), 25 - textWidth / 2, space * (i + 0.5) + fix / 2);// 绘制 "实心" 文字
        ctx.beginPath();
        ctx.fillText((gh - i - 2).toString(), width - space + 25 - textWidth / 2, space * (i + 0.5) + fix / 2);// 绘制 "实心" 文字
      }

      ctx.beginPath(); // 开启路径，设置不同的样式
      ctx.moveTo(space, space * i - 0.5);
      ctx.lineTo(width - space, space * i - 0.5);
      if ((gh % 2 == 0 && (i == gh / 2)) || (gh % 2 == 1 && ((i == Math.floor(gh / 2)) || (i == Math.floor(gh / 2) + 1)))) {
        ctx.setLineDash([8, 1]); //绘制虚线
      } else {
        ctx.strokeStyle = "#2a2a2a"; // 设置每个线条的颜色
        ctx.setLineDash([1, 2]); //绘制虚线
      }
      ctx.stroke();
    }
  }

  /**
   * 让指定的位置变暗
   *-
   * @param {CanvasRenderingContext2D} ctx 传入 canvas 的 Context
   * @param {Number} space 一个格子的大小
   * @param {Number} x 绘制目的地的 x
   * @param {Number} y 绘制目的地的 y
   */
  static drawDark(
    ctx: CanvasRenderingContext2D,
    space: number,
    x: number,
    y: number
  ): void {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.beginPath();
    ctx.rect(x, y, space, space);
    ctx.fill();
    ctx.closePath();
  }

  /**
   * 让指定的位置变成指定的颜色
   *
   * @param {CanvasRenderingContext2D} ctx 传入 canvas 的 Context
   * @param {Number} space 一个格子的大小
   * @param {Number} x 绘制目的地的 x
   * @param {Number} y 绘制目的地的 y
   * @param {String} color 指定的颜色
   */
  static drawColor(
    ctx: CanvasRenderingContext2D,
    space: number,
    x: number,
    y: number,
    color: string
  ): void {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, space, space);
    ctx.fill();
    ctx.closePath();
  }

  /**
   * 清空指定位置的格子
   *
   * @param {CanvasRenderingContext2D} ctx 传入 canvas 的 Context
   * @param {Number} space 一个格子的大小
   * @param {Number} x 绘制目的地的 x
   * @param {Number} y 绘制目的地的 y
   */
  static clearTile(
    ctx: CanvasRenderingContext2D,
    space: number,
    x: number,
    y: number
  ): void {
    ctx.clearRect(x, y, space, space);
  }

  /**
   * 在指定位置绘制一个 Tile 注意这个 X Y 是以这个 ctx 为原点的
   *
   * @param {CanvasRenderingContext2D} ctx 传入 canvas 的 Context
   * @param {TileManager} map 传入 TileManager
   * @param {Number} tileX Tile 的索引
   * @param {Number} tileY Tile 的索引
   * @param {Number} space 一个格子的大小
   * @param {Number} x 绘制目的地的 x
   * @param {Number} y 绘制目的地的 y
   */
  static drawTile(
    ctx: CanvasRenderingContext2D,
    map: TileManager,
    tileX: number,
    tileY: number,
    space: number,
    x: number,
    y: number
  ): void {
    ctx.drawImage(
      map.getImage(),
      map.getTile(tileX, tileY).x!,
      map.getTile(tileX, tileY).y!,
      map.getWidth(),
      map.getHeight(),
      x,
      y,
      space,
      space
    );
  }

  /**
   * 绘制背景方格
   * @param {CanvasRenderingContext2D} ctx 传入 canvas 的 Context
   * @param {Number} width 画布的宽度
   * @param {Number} height 画布的高度
   */
  static drawBackground(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void {
    const emptyBox = ctx.createImageData(width, height);
    const emptyBoxData = emptyBox.data;

    // 通过 canvas宽高 来遍历一下 canvas 上的所有像素点
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const point = (i * width + j) << 2; // << 相当于 * 4
        const rgbData = ((i >> 2) + (j >> 2)) & 1 ? 204 : 255; // >> 2 相当于 / 4 取整， & 1相当于 % 2
        emptyBoxData[point] = rgbData;
        emptyBoxData[point + 1] = rgbData;
        emptyBoxData[point + 2] = rgbData;
        emptyBoxData[point + 3] = 255;
      }
    }

    ctx.putImageData(emptyBox, 0, 0);
  }

  /**
   * 判度当前位置上的图片是否是空的
   * @param {TileManager} map
   * @param {Number} tileX
   * @param {Number} tileY
   * @returns {Boolean} true 表示是空的
   */
  static isEmpty(map: TileManager, tileX: number, tileY: number): boolean {
    return map.getTile(tileX, tileY).isEmpty;
  }

  /**
   * 绘制 Map里面的全部 Tile
   *
   * @param {CanvasRenderingContext2D} ctx 传入 canvas 的 Context
   * @param {TileManager} map 传入 TileManager
   * @param {GridManager} pos 传入 位置列表
   * @param {Number} space 一个格子的大小
   */
  static drawAllTile(
    ctx: CanvasRenderingContext2D,
    map: TileManager,
    pos: GridManager,
    space: number
  ): void {
    for (let i = 0; i < map.getCols(); i++) {
      for (let j = 0; j < map.getRows(); j++) {
        DrawTools.drawTile(
          ctx,
          map,
          i,
          j,
          space,
          pos.getGrid(i, j).x!,
          pos.getGrid(i, j).y!
        );
      }
    }
  }
}
