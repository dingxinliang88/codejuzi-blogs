# 腾讯云COS对象存储实战——用户头像相关

> 官方SDK：https://cloud.tencent.com/document/product/436/10199
>
> 环境：
>
> - SpringBoot 2.7.x
>
> 需要先开通COS对象存储服务：https://cloud.tencent.com/document/product/436



## 安装SDK

```xml
<dependency>
       <groupId>com.qcloud</groupId>
       <artifactId>cos_api</artifactId>
       <version>5.6.133</version>
</dependency>
```

## 配置COS对象存储

[application.yml]

```yaml
#  腾讯云cos配置
cos:
 client:
   accessKey: XXX
   secretKey: xxx
   region: xxx
   bucket: xxx
```

[客户端配置]

```java
/**
 * 腾讯云对象存储客户端
 *
 * @author codejuzi
 */
@Data // 此处可以换成getter, setter
@Configuration
@ConfigurationProperties(prefix = "cos.client")
public class CosClientConfig {

  /**
    * accessKey
    */
  private String accessKey;

  /**
    * secretKey
    */
  private String secretKey;

  /**
    * 区域
    */
  private String region;

  /**
    * 桶名
    */
  private String bucket;

  @Bean
  public COSClient cosClient() {
    // 初始化用户身份信息(secretId, secretKey)
    COSCredentials cred = new BasicCOSCredentials(accessKey, secretKey);
    // 设置bucket的区域, COS地域的简称请参照 https://www.qcloud.com/document/product/436/6224
    ClientConfig clientConfig = new ClientConfig(new Region(region));
    // 生成cos客户端
    return new COSClient(cred, clientConfig);
  }
}
```

> 更多配置：https://cloud.tencent.com/document/product/436/10199#.E5.88.9D.E5.A7.8B.E5.8C.96.E5.AE.A2.E6.88.B7.E7.AB.AF



## 编写Manager

```java
/**
 * Cos 对象存储操作
 *
 * @author codejuzi
 */
@Component
public class CosManager {

  @Resource
  private CosClientConfig cosClientConfig;

  @Resource
  private COSClient cosClient;

  /**
    * 上传对象
    *
    * @param key           唯一键
    * @param localFilePath 本地文件路径
    * @return
    */
  public PutObjectResult putObject(String key, String localFilePath) {
    PutObjectRequest putObjectRequest = new PutObjectRequest(cosClientConfig.getBucket(), key,new File(localFilePath));
    return cosClient.putObject(putObjectRequest);
  }

  /**
    * 上传对象
    *
    * @param key  唯一键
    * @param file 文件
    * @return
    */
  public PutObjectResult putObject(String key, File file) {
    PutObjectRequest putObjectRequest = new PutObjectRequest(cosClientConfig.getBucket(), key,file);
    return cosClient.putObject(putObjectRequest);
  }
}
```



## 上传业务

=> 用户上传头像，返回可访问链接，保存至数据库

[FileConstant]

```java
/**
 * 文件常量
 *
 * @author codejuzi
 */
public interface FileConstant {

  /**
    * COS 访问地址
    */
  String COS_HOST = "自己配置好的COS访问地址前缀";
}
```



[FileController]

```java
/**
 * 文件接口，处理文件上传
 *
 * @author codejuzi
 */
@Slf4j
@RestController
@RequestMapping("/file")
public class FileController {

  final long ONE_MB = 1024 * 1024L;

  @Resource
  private UserService userService;

  @Resource
  private CosManager cosManager;

  @Resource
  private RedisTemplate<String, Object> redisTemplate;
  
  private static final List<String> VALID_AVATAR_SUFFIX_LIST = Arrays.asList("jpeg", "jpg", "svg", "png", "webp");

  /**
    * 文件上传
    *
    * @param multipartFile
    * @param request
    * @return
    */
  @PostMapping("/upload")
  public BaseResponse<String> uploadFile(@RequestPart("file") MultipartFile multipartFile, HttpServletRequest request) {
    // validation
    validFile(multipartFile);
    User loginUser = userService.getLoginUser(request);
    // 文件目录：根据业务、用户来划分
    String uuid = RandomStringUtils.randomAlphanumeric(8);
    String filename = uuid + "-" + multipartFile.getOriginalFilename();
    // 处理用户头像的路径
    String filepath = String.format("/user_avatar/%s/%s", loginUser.getId(), filename);
    File file = null;
    try {
      // 上传文件
      file = File.createTempFile(filepath, null);
      multipartFile.transferTo(file);
      cosManager.putObject(filepath, file);
      // 返回可访问地址
      return ResultUtil.success(FileConstant.COS_HOST + filepath);
    } catch (Exception e) {
      log.error("file upload error, filepath = " + filepath, e);
      throw new BusinessException(ErrorCode.SYSTEM_ERROR, "上传失败");
    } finally {
      if (file != null) {
        // 删除临时文件
        boolean delete = file.delete();
        if (!delete) {
          log.error("file delete error, filepath = {}", filepath);
        }
      }
    }
  }

  /**
    * 校验文件
    *
    * @param multipartFile
    */
  private void validFile(MultipartFile multipartFile) {
    // 文件大小
    long fileSize = multipartFile.getSize();
    // 文件后缀
    String fileSuffix = FileUtil.getSuffix(multipartFile.getOriginalFilename());
    if (fileSize > ONE_MB) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "文件大小不能超过 1M");
    }
    if (!VALID_AVATAR_SUFFIX_LIST.contains(fileSuffix)) {
      throw new BusinessException(ErrorCode.PARAMS_ERROR, "文件类型错误");
    }
  }
}
```



[前端处理]

```js
// 上传头像接口，接受可访问地址
const res = await request.post("/file/upload", {
  'file': fileFile,
}, {
  headers: {'Content-Type': 'multipart/form-data'},
})
// 保存用户头像可访问地址到数据库
const updateUserAvatarUrl = await request.post("/user/update", {
  id: user.value.id,
  userAvatarUrl: res
})
```



> 扩展：
>
> - 后端可以根据不同的业务去划分不同的路径来存储对象