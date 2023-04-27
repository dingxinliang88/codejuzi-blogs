# 微服务服务间传输Json错误(Jackson)

## 问题

```
2023-04-14 12:56:33.213 ERROR 8522 --- [p-nio-80-exec-2] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : 
Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is org.springframework.http.converter.HttpMessageConversionException: Type definition error: [simple type, class com.juzi.springcloud.common.BaseResponse]; nested exception is com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Cannot construct instance of `com.juzi.springcloud.common.BaseResponse` (no Creators, like default constructor, exist): cannot deserialize from Object value (no delegate- or property-based Creator)
 at [Source: (org.springframework.util.StreamUtils$NonClosingInputStream); line: 1, column: 2]] with root cause

com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Cannot construct instance of `com.juzi.springcloud.common.BaseResponse` (no Creators, like default constructor, exist): cannot deserialize from Object value (no delegate- or property-based Creator)
```

这个错误通常是因为 Jackson 在反序列化的过程中找不到可以使用的构造函数，也就是所谓的 "no Creators"。

## 解决

将 `BaseResponse` 类中的构造函数改为带参构造函数，并使用 `@JsonCreator` 注解和 `@JsonProperty` 注解指定参数对应的 JSON 属性名。

```java
package com.juzi.springcloud.common;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * 统一返回响应体
 *
 * @author codejuzi
 * @CreateTime 2023/4/5
 */
@Data
public class BaseResponse<T> implements Serializable {

    private static final long serialVersionUID = -8023942560208172994L;

    /**
     * 状态码
     */
    private int code;

    /**
     * 数据
     */
    private T data;

    /**
     * 响应的简要信息
     */
    private String message;

    /**
     * 响应的详细信息
     */
    private String description;

    @JsonCreator
    public BaseResponse(
            @JsonProperty("code") int code,
            @JsonProperty("data") T data,
            @JsonProperty("message") String message,
            @JsonProperty("description") String description
    ) {
        this.code = code;
        this.data = data;
        this.message = message;
        this.description = description;
    }

    // ……
}
```

