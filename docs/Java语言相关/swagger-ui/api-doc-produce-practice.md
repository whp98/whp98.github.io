# 使用Swagger生成接口文档实践

## 推荐使用实体类进行入参和出参
对于前端传入的参数使用专用实体类XxxDTO进行接收。
好处如下：
1. 可以解释每个字段的含义(value字段解释字段含义)
2. 可以验证字段(直接在字段上使用校验注解)
3. 方便接口生成测试数据(在字段上填上example数据直接生成对象)

```java
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

/*解释实体类名字*/
@ApiModel(value = "入参实体",description = "xxxx")
@EqualsAndHashCode(callSuper = true)
@Data /* lombok */
public class XxxDTO {
    @NotNull
    /*解释字段含义*/
    @ApiModelProperty(value = "xx代码", name = "xxxCode", example = "0191009")
    private String xxxCode;
    /*数据校验*/
    @NotEmpty
    @ApiModelProperty(value = "基准日期", name = "xxxDate", example = "2020-09-01")
    private String xxxDate;
    @ApiModelProperty(value = "xxx分类", name = "xxxClass", example = "['X1']")
    private List<String> xxxClass;
    
    /*不在生成文档中显示的字段*/
    @ApiModelProperty(hidden = true)
    private String endDate;
}
```
## 输出接口也使用实体类

同样的使用上面输入接口的方式来解释输出的实体类
```java
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
/* 解释实体类生成文档 */
@ApiModel(value = "明细entity", description = "明细entity")
public class XxxVO {
    @ApiModelProperty(value = "xx名称")
    private String xxxName;
    
    @ApiModelProperty("xx日期")
    private String xxDate;
}
```
## 在Controller层加注解生成接口文档

### 类注解生成接口文档
```java
@Controller
@RequestMapping(value = "xxx")
@Api(tags = "xx明细")
public class OneProHldAnalysisController {

}
```
### 方法注解生成接口文档并开启验证数据
```java
@PostMapping(value = "/findXxx")
    @ResponseBody
    @ApiOperation(value = "查询xxx数据")
    public CommonRespon<HttpPageListResults<XxxVO>> findOneProHldTotalList(@RequestBody @Validated /*开启数据校验*/ XxxDTO param) {
        return oneProHldAnalysisService.findOneProHldTotalList(param);
    }
```
这里需要注意的是参数和返回值需要使用具体的类，而不是使用Object作为参数和返回值。

## 总结
Swagger还是值得使用的，可以作为一个接口文档生成工具，也可以用来测试接口，学会使用Swagger的使用方式对后端开发者来说还是比较重要的。