# Java基础


## Java反射的优缺点？

> 反射是Java语言重要的一个特征。它能够在程序运行的过程中去构造任意一个类对象，并且可以获得任意一个类的成员变量、成员方法、属性，以及调用任意一个对象的方法。
>
> 通过反射的能力，可以让Java语言支持动态获取程序信息以及动态调用方法的能力。

Java反射的优点：

- 增加程序的灵活性，可以在运行的过程中动态对类进行修改和操作
- 增加代码的复用性，例如动态代理，就是使用了反射技术来实现
- 可以在运行时轻松获取任意一个类的方法、属性，并且还能通过反射进行动态调用

Java反射的缺点：

- 反射会涉及到动态类型的解析，因此JVM无法对这些代码进行优化，导致性能要比非反射调用要低
- 使用反射之后，代码的可读性会降低
- 反射可以绕过一些限制访问的属性和方法(private, protected)，可能会导致破坏了代码本身的封装性和抽象性

## Integer a1 = 100; Integer a2 = 100; a1 == a2 的运行结果？

> 考查知识点：`==`表示内存地址匹配、装箱拆箱、Integer内部设计原理
>
> 1. `Integer a1 = 100`，把一个int数字赋值给一个封装类型，Java会默认进行装箱操作，即调用了`Integer.valueOf()`方法，把数字100包装成封装类型`Integer`
>
> 2. 在`Integer`内部设计中，使用了**享元设计模式**，享元模式的核心思想是通过复用对象，减少对象的创建数量，从而减少内存占用和提升性能。
>
>    `Integer`内部维护了一个`IntegerCache`，其缓存了-128 \~ 127这个区间的数值对应的Integer类型。
>
>    ```java
>    private static class IntegerCache {
>      static final int low = -128;
>      static final int high;
>      static final Integer cache[];
>    
>      static {
>        // high value may be configured by property
>        int h = 127;
>        String integerCacheHighPropValue =
>          VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
>        if (integerCacheHighPropValue != null) {
>          try {
>            int i = parseInt(integerCacheHighPropValue);
>            i = Math.max(i, 127);
>            // Maximum array size is Integer.MAX_VALUE
>            h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
>          } catch( NumberFormatException nfe) {
>            // If the property cannot be parsed into an int, ignore it.
>          }
>        }
>        high = h;
>    
>        cache = new Integer[(high - low) + 1];
>        int j = low;
>        for(int k = 0; k < cache.length; k++)
>          cache[k] = new Integer(j++);
>    
>        // range [-128, 127] must be interned (JLS7 5.1.7)
>        assert IntegerCache.high >= 127;
>      }
>    
>      private IntegerCache() {}
>    }
>    ```
>
>    程序调用`valueOf`方法，如果数字是在-128 \~ 127之间就直接在cache缓存数组中去取Integer对象，否则就会创建一个新的对象
>
>    ```java
>    public static Integer valueOf(int i) {
>      if (i >= IntegerCache.low && i <= IntegerCache.high)
>        return IntegerCache.cache[i + (-IntegerCache.low)];
>      return new Integer(i);
>    }
>    ```

`a1==a2`的执行结果为`true`，因为`Integer`内部用到了享元模式，针对-128 \~ 127之间的数字做了缓存，使用`Integer a1 = 100`这个方式赋值时，Java默认会通过`valueOf()`对100这个数字进行装箱操作，从而触发缓存机制，使得a1和a2指向了同一个Integer地址空间。

## new String("abc")创建了几个对象？

代码中有一个`new`关键字，这个关键字是在程序运行时，根据已经加载的系统类`String`，在堆内存内实例化一个字符串对象。然后，在`String`的构造方法内部传入一个`"abc"`字符串，因为`String`内的字符串成员变量是`final`修饰的，所以它是一个字符串常量。接下来，JVM会拿字面量`"abc"`去字符串常量池内试图去获取它对应的`String`对象引用，如果不能获取到，就会在堆内存里面创建一个`"abc"`的`String`对象，并且把引用保存到字符串常量池内。后续操作中如果再有对字面量`"abc"`的定义，由于字符串常量池内部已经存在字面量`"abc"`的引用了，所以只需要从常量池获取对应的引用就可以了，不需要再创建。

因此，这个问题的答案是：

- 如果`"abc"`这个字符串常量不存在，则会创建两个对象，分别是`"abc"`这个字符串常量以及`new String`这个实例对象
- 如果`"abc"`这个字符串常量存在，只会创建一个实例对象，即`new String`