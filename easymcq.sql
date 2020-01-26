-- MySQL dump 10.13  Distrib 8.0.18, for osx10.14 (x86_64)
--
-- Host: localhost    Database: easymcq
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `Answer`
--

DROP TABLE IF EXISTS `Answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Answer` (
  `ans_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `answer` varchar(1500) COLLATE utf8mb4_general_ci NOT NULL,
  `correct` tinyint(1) NOT NULL,
  PRIMARY KEY (`ans_id`)
) ENGINE=InnoDB AUTO_INCREMENT=529 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Answer`
--

LOCK TABLES `Answer` WRITE;
/*!40000 ALTER TABLE `Answer` DISABLE KEYS */;
INSERT INTO `Answer` VALUES (499,'answer 1',1),(500,'answer 2',0),(501,'answer 3',0),(502,'answer 1',0),(503,'answer 2',1),(504,'answer 3',0),(505,'answer 1',0),(506,'answer 2',1),(507,'answer 3',0),(508,'answer 4',0),(509,'Ramu',0),(510,'Deepak',1),(511,'Somu',0),(512,'Seetha',0),(513,'Ramu',0),(514,'Deepak',1),(515,'Seetha',0),(516,'Somu',0),(517,'Ramu',0),(518,'Deepak',1),(519,'Somu',0),(520,'Seetha',0),(521,'Ramu',0),(522,'Deepak',1),(523,'Seetha',0),(524,'Somu',0),(525,'Ramu',0),(526,'Deepak',1),(527,'Seetha',0),(528,'Somu',0);
/*!40000 ALTER TABLE `Answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AnswerImage`
--

DROP TABLE IF EXISTS `AnswerImage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AnswerImage` (
  `ans_id` bigint(20) NOT NULL,
  `imagename` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ans_id`),
  CONSTRAINT `answerimage_ibfk_1` FOREIGN KEY (`ans_id`) REFERENCES `answer` (`ans_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AnswerImage`
--

LOCK TABLES `AnswerImage` WRITE;
/*!40000 ALTER TABLE `AnswerImage` DISABLE KEYS */;
INSERT INTO `AnswerImage` VALUES (499,'a499.png'),(500,'a500.png'),(501,'a501.png'),(502,'a502.png'),(503,'a503.png'),(504,'a504.jpg'),(505,'a505.png'),(506,'a506.jpg'),(507,'a507.png'),(508,'a508.png');
/*!40000 ALTER TABLE `AnswerImage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Question`
--

DROP TABLE IF EXISTS `Question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Question` (
  `quest_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `question` varchar(1500) COLLATE utf8mb4_general_ci NOT NULL,
  `type` tinyint(4) NOT NULL,
  PRIMARY KEY (`quest_id`),
  KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Question`
--

LOCK TABLES `Question` WRITE;
/*!40000 ALTER TABLE `Question` DISABLE KEYS */;
INSERT INTO `Question` VALUES (160,'this is question 1',0),(161,'this is question 2',0),(162,'this is question 3',0),(164,'What\'s my name man',3),(165,'What\'s my name man',3),(166,'What\'s my name man',3),(167,'What\'s my name man',3),(168,'What\'s my name man',3);
/*!40000 ALTER TABLE `Question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuestionImage`
--

DROP TABLE IF EXISTS `QuestionImage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QuestionImage` (
  `quest_id` bigint(20) NOT NULL,
  `imagename` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`quest_id`),
  CONSTRAINT `questionimage_ibfk_1` FOREIGN KEY (`quest_id`) REFERENCES `question` (`quest_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuestionImage`
--

LOCK TABLES `QuestionImage` WRITE;
/*!40000 ALTER TABLE `QuestionImage` DISABLE KEYS */;
INSERT INTO `QuestionImage` VALUES (160,'q160.jpg'),(161,'q161.jpg'),(162,'q162.jpg');
/*!40000 ALTER TABLE `QuestionImage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuestionLibrary`
--

DROP TABLE IF EXISTS `QuestionLibrary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QuestionLibrary` (
  `quest_id` bigint(20) NOT NULL,
  `ans_id` bigint(20) NOT NULL,
  PRIMARY KEY (`quest_id`,`ans_id`),
  KEY `ans_id` (`ans_id`),
  CONSTRAINT `questionlibrary_ibfk_1` FOREIGN KEY (`quest_id`) REFERENCES `question` (`quest_id`) ON UPDATE CASCADE,
  CONSTRAINT `questionlibrary_ibfk_2` FOREIGN KEY (`ans_id`) REFERENCES `answer` (`ans_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuestionLibrary`
--

LOCK TABLES `QuestionLibrary` WRITE;
/*!40000 ALTER TABLE `QuestionLibrary` DISABLE KEYS */;
INSERT INTO `QuestionLibrary` VALUES (160,499),(160,500),(160,501),(161,502),(161,503),(161,504),(162,505),(162,506),(162,507),(162,508),(168,525),(168,526),(168,527),(168,528);
/*!40000 ALTER TABLE `QuestionLibrary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Test`
--

DROP TABLE IF EXISTS `Test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Test` (
  `test_id` int(11) NOT NULL AUTO_INCREMENT,
  `test_name` varchar(512) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `proctor` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `duration` smallint(6) DEFAULT NULL,
  `sched_start` bigint(20) DEFAULT NULL,
  `sched_end` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`test_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Test`
--

LOCK TABLES `Test` WRITE;
/*!40000 ALTER TABLE `Test` DISABLE KEYS */;
INSERT INTO `Test` VALUES (11,'REVA Practo Test','practoreva',60,1579988520,1580050800);
/*!40000 ALTER TABLE `Test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TestInvite`
--

DROP TABLE IF EXISTS `TestInvite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TestInvite` (
  `user_id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`test_id`),
  KEY `test_id` (`test_id`),
  CONSTRAINT `testinvite_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `testinvite_ibfk_2` FOREIGN KEY (`test_id`) REFERENCES `test` (`test_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TestInvite`
--

LOCK TABLES `TestInvite` WRITE;
/*!40000 ALTER TABLE `TestInvite` DISABLE KEYS */;
/*!40000 ALTER TABLE `TestInvite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` char(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `college_name` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `degree` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(256) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (4,'Deepak R','deepak.r@practo.com','9740720910','1998-08-31','REVA University','B.Tech','e756a91150ea80a4ccb4fc8299a45469d517830f06dd66514115391d75d48e21'),(5,'pruthviraj','pruthvi@gmail.com','97987987','1311-03-13','BMSIT','idk','3cc849279ba298b587a34cabaeffc5ecb3a044bbf97c516fab7ede9d1af77cfa'),(6,'Deepak Ramachandran','deepakcoder98@gmail.com','9740720910','1998-03-10','IIT Bangalore','B.Arch','e756a91150ea80a4ccb4fc8299a45469d517830f06dd66514115391d75d48e21'),(7,'Deepak Ramachandran','deepakcoder98@gmail.com','9740720910','1998-03-10','IIT Bangalore','B.Arch','e756a91150ea80a4ccb4fc8299a45469d517830f06dd66514115391d75d48e21');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserQuestions`
--

DROP TABLE IF EXISTS `UserQuestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserQuestions` (
  `test_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quest_id` bigint(20) NOT NULL,
  PRIMARY KEY (`test_id`,`user_id`,`quest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserQuestions`
--

LOCK TABLES `UserQuestions` WRITE;
/*!40000 ALTER TABLE `UserQuestions` DISABLE KEYS */;
INSERT INTO `UserQuestions` VALUES (4,4,160),(4,4,161),(4,4,162);
/*!40000 ALTER TABLE `UserQuestions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-26 10:22:43
