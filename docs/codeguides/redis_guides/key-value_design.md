# 一、key值设计

Redis是一个KV型的非关系型数据库，其中key值的优良设计也是极其重要的，最重要的是要保证以下几点：

- 可读性 && 易管理
- 简洁性
- 常规性
- 设计过期时间

## 1.1 可读性 && 易管理

key值的设计通常以 `业务名/库名`为前缀，其目的就是为了防止key冲突，规范的key值应该是由 `业务名/库名` + `表名` + `ID` 等区分不同用途的名词组成，并且使用`冒号`分隔，

```properties
api_info:access:1
```

> ### 补充：Redis的key使用冒号分隔的理由
>
> 1. Redis中命名规范使用冒号对不同层级的数据进行分割，这样的命名方式称之为`命名空间`，可以提供更好的可读性和可维护性。
> 2. Redis中的一些命令（例如：`keys`、`mget`）也支持通配符查询，使用冒号分隔可以方便地进行模糊匹配查询。

## 1.2 简洁性

Redis中的key值的长度最大是512MB。这也就意味着如果开发者讲一个超出最大长度的key值存储到Redis中，Redis将会拒绝该操作并返回错误信息。尽管Redis支持非常长的key值，但是在实际使用的时候，应该尽可能的控制key值的长度，从而避免影响性能和内存占用。

【栗子🌰】

```properties
user:{mid}:friends:messages:{mid}
```

**在保证语义的前提下**，就可以简化成下面这样：

```properties
u:{mid}:f:msg:{mid}
```

> ### 补充
>
> - 通常情况下，建议将key值的长度限制在几十个字符以内，以便于管理和维护
> - 在设计key值的时候，应该避免使用归于复杂的结构或者命名方式，以简化代码逻辑并提高可读性
> - 避免在key值中包含敏感信息，以确保数据的安全性

## 1.3 常规性

常规性也就是在key值中不要包含特殊字符。反例就是key值中包含空格、换行、单双引号以及其他转义字符。

## 1.4 设计过期时间

Redis不是垃圾桶，强烈建议使用`expire`设计过期时间，不过期的数据重点关注**idletime**。在条件允许的条件下，可以打散过期时间，防止集中过期，造成**缓存雪崩**。

> ### 补充：idletime
>
> 在 Redis 中，key 可以设置过期时间，也可以不设置过期时间。如果你想让一个 key 永不过期，可以通过将过期时间设置为 -1 或者使用 persist 命令来实现。
>
> 关于idletime，它是Redis中用来判断一个key是否闲置的一个参数。如果一个key在指定的时间段内没有被访问过，那么它就是被认为是idle的。我们可以通过配置Redis中每个key的最大空闲时间来控制这个行为。
>
> 【栗子🌰】
>
> 让一个key在10min内没有被访问过后就被认为是idle，可以通过下述命令来设置
>
> ```sh
> CONFIG SET maxidletime 600
> ```
>
> 然后对于某个key，可以通过下述命令来获取它当前的空闲时间
>
> ```sh
> OBJECT IDLETIME <key>
> ```
>
> - 如果返回值为-1，则表示该key存在但未设置过期时间
> - 如果返回值为-2，则表示该key不存在
> - 如果返回值为非负整数，表示该key的空闲时间，以秒为单位，即该key存在，且有对其的访问或操作。
>
> 需要注意的是，如果key正在被读取或者写入，并不会影响他的空闲时间。只有在key完全闲置的时候，才会增加其空闲时间。

> ### 补充：缓存雪崩
>
> 缓存雪崩是指在同一时间大量的缓存数据失效，导致大量请求直接落到底层存储系统上，从而引起底层存储的短暂或持久性宕机的现象。
>
> 引发缓存雪崩的原因：
>
> - 缓存服务器故障或者重启
> - 大量数据同时失效，比如设置了相同的过期时间
> - 缓存几种在某些热点key上
> - 缓存服务器部署不均匀，容易导致单点故障
> - 系统流量突然激增，超过了缓存服务器的处理能力
>
> 避免缓存雪崩的措施：
>
> - 设置缓存数据的过期时间时，尽量将时间分散，避免同时过期
> - 为不同的缓存数据设置不同的过期时间，避免全部集中在同一时间失效
> - 引入分布式锁机制，保证缓存数据在失效时只能由一个线程去重新加载数据，避免并发访问
> - 实时监控缓存服务器的运行状态，及时发现问题并进行处理
> - 配置缓存服务器的主备模式，使用多台服务器保证服务的高可用性





# 二、value设计

除了key需要优良设计之外，value也是需要进行设计的，设计value过程中重要的几点：

- 拒绝bigkey
- 选择合适的数据类型

## 2.1 拒绝bigkey

在 Redis 中，bigkey 是指存储空间占用较大的键值对。由于 Redis 是单线程、基于内存的数据库，处理 bigkey 会对性能产生很大影响。

因此，在开发中，我们可以这么做：

1. 使用 Hash 或者 Zset 来保存结构化数据，而不是使用 List 或者 Set
2. 对于较大的字符串，可以将其拆分成多个较小的字符串来保存，并在需要时将它们拼接起来
3. 设置合适的过期时间，避免数据无限增长
4. 使用 Redis 的分布式特性，将数据分散到多个节点上，避免单个节点的数据量过大

除此之外，还可以通过监控Redis实例的key size和 Memory usage等指标，及时发现bigkey，避免影响整个系统的性能。

具体的一些指标：string类型控制在10KB以内，hash、list、set、zset元素个数不要超过5000

非字符串的bigkey，不要使用del删除，使用hscan、sscan、zscan方式渐进式删除，同时要注意防止bigkey过期时间自动删除问题。

## 2.2 选择合适的数据类型

Redis提供了多种数据类型，每种类型都有不同的应用场景。以下是常见的Redis数据类型及其使用场景：

1. 字符串（String）：适合存储单个值，如数字、字符串、二进制数据等。
2. 哈希表（Hash）：适合存储键值对，其中的值又可以是一个键值对的集合，比如存储用户信息、文章信息等。
3. 列表（List）：适合存储一个有序的字符串列表，比如存储日志、消息队列等。
4. 集合（Set）：适合存储一个无序的、不重复的字符串集合，比如存储标签、点赞用户等。
5. 有序集合（Sorted Set）：适合存储一个有序的、不重复的字符串集合，并且每个字符串都对应一个分数，比如存储排行榜、投票系统等。

**选择合适的数据类型，还是需要根据具体的业务需求来决定的。**