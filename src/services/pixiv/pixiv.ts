import axios, { AxiosResponse } from "axios";
import { Lolicon } from "./types";

// const date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export interface Params {
  r18?: number,	    // 0为非 R18，1为 R18，2为混合（在库中的分类，不等同于作品本身的 R18 标识）
  num?:	number,         // 一次返回的结果数量，范围为1到20；在指定关键字或标签的情况下，结果数量可能会不足指定的数量
  uid?: number[],		      // 返回指定uid作者的作品，最多20个
  keyword?: string,		// 返回从标题、作者、标签中按指定关键字模糊匹配的结果，大小写不敏感，性能和准度较差且功能单一，建议使用tag代替
  tag?: string[],		  // 返回匹配指定标签的作品，详见下文
  size?: string[],	  // ["original"]	返回指定图片规格的地址，详见下文
  proxy?:	string,	    // i.pixiv.re	设置图片地址所使用的在线反代服务，详见下文
  dateAfter?: number,		  // 返回在这个时间及以后上传的作品；时间戳，单位为毫秒
  dateBefore?: number,		// 返回在这个时间及以前上传的作品；时间戳，单位为毫秒
  dsc?: boolean,	 // 禁用对某些缩写keyword和tag的自动转换，详见下文
  excludeAI?: boolean,	// 排除 AI 作品
}

export interface Response<T> {
  error?: string,
  data?: T[];
}

const defaultParams: Params = {
  r18: 1,
  num: 1,
  tag: ["genshin", "genshinImpact", "GenshinImpact"],
  size: ["original"],
  dsc: false,
  excludeAI: true,
}

const PIXIV_URL = 'https://api.lolicon.app/setu/v2';

export const getPixivImage = async (params: Params): Promise<Lolicon> => {
  const innerParams = Object.assign(defaultParams, params);
  const res: AxiosResponse<Response<Lolicon>> = await axios.get<Response<Lolicon>>(PIXIV_URL, {
    params: innerParams,
  });
  const { data: outerData } = res || {};
  const { data = [] } = outerData || {};
  return data[0];
}

// const getAxiosConfig = (): AxiosRequestConfig => {

//   if (_config.isProxy === false) {
//     return undefined;
//   }
//   const proxyUrl = new URL(_config.proxyHost);
//   return {
//     proxy: {
//       host: proxyUrl.hostname,
//       port: Number(proxyUrl.port),
//       protocol: proxyUrl.protocol,
//     }
//   }
// }
