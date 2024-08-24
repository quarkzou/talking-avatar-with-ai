import * as tencentcloud from "../../../../tencentcloud-sdk-nodejs"

// 导入对应产品模块的client models
const AsrClient = tencentcloud.asr.v20190614.Client
const AsrModel = tencentcloud.asr.v20190614.Models



// 实例化要请求产品的client对象。profile可选。
const client = new AsrClient({
  credential: {
    secretId: process.env.TENCENTCLOUD_SECRET_ID,
    secretKey: process.env.TENCENTCLOUD_SECRET_KEY,
  },
  region: "ap-shanghai",
  profile: {
    signMethod: "TC3-HMAC-SHA256",
    httpProfile: {
      reqMethod: "POST",
      reqTimeout: 30,
    },
  },
})


const 

const request =  {
 /**
  * 引擎模型类型。
电话场景：
• 8k_zh：中文电话通用；
• 8k_en：英文电话通用；

非电话场景：
• 16k_zh：中文通用；
• 16k_zh-PY：中英粤;
• 16k_zh_medical：中文医疗；
• 16k_en：英语；
• 16k_yue：粤语；
• 16k_ja：日语；
• 16k_ko：韩语；
• 16k_vi：越南语；
• 16k_ms：马来语；
• 16k_id：印度尼西亚语；
• 16k_fil：菲律宾语；
• 16k_th：泰语；
• 16k_pt：葡萄牙语；
• 16k_tr：土耳其语；
• 16k_ar：阿拉伯语；
• 16k_es：西班牙语；
• 16k_hi：印地语；
• 16k_fr：法语；
• 16k_de：德语；
• 16k_zh_dialect：多方言，支持23种方言（上海话、四川话、武汉话、贵阳话、昆明话、西安话、郑州话、太原话、兰州话、银川话、西宁话、南京话、合肥话、南昌话、长沙话、苏州话、杭州话、济南话、天津话、石家庄话、黑龙江话、吉林话、辽宁话）；
  */
 EngSerViceType: '16k_zh',
 /**
  * 语音数据来源。0：语音 URL；1：语音数据（post body）。
  */
 SourceType: 0,
 /**
  * 识别音频的音频格式，支持wav、pcm、ogg-opus、speex、silk、mp3、m4a、aac、amr。
  */
 VoiceFormat: 'mp3',
 /**
  * 腾讯云项目 ID，废弃参数，填写0即可。
  * @deprecated
  */
 ProjectId: 0,
 /**
  * 子服务类型。2： 一句话识别。
  * @deprecated
  */
 SubServiceType: 2,
 /**
  * 语音的URL地址，需要公网环境浏览器可下载。当 SourceType 值为 0时须填写该字段，为 1 时不填。音频时长不能超过60s，音频文件大小不能超过3MB。

注意：推荐使用 [腾讯云COS](https://cloud.tencent.com/document/product/436/38484) 来存储音频、生成URL并提交请求，此种方式会走内网下载音频，极大降低整体请求时延；并且不会产生外网和流量下行费用，可节约成本（COS桶权限需要设置公有读私有写，或URL设置时效访问签名）
  */
 Url: 'https://sis-sample-audio.obs.cn-north-1.myhuaweicloud.com/16k16bit.mp3',
 /**
  * 废弃参数，填写任意字符串即可。
  * @deprecated
  */
 UsrAudioKey: '',
 /**
  * 语音数据，当SourceType 值为1（本地语音数据上传）时必须填写，当SourceType 值为0（语音 URL上传）可不写。要使用base64编码(采用python语言时注意读取文件应该为string而不是byte，以byte格式读取后要decode()。编码后的数据不可带有回车换行符)。音频时长不能超过60s，音频文件大小不能超过3MB（Base64后）。
  */
 Data: '',
 /**
  * 数据长度，单位为字节。当 SourceType 值为1（本地语音数据上传）时必须填写，当 SourceType 值为0（语音 URL上传）可不写（此数据长度为数据未进行base64编码时的数据长度）。
  */
 DataLen: 0
}


client.SentenceRecognition(
  request,
  function (err, response) {
    // 请求异常返回，打印异常信息
    if (err) {
      console.log(err)
      return
    }
    // 请求正常返回，打印response对象
    console.log(response)
  }
)
