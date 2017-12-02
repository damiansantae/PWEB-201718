-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 29, 2017 at 08:38 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `germanbeade`
--

-- --------------------------------------------------------

--
-- Table structure for table `days_exercises`
--

CREATE TABLE IF NOT EXISTS `days_exercises` (
`id` int(11) NOT NULL,
  `id_exercise` int(11) NOT NULL,
  `id_day` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `exercises`
--

CREATE TABLE IF NOT EXISTS `exercises` (
`id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `video_url` varchar(200) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `muscles`
--

CREATE TABLE IF NOT EXISTS `muscles` (
`id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `muscles_exercises`
--

CREATE TABLE IF NOT EXISTS `muscles_exercises` (
`id` int(11) NOT NULL,
  `id_muscles` int(11) NOT NULL,
  `id_exercises` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `routines`
--

CREATE TABLE IF NOT EXISTS `routines` (
`id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `routines_days`
--

CREATE TABLE IF NOT EXISTS `routines_days` (
`id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `id_routine` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) NOT NULL,
  `firstname` varchar(30) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `email_address` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` enum('hombre','mujer') DEFAULT NULL,
  `birth_year` int(11) DEFAULT NULL,
  `weight` decimal(10,0) DEFAULT NULL,
  `weight_unit` enum('lb','kg') NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email_address`, `username`, `password`, `gender`, `birth_year`, `weight`, `weight_unit`) VALUES
(11, 'Jomin', 'George', 'jomink@yahoo.co.uk', 'root', '123456789aS', 'hombre', 1994, '100', 'kg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `days_exercises`
--
ALTER TABLE `days_exercises`
 ADD PRIMARY KEY (`id`), ADD KEY `id_exercise` (`id_exercise`), ADD KEY `id_day` (`id_day`);

--
-- Indexes for table `exercises`
--
ALTER TABLE `exercises`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `muscles`
--
ALTER TABLE `muscles`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `muscles_exercises`
--
ALTER TABLE `muscles_exercises`
 ADD PRIMARY KEY (`id`), ADD KEY `id_muscles` (`id_muscles`), ADD KEY `id_exercises` (`id_exercises`);

--
-- Indexes for table `routines`
--
ALTER TABLE `routines`
 ADD PRIMARY KEY (`id`), ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `routines_days`
--
ALTER TABLE `routines_days`
 ADD PRIMARY KEY (`id`), ADD KEY `id_routine` (`id_routine`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `days_exercises`
--
ALTER TABLE `days_exercises`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `exercises`
--
ALTER TABLE `exercises`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `muscles`
--
ALTER TABLE `muscles`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `muscles_exercises`
--
ALTER TABLE `muscles_exercises`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `routines`
--
ALTER TABLE `routines`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `routines_days`
--
ALTER TABLE `routines_days`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `days_exercises`
--
ALTER TABLE `days_exercises`
ADD CONSTRAINT `days_exercises_ibfk_1` FOREIGN KEY (`id_exercise`) REFERENCES `exercises` (`id`),
ADD CONSTRAINT `days_exercises_ibfk_2` FOREIGN KEY (`id_day`) REFERENCES `routines_days` (`id`);

--
-- Constraints for table `muscles_exercises`
--
ALTER TABLE `muscles_exercises`
ADD CONSTRAINT `muscles_exercises_ibfk_1` FOREIGN KEY (`id_muscles`) REFERENCES `muscles` (`id`),
ADD CONSTRAINT `muscles_exercises_ibfk_2` FOREIGN KEY (`id_exercises`) REFERENCES `exercises` (`id`);

--
-- Constraints for table `routines`
--
ALTER TABLE `routines`
ADD CONSTRAINT `routines_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Constraints for table `routines_days`
--
ALTER TABLE `routines_days`
ADD CONSTRAINT `routines_days_ibfk_1` FOREIGN KEY (`id_routine`) REFERENCES `routines` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
