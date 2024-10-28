-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 27, 2024 at 05:09 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_sms`
--

-- --------------------------------------------------------

--
-- Table structure for table `academicyear`
--

CREATE TABLE `academicyear` (
  `AcademicYearId` int(11) NOT NULL,
  `Year` char(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `academicyear`
--

INSERT INTO `academicyear` (`AcademicYearId`, `Year`) VALUES
(1, '2024-2025');

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `AddressId` int(11) NOT NULL,
  `Barangay` varchar(100) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `Province` varchar(100) DEFAULT NULL,
  `Zipcode` varchar(10) DEFAULT NULL,
  `Street` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `addressperson`
--

CREATE TABLE `addressperson` (
  `PersonId` int(11) DEFAULT NULL,
  `AddressId` int(11) DEFAULT NULL,
  `Type` varchar(20) DEFAULT NULL,
  `HouseNum` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `AnnouncementId` int(11) NOT NULL,
  `Title` varchar(300) DEFAULT NULL,
  `Text` text DEFAULT NULL,
  `DatePosted` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `applicationid` char(12) NOT NULL,
  `StudentId` int(11) DEFAULT NULL,
  `EmployeeId` int(11) DEFAULT NULL,
  `ScholarshipId` int(11) DEFAULT NULL,
  `TermId` int(11) DEFAULT NULL,
  `DateFiled` datetime DEFAULT NULL,
  `DateTerminated` datetime DEFAULT NULL,
  `Current` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `application`
--

INSERT INTO `application` (`applicationid`, `StudentId`, `EmployeeId`, `ScholarshipId`, `TermId`, `DateFiled`, `DateTerminated`, `Current`) VALUES
('20239000', 2023000029, NULL, 2, 4, '2024-10-27 14:37:32', NULL, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chatroom`
--

CREATE TABLE `chatroom` (
  `ChatRoomId` int(11) NOT NULL,
  `Name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chatuser`
--

CREATE TABLE `chatuser` (
  `ChatRoomId` int(11) DEFAULT NULL,
  `DateOpened` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contactnum`
--

CREATE TABLE `contactnum` (
  `ContactNumId` int(11) NOT NULL,
  `PersonId` int(11) DEFAULT NULL,
  `Type` char(15) DEFAULT NULL,
  `Numbers` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employeeid` int(11) NOT NULL,
  `PersonId` int(11) DEFAULT NULL,
  `JobTitleId` int(11) DEFAULT NULL,
  `id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `FileId` int(11) NOT NULL,
  `Name` varchar(150) DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `filereq`
--

CREATE TABLE `filereq` (
  `ScholarshipId` int(11) DEFAULT NULL,
  `FileId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobtitle`
--

CREATE TABLE `jobtitle` (
  `JobTitleId` int(11) NOT NULL,
  `Title` varchar(100) DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobtitle`
--

INSERT INTO `jobtitle` (`JobTitleId`, `Title`, `Description`) VALUES
(1, 'Office Head', 'oversees daily operations, manages staff, and ensures the effective execution of organizational goals within the office.'),
(2, 'Staff', ' support the office\'s daily operations by performing various administrative, technical, and customer service tasks to ensure smooth workflow and contribute to the achievement of organizational goals.');

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `MessageId` int(11) NOT NULL,
  `ChatRoomId` int(11) DEFAULT NULL,
  `MessageText` text DEFAULT NULL,
  `Sender` varchar(300) DEFAULT NULL,
  `DateSent` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_10_14_144008_create_personal_access_tokens_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `parent`
--

CREATE TABLE `parent` (
  `ParentId` int(11) NOT NULL,
  `PersonId` int(11) DEFAULT NULL,
  `Occupation` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `parentrelation`
--

CREATE TABLE `parentrelation` (
  `ParentId` int(11) DEFAULT NULL,
  `StudentId` int(11) DEFAULT NULL,
  `Relation` char(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `PersonId` int(11) NOT NULL,
  `FirstName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `MiddleName` varchar(100) DEFAULT NULL,
  `Suffix` char(5) DEFAULT NULL,
  `DoB` datetime DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`PersonId`, `FirstName`, `LastName`, `MiddleName`, `Suffix`, `DoB`, `Email`) VALUES
(1, 'Martin Bernard', 'Bondoc', 'Francisco', NULL, '2002-10-03 00:00:00', 'martinprivate@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prevschool`
--

CREATE TABLE `prevschool` (
  `PrevSchoolId` int(11) NOT NULL,
  `AddressId` int(11) DEFAULT NULL,
  `Name` varchar(150) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Landline` char(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prevschool`
--

INSERT INTO `prevschool` (`PrevSchoolId`, `AddressId`, `Name`, `Email`, `Landline`) VALUES
(1, 1, 'Mapua University', 'info@mapua.edu.ph', '02-123-4567'),
(2, 2, 'Ateneo de Manila University', 'admission@ateneo.edu.ph', '02-234-5678'),
(3, 3, 'University of the Philippines', 'contact@up.edu.ph', '02-345-6789'),
(4, 4, 'De La Salle University', 'inquiries@dlsu.edu.ph', '02-456-7890'),
(5, 5, 'University of Santo Tomas', 'info@ust.edu.ph', '02-567-8901');

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `ProgramId` int(11) NOT NULL,
  `Name` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`ProgramId`, `Name`) VALUES
(1, 'BS Computer Science');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `RoleId` int(11) NOT NULL,
  `Title` varchar(50) DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`RoleId`, `Title`, `Description`) VALUES
(1, 'Admin', 'Responsible for overseeing the entire scholarship program, including managing applications, reviewing submissions, communicating with students, and maintaining the integrity of the scholarship database.'),
(2, 'Student', 'Allows students to apply for scholarships, track their application status, submit required documents, and communicate with the administration regarding their scholarship inquiries.');

-- --------------------------------------------------------

--
-- Table structure for table `scholarship`
--

CREATE TABLE `scholarship` (
  `ScholarshipId` int(11) NOT NULL,
  `Name` varchar(150) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `MaxSlots` tinyint(3) DEFAULT NULL,
  `AvailableSlots` tinyint(3) DEFAULT NULL,
  `Status` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `scholarship`
--

INSERT INTO `scholarship` (`ScholarshipId`, `Name`, `Description`, `MaxSlots`, `AvailableSlots`, `Status`) VALUES
(1, 'E.T. YUCHENGCO INSTITUTIONAL SCHOLARSHIP', 'free stuff', 20, 20, b'1'),
(2, 'ACADEMIC EXCELLENCE AWARD SCHOLARSHIP', 'free stuff', 20, 20, b'1'),
(3, 'ACADEMIC HONOREE SCHOLARSHIP', 'free stuff', 20, 20, b'1'),
(4, 'YGC & AYALA PROMOTIONAL DISCOUNT', 'free stuff', 20, 29, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `scholarshipstatus`
--

CREATE TABLE `scholarshipstatus` (
  `ScholarshipStatusId` int(11) NOT NULL,
  `Title` char(15) DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `scholarshipstatus`
--

INSERT INTO `scholarshipstatus` (`ScholarshipStatusId`, `Title`, `Description`) VALUES
(1, 'Active', 'The Active scholarship status means the student is currently receiving ongoing financial support from the scholarship program.'),
(2, 'Inactive', 'The Inactive scholarship status means the student is no longer receiving financial support from the scholarship program.'),
(3, 'Terminated', 'The Terminated scholarship status means the student\'s scholarship has been permanently revoked due to a violation of program rules or failure to meet required conditions.');

-- --------------------------------------------------------

--
-- Table structure for table `semester`
--

CREATE TABLE `semester` (
  `SemesterId` int(11) NOT NULL,
  `Num` char(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `semester`
--

INSERT INTO `semester` (`SemesterId`, `Num`) VALUES
(1, '1st'),
(2, '2nd'),
(3, '3rd'),
(4, '4th');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sibling`
--

CREATE TABLE `sibling` (
  `SiblingId` int(11) NOT NULL,
  `PersonId` int(11) DEFAULT NULL,
  `PrevSchoolId` int(11) DEFAULT NULL,
  `age` smallint(3) DEFAULT NULL,
  `EduAttain` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `siblingrelation`
--

CREATE TABLE `siblingrelation` (
  `SiblingId` int(11) DEFAULT NULL,
  `StudentId` int(11) DEFAULT NULL,
  `Relation` char(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `studentid` int(11) NOT NULL,
  `PersonId` int(11) DEFAULT NULL,
  `PrevSchoolId` int(11) DEFAULT NULL,
  `id` bigint(20) UNSIGNED DEFAULT NULL,
  `ProgramId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`studentid`, `PersonId`, `PrevSchoolId`, `id`, `ProgramId`) VALUES
(2023000029, 1, 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `term`
--

CREATE TABLE `term` (
  `TermId` int(11) NOT NULL,
  `AcademicYearId` int(11) DEFAULT NULL,
  `SemesterId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `term`
--

INSERT INTO `term` (`TermId`, `AcademicYearId`, `SemesterId`) VALUES
(4, 1, 1),
(5, 1, 2),
(6, 1, 3),
(7, 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `ScholarshipStatusId` int(11) DEFAULT NULL,
  `RoleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `ScholarshipStatusId`, `RoleId`) VALUES
(1, 'Martin', 'mbbondoc@mcm.edu.ph', NULL, 'admin', NULL, '2024-10-27 05:54:58', '2024-10-27 05:54:58', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academicyear`
--
ALTER TABLE `academicyear`
  ADD PRIMARY KEY (`AcademicYearId`);

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`AddressId`);

--
-- Indexes for table `addressperson`
--
ALTER TABLE `addressperson`
  ADD KEY `PersonId` (`PersonId`),
  ADD KEY `AddressId` (`AddressId`);

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`AnnouncementId`);

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`applicationid`),
  ADD KEY `StudentId` (`StudentId`),
  ADD KEY `EmployeeId` (`EmployeeId`),
  ADD KEY `ScholarshipId` (`ScholarshipId`),
  ADD KEY `TermId` (`TermId`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `chatroom`
--
ALTER TABLE `chatroom`
  ADD PRIMARY KEY (`ChatRoomId`);

--
-- Indexes for table `chatuser`
--
ALTER TABLE `chatuser`
  ADD KEY `ChatRoomId` (`ChatRoomId`);

--
-- Indexes for table `contactnum`
--
ALTER TABLE `contactnum`
  ADD PRIMARY KEY (`ContactNumId`),
  ADD KEY `PersonId` (`PersonId`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employeeid`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `PersonId` (`PersonId`),
  ADD KEY `JobTitleId` (`JobTitleId`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`FileId`);

--
-- Indexes for table `filereq`
--
ALTER TABLE `filereq`
  ADD KEY `ScholarshipId` (`ScholarshipId`),
  ADD KEY `FileId` (`FileId`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `jobtitle`
--
ALTER TABLE `jobtitle`
  ADD PRIMARY KEY (`JobTitleId`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`MessageId`),
  ADD KEY `ChatRoomId` (`ChatRoomId`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parent`
--
ALTER TABLE `parent`
  ADD PRIMARY KEY (`ParentId`),
  ADD KEY `PersonId` (`PersonId`);

--
-- Indexes for table `parentrelation`
--
ALTER TABLE `parentrelation`
  ADD KEY `ParentId` (`ParentId`),
  ADD KEY `StudentId` (`StudentId`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`PersonId`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `prevschool`
--
ALTER TABLE `prevschool`
  ADD PRIMARY KEY (`PrevSchoolId`),
  ADD KEY `AddressId` (`AddressId`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`ProgramId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`RoleId`);

--
-- Indexes for table `scholarship`
--
ALTER TABLE `scholarship`
  ADD PRIMARY KEY (`ScholarshipId`);

--
-- Indexes for table `scholarshipstatus`
--
ALTER TABLE `scholarshipstatus`
  ADD PRIMARY KEY (`ScholarshipStatusId`);

--
-- Indexes for table `semester`
--
ALTER TABLE `semester`
  ADD PRIMARY KEY (`SemesterId`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `sibling`
--
ALTER TABLE `sibling`
  ADD PRIMARY KEY (`SiblingId`),
  ADD KEY `PersonId` (`PersonId`),
  ADD KEY `PrevSchoolId` (`PrevSchoolId`);

--
-- Indexes for table `siblingrelation`
--
ALTER TABLE `siblingrelation`
  ADD KEY `SiblingId` (`SiblingId`),
  ADD KEY `StudentId` (`StudentId`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`studentid`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `PersonId` (`PersonId`),
  ADD KEY `PrevSchoolId` (`PrevSchoolId`),
  ADD KEY `FK_StudentProgram` (`ProgramId`);

--
-- Indexes for table `term`
--
ALTER TABLE `term`
  ADD PRIMARY KEY (`TermId`),
  ADD KEY `AcademicYearId` (`AcademicYearId`),
  ADD KEY `SemesterId` (`SemesterId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `FK_UsersScholarshipStat` (`ScholarshipStatusId`),
  ADD KEY `FK_UsersRole` (`RoleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academicyear`
--
ALTER TABLE `academicyear`
  MODIFY `AcademicYearId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `AddressId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `AnnouncementId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chatroom`
--
ALTER TABLE `chatroom`
  MODIFY `ChatRoomId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contactnum`
--
ALTER TABLE `contactnum`
  MODIFY `ContactNumId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `file`
--
ALTER TABLE `file`
  MODIFY `FileId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobtitle`
--
ALTER TABLE `jobtitle`
  MODIFY `JobTitleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `MessageId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `parent`
--
ALTER TABLE `parent`
  MODIFY `ParentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `PersonId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prevschool`
--
ALTER TABLE `prevschool`
  MODIFY `PrevSchoolId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `program`
--
ALTER TABLE `program`
  MODIFY `ProgramId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `RoleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `scholarship`
--
ALTER TABLE `scholarship`
  MODIFY `ScholarshipId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `scholarshipstatus`
--
ALTER TABLE `scholarshipstatus`
  MODIFY `ScholarshipStatusId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `semester`
--
ALTER TABLE `semester`
  MODIFY `SemesterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sibling`
--
ALTER TABLE `sibling`
  MODIFY `SiblingId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `term`
--
ALTER TABLE `term`
  MODIFY `TermId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addressperson`
--
ALTER TABLE `addressperson`
  ADD CONSTRAINT `addressperson_ibfk_1` FOREIGN KEY (`PersonId`) REFERENCES `person` (`PersonId`),
  ADD CONSTRAINT `addressperson_ibfk_2` FOREIGN KEY (`AddressId`) REFERENCES `address` (`AddressId`);

--
-- Constraints for table `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `application_ibfk_1` FOREIGN KEY (`StudentId`) REFERENCES `student` (`studentid`),
  ADD CONSTRAINT `application_ibfk_2` FOREIGN KEY (`EmployeeId`) REFERENCES `employee` (`employeeid`),
  ADD CONSTRAINT `application_ibfk_3` FOREIGN KEY (`ScholarshipId`) REFERENCES `scholarship` (`ScholarshipId`),
  ADD CONSTRAINT `application_ibfk_4` FOREIGN KEY (`TermId`) REFERENCES `term` (`TermId`);

--
-- Constraints for table `chatuser`
--
ALTER TABLE `chatuser`
  ADD CONSTRAINT `chatuser_ibfk_1` FOREIGN KEY (`ChatRoomId`) REFERENCES `chatroom` (`ChatRoomId`);

--
-- Constraints for table `contactnum`
--
ALTER TABLE `contactnum`
  ADD CONSTRAINT `contactnum_ibfk_1` FOREIGN KEY (`PersonId`) REFERENCES `person` (`PersonId`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `FK_EmployeeUsers` FOREIGN KEY (`id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`PersonId`) REFERENCES `person` (`PersonId`),
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`JobTitleId`) REFERENCES `jobtitle` (`JobTitleId`);

--
-- Constraints for table `filereq`
--
ALTER TABLE `filereq`
  ADD CONSTRAINT `filereq_ibfk_1` FOREIGN KEY (`ScholarshipId`) REFERENCES `scholarship` (`ScholarshipId`),
  ADD CONSTRAINT `filereq_ibfk_2` FOREIGN KEY (`FileId`) REFERENCES `file` (`FileId`);

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`ChatRoomId`) REFERENCES `chatroom` (`ChatRoomId`);

--
-- Constraints for table `parent`
--
ALTER TABLE `parent`
  ADD CONSTRAINT `parent_ibfk_1` FOREIGN KEY (`PersonId`) REFERENCES `person` (`PersonId`);

--
-- Constraints for table `parentrelation`
--
ALTER TABLE `parentrelation`
  ADD CONSTRAINT `parentrelation_ibfk_1` FOREIGN KEY (`ParentId`) REFERENCES `parent` (`ParentId`),
  ADD CONSTRAINT `parentrelation_ibfk_2` FOREIGN KEY (`StudentId`) REFERENCES `student` (`studentid`);

--
-- Constraints for table `sibling`
--
ALTER TABLE `sibling`
  ADD CONSTRAINT `sibling_ibfk_1` FOREIGN KEY (`PersonId`) REFERENCES `person` (`PersonId`),
  ADD CONSTRAINT `sibling_ibfk_2` FOREIGN KEY (`PrevSchoolId`) REFERENCES `prevschool` (`PrevSchoolId`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `FK_StudentProgram` FOREIGN KEY (`ProgramId`) REFERENCES `program` (`ProgramId`),
  ADD CONSTRAINT `FK_StudentUsers` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_UsersRole` FOREIGN KEY (`RoleId`) REFERENCES `role` (`RoleId`),
  ADD CONSTRAINT `FK_UsersScholarshipStat` FOREIGN KEY (`ScholarshipStatusId`) REFERENCES `scholarshipstatus` (`ScholarshipStatusId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
