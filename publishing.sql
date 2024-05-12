/*
 Navicat Premium Data Transfer

 Source Server         : aaaaa
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : publishing

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 08/06/2023 10:07:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for audit
-- ----------------------------
DROP TABLE IF EXISTS `audit`;
CREATE TABLE `audit`  (
  `date` date NOT NULL COMMENT '交流日期',
  `opinion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '修改意见',
  `nameid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '作者id',
  `bookid` int NOT NULL COMMENT '图书id',
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '审核表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of audit
-- ----------------------------
INSERT INTO `audit` VALUES ('2023-05-15', '这是一些意见', '1003', 27, 5);

-- ----------------------------
-- Table structure for author
-- ----------------------------
DROP TABLE IF EXISTS `author`;
CREATE TABLE `author`  (
  `del` int NOT NULL DEFAULT 0,
  `id` int NOT NULL AUTO_INCREMENT COMMENT '作者编号',
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '笔名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '邮件',
  `tel` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号码',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `aid_UNIQUE`(`id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '作者表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of author
-- ----------------------------
INSERT INTO `author` VALUES (0, 1002, 'author2', '$2a$10$5MO6F.0.inMeC2N1TPI9cuoM9zvpTSnO8i4kvnbSIc8YcuhEOSZfG', '2044309137@qq.com', '18888888888');
INSERT INTO `author` VALUES (0, 1003, 'author1', '$2a$10$gI0uqpYLCN34pUK7VsFUVeQPhw85m0gr/Ihh5Pikso9okEfigGE3e', '20449137@qq.com', '18888888855');
INSERT INTO `author` VALUES (1, 1004, 'yuan', '$2a$10$QIOWMGUmxBaP7QfnaSesv.Z6SmClHcFGM2827PAhNBRJu60EKDzfe', '2044309138@qq.com', '15111111111');
INSERT INTO `author` VALUES (0, 1005, 'yuai', '$2a$10$CKVi8smEtQCUmq//4JKRaOddf/Snlj694fBIbxAaIebmbdenubwnq', '2044309138@qq.com', '15111111122');
INSERT INTO `author` VALUES (0, 1006, 'yua3', '$2a$10$iicD2ESqclrj/32dZomAUOKpJno/G.a0Yidyih2zP4j1knlZ.PF1G', '2044309138@qq.com', '15111111113');
INSERT INTO `author` VALUES (1, 1007, 'ycz111', '$2a$10$Gh2JOt9lRNptJwnlzW3nAOMgZURJtzeQ3yDF4l1O3aZkq6xtdxZJ6', '2044309138@qq.com', '15111111111');

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `sign` int NOT NULL DEFAULT 0 COMMENT '审核标志',
  `num` int NOT NULL DEFAULT 0 COMMENT '约稿编号',
  `state` int NOT NULL DEFAULT 0 COMMENT '当前阅稿状态  互斥访问',
  `long` int NOT NULL DEFAULT 1 COMMENT '书籍篇 幅',
  `id` int NOT NULL AUTO_INCREMENT COMMENT '图书id号',
  `classid` int NOT NULL COMMENT '分类id',
  `stateid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '状态id 0未审核 1沟通中 2校对中 3出版',
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '书名',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件存放路径',
  `introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '对图书的简介',
  `writerid` int NOT NULL COMMENT '作家id',
  `del` int NOT NULL DEFAULT 0 COMMENT '虚拟删除',
  `inite` int NOT NULL DEFAULT 0 COMMENT '是否是约稿',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uid_UNIQUE`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '图书表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES (0, 0, 0, 0, 25, 1, 3, '百年孤独', './upload/百年孤独.docx', '这是一篇百年孤独小说', 1003, 0, 0);
INSERT INTO `book` VALUES (0, 0, 1, 0, 26, 1, 2, '小说1', './upload/小说1.docx', '这是小说1', 1003, 0, 0);
INSERT INTO `book` VALUES (0, 0, 0, 1, 27, 5, 1, '工具书', './upload/工具书.docx', '这是工具书', 1003, 0, 0);
INSERT INTO `book` VALUES (0, 15, 1, 2, 28, 1, 0, '短篇小说', '/upload/短篇小说.docx', '这是一篇短篇小说，关于中世纪', 1003, 0, 1);

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '分类编号',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '分类名称',
  `del` int NOT NULL DEFAULT 0 COMMENT '删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `cid_UNIQUE`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '图书分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (1, '小说', 0);
INSERT INTO `class` VALUES (2, '儿童读物', 0);
INSERT INTO `class` VALUES (3, '非小说类', 0);
INSERT INTO `class` VALUES (4, '专业书', 0);
INSERT INTO `class` VALUES (5, '工具书', 0);
INSERT INTO `class` VALUES (6, '剧本', 0);
INSERT INTO `class` VALUES (7, '摄影绘画集', 0);
INSERT INTO `class` VALUES (12, '测试', 1);
INSERT INTO `class` VALUES (13, '测试', 1);
INSERT INTO `class` VALUES (14, '测试', 1);
INSERT INTO `class` VALUES (15, '测试', 1);

-- ----------------------------
-- Table structure for department 
-- ----------------------------
DROP TABLE IF EXISTS `department `;
CREATE TABLE `department `  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '部门编号',
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '部门名称',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `did_UNIQUE`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '部门表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of department 
-- ----------------------------
INSERT INTO `department ` VALUES (1, '编辑部');

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee`  (
  `tel` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号',
  `id` int NOT NULL AUTO_INCREMENT COMMENT '员工编号，自增，非空',
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '员工名字',
  `departmentid` int NOT NULL COMMENT '部门编号',
  `positionid` int NOT NULL COMMENT '职位编号',
  `admin` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '是否管理员',
  `lang` int NOT NULL DEFAULT 1 COMMENT '书籍篇幅',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `del` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `eid_UNIQUE`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '员工表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES ('15132826480', 1, 'admin', 1, 1, '1', 1, '$2a$10$D4/56jw4EJjrlcMP0e9SSOaPisT9LH9/4y5sm4k2C8EtHky51CXBi', 0);
INSERT INTO `employee` VALUES ('19999999999', 2, 'staff', 1, 1, '0', 1, '$2a$10$prHGycFWpAMQ/pAhouvCI.DRdm1ge5LcC4DSPvAe6JxgHgLTmiiZu', 0);

-- ----------------------------
-- Table structure for invite
-- ----------------------------
DROP TABLE IF EXISTS `invite`;
CREATE TABLE `invite`  (
  `date` date NOT NULL COMMENT '截稿时间',
  `del` int NOT NULL DEFAULT 0 COMMENT '虚拟删除',
  `id` int NOT NULL AUTO_INCREMENT COMMENT '约稿编号',
  `clessid` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '分类编号',
  `long` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '篇幅',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '题材，对分类的进一步说明',
  `num` int NOT NULL DEFAULT 1 COMMENT '需要的篇数',
  `numman` int NOT NULL DEFAULT 0 COMMENT '相应约稿的人数',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `iid_UNIQUE`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '约稿表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of invite
-- ----------------------------
INSERT INTO `invite` VALUES ('2023-05-31', 0, 15, '1', '2', '需要一个短篇的小说，需要兼顾童话属性', 4, 1);
INSERT INTO `invite` VALUES ('2023-05-29', 0, 16, '1', '1', '需要一个中篇小说，需要有一些讽刺性，结合事实', 2, 1);
INSERT INTO `invite` VALUES ('2023-12-22', 0, 22, '1', '2', '描述', 5, 0);
INSERT INTO `invite` VALUES ('2023-12-27', 0, 23, '2', '2', '描述', 5, 0);

-- ----------------------------
-- Table structure for position
-- ----------------------------
DROP TABLE IF EXISTS `position`;
CREATE TABLE `position`  (
  `did` int NOT NULL COMMENT '部门编号',
  `pid` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '职位编号',
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '职位名称',
  `del` int NOT NULL DEFAULT 0 COMMENT '删除',
  PRIMARY KEY (`pid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '职位表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of position
-- ----------------------------
INSERT INTO `position` VALUES (1, '1', '审核员', 0);
INSERT INTO `position` VALUES (1, '2', '短篇', 0);

-- ----------------------------
-- Table structure for proofread
-- ----------------------------
DROP TABLE IF EXISTS `proofread`;
CREATE TABLE `proofread`  (
  `responsibleid` int NOT NULL COMMENT '负责人id',
  `num` int NOT NULL COMMENT '校对次数',
  `bookid` int NOT NULL COMMENT '图书id',
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '待校对表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of proofread
-- ----------------------------
INSERT INTO `proofread` VALUES (1, 1, 25, 18);
INSERT INTO `proofread` VALUES (1, 2, 25, 19);
INSERT INTO `proofread` VALUES (1, 3, 25, 20);
INSERT INTO `proofread` VALUES (1, 1, 26, 21);

-- ----------------------------
-- Table structure for reviewed
-- ----------------------------
DROP TABLE IF EXISTS `reviewed`;
CREATE TABLE `reviewed`  (
  `inite` int NOT NULL DEFAULT 0 COMMENT '是否是约稿',
  `id` int NOT NULL AUTO_INCREMENT COMMENT '待审核书稿id',
  `path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件路径',
  `state` int NOT NULL DEFAULT 0 COMMENT '阅稿状态，是否有人阅稿默认0，没人阅稿',
  `del` int NOT NULL COMMENT '是否删除',
  `pass` int NOT NULL DEFAULT 0 COMMENT '通过状态，是否通过阅稿，默认0，未通过，虚拟删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uid_UNIQUE`(`id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '待审核表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reviewed
-- ----------------------------

-- ----------------------------
-- Table structure for wait
-- ----------------------------
DROP TABLE IF EXISTS `wait`;
CREATE TABLE `wait`  (
  `invitid` int NOT NULL COMMENT '约稿id',
  `bookid` int NULL DEFAULT NULL COMMENT '图书id',
  `pass` int NOT NULL DEFAULT 0 COMMENT '是否投稿',
  `writerid` int NOT NULL COMMENT '作家id',
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '带约稿表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of wait
-- ----------------------------
INSERT INTO `wait` VALUES (15, 28, 1, 1003, 1);
INSERT INTO `wait` VALUES (16, NULL, 0, 1003, 2);

SET FOREIGN_KEY_CHECKS = 1;
