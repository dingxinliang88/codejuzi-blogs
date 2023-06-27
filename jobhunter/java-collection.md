# Java集合


# List、Set、Queue、Map四个的区别

1. `List`：存储的元素是有序的、可重复的
2. `Set`：存储的元素是无序的、不可重复的
3. `Queue`：按照特定的排队规则来确定先后顺序，存储的元素是有序的、可重复的
4. `Map`：使用KV键值对的形式存储，key是无序的、不可重复的，value是无序的、可重复的，每个键最多映射到一个值

# ArrayList和Vector的区别

- `ArrayList` 是 `List` 的主要实现类，底层使用 `Object[]`存储，适用于频繁的查找工作，线程不安全 
- `Vector` 是 `List` 的古老实现类，底层使用`Object[]` 存储，线程安全的

# 无序性和不可重复性的含义是什么

- 无序性 ≠ 随机性 ，无序性是指存储的数据在底层数组中并非按照数组索引的顺序添加 ，而是根据数据的哈希值决定的。
- 不可重复性是指添加的元素按照 `equals()` 判断为不相等，**需要同时重写 `equals()` 方法和 `hashCode()` 方法**

# HashMap和Hashtable的区别

- 线程安全性：`HashMap`不是线程安全的；`Hashtable`是线程安全的，因为其内部的方法基本都被`synchronized`修饰。

	> 但是如果要想保证线程安全，推荐使用`ConcurrentHashMap`

- 对null值存储的支持度：`HashMap`可以存储null key和nul value，但是null key只能有一个，null value可以有多个；`Hashtable`是不支持存储null key和null value，否则会抛出`NPE`异常

- 初始化容量和动态扩容因子不同

	- 在创建对应集合时，如果不指定容量初始值，`Hashtable`默认初始值为11，动态扩容因子为`2n+1`，也就是每次扩容，容量变为原来的2n+1；`HashMap`默认初始化大小为16，动态扩容因子为`2n`，也就是每次扩容，容量变为原来的2倍

	- 在创建对应集合时，如果指定了容量初始值size，`Hashtable`会使用给定的size来初始化容量；`HashMap`会将其扩充为2的幂次方大小（对应方法`tableSizeFor()`）来初始化容量 => `HashMap`总是使用2的幂次方来作为哈希表的大小

		```java
		public class HashMap {
		  // ……
		  /**
		    * Returns a power of two size for the given target capacity.
		    */
		  static final int tableSizeFor(int cap) {
		    int n = -1 >>> Integer.numberOfLeadingZeros(cap - 1);
		    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
		  }
		
		  // 对应的构造器
		  /**
		    * Constructs an empty {@code HashMap} with the specified initial
		    * capacity and load factor.
		    *
		    * @param  initialCapacity the initial capacity
		    * @param  loadFactor      the load factor
		    * @throws IllegalArgumentException if the initial capacity is negative
		    *         or the load factor is nonpositive
		    */
		  public HashMap(int initialCapacity, float loadFactor) {
		    if (initialCapacity < 0)
		      throw new IllegalArgumentException("Illegal initial capacity: " +
		                                         initialCapacity);
		    if (initialCapacity > MAXIMUM_CAPACITY)
		      initialCapacity = MAXIMUM_CAPACITY;
		    if (loadFactor <= 0 || Float.isNaN(loadFactor))
		      throw new IllegalArgumentException("Illegal load factor: " +
		                                         loadFactor);
		    this.loadFactor = loadFactor;
		    this.threshold = tableSizeFor(initialCapacity);
		  }
		
		  /**
		    * Constructs an empty {@code HashMap} with the specified initial
		    * capacity and the default load factor (0.75).
		    *
		    * @param  initialCapacity the initial capacity.
		    * @throws IllegalArgumentException if the initial capacity is negative.
		    */
		  public HashMap(int initialCapacity) {
		    this(initialCapacity, DEFAULT_LOAD_FACTOR);
		  }
		}
		```

- 性能：因为`Hashtable`为了做到线程安全，加入了很多`syncronized`锁，所以性能上比`HashMap`要差一点

- 底层实现：在JDK1.8之前，`HashMap`在处理哈希冲突上效果不佳，搜索时间较长；但是在JDK1.8之后，`HashMap`在解决哈希冲突上有了较大的变化，当链表长度大于阈值（默认是8），同时如果当前的数组长度大于64，此时会将链表转化为红黑树，以减少搜索时间（如果此时数组长度小于64，则会先进行数组的扩容）；`Hashtable`没有这样的机制

