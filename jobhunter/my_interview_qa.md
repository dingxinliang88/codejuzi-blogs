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

## HashMap 和 HashTable的区别

> HashTable 和 HashMap都是一个基于hash表实现的K-V结构的集合
>
> HashTable是JDK1.0引入的一个线程安全的集合类，因为所有数据访问的方法都加了一个Synchronized同步锁
>
> HashTable内部采用数组加链表来实现，链表用来解决hash冲突的问题
>
> HashMap是JDK1.2引入的一个线程不安全的集合类，HashMap内部也是采用了数组加链表实现，在JDK1.8版本里面做了优化，引入了红黑树，当链表长度大于等于8并且数组长度大于64的时候，就会把链表转化为红黑树，提升数据查找性能

1. 从功能特性的角度来看
   - HashTable是线程安全的
   - HashMap不是线程安全的

2. HashMap的性能要比HashTable更好，因为HashTable采用了全局同步锁来保证安全性，对性能影响较大

3. 从内部实现的角度来看
   - HashTable使用 数组 + 链表
   - HashMap使用 数组 + 链表 + 红黑树

4. HashMap的初始容量是16，HashTable的初始容量是11

   ```java
   /**
    * Constructs a new, empty hashtable with a default initial capacity (11)
    * and load factor (0.75).
    */
   public Hashtable() {
     this(11, 0.75f);
   }
   ```

   ```java
   public class HashMap<K,V> extends AbstractMap<K,V>
     implements Map<K,V>, Cloneable, Serializable {
     // ...
     /**
      * The default initial capacity - MUST be a power of two.
      */
     static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16
   
     // ...
   }
   ```

   

5. HashMap可以使用null作为key，因为HashMap会把null转化为0进行存储，而HashTable不允许

    `HashMap.java`
   ```java
   static final int hash(Object key) {
     int h;
     // 当key == null 的时候，hash值默认为0
     return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
   }
   ```

6. HashTable和HashMap的key的散列算法不同
   - HashTable使用key的hashcode对数组长度做取模
   - HashMap对key的hashcode做了二次散列，从而避免key分布不均匀问题影响到查询性能


## String、StringBuffer、StringBuilder的区别？

1. 可变性

   - `String`是不可变的

   - `StringBuilder`与`StringBuffer`是可变的，因为它们都继承自`AbstractStringBuilder`类，在`AbstractStringBuilder`类中也是使用字符数组来保存字符串，只不过没有使用`final`和`private`关键字修饰，除此之外，`AbstractStringBuilder`类还提供了很多修改字符串的方法，比如`append`方法

     ```java
     abstract class AbstractStringBuilder implements Appendable, CharSequence {
       // ...
       byte[] value;
     
       public AbstractStringBuilder append(String str) {
         if (str == null) {
           return this.appendNull();
         } else {
           int len = str.length();
           this.ensureCapacityInternal(this.count + len);
           this.putStringAt(this.count, str);
           this.count += len;
           return this;
         }
       }
       // ...
     }
     ```

2. 线程安全性

   - `String`中的对象是不可变的，也就可以理解为常量，是线程安全的
   - `StringBuffer`对`AbstractStringBuilder`提供的方法加了锁或者对调用的方法加了同步锁，所以是线程安全的
   - `StringBuilder`没有对方法加锁，所以是非线程安全的

3. 性能

   每次对`String`类型进行改变的时候，都会产生一个新的`String`对象，然后将指针指向新的`String`对象。`StringBuffer`每次都会对`StringBuffer`对象本身进行操作，而不是产生新的对象并改变对象的引用。相同情况下使用`StringBuilder`相比使用`StringBuffer`能获得10%\~15%左右的性能提升，但是多线程不安全的风险

**『总结』**

- 操作少量数据时，适用`String`
- 单线程操作字符串缓冲区下操作大量数据，适用`StringBuilder`
- 多线程操作字符串缓冲区下操作大量数据，适用`StringBuffer`