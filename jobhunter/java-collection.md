# Java集合


# List、Set、Queue、Map四个的区别

1. `List`：存储的元素是有序的、可重复的
2. `Set`：存储的元素是无序的、不可重复的
3. `Queue`：按照特定的排队规则来确定先后顺序，存储的元素是有序的、可重复的
4. `Map`：使用KV键值对的形式存储，key是无序的、不可重复的，value是无序的、可重复的，每个键最多映射到一个值

# ArrayList和Vector的区别

- `ArrayList` 是 `List` 的主要实现类，底层使用 `Object[]`存储，适用于频繁的查找工作，线程不安全 
- `Vector` 是 `List` 的古老实现类，底层使用`Object[]` 存储，线程安全的

