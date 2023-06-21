import {request, upload} from "@/request";
import api from "@/api";

/**
 * banner列表
 * @returns {Promise<*>}
 */
export function example(data) {
  return request(api.example, {data, method: "POST"}, {silent: false});
}

/**
 * banner列表
 * @returns {Promise<*>}
 */
export function uploadExample(data) {
  return upload(api.example, data);
}
