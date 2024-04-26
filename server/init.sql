drop database if exists iot;
create database iot ;
use iot;
create table user
(
    id          int unsigned auto_increment comment '用户ID',
    username    varchar(30) not null comment '用户名',
    password    varchar(30) not null comment '密码',
    email       varchar(60) not null comment '邮箱',
    constraint user_pk
        primary key (id),
    constraint user_pk2
        unique (username),
    constraint user_pk3
        unique (email)
)
    comment '用户表';

create table device
(
    id          int unsigned auto_increment comment '设备ID',
    username    varchar(30) not null comment '设备所属用户名',
    device_name varchar(30)  not null comment '设备名称',
    device_type varchar(30)  not null comment '设备类型',
    constraint device_pk
        primary key (id)
)
    comment '设备表';

create table message
(
    id          int unsigned auto_increment comment 'ID'
        primary key,
    device_name varchar(30) not null comment '设备ID',
    info        varchar(255) null comment '消息内容',
    value       int unsigned not null comment '设备数据',
    alert       int unsigned not null comment '是否告警(0正常,1告警)',
    lng         double       not null comment '经度',
    lat         double       not null comment '纬度',
    time_stamp  datetime     not null comment '时间戳'
)
    comment '消息表';

INSERT INTO `user` VALUES(null, 'yzf', '123456', '123456@qq.com');
INSERT INTO `device` VALUES(null, 'yzf', 'device0001', '1');
INSERT INTO `device` VALUES(null, 'yzf', 'device0002', '2');
INSERT INTO `device` VALUES(null, 'yzf', 'device0003', '3');
INSERT INTO `device` VALUES(null, 'yzf', 'device0004', '4');
INSERT INTO `device` VALUES(null, 'yzf', 'device0005', '5');
