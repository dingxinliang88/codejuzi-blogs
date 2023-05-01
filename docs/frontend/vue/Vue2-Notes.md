# Vue2 学习笔记

---

## 1 Vue核心

### 1.1 Vue简介

#### 1.1.1 官网

* 英文官网：https://vuejs.org/
* 中文官网：https://cn.vuejs.org/

#### 1.1.2 简介

* 动态构建用户界面的渐进式`JavaScript`框架

#### 1.1.3 Vue特点

1. 采用**组件化**模式，提高代码复用率、且让代码更好维护

   ![](assets/Vue%E7%BB%84%E4%BB%B6%E5%8C%96%E7%89%B9%E7%82%B9-0080085.png)

2. **声明式**编码，让编码人员无需直接操作DOM，提高开发效率

   ![](assets/Vue%E5%A3%B0%E6%98%8E%E5%BC%8F%E7%BC%96%E7%A0%81%E7%89%B9%E7%82%B9.png)

3. 使用**虚拟DOM**+优秀的**Diff算法**,京可能复用节点

   ![](assets/Vue%E8%99%9A%E6%8B%9FDom.png)

### 1.2 初始Vue

#### 1.2.1 小结

* 使用`Vue` 

  * 创建`Vue`实例，传入配置对象
  * 容器内代码符合`html`规范
  * 容器内代码称之为【Vue模板】

* 注意事项

  * Vue实例和容器一一对应
  * 开发中Vue和组件配合使用
  * `{{XXX}}`中`XXX`写的是**Js表达式**，且`XXX`可以自动读取到`data`中的所有属性
  * `data`中的数据发生改变，页面中使用该数据的地方会自动更新

  >**区分Js代码 && Js表达式**
  >
  >>1. Js表达式：
  >>   1. 一个表达式会产生一个值，可以放在任何一个需要值的地方
  >>   2. 示例
  >>      1. a 
  >>      2. a + b
  >>      3. demo(a)
  >>      4. x === y ?  'a'  :  'b' 
  >>2. Js代码（语句）
  >>   1. if(){}
  >>   2. for(){}

#### 1.2.2 代码实例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>初始Vue</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
</head>
<body>
    <!-- 容器准备 -->
    <div id="root">
        <h1>Hello: {{name}}</h1>
        <h1>age: {{age}}</h1>
    </div>

    <script type="text/javascript">
        //阻止 vue 在启动时生成生产提示
        Vue.config.productionTip = false 

        //创建Vue实例 => 传入配置对象
        new Vue({
            //el => 指定当前Vue实例为哪个容器服务，值通常为css选择器字符串
            el: '#root',
            //data => 存储数据，数据供el所指定的容器使用
            data: {
                name:'Vue',
                age: 19
            }
        })
    </script>
</body>
</html>
```

### 1.3 模板语法

#### 1.3.1 分类

1. 插值语法

   1. 功能：用于解析**标签体**内容
   2. 写法：`{{XXX}}`,`XXX`写的是**Js表达式**，且`XXX`可以自动读取到`data`中的所有属性

2. 指令语法

   1. 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件）

   2. 举例 

      ```html
      <a v-bind:href="xxx"></a>
      <!--等价于-->
      <a :href="xxx"></a>
      <!--
      	xxx写js表达式，且可以读取data中的所有属性
      	Vue将xxx当成js表达式执行
      	-->
      ```

3. 代码实例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>模板语法</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!-- 容器准备 -->
    <div id="root">
      <!-- 标签体内 -->
      <h1>插值语法</h1>
      <h3>Hello,{{name}}</h3>
      <hr />
      <!-- 标签属性 -->
      <h1>指令语法</h1>
      <a v-bind:href="school.url.toUpperCase()">点我去{{school.name}}学习啦1</a>
      <a :href="school.url">点我去{{school.name}}学习啦2</a>
    </div>

    <script type="text/javascript">
      //阻止 vue 在启动时生成生产提示
      Vue.config.productionTip = false;

      new Vue({
        el: "#root",
        data: {
          name: "Jack",
          school: {
            name: "bilibili",
            url: "https://www.bilibili.com",
          },
        },
      });
    </script>
  </body>
</html>

```

### 1.4 数据绑定

1. 分类
   1. 单向绑定（v-bind）:数据只能从data流向页面
   2. 双向绑定（v-model):数据不仅能从data流向页面，还可以从页面流向data。
2. 注意事项
   1. 双向绑定一般都应用在表单类元素上（如：input、select等）
   2. v-model:value可以简写为v-model,因为v-model默认收集的就是value值。

3. 代码实例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>数据绑定</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!-- 容器准备 -->
    <div id="root">
        <!-- 普通写法 -->
        单向数据绑定：<input type="text" v-bind:value="name"><br/>
        双向数据绑定：<input type="text" v-model:value="name"><br/>
        <!-- v-model只能应用在表单类元素上（输入类元素上） -->
    
        <!-- 简写 -->
        单向数据绑定：<input type="text" :value="name"><br/>
        双向数据绑定：<input type="text" v-model="name"><br/>
        
    </div>

    <script type="text/javascript">
      //阻止 vue 在启动时生成生产提示
      Vue.config.productionTip = false;

      new Vue({
        el: "#root",
        data: {
          name: "Jack",
        },
      });
    </script>
  </body>
</html>

```



---

> el 和 data的两种写法

1. el的两种写法
   1. `new Vue()`的时候配置el属性
   2. 先创建Vue实例，随后通过`vm.$mount(’挂载的容器‘)`指定el的值
2. data的两种写法
   1. 对象式
   2. 函数式（写成**普通函数** => this对象是当前的Vue实例）

3. 代码实例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>数据绑定</title>
    <!-- 引入Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!-- 容器准备 -->
    <div id="root">
        <h1>Hello,{{name}}</h1>
    </div>

    <script type="text/javascript">
      //阻止 vue 在启动时生成生产提示
      Vue.config.productionTip = false;

    // el的两种写法
    /* const v = new Vue({
        //更换写法使用Vue自身的属性$mount()
        // 写法一：el:'#root',
    //   el:'#root',
      data:{
        name:'Jack'
      }
    })
    // 写法二：$mount()
    // $mount()写法更灵活
    v.$mount("#root") */

    //data的两种写法
    new Vue({
      el:'#root',
    //   第一种写法：对象式写法
    //   data:{
    //     name:'jack'
    //   }
    
    // 第二种写法：函数式写法(写成普通函数)
    // data:function(){
    data(){
        return {
            name:'Jack'
        }
    }
    })
    </script>
  </body>
</html>

```

>小插曲（tip)
>
>* VsCode自定义代码片段
>
>  * 步骤：左下角设置 => 配置用户代码片段 => 创建代码片段 => 根据提供的注释创建代码片段
>
>  * 示例
>
>    ```json
>    {
>    	// Place your VueBasic 工作区 snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and 
>    	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope 
>    	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is 
>    	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are: 
>    	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. 
>    	// Placeholders with the same ids are connected.
>    	// Example:
>    	// "Print to console": {
>    	// 	"scope": "javascript,typescript",
>    	// 	"prefix": "log",
>    	// 	"body": [
>    	// 		"console.log('$1');",
>    	// 		"$2"
>    	// 	],
>    	// 	"description": "Log output to console"
>    	// }
>                                                                
>    	"Print to console": {
>    		"scope": "javascript,typescript",
>    		"prefix": "v1",
>    		"body": [
>    			"new Vue({",
>    			"  el:'#root',",
>    			"  data:{",
>    			"    name:'$0'",
>    			"  }",
>                "})"
>    		],
>    		"description": "Log output to console"
>    	}
>    }
>    ```

---

### 1.5 MVVM模型

1. MVVM模型解释

   1. M: 模型（Model）=> data中的数据
   2. V: 视图（View) => 模板
   3. VM: 视图模型（ViewModel) => Vue实例对象

   ![](assets/MVVM%E6%A8%A1%E5%9E%8B.png)

2. 注意事项
   1. data中的所有属性，最后都出现在vm上
   2. vm上的所有属性及Vue原型上的所有属性，在Vue模板中都可以直接使用

### 1.6 数据代理

1. 理解：通过一个对象代理对拎一个对象中的属性的操作（读/写）

2. 原理解析图

   ![](assets/Vue%E6%95%B0%E6%8D%AE%E4%BB%A3%E7%90%86.png)

3. Vm中的数据代理
   1. 通过vm对象来代理data对象中属性的操作（读/写）
4. Vue中数据代理的好处
   1. 更加方便的操作data中的数据
5. 基本原理
   1. 通过`Object.definePorperty()`把data对象中所有属性添加到vm上
   2. 为每一个添加到vm上的属性指定一个`getter/setter`
   3. 在`getter/setter`内部去操作（读/写）data中对应的属性

### 1.7 事件处理

#### 1.7.1 事件的基本使用

1. 使用`v-on:XXX` 或者`@XXX`绑定事件，其中`XXX`是事件名

2. 事件的回调需要配置在**methods**对象中，最终会在**vm**上

3. methods中配置的函数，使用普通函数，若使用箭头函数 => this 不再是vm

4. methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象

5. `@click="demo"`和`@click="demo($event)"`效果一致，但是后者可以传参

6. 代码示例

   ~~~html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>事件的基本使用</title>
       <script type="text/javascript" src="../js/vue.js"></script>
   </head>
   <body>
       <div id="root">
           <h1>欢迎来到{{name}}</h1>
           <button v-on:click="showInfo1">点我提示信息(不传参)</button>
           <!-- 简写 -->
           <button @click="showInfo2(666,$event)">点我提示信息(传参)</button>
       </div>
   
   
       <script type="text/javascript">
           //阻止 vue 在启动时生成生产提示
           Vue.config.productionTip = false;
   
           new Vue({
             el:'#root',
             data:{
               name:'hhu'
             },
             methods: {
               showInfo1(event){
                   console.log()
                   console.log(this)   //此处普通函数的this是vm
                   alert("Hello Student!")
               },
               showInfo2(number,event){
                   console.log(event.target.innerText)
                   console.log(number)
                   alert("Hello Student!!")
               }
             }
           })
       </script>
   </body>
   </html>
   ~~~

   

#### 1.7.2 事件修饰符

1. `prevent`: 阻止默认事件

2. `stop`: 阻止事件冒泡

3. `once`: 事件只触发一次

4. `capture`: 使用事件的捕获模式

5. `self`: 只有`event.target`是当前操作元素时才触发事件

6. `passive`: 事件的默认行为立即执行，无需等待事件回调执行完毕

7. 代码示例

   ```html
   <!DOCTYPE html>
   <html>
   	<head>
   		<meta charset="UTF-8" />
   		<title>事件修饰符</title>
   		<!-- 引入Vue -->
   		<script type="text/javascript" src="../js/vue.js"></script>
   		<style>
   			*{
   				margin-top: 20px;
   			}
   			.demo1{
   				height: 50px;
   				background-color: skyblue;
   			}
   			.box1{
   				padding: 5px;
   				background-color: skyblue;
   			}
   			.box2{
   				padding: 5px;
   				background-color: orange;
   			}
   			.list{
   				width: 200px;
   				height: 200px;
   				background-color: peru;
   				overflow: auto;
   			}
   			li{
   				height: 100px;
   			}
   		</style>
   	</head>
   	<body>
   		<!--
   			1.prevent：阻止默认事件（常用）；
   			2.stop：阻止事件冒泡（常用）；
   			3.once：事件只触发一次（常用）；
   			4.capture：使用事件的捕获模式；
   			5.self：只有event.target是当前操作的元素时才触发事件；
   			6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；
   		-->
   		<!-- 准备好一个容器-->
   		<div id="root">
   			<h2>欢迎来到{{name}}学习</h2>
   			<!-- 阻止默认事件（常用） -->
   			<a href="http://www.atguigu.com" @click.prevent="showInfo">点我提示信息</a>
   
   			<!-- 阻止事件冒泡（常用） -->
   			<div class="demo1" @click="showInfo">
   				<button @click.stop="showInfo">点我提示信息</button>
   				<!-- 修饰符可以连续写 -->
   				<!-- <a href="http://www.bilibili.com" @click.prevent.stop="showInfo">点我提示信息</a> -->
   			</div>
   
   			<!-- 事件只触发一次（常用） -->
   			<button @click.once="showInfo">点我提示信息</button>
   
   			<!-- 使用事件的捕获模式 -->
   			<div class="box1" @click.capture="showMsg(1)">
   				div1
   				<div class="box2" @click="showMsg(2)">
   					div2
   				</div>
   			</div>
   
   			<!-- 只有event.target是当前操作的元素时才触发事件； -->
   			<div class="demo1" @click.self="showInfo">
   				<button @click="showInfo">点我提示信息</button>
   			</div>
   
   			<!-- 事件的默认行为立即执行，无需等待事件回调执行完毕； -->
   			<ul @wheel.passive="demo" class="list">
   				<li>1</li>
   				<li>2</li>
   				<li>3</li>
   				<li>4</li>
   			</ul>
   
   		</div>
   	</body>
   
   	<script type="text/javascript">
   		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
   
   		new Vue({
   			el:'#root',
   			data:{
   				name:'hhu'
   			},
   			methods:{
   				showInfo(e){
   					alert('Hello Student！')
   					// console.log(e.target)
   				},
   				showMsg(msg){
   					console.log(msg)
   				},
   				demo(){
   					for (let i = 0; i < 100000; i++) {
   						console.log('#')
   					}
   					console.log('累坏了')
   				}
   			}
   		})
   	</script>
   </html>
   ```

#### 1.7.3 键盘事件

1. Vue中常用的案件别名

   1. 回车 => `enter`
   2. 删除 => `delete `(捕获“删除”和“退格”键)
   3. 退出 => `esc`
   4. 空格 => `space`
   5. 换行 => `tab `(特殊，必须配合keydown去使用)
   6. 上 => `up`
   7. 下 => `down`
   8. 左 => `left`
   9. 右 => `right`

2. Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）

3. 系统修饰键（用法特殊）：`ctrl`、`alt`、`shift`、`meta`

   1. 配合`keyup`使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发
   2. 配合`keydown`使用：正常触发事件

4. 可以使用keyCode去指定具体的按键（不推荐）

5. `Vue.config.keyCodes.自定义键名 = 键码`  => 定制按键别名

6. 代码示例

   ```html
   <!DOCTYPE html>
   <html>
   	<head>
   		<meta charset="UTF-8" />
   		<title>键盘事件</title>
   		<!-- 引入Vue -->
   		<script type="text/javascript" src="../js/vue.js"></script>
   	</head>
   	<body>
   		<!-- 准备好一个容器-->
   		<div id="root">
   			<h2>欢迎来到{{name}}学习</h2>
   			<input type="text" placeholder="按下回车提示输入" @keydown.huiche="showInfo">
   		</div>
   	</body>
   
   	<script type="text/javascript">
   		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
   		Vue.config.keyCodes.huiche = 13 //定义一个别名按键
   
   		new Vue({
   			el:'#root',
   			data:{
   				name:'hhu'
   			},
   			methods: {
   				showInfo(e){
   					// console.log(e.key,e.keyCode)
   					console.log(e.target.value)
   				}
   			},
   		})
   	</script>
   </html>
   ```

>* 修饰符可以连续写
>
>* 系统修饰符后可以接其他按键 => 按下特定案件才能触发事件

### 1.8 计算属性与监视

#### 1.8.1 计算属性-computed

> 姓名案例实现

1. 插值语法实现

   ```html
   <!DOCTYPE html>
   <html>
   	<head>
   		<meta charset="UTF-8" />
   		<title>姓名案例（插值语法实现）</title>
   		<!-- 引入Vue -->
   		<script type="text/javascript" src="../js/vue.js"></script>
   	</head>
   	<body>
   		<!-- 准备好一个容器-->
   		<div id="root">
   			last name: <input type="text" v-model="lastName"><br/>
   			first name: <input type="text" v-model="firstName"><br/>
   			whole name: <span>{{ lastName.slice(0,3) }}-{{ firstName }}</span>
   		</div>
   	</body>
   
   	<script type="text/javascript">
   		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
   
   		new Vue({
   			el:'#root',
   			data:{
   				lastName:'张',
   				firstName:'三'
   			}
   		})
   	</script>
   </html>
   ```

2. methods实现

   ```html
   <!DOCTYPE html>
   <html>
   	<head>
   		<meta charset="UTF-8" />
   		<title>姓名案例（methods实现）</title>
   		<!-- 引入Vue -->
   		<script type="text/javascript" src="../js/vue.js"></script>
   	</head>
   	<body>
   		<!-- 准备好一个容器-->
   		<div id="root">
   			last name: <input type="text" v-model="lastName"><br/>
   			first name: <input type="text" v-model="firstName"><br/>
   			whole name: <span>{{ fullName() }}</span>
   		</div>
   	</body>
   
   	<script type="text/javascript">
   		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
   
   		new Vue({
   			el:'#root',
   			data:{
   				lastName:'张',
   				firstName:'三'
   			},
   			methods: {
   				fullName() {
   					return this.lastName + '-' + this.firstName;
   				}
   			}
   		})
   	</script>
   </html>
   ```

3. 计算属性实现

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>姓名案例（计算属性实现）</title>
		<!-- 引入Vue -->
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
			last name: <input type="text" v-model="lastName"><br/>
			first name: <input type="text" v-model="firstName"><br/>
			whole name: <span>{{ fullName }}</span>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		new Vue({
			el:'#root',
			data:{
				lastName:'张',
				firstName:'三'
			},
            computed: {
                fullName:{
                    //get作用：当读取fullName时，get就会被调用，且返回值就作为fullName的值
                    //get调用时机：
                        //1、初次读取fullName时
                        //2、所依赖的数据发生变化时
                    get(){
                        return this.lastName + '-' + this.firstName
                    },
                    //set调用时机： fullName被修改时
                    set(value) {
                        const arr = value.split('-')
                        lastName = arr[0]
                        firstName = arr[1]
                    }
                }
            }
		})
	</script>
</html>
```

4. 计算属性简写(**只考虑读取计算属性时**)

   ```js
   new Vue({
   			el:'#root',
   			data:{
   				lastName:'张',
   				firstName:'三'
   			},
               computed: {
                   //完整写法
                   /* fullName:{
                       get(){
                           return this.lastName + '-' + this.firstName
                       },
                       set(value) {
                           const arr = value.split('-')
                           lastName = arr[0]
                           firstName = arr[1]
                       }
                   } */
                   //简写形式
                   fullName(){
                       return this.lastName + '-' + this.firstName
                   }
               }
   		})
   ```

> 计算属性

1. 定义：要用的属性不存在，要通过**已有属性**计算得来
2. 原理：底层借助了`Object.defineProperty()` 方法提供的`getter`和`setter`
3. `get()`函数执行时机
   1. 初次读取数据时
   2. 当依赖的数据发生改变时会被再次调用
4. 优势：与`methods`实现相比，内部有缓存机制（复用），效率更高，调试方便
5. 注意事项
   1. 计算属性最终会出现在vm上，**直接读取**即可
   2. 如果计算属性要被修改，必须要写`set()`函数去响应修改，并且`set()`中要引起计算时所依赖的数据发生改变

#### 1.8.2 监视属性-watch

> 天气案例

1. 天气案例（methods实现）

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>天气案例</title>
		<!-- 引入Vue -->
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
            <h2>今天天气很{{info}}</h2><br>
            <button @click="changeWeather">点击切换天气</button>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		new Vue({
			el:'#root',
			data:{
				isHot:true
			},
            computed: {
                info(){
                    return this.isHot ? '炎热' : '寒冷'
                }
            },
            methods: {
                changeWeather() {
                    this.isHot = !this.isHot
                }
            },
		})
	</script>
</html>
```

2. 天气案例（监视属性）

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="UTF-8" />
       <title>天气案例(监视属性)</title>
       <!-- 引入Vue -->
       <script type="text/javascript" src="../js/vue.js"></script>
     </head>
     <body>
       <!-- 准备好一个容器-->
       <div id="root">
         <h2>今天天气很{{info}}</h2>
         <br />
         <button @click="changeWeather">点击切换天气</button>
       </div>
     </body>
   
     <script type="text/javascript">
       Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。
   
       const vm = new Vue({
         el: "#root",
         data: {
           isHot: true,
         },
         computed: {
           info() {
             return this.isHot ? "炎热" : "寒冷";
           },
         },
         methods: {
           changeWeather() {
             this.isHot = !this.isHot;
           },
         },
       //   watch: {
       //     isHot: {
       //       immediate: true, //初始化时让handler调用
       //       handler(newValue, oldValue) {
       //         console.log("isHot被修改了", newValue, oldValue);
       //       },
       //     },
       //   },
       });
       vm.$watch("isHot", {
         handler(newValue, oldValue) {
           console.log("isHot被修改了", newValue, oldValue);
         },
       });
     </script>
   </html>
   ```

> 监视属性watch

1. 当被监视的属性变化时，回调函数自动调用，进行相关操作

2. 监事的属性必须存在，才能进行监视

3. 监视的两种写法

   1. `new Vue`时传入`watch`配置
   2. 通过`vm.$watch()` 监视

4. 深度监视

   1. Vue中的watch默认不监测对象内部值的改变
   2. 配置`deep:true`可以监测对象内部值的改变

5. 简写形式（**只有handler()函数时**）

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="UTF-8" />
       <title>天气案例(监视简写)</title>
       <!-- 引入Vue -->
       <script type="text/javascript" src="../js/vue.js"></script>
     </head>
     <body>
       <!-- 准备好一个容器-->
       <div id="root">
         <h2>今天天气很{{info}}</h2>
         <br />
         <button @click="changeWeather">点击切换天气</button>
       </div>
     </body>
   
     <script type="text/javascript">
       Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。
   
       const vm = new Vue({
         el: "#root",
         data: {
           isHot: true
         },
         computed: {
           info() {
             return this.isHot ? "炎热" : "寒冷";
           },
         },
         methods: {
           changeWeather() {
             this.isHot = !this.isHot;
           },
         },
         watch: {
           //正常写法
           /* isHot: {
             immediate: true, //初始化时让handler调用
             deep:true,
             handler(newValue, oldValue) {
               console.log("isHot被修改了", newValue, oldValue);
             },
           }, */
           //简写
           isHot(newValue,oldValue){
             console.log("isHot被修改了", newValue, oldValue);
           }
       },
       })
       //正常写法
   		/* vm.$watch('isHot',{
   			immediate:true, //初始化时让handler调用一下
   			deep:true,//深度监视
   			handler(newValue,oldValue){
   				console.log('isHot被修改了',newValue,oldValue)
   			}
   		}) */
   
   		//简写
   		/* vm.$watch('isHot',(newValue,oldValue)=>{
   			console.log('isHot被修改了',newValue,oldValue,this)
   		}) */
     </script>
   </html>
   
   ```

6. **`computed`和`watch`的区别**
   1. `computed`能完成的功能，`watch`也可以完成
   2. `watch`能完成的功能，`computed`不一定能完成。例如：`watch`可以进行异步操作
7. **两个重要的小原则**
   1. 所有被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或者 组件实例对象
   2. 所有不被Vue所管理的函数（定时器的回调函数、Ajax的回调函数、Promise的回调函数等）最好写成箭头函数，这样this的指向才是vm 或者 组件实例对象

###  1.9 绑定样式

1. `class`样式

   1. 写法`:class="xxx"`,xxx可以是字符串、对象、数组
      1. 字符串写法适用于：类名不确定，需要动态获取
      2. 对象写法适用于：要绑定多个样式，个数不确定，名字也不确定
      3. 数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用

2. `style`样式

   1. `:style="{fontSize:xxx}"`，其中xxx是动态值
   2. `:style=[a,b]`，其中a、b都是样式对象

3. 代码示例

   ```html
   <!DOCTYPE html>
   <html>
   	<head>
   		<meta charset="UTF-8" />
   		<title>绑定样式</title>
   		<style>
   			.basic{
   				width: 400px;
   				height: 100px;
   				border: 1px solid black;
   			}
   			
   			.happy{
   				border: 4px solid red;;
   				background-color: rgba(255, 255, 0, 0.644);
   				background: linear-gradient(30deg,yellow,pink,orange,yellow);
   			}
   			.sad{
   				border: 4px dashed rgb(2, 197, 2);
   				background-color: gray;
   			}
   			.normal{
   				background-color: skyblue;
   			}
   
   			.atguigu1{
   				background-color: yellowgreen;
   			}
   			.atguigu2{
   				font-size: 30px;
   				text-shadow:2px 2px 10px red;
   			}
   			.atguigu3{
   				border-radius: 20px;
   			}
   		</style>
   		<script type="text/javascript" src="../js/vue.js"></script>
   	</head>
   	<body>
   		<!-- 
   			绑定样式：
   					1. class样式
   								写法:class="xxx" xxx可以是字符串、对象、数组。
   										字符串写法适用于：类名不确定，要动态获取。
   										对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
   										数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
   					2. style样式
   								:style="{fontSize: xxx}"其中xxx是动态值。
   								:style="[a,b]"其中a、b是样式对象。
   		-->
   		<!-- 准备好一个容器-->
   		<div id="root">
   			<!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
   			<div class="basic" :class="mood" @click="changeMood">{{name}}</div> <br/><br/>
   
   			<!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
   			<div class="basic" :class="classArr">{{name}}</div> <br/><br/>
   
   			<!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
   			<div class="basic" :class="classObj">{{name}}</div> <br/><br/>
   
   			<!-- 绑定style样式--对象写法 -->
   			<div class="basic" :style="styleObj">{{name}}</div> <br/><br/>
   			<!-- 绑定style样式--数组写法 -->
   			<div class="basic" :style="styleArr">{{name}}</div>
   		</div>
   	</body>
   
   	<script type="text/javascript">
   		Vue.config.productionTip = false
   		
   		const vm = new Vue({
   			el:'#root',
   			data:{
   				name:'尚硅谷',
   				mood:'normal',
   				classArr:['atguigu1','atguigu2','atguigu3'],
   				classObj:{
   					atguigu1:false,
   					atguigu2:false,
   				},
   				styleObj:{
   					fontSize: '40px',
   					color:'red',
   				},
   				styleObj2:{
   					backgroundColor:'orange'
   				},
   				styleArr:[
   					{
   						fontSize: '40px',
   						color:'blue',
   					},
   					{
   						backgroundColor:'gray'
   					}
   				]
   			},
   			methods: {
   				changeMood(){
   					const arr = ['happy','sad','normal']
   					const index = Math.floor(Math.random()*3)
   					this.mood = arr[index]
   				}
   			},
   		})
   	</script>
   	
   </html>
   ```

### 1.10 条件渲染

1. `v-if`

   1. 写法：
      1. `v-if="表达式"`
      2. `v-else-if="表达式"`
      3. `v-else="表达式"`
   2. 使用场景：切换频率较低的场景
   3. 特点：不展示的DOM元素直接被移除
   4. 注意事项
      1. `v-if`可以和`v-else-if`、`v-else`一起使用，但要求结构不能被“打断”

2. `v-show`

   1. 写法：`v-show="表达式"`
   2. 使用场景：切换频率较高的场景
   3. 特点：不展示的DOM元素未被移除，仅仅使用样式隐藏掉

3. 注意事项

   1. 使用`v-if`的时候，元素可能无法获取到，而使用`v-show`一定可以获取到

4. 代码案例

   ```html
   <!DOCTYPE html>
   <html>
   	<head>
   		<meta charset="UTF-8" />
   		<title>条件渲染</title>
   		<script type="text/javascript" src="../js/vue.js"></script>
   	</head>
   	<body>
   		<!-- 
   				条件渲染：
   							1.v-if
   										写法：
   												(1).v-if="表达式" 
   												(2).v-else-if="表达式"
   												(3).v-else="表达式"
   										适用于：切换频率较低的场景。
   										特点：不展示的DOM元素直接被移除。
   										注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。
   
   							2.v-show
   										写法：v-show="表达式"
   										适用于：切换频率较高的场景。
   										特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉
   								
   							3.备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。
   		 -->
   		<!-- 准备好一个容器-->
   		<div id="root">
   			<h2>当前的n值是:{{n}}</h2>
   			<button @click="n++">点我n+1</button>
   			<!-- 使用v-show做条件渲染 -->
   			<!-- <h2 v-show="false">欢迎来到{{name}}</h2> -->
   			<!-- <h2 v-show="1 === 1">欢迎来到{{name}}</h2> -->
   
   			<!-- 使用v-if做条件渲染 -->
   			<!-- <h2 v-if="false">欢迎来到{{name}}</h2> -->
   			<!-- <h2 v-if="1 === 1">欢迎来到{{name}}</h2> -->
   
   			<!-- v-else和v-else-if -->
   			<!-- <div v-if="n === 1">Angular</div>
   			<div v-else-if="n === 2">React</div>
   			<div v-else-if="n === 3">Vue</div>
   			<div v-else>哈哈</div> -->
   
   			<!-- v-if与template的配合使用 -->
   			<template v-if="n === 1">
   				<h2>你好</h2>
   				<h2>hhu</h2>
   				<h2>江苏</h2>
   			</template>
   
   		</div>
   	</body>
   
   	<script type="text/javascript">
   		Vue.config.productionTip = false
   
   		const vm = new Vue({
   			el:'#root',
   			data:{
   				name:'hhu',
   				n:0
   			}
   		})
   	</script>
   </html>
   ```

### 1.11 列表渲染

#### 1.11.1 基本列表

1. `v-for`指令

   1. 用于展示列表数据
   2. 语法：`v-for="(item,index) in xxx" :key="yyy"`
   3. 可遍历：数组、对象、字符串（少）、指定次数（少）

2. 代码示例

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>基本列表</title>
       <script type="text/javascript" src="../js/vue.js"></script>
     </head>
     <body>
       <div id="root">
         <h2>人员列表（遍历数组）</h2>
         <ul>
           <li v-for="(person,index) in personList" ::key="person.id">
             {{person.name}} - {{person.age}}
           </li>
         </ul>
   
         <h2>汽车信息（遍历对象）</h2>
         <ul>
           <li v-for="(value,k) of car" :key="k">{{k}} - {{value}}</li>
         </ul>
       </div>
   
       <script type="text/javascript">
         Vue.config.productionTip = false;
   
         new Vue({
           el: "#root",
           data: {
             personList: [
               { id: "001", name: "张三", age: 18 },
               { id: "002", name: "李四", age: 19 },
               { id: "003", name: "王五", age: 20 },
             ],
             car: {
               name: "奥迪A8",
               price: "70万",
               color: "黑色",
             },
           },
         });
       </script>
     </body>
   </html>
   
   ```

#### 1.11.2 key的原理

1. 虚拟DOM中Key的作用 => Key是虚拟DOM对象的**标识**，当数据发生变化时，VUe会根据【新数据】生成【新的虚拟DOM】，随后Vue进行【新虚拟DOM】和【旧虚拟DOM】的差异比较，**比较规则**如下
   1. 旧虚拟DOM中找到与新虚拟DOM相同的Key
      1. 若虚拟DOM中内容没变，直接使用之前的真实DOM
      2. 若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM
   2. 旧虚拟DOM中未找到与新虚拟DOM相同的Key
      1. 创建新的真实DOM，随后渲染到页面
2. 用`index`作为Key可能会引发的问题
   1. 若对数据进行“逆序添加、逆序删除等”破坏顺序的操作 => 会产生没有必要的真实DOM的更新 => 界面渲染没有问题，但是效率低下
   2. 如果结构中还包含输入类DOM => 会产生错误DOM更新 => 界面有问题

3. 开发中选择Key
   1. 使用每条数据的唯一标识作为Key，比如id、手机号、身份证号等
   2. 如果不存在对数据的逆序添加、逆序删除等破坏顺序的操作，仅用于渲染列表展示，使用index作为Key是没有问题的

4. 示意图

   ![](assets/Key%E7%9A%84%E5%8E%9F%E7%90%86.png)

#### 1.11.3 列表过滤

1. 案例展示

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>列表过滤</title>
       <script type="text/javascript" src="../js/vue.js"></script>
     </head>
     <body>
       <div id="root">
         <h2>人员列表</h2>
         <input type="text" placeholder="请输入名字" v-model="keywords">
         <ul>
           <li v-for="(person,index) in filPerson" ::key="index">
             {{person.name}} - {{person.age}}
           </li>
         </ul>
       </div>
   
       <script type="text/javascript">
         Vue.config.productionTip = false;
   
         new Vue({
           el: "#root",
           data: {
               keywords:'',
               personList: [
                   {id:'001',name:'马冬梅',age:19,sex:'女'},
                   {id:'002',name:'周冬雨',age:20,sex:'女'},
                   {id:'003',name:'周杰伦',age:21,sex:'男'},
                   {id:'004',name:'温兆伦',age:22,sex:'男'}
   		    ],
               // filPerson:[]
           },
           /* watch:{
               keywords:{
                   immediate: true,
                   handler(val) {
                       this.filPerson = this.personList.filter((person)=>{
                           return person.name.indexOf(val) !== -1
                       })
                   }   
               }
           } */
           computed:{
               filPerson(){
                   return this.personList.filter((person)=>{
                       return person.name.indexOf(this.keywords) !== -1
                   })
               }
           }
         });
       </script>
     </body>
   </html>
   
   ```

#### 1.11.4 列表排序

1. 代码案例

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>列表排序</title>
       <script type="text/javascript" src="../js/vue.js"></script>
     </head>
     <body>
       <div id="root">
         <h2>人员列表</h2>
         <input type="text" placeholder="请输入名字" v-model="keywords" />
         <button @click="sortType=1">降序</button>
         <button @click="sortType=2">升序</button>
         <button @click="sortType=0">原序</button>
         <ul>
           <li v-for="(person,index) in filPerson" ::key="person.id">
             {{person.name}} - {{person.age}}
           </li>
         </ul>
       </div>
   
       <script type="text/javascript">
         Vue.config.productionTip = false;
   
         new Vue({
           el: "#root",
           data: {
             keywords: "",
             sortType: 0, //排序类型 0=>原顺序  1=>降序  2=>升序
             personList: [
               { id: "001", name: "马冬梅", age: 39, sex: "女" },
               { id: "002", name: "周冬雨", age: 24, sex: "女" },
               { id: "003", name: "周杰伦", age: 19, sex: "男" },
               { id: "004", name: "温兆伦", age: 22, sex: "男" },
             ],
           },
           computed: {
             filPerson() {
               const arr = this.personList.filter((person) => {
                 return person.name.indexOf(this.keywords) !== -1;
               });
               if (this.sortType) {
                 arr.sort((p1, p2) => {
                   return this.sortType === 1 ? p2.age - p1.age : p1.age - p2.age;
                 });
               }
               return arr
             },
           },
         });
       </script>
     </body>
   </html>
   
   ```

#### 1.11.5 Vue监视数据的原理

1. Vue会监视`data`中所有层次的数据
2. 监视对象中的数据 => 通过`setter`实现监视，且要在创建Vue示例时就要传入要监视的数据
   1. 对象中后追加的属性，Vue默认不做响应式处理
   2. 如需给后添加的属性做响应式 => 使用API
      1. `Vue.set(target,propertyName/index,value)`
      2. `vm.$set(target,propertyName/index,value)`

3. 监视数组中的数据 => 通过包裹数组更新元素的方法实现，本质做了两件事

   1. 调用Js原生对应的方法对数组进行更新
   2. 重新解析模板，进而更新页面

4. 在Vue修改数组中的某个元素的方法

   1. API:`push()、pop()、shift()、unshift()、splice()、sort()、reverse()`
   2. `Vue.set()` or `vm.$set()`

5. 注意事项

   1. `Vue.set()` 和 `vm.$set()`不能给**vm**或者**vm的根数据对象**添加属性

6. 代码案例

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>数据监测</title>
       <script type="text/javascript" src="../js/vue.js"></script>
     </head>
     <body>
       <div id="root">
         <h1>学生信息</h1>
         <button @click="student.age++">年龄+1岁</button> <br/>
         <button @click="addSex">添加性别属性，默认值：男</button> <br/>
         <button @click="student.sex = 'none'">修改性别</button> <br/>
         <button @click="addFriend">在列表首位添加一个朋友</button> <br/>
         <button @click="updateFirstFriendName">修改第一个朋友的名字为：张三</button> <br/>
         <button @click="addHobby">添加一个爱好</button> <br/>
         <button @click="updateHobby">修改第一个爱好为：开车</button> <br/>
         <button @click="removeSmoke">过滤掉爱好中的抽烟</button> <br/>
       
         <h3>name:{{student.name}}</h3>
         <h3>age:{{student.age}}</h3>
         <h3 v-if="student.sex">sex:{{student.sex}}</h3>
         <h3>hobby:</h3>
         <ul>
           <li v-for="(h,index) in student.hobby" :key="index">
               {{h}}
           </li>
         </ul>
         <h3>friends:</h3>
         <ul>
           <li v-for="(f,index) in student.friends">
               {{f.name}}--{{f.age}}
           </li>
         </ul>
       </div>  
     </body>
   
   
     <script type="text/javascript">
       Vue.config.productionTip = false;
   
       new Vue({
         el:'#root',
         data:{
           student:{
             name:'tom',
             age:18,
             hobby:['抽烟','喝酒','烫头'],
             friends:[
                 {name:'jerry',age:35},
                 {name:'tony',age:36}
             ]
           }
         },
         methods: {
           addSex(){
               // Vue.set(this.student,'sex','man')
               this.$set(this.student,'sex','man')
           },
           addFriend(){
               this.student.friends.unshift({name:'jack',age:70})
           },
           updateFirstFriendName(){
               this.student.friends[0].name = '张三'
           },
           addHobby(){
               this.student.hobby.push('study')
           },
           updateHobby(){
               // this.student.hobby.splice(0,1,'Drive')
               // Vue.set(this.student.hobby,0,'Drive')
               this.$set(this.student.hobby,0,'Drive')
           },
           removeSmoke(){
               this.student.hobby = this.student.hobby.filter((h)=>{
                   return h !== '抽烟'
               })
           }
         },
       })
     </script>
   </html>
   
   ```


### 1.12 收集表单数据

1. 若：`<input type="text"/>`，则`v-model`收集的是`value`值，用户输入的就是`value`值
2. 若：`<input type="radio"/>`，则`v-model`收集的是`value`值，且要给标签配置`value`值
3. 若：`<input type="checkbox"/>`
   1. 没有配置`input`的`value`属性，那么收集的就是`checked`（勾选 or 未勾选，是布尔值）
   2. 配置`input`的`value`属性
      1. `v-model`的初始值是非数组，那么收集的就是`checked`（勾选 or 未勾选，是布尔值）
      2. `v-model`的初始值是数组，那么收集的的就是`value`组成的数组

4. 代码示例

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>收集表单数据</title>
       <script type="text/javascript" src="../js/vue.js"></script>
     </head>
     <body>
       <div id="root">
           <form @submit.prevent="demo">
               账号：<input type="text" v-model.trim="userInfo.userAccount"><br><br>
               密码：<input type="password" v-model="userInfo.userPassword"><br><br>
               年龄：<input type="number" v-model.number="userInfo.age"><br><br>
               性别：
               男<input type="radio" name="sex" v-model="userInfo.sex" value="male">
               女<input type="radio" name="sex" v-model="userInfo.sex" value="famale">
               <br><br>
               爱好：
               学习<input type="checkbox" v-model="userInfo.hobby" value="study">
               跑步<input type="checkbox" v-model="userInfo.hobby" value="run">
               吃饭<input type="checkbox" v-model="userInfo.hobby" value="eat">
               <br><br>
               所在城市：
               <select v-model="userInfo.city">
                 <option value="">请选择城市</option>
                 <option value="beijing">北京</option>
                 <option value="jiangsu">江苏</option>
                 <option value="anhui">安徽</option>
                 <option value="zhejiang">浙江</option>
               </select>
               <br><br>
               其他信息：
               <textarea v-model.lazy="userInfo.other"></textarea><br><br>
               <input type="checkbox" v-model="userInfo.agree">阅读并接受 <a href="https:www.github.com/CodingJuzi">《用户协议》</a>
               <br>
               <button>提交</button>
             </form>
   
       </div>
     </body>
   
     <script type="text/javascript">
       Vue.config.productionTip = false;
   
       new Vue({
         el: "#root",
         data: {
           userInfo:{
             userAccount:'',
             userPassword:'',
             age:'',
             sex:'',
             hobby:[],
             city:'jiangsu',
             other:'',
             agree:''
           }
         },
         methods: {
           demo(){
               console.log(JSON.stringify(this.userInfo))
           }
         },
       });
     </script>
   </html>
   
   ```

### 1.13 过滤器

1. 定义：对要显示的数据进行特定格式化后再显示

2. 语法：

   1. 注册过滤器：`Vue.filter(name,callback)`或者`new Vue{filters:{}}`
   2. 使用过滤器：`{{xxx | 过滤器名}}` 或者`v-bind:属性="xxx | 过滤器名"`

3. 备注

   1. 过滤器也可以接收额外参数、多个过滤器也可以串联
   2. 过滤器并未改变原本的数据，而是产生了新的对应的数据

4. 代码案例

   ```html
   <!DOCTYPE html>
   <html>
   	<head>
   		<meta charset="UTF-8" />
   		<title>过滤器</title>
   		<script type="text/javascript" src="../js/vue.js"></script>
   		<script type="text/javascript" src="../js/dayjs.min.js"></script>
   	</head>
   	<body>
   		<!-- 准备好一个容器-->
   		<div id="root">
   			<h2>显示格式化后的时间</h2>
   			<!-- 计算属性实现 -->
   			<h3>现在是：{{fmtTime}}</h3>
   			<!-- methods实现 -->
   			<h3>现在是：{{getFmtTime()}}</h3>
   			<!-- 过滤器实现 -->
   			<h3>现在是：{{time | timeFormater}}</h3>
   			<!-- 过滤器实现（传参） -->
   			<h3>现在是：{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
   			<h3 :x="msg | mySlice">hhu</h3>
   		</div>
   
   		<div id="root2">
   			<h2>{{msg | mySlice}}</h2>
   		</div>
   	</body>
   
   	<script type="text/javascript">
   		Vue.config.productionTip = false
   		//全局过滤器
   		Vue.filter('mySlice',function(value){
   			return value.slice(0,4)
   		})
   		
   		new Vue({
   			el:'#root',
   			data:{
   				time:1621561377603, //时间戳
   				msg:'Hello,hhu'
   			},
   			computed: {
   				fmtTime(){
   					return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
   				}
   			},
   			methods: {
   				getFmtTime(){
   					return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
   				}
   			},
   			//局部过滤器
   			filters:{
   				timeFormater(value,str='YYYY年MM月DD日 HH:mm:ss'){
   					return dayjs(value).format(str)
   				}
   			}
   		})
   
   		new Vue({
   			el:'#root2',
   			data:{
   				msg:'hello,atguigu!'
   			}
   		})
   	</script>
   </html>
   ```

### 1.14 内置指令

>已经学过的指令
>
>1. v-bind   : 单向绑定解析表达式, 可简写为 :xxx
>2. v-model : 双向数据绑定
>3. v-for  : 遍历数组/对象/字符串
>4. v-on   : 绑定事件监听, 可简写为@
>5. v-if     : 条件渲染（动态控制节点是否存存在）
>6. v-else  : 条件渲染（动态控制节点是否存存在）
>7. v-show  : 条件渲染 (动态控制节点是否展示)

#### 1.14.1 v-text

1. 作用：向其所在的节点中渲染文本内容
2. 与插值语法的区别：`v-text`会替换掉节点中的内容，`{{xx}}`不会

#### 1.14.2 v-html

1. 作用：向指定节点中渲染包含html结构的内容
2. 与插值语法的区别
   1. `v-html`会替换掉节点中所有的内容，`{{xx}}`不会
   2. `v-html`可以识别html结构
3. 注意事项
   1. **v-html有安全性问题**
      1. 在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击
      2. 一定要在可信的内容上使用`v-html`，永远不要使用在用户提交的内容上

#### 1.14.3 v-cloak

1. 没有值
2. 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉`v-vloak`属性
3. 使用css配合`v-cloak`可以解决网速慢时页面展示出现`{{XXX}}`的问题

#### 1.14.4 v-once

1. `v-once`所在的节点在初次动态渲染后，就被视为静态内容
2. 以后数据的改变不会引起`v-once`所在结构的更新，可以用于优化性能

#### 1.14.5 v-pre

1. 跳过其所在节点的编译过程
2. 可利用他跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译

### 1.15 自定义指令

1. 定义语法

   1. 局部指令

      ```html
      new Vue({
      	directives:{指令名：配置对象}
      })
      <!-- 或者 -->
      new Vue({
      	directives:{指令名：回调函数}
      })
      ```

   2. 全局指令

      ```html
      Vue.directive(指令名,配置对象)
      <!-- 或者 -->
      Vue.directive(指令名,回调函数)
      ```

2. 配置对象中常用的3个回调

   1. `bind`:指定与元素成功绑定时调用
   2. `inserted`:指令所在的元素被插入页面时调用
   3. `update`:指令所在的模板被重新解析时调用

3. 备注

   1. 指令定义时不加v-，但是使用时要在v-
   2. 指令名如果是多个单词，要使用`kabab-case`命名方式，不要使用`camelCase`命名

4. 代码示例

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>自定义指令</title>
       <script src="../js/vue.js"></script>
   </head>
   <body>
       <div id="root">
           <h2>当前的n值是：<span v-text="n"></span></h2>
           <h2>放大10倍后的n值是：<span v-big="n"></span></h2>
           <button @click="n++">点我n++</button>
           <hr>
           <input type="text" v-fbind:value="n">
       </div>
   </body>
   
       <script>
           Vue.config.productionTip = false
   
           //全局指令
           /* Vue.directive('fbind',{
                   //指令与元素成功绑定时
                   bind(element,binding){
                       element.innerText = binding.value;
                   },
                   //指令所在元素被插入页面时
                   inserted(element,binding) {
                       element.focus()
                   },
                   //指令所在的模板被重新解析时
                   update(element,binding) {
                       element.innerText = binding.value
                   }
               }) */
           /* Vue.directive('big',function(element,binding){
               element.innerText = binding.value * 10
           }) */
   
           new Vue({
             el:'#root',
             data:{
                n:1
             },
             directives:{
               //big函数调用时机 
               /* 
                   1.指令与元素成功绑定时
                   2.指令所在的模板被重新解析时
               */
               big(element,binding){
                   element.innerText = binding.value * 10
               },
               fbind:{
                   //指令与元素成功绑定时
                   bind(element,binding){
                       element.innerText = binding.value;
                   },
                   //指令所在元素被插入页面时
                   inserted(element,binding) {
                       element.focus()
                   },
                   //指令所在的模板被重新解析时
                   update(element,binding) {
                       element.innerText = binding.value
                   }
               }
             }
           })
       </script>
   </html>
   ```

   

### 1.16 生命周期

1. 别名：生命周期回调函数、生命周期函数、生命周期钩子

2. => Vue在关键时刻调用的一些特殊名称的函数

3. 生命周期函数的名称不可更改，但是函数的具体内容是根据需求编写的

4. 生命周期函数中this指向是vm或者组件实例对象

5. **示意图**

   ![](assets/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

6. 常用的生命周期钩子
   1. `mounted`：发送Ajax请求、启动定时器、绑定自定义事件、订阅信息等【初始化操作】
   2. `beforeDestroy`：清除定时器、解除自定义事件、取消订阅消息等【收尾工作】
7. 关于销毁Vue实例的几点说明
   1. 销毁后借助Vue开发者工具看不到任何消息
   2. 销毁后自定义事件会失效，但原生DOM事件依然有效
   3. 一般不会在`beforeDestroy`操作数据，因为即便操作数据，也不会再出发更新流程

## 2 Vue组件化编程

### 2.1 模块与组件、模块化与组件化

#### 2.1.1 模块

1. 理解: 向外提供特定功能的 js 程序, 一般就是一个 js 文件 
2. 为什么: js 文件很多很复杂 
3. 作用: 复用 js, 简化 js 的编写, 提高 js 运行效率

#### 2.1.2 组件

1. 理解: 用来实现局部(特定)功能效果的代码集合(html/css/js/image…..) 
2. 为什么: 一个界面的功能很复杂
3. 作用：复用编码、简化项目编码、提高运行效率

#### 2.1.3 模块化

当应用中的功能都是多组件的方式来编写的，那这个应用就是一个组件化的应用

#### 2.1.4 组件化

当应用中的功能都是多组件的方式来编写的，那这个应用就是一个组件化的应用

![](assets/%E4%BD%BF%E7%94%A8%E7%BB%84%E4%BB%B6%E6%96%B9%E5%BC%8F%E7%BC%96%E5%86%99%E5%BA%94%E7%94%A8.png)
![](assets/Vue%E5%AE%98%E7%BD%91%E7%9A%84%E7%BB%84%E4%BB%B6%E7%90%86%E8%A7%A3.png)

### 2.2 非单文件组件

#### 2.2.1 基本使用

1. Vue中使用组件的三大步骤
   1. 定义组件（创建组件）
   2. 注册组件
   3. 使用组件（写组件标签）
2. 定义组件
   1. 使用`Vue.extend(options)`创建，其中`options`和`new Vue(options)`时传入的`options`几乎一样
   2. 区别：
      1. 不写`el` => 最终所有的组件都要经过一个vm的管理，由vm中的el决定
      2. 函数式`data` => 避免组件被复用时，数据存在引用关系
   3. 备注
      1. 使用`template`可以配置组件结构
3. 注册组件
   1. 局部注册：靠`new Vue()`的时候传入`components`选项
   2. 全局注册：靠`Vue.component('组件名',组件)`
4. 编写组件标签
   1. `<组件名></组件名>`

5. 代码示例

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>组件的基本使用</title>
       <script src="../js/vue.js"></script>
     </head>
     <body>
       <div id="root">
           <hello></hello>
           <hr>
           <h1>{{msg}}</h1>
           <!-- 编写组件标签 -->
           <school></school>
           <hr>
           <student></student>
       </div>
       <hr>
       <div id="root2">
           <hello></hello>
       </div>
     </body>
     <script>
       Vue.config.productionTip = false;
   
       //① 创建组件
       //学校组件
       const school = Vue.extend({
         template: `
               <div class="demo">
                   <h2>学校名称：{{schoolName}}</h2>
                   <h2>学校地址：{{address}}</h2>
                   <button @click="showName">点我提示学校名</button>	
   			</div>
         `,
         data() {
           return {
               schoolName: "hhu",
             address: "江苏",
           };
         },
         methods: {
           showName(){
               alert(this.schoolName)
           }
         },
       });
       //学生组件
       const student = Vue.extend({
   			template:`
   				<div>
   					<h2>学生姓名：{{studentName}}</h2>
   					<h2>学生年龄：{{age}}</h2>
   				</div>
   			`,
   			data(){
   				return {
   					studentName:'张三',
   					age:18
   				}
   			}
   		})
       //hello组件
       const hello = Vue.extend({
           template:`
   				<div>	
   					<h2>你好啊！{{name}}</h2>
   				</div>
   			`,
   			data(){
   				return {
   					name:'Tom'
   				}
   			}
       })
       //全局注册
       Vue.component('hello',hello)
       new Vue({
         el: "#root",
         data: {
           msg: "Hello",
         },
         //② 注册组件(局部注册)
         components:{
           school,
           student
         }
       });
   
       new Vue({
           el:'#root2'
       })
     </script>
   </html>
   
   ```

#### 2.2.2 注意事项

1. 关于组件名:

   1. 一个单词组成
      1. 第一种写法(首字母小写)：school
      2. 第二种写法(首字母大写)：School

   2. 多个单词组成：

      1. 第一种写法(kebab-case命名)：my-school

      2. 第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)

   3. 备注：

      1. 组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。

      2. 可以使用name配置项指定组件在开发者工具中呈现的名字

2. 关于组件标签:

   1. 第一种写法：<school></school>

   2. 第二种写法：<school/>

   3. 备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。

3. 一个简写方式
   1. `const school = Vue.extend(options) ` => `const school = options`

#### 2.2.3 组件的嵌套

1. 代码示例

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>组件的嵌套</title>
       <script src="../js/vue.js"></script>
     </head>
     <body>
       <div id="root"></div>
       <hr />
     </body>
     <script>
       Vue.config.productionTip = false;
   
       //① 创建组件
       //学生组件
       const student = Vue.extend({
         template: `
   				<div>
   					<h2>学生姓名：{{studentName}}</h2>
   					<h2>学生年龄：{{age}}</h2>
   				</div>
   			`,
         data() {
           return {
             studentName: "张三",
             age: 18,
           };
         },
       });
   
       //学校组件
       const school = Vue.extend({
         template: `
               <div>
                   <h2>学校名称：{{schoolName}}</h2>
                   <h2>学校地址：{{address}}</h2>
                   <student></student>
   			</div>
         `,
         data() {
           return {
             schoolName: "hhu",
             address: "江苏",
           };
         },
         //注册组件（局部）
         components: {
           student,
         },
       });
   
       //hello组件
       const hello = Vue.extend({
         template: `
   				<div>	
   					<h2>Welcome to {{msg}}</h2>
   				</div>
   			`,
         data() {
           return {
             msg: "hhu",
           };
         },
       });
   
       //定义App组件
       const app = {
         template: `
               <div>
                   <hello></hello>
                   <school></school>    
               </div>
           `,
         components: {
           school,
           hello,
         },
       };
       //全局注册
       Vue.component("hello", hello);
       new Vue({
         template: `
           <div>
               <app></app>
           </div>
         `,
         el: "#root",
         //② 注册组件(局部注册)
         components: {
           app,
         },
       });
     </script>
   </html>
   
   ```

2. 嵌套示意图

   ![](assets/%E7%BB%84%E4%BB%B6%E7%9A%84%E5%B5%8C%E5%A5%97.png)

#### 2.2.4 VueComponent

1. 组件的本质是一个名为`VueComponent`的构造函数，不是由程序员定义，是`Vue.extend`生成的 

2. 编写组件标签时，`Vue`解析时会帮我们创建组件的实例对象，即`Vue`帮我们执行的：`new VueComponent(options)`

3. 特别注意：每次调用`Vue.extend`，返回的都是一个全新的`VueComponent`

   ```js
   Vue.extend = function (extendOptions) {
             /*………………*/
             var Sub = function VueComponent(options) {
                 this._init(options);
             };
             /*………………*/
             return Sub;
         };
   ```

   

4. 关于this指向

   1. 组件配置中

      data函数、methods中的函数、watch中的函数、computed中的函数，它们的this均是【**VueComponent实例对象**】

   2. `new Vue(options)`配置中

      data函数、methods中的函数、watch中的函数、computed中的函数，它们的this均是【**Vue实例对象**】

5. VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）

   Vue的实例对象，以后简称vm

#### 2.2.5 一个重要的内置关系

1. `VueComponent.prototype.__proto__ === Vue.prototype`
2. 作用 => 让组件实例对象能够访问到Vue原型上的属性、方法
3. 分析示意图

![](assets/%E5%88%86%E6%9E%90Vue%E5%92%8CVueComponent%E7%9A%84%E5%85%B3%E7%B3%BB.png)

### 2.3 单文件组件

1. `xxx.vue`文件 => 内部书写组件 

   1. `template` => 组件的结构
   2. `script` => 组件相关交互的代码
   3. `style` => 组件的样式

2. 代码示例 （练习下格式  没有脚手架，不能运行）

   **School.vue**

   ```vue
   <template>
       <!-- 组件的结构 -->
       <div class="demo">
           <h2>学校名称：{{name}}</h2>
           <h2>学校地址：{{address}}</h2>
           <button @click="showName">点我提示学校名</button>
       </div>
   </template>
   
   <script>
       //组件相关交互的代码
       export default {
           name:'School',
           data(){
               return {
                   name:'hhu',
                   address:'江苏'
               }
           },
           methods: {
               showName(){
                   alert(this.name)
               }
           },
       }
   </script>
   
   <style>
       /*  组件的样式  */
       .demo{
           background-color: orange;
       }
   </style>
   ```

   **Student.vue**

   ```vue
   <template>
       <div>
           <h2>学生姓名：{{name}}</h2>
           <h2>学生年龄：{{age}}</h2>
       </div>
   </template>
   
   <script>
       export default {
           name:'Student',
           data(){
               return {
                   name:'jack',
                   age:18
               }
           },
       }
   </script>
   ```

   **App.vue**

   ```vue
   <template>
       <div>
           <School></School>
           <Student></Student>
       </div>
   </template>
   
   <script>
       // 引入组件
       import School from './School'
       import Student from './Student'
   export default {
       name:'App',
       components:{
           School,
           Student
       }
   }
   </script>
   ```

   **main.js**

   ```js
   import App from './App.vue'
   
   new Vue({
       el:'#root',
       template:`<App></App>`,
       components:{App}
   })
   ```

   **index.html**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>练习单文件组件的语法</title>
   </head>
   <body>
       <div id="root">
   
       </div>
   
       <script src="../js/vue.js"></script>
       <script src="./main.js"></script>
   </body>
   </html>
   ```

## 3 使用Vue脚手架

### 3.1 初始化脚手架

#### 3.1.1 说明

1. Vue脚手架是Vue官方提供的标准化开发工具（开发平台）
2. 最新的版本是4.x
3. 文档地址：https://cli.vuejs.org/zh/

#### 3.1.2 具体步骤

* 官方文档：[Home | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/)

1. 安装==nodejs== 环境

   参考文档：https://www.cnblogs.com/netcore5/p/15259499.html

2. （仅第一次执行）：全局安装`@vue/cli`

   ```sh
   npm install -g @vue/cli
   # OR
   yarn global add @vue/cli
   ```

3. **切换到要创建项目的目录**，执行命令

   ```sh
   vue create my-project
   # OR
   vue ui
   ```

* 示意图

  ![](assets/%E5%88%9B%E5%BB%BA%E7%AC%AC%E4%B8%80%E4%B8%AAvue%E9%A1%B9%E7%9B%AE.png)

* 备注
  * 创建项目过程如果报错，使用管理员权限打开`cmd`

  * 运行过程出现名称错误
    * 解决方案一： `ctrl + p` => `vue.config.js` => 添加配置 `lintOnSave:false`

  * Vue脚手架隐藏了所有webpack相关的配置，若想查看具体的webpack配置，执行

    ```sh
    vue inspect > output.js
    ```

#### 3.1.3 脚手架文件结构

```
├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```

#### 3.1.4 render()函数 

*特殊的函数*

关于不同版本的Vue

1. `vue.js`与`vue.runtime.xxx.js`的区别：

   1. `vue.js`是完整版的Vue，包含：**核心功能**+**模板解析器**

   2. `vue.runtime.xxx.js`是运行版的Vue，**只**包含：核心功能；没有模板解析器

2. 因为`vue.runtime.xxx.js`没有模板解析器，所以不能使用template配置项，需要使用

​      `render`函数接收到的`createElement`函数去指定具体内容

#### 3.1.5 脚手架默认配置

* 官方文档：[配置参考 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/config/)

* 查看Vue脚手架默认配置

  ```sh
  vue inspect > output.js
  ```

### 3.2 ref 和 props

#### 3.2.1 ref属性

1. 作用：给元素或者子组件注册引用信息（id的替代）

2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象
3. 使用方式
   1. 标识：`<h1 ref="xxx">...</h1>`或者`<School ref="xxx>></School>`
   2. 获取：`this.$refs.xxx`

#### 3.2.2 props配置项

1. 作用：让组件接收外部传入的数据

2. 传递数据：`<Demo name="XXX"/>`

3. 接收数据：

   1. 方式一（只接收）：`props:['name']`

   2. 方式二（限制类型）：`props:{name:String}`

   3. 方式三（限制类型、限制必要性、指定默认值）：

      ```js
      props:{
          name:{
              type:String, //类型
              required:true, //必要性
              default:'老王' //默认值    
          }
      }
      ```

   > 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据

### 3.3 mixin（混入）

1. 作用：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：*需要导出和引入*

   1. 定义混合

      ```js
      {
          data(){...},
          methods:{...}
          ...
      }
      ```

   2. 使用混入

      1. 全局混入：`Vue.mixin(XXX)`
      2. 局部混入：`mixins:['XXX']`

### 3.4 插件

1. 作用：增强Vue

2. 本质：包含`install()` 方法的一个对象，`install`的第一个参数是Vue原型对象，第二个以后的参数是插件使用者传递的数据

3. 定义插件

   ```js
   对象.install = function(Vue,options) {
       // 1.添加全局过滤器
       Vue.filter(...)
                  
   	// 2.添加全局指令
       Vue.directive(...)
       
       // 3.配置全局混入
       Vue.mixin(....)
       
       // 4.添加实例方法
       Vue.prototype.$myMethod = function(){...}
       Vue.prototype.$myProperty = xxx
   }
   ```

4. 使用插件：`Vue.use(..)`

### 3.5 scoped样式

1. 作用：让样式在局部生效，防止冲突
2. 写法：`<style scoped>`

---

### 总结TODOList案例

1. 组件化编码流程：
  1. 拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。
  2. 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

   1. 一个组件在用：放在组件自身即可

   2. 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）

  3. 实现交互：从绑定事件开始

2. props适用于：

   1. 父组件 ==> 子组件 通信
   2. 子组件 ==> 父组件 通信（要求父先给子一个函数）
3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！
4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

---

### webStorage

1. 存储内容大小一般支持5MB左右（依照浏览器）
2. 浏览器端通过`Window.sessionStorage`和`window.localStorage`属性来实现本地存储机制
3. 相关API
   1. `xxxStorage.setItem('key','value')` => 该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值
   2. `xxxStorage.getItem('key')` => 该方法接受一个键名作为参数，返回键名对应的值
   3. `xxxStorage.removeItem('key')` => 该方法接受一个键名作为参数，并把该键名从存储中删除
   4. `xxxStorage.clear()` => 该方法会清空存储中的所有数据
4. 备注
   1. SessionStorage存储的内容会随着浏览器窗口关闭而消失
   2. LocalStorage的存储的内容需要手动清除才会消失
   3. `xxxStorage.getItem('key')`如果key对应的Value获取不到，则此方法的返回值为null
   4. `Json.parse(null)`的结果依然是null

---

### 3.6 组件的自定义事件

1. 一种组件间的通信方式，适用于: <strong style="color:red">子组件===>父组件</strong>

2.  使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）

3. 绑定自定义事件

   1. 方式一：在父组件中：`<Demo @mystyle="test"/>` 或者 `<Demo v-on:mystyle="test"/>`

   2. 方式二：在父组件中：

      ```js
      <Demo ref="demo"/>
      .......
      mounted(){
      	this.$refs.xxx.$on('mystyle',this.test)
      }
      ```

   3. ​	若想让自定义事件只触发一次，可以使用`once`修饰符或者`$once`方法

4. 触发自定义事件：`this.$emit('mystyle',数据)`

5. 解绑自定义事件：`this.$off('mystyle')`

6. 组件上也可以绑定原生DOM事件，需要使用`native`修饰符

7. 注意：通过`this.$refs.xxx.$on('mystyle',回调)`绑定自定义事件时，**回调**<span style="color:red">要么配置在methods中，要么用箭头函数</span>，否则this指向会有问题

### 3.7 全局事件总线(GlobalEventBus)

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间的通信</span>

2. 安装全局事件总线

   ```js
   new Vue({
       ......
       beforeCreate(){
       	Vue.prototype.$bus = this // 安装全局事件总线，$bus就是当前应用的vm
   	},
       .....
   })
   ```

3. 使用事件总线：

   1. 接收数据：A组件想要接收数据，则在A组件中给`$bus`绑定自定义事件，事件的<span style="color:red">回调留在A组件自身</span>

      ```js
      methods:{
          demo(data) {.......},
          .......
          mounted(){
              this.$bus.$on('xxx',this.demo)
          }
      }
      ```

   2. 提供数据：`this.$bus.$emit('xxx',数据)`

4. 注意事项

   1. 最好在`beforeDestroy`钩子中，用`$off`去解绑<span style="color:red">当前组件所用到的</span>事件

---

### 消息订阅与发布（pubsub)

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间的通信</span>

2. 使用步骤

   1. 安装pubsub:`npm i pubsub-js`

   2. 引入： `import pubsub from 'pubsub-js'`

   3. 接收数据：A组件想要接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A中</span>

      ```js
      methods:{
      	demo(data) {......}
      }
      ......
      mounted(){
          this.pid = pubsub.subscribe('xxx',this.demo)
      }
      ```

   4. 提供数据：`pubsub.publish('xxx',数据)`
   5. 注意事项
      1. 最好在`beforeDestroy`钩子中，用`pubsub.unsubscribe(pid)`去<span style="color:red">取消订阅</span>

---

### 3.8 nextTick

1. 语法：`this.$nextTick(回调函数)`
2. 作用：在下一次DOM更新结束后执行其制定的回调
3. 使用时机：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行

### 3.9 Vue封装的过渡和动画

1. 作用：在插入、更新或者移除DOM元素时，在合适的时候给元素添加样式类名

2. 图示：

   ![](assets/Vue%E5%B0%81%E8%A3%85%E7%9A%84%E8%BF%87%E6%B8%A1%E5%92%8C%E5%8A%A8%E7%94%BB.png)

3. 写法：

   1. 准备好样式：
      * 元素进入的样式
        1. `v-enter`:进入的起点
        2. `v-enter-active`:进入过程中
        3. `v-enter-to`:进入的终点
      * 元素离开的样式
        1. `v-leave`:离开的起点
        2. `v-leave-active`:离开过程中
        3. `v-leave-to`:离开的终点

   2. 使用`<transition>`包裹要过渡的元素，并配置name属性

      ```html
      <transition name="hello">
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

      

   3. 备注：若有多个元素需要过渡，则需要使用:`<transition-group>`，且每个元素都要指定`key`值

## 4 Vue中的Ajax

### 4.1 Vue脚手架配置代理 => 解决跨域问题

#### 方式一

​	在`vue.config.js`中添加如下配置

```js
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

* 优点：配置简单，请求资源时直接发送给前端即可
* 缺点：不能配置多个代理，不能灵活的控制请求是否走代理
* 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器（优先匹配服务器）

#### 方式二

​	编写`vue.config.js`配置具体代理规则

```js
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:port',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:port',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

* 优点：可以配置多个代理，且可以灵活的控制请求是否走代理
* 缺点：配置略微繁琐，请求资源时必须加前缀

###4.2 slot插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于<strong style="color:red">父组件 ===> 子组件</strong>

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

   1. 默认插槽：

      ```html
      <!-- 父组件中 -->
      		<Category>
                 <div>html结构1</div>
              </Category>
      <!-- 子组件中 -->
      		 <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

   2. 具名插槽

      ```html
      <!-- 父组件中 -->
              <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
      
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      <!-- 子组件中 -->
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>
                     <slot name="footer">插槽默认内容...</slot>
                  </div>
              </template>
      ```

   3. 作用域插槽

      1. 理解：<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定</span>(game数据在Category组件中，但使用数据所遍历出来的结构有App组件决定)

      2. 具体编码

         ```html
         <!-- 父组件中 -->
         		<Category>
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         		<Category>
         			<template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         <!-- 子组件中 -->
                 <template>
                     <div>
                         <slot :games="games"></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```


## 5 Vuex

### 5.1 Vuex理解

1. 是什么？专门在 Vue 中实现集中式状态（数据）管理的一个 Vue **插件**，对 vue 应 用中多个组件的**共享**状态进行集中式的管理（读/写），也是一种组件间通信的方 式，且适用于任意组件间通信

2. 工作原理图

   ![](assets/Vuex%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E5%9B%BE.png)

### 5.2 搭建Vuex环境

1. 安装Vuex

   1. Vue2 => Vuex3 版本

      ```sh
      npm i vuex@3
      ```

2. 创建文件：`src/store/index.js`

   ```js
   // 引入Vue核心
   import Vue from 'Vue'
   // 引入Vuex
   import Vuex from 'vuex'
   // 应用Vuex插件
   Vue.use(Vuex)
   
   // 准备actions对象 => 响应组件中用户的动作
   const actions = {}
   // 准备mutations对象 => 修改state中的数据
   const mutations = {}
   // 准备state对象 => 保存具体的数据
   const state = {}
   // 创建并暴露store
   export default new Vuex.Store({
       actions,
       mutations,
       state
   })
   ```

3. 在`main.js`中创建vm时传入`store`配置项

   ```js
   .......
   // 引入store
   import store from './store'
   .......
   // 创建vm
   new Vue({
     render: h => h(App),
     store
   }).$mount('#app')
   ```

### 5.3 基本使用

1. 初始化数据、配置`actions`、配置`mutations`、操作文件`store.js`

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
   ```

2. 组件中读取vuex中的数据：`$store.state.xxx`

3. 组件中修改vuex中的数据：`$store.dispatch('actions中的方法名',数据)`或者`$store.commit('mutations中的方法名',数据)`

   >备注：若没有网络请求或者其他业务逻辑，组件中也可以越过actions，即不写`dispatch`，直接编写`commit`

### 5.4 getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工

2. 在`store.js`中追加`getters`配置

   ```js
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：`$store.getters.bigSum`

### 5.5 map方法使用

1. **mapState方法**  => 用于帮助我们映射`state`中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. **mapGetters方法** => 用于帮助我们映射`getters`中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. **mapActions方法** => 用于帮助我们生成与`actions`对话的方法，即包含`$state.dispatch(xxx)的函数`

   ```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. **mapMutations方法** => 用于帮助我们生成与`mutations`对话的方法，即包含`$state.commit(xxx)的函数`

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions 与 mapMutations 使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象

### 5.6 模块化 + 命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确

2. 修改`store.js`

   ```js
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取`state`数据

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取`getters`数据

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用`dispatch`

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用`commit`

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

## 6 vue-router

1. 理解：一个路由(route)就是一组映射关系(key - value)，多个路由需要路由器(router)进行管理

2. 前端路由：key是路径，value是组件

   ![](assets/%E5%89%8D%E7%AB%AF%E8%B7%AF%E7%94%B1%E7%90%86%E8%A7%A3%E6%A1%88%E4%BE%8B.png)

### 6.1 基本使用

1. 安装vue-router（Vue2 => vue-router3)

   ```sh
   npm i vue-router@3
   ```

2. 应用插件：`Vue.user(VueRouter)`

3. 编写router配置项:`src/router/index.js`

   ```js
   // 专门用于创建整个应用的路由器
   import VueRouter from "vue-router";
   
   // 引入组件
   import About from '@/components/About'
   import Home from '@/components/Home'
   
   // 创建并暴露路由
   export default new VueRouter({
       routes:[
           {
               path:'/about',
               component:About
           },
           {
               path:'/home',
               component:Home
           }
       ]
   })
   ```

4. 实现切换(`active-class`可以配置高亮样式)

   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```

5. 指定展示位置

   ```vue
   <router-view></router-view>
   ```

### 6.2 注意事项

1. 路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息
4. 整个应用只有一个router，可以通过组件的```$router```属性获取到

### 6.3 多级路由（嵌套路由）

1. 配置路由规则，使用`children`配置项

   ```js
   routes:[
           {
               path:'/about',
               component:About
           },
           {
               path:'/home',
               component:Home,
               children:[
                   {
                       path:'news',
                       component:News
                   },
                   {
                       path:'message',
                       component:Message
                   }
               ]
           }
       ]
   ```

2. 跳转（**完整路径**）

   ```vue
   <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
   ```

### 6.4 路由的query参数

1. 传递参数

   ```Vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

2. 接收参数

   ```js
   $route.query.id
   $route.query.title
   ```

### 6.5 命名路由

1. 作用：可以简化路由的跳转

2. 使用方法：

   1. 给路由命名

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                            name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转

      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```

### 6.6 路由的params参数

1. 配置路由，声明接收`params`参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

> 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

3. 接收参数

   ```js
   $route.params.id
   $route.params.title
   ```

### 6.7 路由的props参数

* 作用：让路由组件更方便的接收参数

  ```js
  {
  	name:'xiangqing',
  	path:'detail/:id',
  	component:Detail,
  
  	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
  	// props:{a:900}
  
  	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
  	// props:true
  	
  	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
  	props(route){
  		return {
  			id:route.query.id,
  			title:route.query.title
  		}
  	}
  }
  ```

### 6.8 `<router-link>`的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录的写入模式：`push`和`replace`，`push`是追加历史记录，`replace`是替换当前记录，路由跳转时候默认是`push`
3. 开启`replace`模式：`<router-link replace .......>News</router-link>`

### 6.9 编程式路由导航

1. 作用：不借助`<router-link>`实现路由跳转，让路由跳转更加灵活

2. 代码示例

   ```js
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退(传入正数前进，负数后退)
   ```

### 6.10 缓存路由组件

1. 组件：让不展示的路由组件保持挂载，不被销毁(在展示组件的地方挂载)

2. 代码示例

   ```vue
   <keep-alive include="News"> 
     	<!-- 
   		缓存多个
   		<keep-alive :include="['News','Message']">
   --> 
       <router-view></router-view>
   </keep-alive>
   ```

   **include** => 组件名

### 6.11 两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态
2. 具体名字：
   1. `activated` => 路由组件被激活时触发
   2. `deactivated` => 路由组件失活时触发

### 6.12 路由守卫

1. 作用：对路由进行权限控制

2. 分类

   * 全局守卫
   * 独享守卫
   * 组件内守卫

3. 代码示例

   * 全局守卫

     ```js
     //全局前置守卫：初始化时执行、每次路由切换前执行
     router.beforeEach((to,from,next)=>{
     	console.log('beforeEach',to,from)
     	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
     		if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
     			next() //放行
     		}else{
     			alert('暂无权限查看')
     			// next({name:'guanyu'})
     		}
     	}else{
     		next() //放行
     	}
     })
     
     //全局后置守卫：初始化时执行、每次路由切换后执行
     router.afterEach((to,from)=>{
     	console.log('afterEach',to,from)
     	if(to.meta.title){ 
     		document.title = to.meta.title //修改网页的title
     	}else{
     		document.title = 'vue_test'
     	}
     })
     ```

   * 独享守卫

     ```js
     beforeEnter(to,from,next){
     	console.log('beforeEnter',to,from)
     	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
     		if(localStorage.getItem('school') === 'atguigu'){
     			next()
     		}else{
     			alert('暂无权限查看')
     			// next({name:'guanyu'})
     		}
     	}else{
     		next()
     	}
     }
     ```

   * 组件内守卫

     ```js
     //进入守卫：通过路由规则，进入该组件时被调用
     beforeRouteEnter (to, from, next) {
     },
     //离开守卫：通过路由规则，离开该组件时被调用
     beforeRouteLeave (to, from, next) {
     }
     ```

   ### 6.13 路由器的两种工作方式

1. 对于一个`url`，`hash` => #及其之后的内容
2. `hash`值不会包含在HTTP请求中，即`hash`值不会带给服务器
3. `hash`模式：
   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. `history`模式：
   1. 地址干净，美观 。
   2. 兼容性和`hash`模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。

5. 开启方式：创建路由器时配置

   ```vue
   mode:'history'
   mode:'hash'
   ```

