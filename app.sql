create database egg_house;

use egg_house;

-- 用户表
create table user
(
    id          int not null auto_increment,
    username    varchar(20)  default null comment '用户名',
    password    varchar(64)  default null comment '密码',
    avatar      text comment '头像',
    phone       varchar(20)  default null comment '电话',
    sign        varchar(300) default null comment '用户签名',
    create_time timestamp    default null comment '创建时间',
    update_time timestamp    default null comment '更新时间',
    primary key (id)
) engine = InnoDB
  auto_increment = 1
  default charset = utf8
    comment '用户名';

-- 民宿表
create table house
(
    id           int         not null auto_increment,
    name         varchar(50)          default null comment '房屋名称',
    info         varchar(150)         default null comment '房屋简介',
    address      varchar(200)         default null comment '房屋地址',
    price        int                  default null comment '房屋价格',
    publish_time timestamp            default null comment '发布时间',
    city_code    varchar(10) not null comment '城市编码',
    show_count   int(5)      not null default 0 comment '展示次数',
    start_time   timestamp            default null comment '开始出租时间',
    end_time     timestamp            default null comment '出租结束时间',
    primary key (id)
) engine = innoDB
  auto_increment = 1
  default charset = utf8 comment '房屋表';

-- 图片表
create table img
(
    id          int not null auto_increment,
    url         varchar(500) default null comment '图片地址',
    house_id    int not null comment '民宿表 id',
    create_time timestamp    default null comment '创建时间',
    primary key (id)
) engine = innoDB
  auto_increment = 1
  default charset = utf8 comment '图片表';

-- 评论表
create table comment
(
    id          int not null auto_increment,
    user_id     int not null comment '用户表 id',
    house_id    int not null comment '民宿表 id',
    msg         varchar(500) default null comment '评论内容',
    create_time timestamp    default null comment '创建时间',
    primary key (id)
) engine = innoDB
  auto_increment = 1
  default charset = utf8 comment '评论表';
-- 订单表
create table orders
(
    id           int not null auto_increment,
    order_number varchar(20) default null comment '订单编号',
    user_id      int not null comment '用户 id',
    house_id     int not null comment '房屋 id',
    is_payed     int         default 0 comment '是否支付, 0 未支付 1 已支付',
    create_time  timestamp   default null comment '创建时间',
    update_time  timestamp   default null comment '更新时间',
    primary key (id)
) engine = innoDB
  auto_increment = 1
  default charset = utf8
    comment '订单表'