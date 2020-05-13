/* 
包含一些工具函数的模块
*/
import { v4 as uuidv4 } from "uuid";

export function getUserTempId() {
  // 从localStorage读取保存的用户临时ID
  let userTempId = localStorage.getItem("USER_TEMP_ID_KEY");
  //如果没有, 通过UUID生成一个新的, 保存到localStorage, 并返回
  if (!userTempId) {
    userTempId = uuidv4();
    localStorage.setItem("USER_TEMP_ID_KEY", userTempId);
  }
  return userTempId;
}
