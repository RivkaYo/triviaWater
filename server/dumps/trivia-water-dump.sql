-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: trivia_water
-- ------------------------------------------------------
-- Server version	8.0.36-2ubuntu3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `access_logger`
--

DROP TABLE IF EXISTS `access_logger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `access_logger` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_95d05aee1a092d1c578e53dc9a5` (`user_id`),
  CONSTRAINT `FK_95d05aee1a092d1c578e53dc9a5` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_logger`
--

LOCK TABLES `access_logger` WRITE;
/*!40000 ALTER TABLE `access_logger` DISABLE KEYS */;
/*!40000 ALTER TABLE `access_logger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `answer_index` int NOT NULL,
  `answer_text` varchar(255) NOT NULL,
  `is_correct` tinyint NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `question_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c3d19a89541e4f0813f2fe09194` (`question_id`),
  CONSTRAINT `FK_c3d19a89541e4f0813f2fe09194` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (1,1,'George Washington',1,NULL,1),(2,2,'Thomas Jefferson',0,NULL,1),(3,1,'Paris',1,NULL,2),(4,2,'Rome',0,NULL,2),(5,1,'1945',1,NULL,3),(6,2,'1939',0,NULL,3),(7,1,'George Washington',1,NULL,4),(8,2,'Thomas Jefferson',0,NULL,4),(9,1,'Paris',1,NULL,5),(10,2,'Rome',0,NULL,5),(11,1,'1945',1,NULL,6),(12,2,'1939',0,NULL,6),(13,1,'France',1,NULL,7),(14,2,'Croatia',0,NULL,7),(15,1,'Greece',1,NULL,8),(16,2,'Italy',0,NULL,8),(17,1,'Erling Haaland',1,NULL,9),(18,2,'Mohamed Salah',0,NULL,9),(19,1,'France',1,NULL,10),(20,2,'Croatia',0,NULL,10),(21,1,'Greece',1,NULL,11),(22,2,'Italy',0,NULL,11),(23,1,'Erling Haaland',1,NULL,12),(24,2,'Mohamed Salah',0,NULL,12),(25,1,'Michael Jackson',1,NULL,13),(26,2,'Elvis Presley',0,NULL,13),(27,1,'The Beatles',1,NULL,14),(28,2,'The Rolling Stones',0,NULL,14),(29,1,'1982',1,NULL,15),(30,2,'1980',0,NULL,15),(31,1,'Michael Jackson',1,NULL,16),(32,2,'Elvis Presley',0,NULL,16),(33,1,'The Beatles',1,NULL,17),(34,2,'The Rolling Stones',0,NULL,17),(35,1,'1982',1,NULL,18),(36,2,'1980',0,NULL,18);
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_spam`
--

DROP TABLE IF EXISTS `email_spam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_spam` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(70) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_52eb087e1598863b2f09fc1534` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_spam`
--

LOCK TABLES `email_spam` WRITE;
/*!40000 ALTER TABLE `email_spam` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_spam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quiz_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `question_index` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_aecfc55f7d8e7bb703193e03118` (`quiz_id`),
  CONSTRAINT `FK_aecfc55f7d8e7bb703193e03118` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,1,'Who was the first president of the United States?',NULL,1),(2,1,'What is the capital of France?',NULL,2),(3,1,'In which year did World War II end?',NULL,3),(4,4,'Who was the first president of the United States?',NULL,1),(5,4,'What is the capital of France?',NULL,2),(6,4,'In which year did World War II end?',NULL,3),(7,2,'Who won the FIFA World Cup in 2018?',NULL,1),(8,2,'Which country is known as the birthplace of the Olympic Games?',NULL,2),(9,2,'Who holds the record for the most goals in a single Premier League season?',NULL,3),(10,5,'Who won the FIFA World Cup in 2018?',NULL,1),(11,5,'Which country is known as the birthplace of the Olympic Games?',NULL,2),(12,5,'Who holds the record for the most goals in a single Premier League season?',NULL,3),(13,3,'Who is known as the King of Pop?',NULL,1),(14,3,'Which band recorded the album \"Abbey Road\"?',NULL,2),(15,3,'What year did Michael Jackson release \"Thriller\"?',NULL,3),(16,6,'Who is known as the King of Pop?',NULL,1),(17,6,'Which band recorded the album \"Abbey Road\"?',NULL,2),(18,6,'What year did Michael Jackson release \"Thriller\"?',NULL,3);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `creator_id` varchar(255) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `image_path` varchar(50) DEFAULT NULL,
  `is_public` tinyint NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_5716583af6b99b4aedef89a4bb6` (`creator_id`),
  CONSTRAINT `FK_5716583af6b99b4aedef89a4bb6` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (1,'4e239682-ee53-47b5-8538-a630745ad200','History and Geography Quiz','Test your knowledge on historical events and geographical facts.',NULL,1,'2024-12-25 16:16:18.937009'),(2,'4e239682-ee53-47b5-8538-a630745ad200','Sports Quiz','Test your knowledge on various sports and famous athletes.',NULL,1,'2024-12-25 16:16:18.985253'),(3,'4e239682-ee53-47b5-8538-a630745ad200','Music Quiz','Test your knowledge on famous songs, artists, and music history.',NULL,1,'2024-12-25 16:16:19.018957'),(4,'6e239682-aq53-47b5-7538-a638745ad200','History and Geography Quiz','Test your knowledge on historical events and geographical facts.',NULL,1,'2024-12-25 16:16:19.061469'),(5,'6e239682-aq53-47b5-7538-a638745ad200','Sports Quiz','Test your knowledge on various sports and famous athletes.',NULL,1,'2024-12-25 16:16:19.085092'),(6,'6e239682-aq53-47b5-7538-a638745ad200','Music Quiz','Test your knowledge on famous songs, artists, and music history.',NULL,1,'2024-12-25 16:16:19.108228');
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `id` varchar(36) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expiration` timestamp NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c31d0a2f38e6e99110df62ab0a` (`token`),
  KEY `FK_8e913e288156c133999341156ad` (`userId`),
  CONSTRAINT `FK_8e913e288156c133999341156ad` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `roleKey` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'CREATOR','Regular creator role','suiHLul8dKe9ojsD');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score` (
  `id` int NOT NULL AUTO_INCREMENT,
  `score` int NOT NULL,
  `player_name` varchar(255) NOT NULL,
  `played_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `quiz_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3f8f22210586c69c9af89b4f8e6` (`quiz_id`),
  CONSTRAINT `FK_3f8f22210586c69c9af89b4f8e6` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score`
--

LOCK TABLES `score` WRITE;
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
INSERT INTO `score` VALUES (1,100,'צופיה','2024-12-25 14:30:00.000000',1),(2,100,'רותם','2024-12-24 15:00:00.000000',1),(3,100,'רבקה','2024-12-23 16:45:00.000000',1),(4,100,'נעמה','2024-12-22 17:15:00.000000',1),(5,100,'חנה','2024-12-21 14:30:00.000000',1),(6,100,'יאיר','2024-12-20 15:00:00.000000',1),(7,85,'דוד','2024-12-25 14:30:00.000000',2),(8,90,'יעל','2024-11-25 15:00:00.000000',2),(9,85,'דוד','2024-12-25 14:30:00.000000',3),(10,95,'יעל','2024-12-25 15:00:00.000000',3),(11,100,'רבקה','2024-12-25 16:45:00.000000',3),(12,85,'דוד','2024-12-25 14:30:00.000000',4),(13,90,'יעל','2024-12-25 15:00:00.000000',4),(14,95,'נעמה','2024-12-25 17:15:00.000000',4),(15,85,'דוד','2024-12-25 14:30:00.000000',5),(16,90,'יעל','2024-12-25 15:00:00.000000',5),(17,85,'דוד','2024-12-25 14:30:00.000000',6),(18,90,'יעל','2024-12-25 15:00:00.000000',6),(19,78,'חנה','2024-12-25 16:45:00.000000',6);
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_spam`
--

DROP TABLE IF EXISTS `sms_spam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sms_spam` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d82e5145eda9a2ca635afeff8c` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_spam`
--

LOCK TABLES `sms_spam` WRITE;
/*!40000 ALTER TABLE `sms_spam` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_spam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `two_factor`
--

DROP TABLE IF EXISTS `two_factor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `two_factor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(100) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `send_attempts` tinyint unsigned NOT NULL DEFAULT '0',
  `validation_attempts` tinyint unsigned NOT NULL DEFAULT '0',
  `code_created_date` timestamp(6) NULL DEFAULT NULL,
  `user_blocked_date` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_uniq` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `two_factor`
--

LOCK TABLES `two_factor` WRITE;
/*!40000 ALTER TABLE `two_factor` DISABLE KEYS */;
/*!40000 ALTER TABLE `two_factor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  KEY `IDX_31ef2b4d30675d0c15056b7f6e` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2e239682-ce53-47b5-9538-a630743ad250','User','2024-12-25 16:14:34.674099','2024-12-25 16:14:34.674099','רבקה','Ad123456'),('4e239682-ee53-47b5-8538-a630745ad200','User','2024-12-25 16:14:34.585668','2024-12-25 16:14:34.585668','צופיה','Aa123456'),('5e239552-oe53-45b5-9538-a630293ad250','User','2024-12-25 16:14:34.807460','2024-12-25 16:14:34.807460','יאיר','Af123456'),('6e239682-aq53-47b5-7538-a638745ad200','User','2024-12-25 16:14:34.618345','2024-12-25 16:14:34.618345','רותם','Ab123456'),('8e229682-ie53-47b5-2538-a630749ad200','User','2024-12-25 16:14:34.648170','2024-12-25 16:14:34.648170','נעמה','Ac123456'),('8e669682-it53-27b5-2538-a630759ad200','User','2024-12-25 16:14:34.722195','2024-12-25 16:14:34.722195','חנה','Ae123456');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_password`
--

DROP TABLE IF EXISTS `user_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_password` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `userId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3e755bee2cdcee50a9e742776d8` (`userId`),
  CONSTRAINT `FK_3e755bee2cdcee50a9e742776d8` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_password`
--

LOCK TABLES `user_password` WRITE;
/*!40000 ALTER TABLE `user_password` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` varchar(36) NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `IDX_d0e5815877f7395a198a4cb0a4` (`user_id`),
  KEY `IDX_32a6fc2fcb019d8e3a8ace0f55` (`role_id`),
  CONSTRAINT `FK_32a6fc2fcb019d8e3a8ace0f55f` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d0e5815877f7395a198a4cb0a46` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-25 16:27:00
