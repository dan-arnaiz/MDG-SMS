-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2024 at 02:30 AM
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
-- Table structure for table `academic_years`
--

CREATE TABLE `academic_years` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `start_year` year(4) NOT NULL,
  `end_year` year(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `academic_years`
--

INSERT INTO `academic_years` (`id`, `start_year`, `end_year`, `created_at`, `updated_at`) VALUES
(1, '2024', '2025', '2024-11-03 11:58:37', '2024-11-03 11:58:37');

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `barangay` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `street` varchar(150) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `barangay`, `city`, `province`, `zipcode`, `street`, `created_at`, `updated_at`) VALUES
(1, 'Catalunan Grande', 'Davao City', 'Davao del Sur', '8000', 'Sanguin St.', '2024-11-03 11:58:37', '2024-11-03 11:58:37'),
(2, 'Bangkal', 'Davao City', 'Davao del Sur', '8000', 'Bruh St.', '2024-11-03 11:58:37', '2024-11-03 11:58:37');

-- --------------------------------------------------------

--
-- Table structure for table `address_person`
--

CREATE TABLE `address_person` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `person_id` bigint(20) UNSIGNED NOT NULL,
  `address_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(20) NOT NULL,
  `house_num` varchar(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `address_person`
--

INSERT INTO `address_person` (`id`, `person_id`, `address_id`, `type`, `house_num`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Permanent', '10', '2024-11-03 11:58:37', '2024-11-03 11:58:37');

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` varchar(10) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `employee_id` varchar(10) DEFAULT NULL,
  `scholarship_id` bigint(20) UNSIGNED DEFAULT NULL,
  `term_id` bigint(20) UNSIGNED DEFAULT NULL,
  `date_filed` datetime NOT NULL,
  `date_terminated` datetime DEFAULT NULL,
  `is_current` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `student_id`, `employee_id`, `scholarship_id`, `term_id`, `date_filed`, `date_terminated`, `is_current`, `created_at`, `updated_at`) VALUES
('2024928904', '2023678904', '2020101928', 1, 1, '2024-11-03 19:58:37', NULL, 1, '2024-11-03 11:58:37', '2024-11-03 11:58:37');

-- --------------------------------------------------------

--
-- Table structure for table `benefits`
--

CREATE TABLE `benefits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `scholarship_id` bigint(20) UNSIGNED NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Table structure for table `contact_nums`
--

CREATE TABLE `contact_nums` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `person_id` bigint(20) UNSIGNED NOT NULL,
  `title` char(20) NOT NULL,
  `nums` char(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_nums`
--

INSERT INTO `contact_nums` (`id`, `person_id`, `title`, `nums`, `created_at`, `updated_at`) VALUES
(1, 1, 'Mobile', '09873562789', '2024-11-03 11:58:37', '2024-11-03 11:58:37');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` varchar(10) NOT NULL,
  `person_id` bigint(20) UNSIGNED NOT NULL,
  `job_title_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `person_id`, `job_title_id`, `user_id`, `created_at`, `updated_at`) VALUES
('2020101928', 2, 1, 2, '2024-11-03 11:58:37', '2024-11-03 11:58:37');

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
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `file_reqs`
--

CREATE TABLE `file_reqs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `scholarship_id` bigint(20) UNSIGNED NOT NULL,
  `file_id` bigint(20) UNSIGNED NOT NULL,
  `is_submitted` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guardians`
--

CREATE TABLE `guardians` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `person_id` bigint(20) UNSIGNED NOT NULL,
  `occupation` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `guardian_relations`
--

CREATE TABLE `guardian_relations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `guardian_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Table structure for table `job_titles`
--

CREATE TABLE `job_titles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `job_titles`
--

INSERT INTO `job_titles` (`id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Reviewer', 'Reviews scholarship applications', '2024-11-03 11:58:37', '2024-11-03 11:58:37');

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
(4, '2024_10_14_144008_create_personal_access_tokens_table', 1),
(5, '2024_10_28_174044_create_persons_table', 1),
(6, '2024_10_28_180901_create_parents_table', 1),
(7, '2024_10_28_183952_create_applications_table', 1),
(8, '2024_11_01_155504_create_subtypes_table', 1);

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
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `suffix` varchar(10) DEFAULT NULL,
  `dob` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id`, `first_name`, `last_name`, `middle_name`, `suffix`, `dob`, `email`, `created_at`, `updated_at`) VALUES
(1, 'john', 'doe', 'smith', 'jr', '2002-05-05', 'johndoe@gmail.com', '2024-11-03 11:58:37', '2024-11-03 11:58:37'),
(2, 'Sushi', 'Baron', 'Ganzon', 'II', '1995-10-10', 'baronbaron@gmail.com', '2024-11-03 11:58:37', '2024-11-03 11:58:37');

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

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'main', '884687e07f293774541ee64ec25b5534cdd521c7d3ce0994601dc251ec3c5810', '[\"*\"]', NULL, NULL, '2024-11-03 03:57:03', '2024-11-03 03:57:03'),
(2, 'App\\Models\\User', 2, 'main', 'fbe042f7c15c194bd0983fa1550342ae4e2d7e4b2ed70b019a863d581ceee3a6', '[\"*\"]', NULL, NULL, '2024-11-03 03:57:22', '2024-11-03 03:57:22'),
(3, 'App\\Models\\User', 1, 'main', 'bb09105cee84149594327c5987b827b96ee02a12ba4cc218ae7d65115dc09f53', '[\"*\"]', '2024-11-03 11:51:02', NULL, '2024-11-03 05:05:39', '2024-11-03 11:51:02');

-- --------------------------------------------------------

--
-- Table structure for table `prev_schools`
--

CREATE TABLE `prev_schools` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `address_id` bigint(20) UNSIGNED DEFAULT NULL,
  `landline` char(15) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `prev_schools`
--

INSERT INTO `prev_schools` (`id`, `address_id`, `landline`, `name`, `email`, `created_at`, `updated_at`) VALUES
(1, 2, '198-2387', 'Ateneo de Davao Senio High School', 'helpdesk@addu.edu.ph', '2024-11-03 11:58:37', '2024-11-03 11:58:37');

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(200) NOT NULL,
  `year` char(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`id`, `name`, `year`, `created_at`, `updated_at`) VALUES
(1, 'BS Civil Engineering', 'First', '2024-11-03 11:58:37', '2024-11-03 11:58:37');

-- --------------------------------------------------------

--
-- Table structure for table `qualifications`
--

CREATE TABLE `qualifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `scholarship_id` bigint(20) UNSIGNED NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `retentions`
--

CREATE TABLE `retentions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `scholarship_id` bigint(20) UNSIGNED NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scholarships`
--

CREATE TABLE `scholarships` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `max_slots` smallint(5) UNSIGNED NOT NULL,
  `taken_slots` smallint(5) UNSIGNED NOT NULL,
  `is_full` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `scholarships`
--

INSERT INTO `scholarships` (`id`, `name`, `description`, `max_slots`, `taken_slots`, `is_full`, `created_at`, `updated_at`) VALUES
(1, 'Mapua MCM Cup', 'CHAMPION - 100% discount on tuition and L/F/D fees', 20, 1, 0, '2024-11-03 11:58:37', '2024-11-03 11:58:37');

-- --------------------------------------------------------

--
-- Table structure for table `scholarship_statuses`
--

CREATE TABLE `scholarship_statuses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` char(8) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `scholarship_statuses`
--

INSERT INTO `scholarship_statuses` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Active', 'Current recipient of a scholarship program', '2024-11-03 11:58:37', '2024-11-03 11:58:37'),
(2, 'Inactive', 'Past recipient of a scholarship program', '2024-11-03 11:58:37', '2024-11-03 11:58:37'),
(3, 'Terminat', 'Scholarship program terminated', '2024-11-03 11:58:37', '2024-11-03 11:58:37');

-- --------------------------------------------------------

--
-- Table structure for table `semesters`
--

CREATE TABLE `semesters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` char(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `semesters`
--

INSERT INTO `semesters` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'First Seme', '2024-11-03 11:58:37', '2024-11-03 11:58:37'),
(2, 'Second Sem', '2024-11-03 11:58:37', '2024-11-03 11:58:37'),
(3, 'Third Seme', '2024-11-03 11:58:37', '2024-11-03 11:58:37'),
(4, 'Fourth Sem', '2024-11-03 11:58:37', '2024-11-03 11:58:37');

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
-- Table structure for table `siblings`
--

CREATE TABLE `siblings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `person_id` bigint(20) UNSIGNED NOT NULL,
  `prev_school_id` bigint(20) UNSIGNED DEFAULT NULL,
  `age` tinyint(3) UNSIGNED NOT NULL,
  `edu_attain` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sibling_relations`
--

CREATE TABLE `sibling_relations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `sibling_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` varchar(10) NOT NULL,
  `person_id` bigint(20) UNSIGNED NOT NULL,
  `prev_school_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `program_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `person_id`, `prev_school_id`, `user_id`, `program_id`, `created_at`, `updated_at`) VALUES
('2023678904', 1, 1, 1, 1, '2024-11-03 11:58:37', '2024-11-03 11:58:37');

-- --------------------------------------------------------

--
-- Table structure for table `subtypes`
--

CREATE TABLE `subtypes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `scholarship_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subtypes`
--

INSERT INTO `subtypes` (`id`, `scholarship_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'Champion', '100% discount on tuition and L/F/D fees', '2024-11-03 14:51:08', '2024-11-03 14:51:08'),
(2, 1, '1st Place', '50% discount on tuition and L/F/D', '2024-11-03 14:51:56', '2024-11-03 14:51:56'),
(3, 1, '2nd Place', '25% discount on tuition and L/F/D', '2024-11-03 14:52:19', '2024-11-03 14:52:19');

-- --------------------------------------------------------

--
-- Table structure for table `terms`
--

CREATE TABLE `terms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `academic_year_id` bigint(20) UNSIGNED NOT NULL,
  `semester_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `terms`
--

INSERT INTO `terms` (`id`, `academic_year_id`, `semester_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-11-03 11:58:37', '2024-11-03 11:58:37');

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
  `scholarship_status_id` bigint(20) UNSIGNED DEFAULT NULL,
  `role_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `scholarship_status_id`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 'Sushi Baron', 'sbaron@mcm.edu.ph', NULL, '$2y$12$22VcH3o./ub9rqPVlgvqQOzrzszxzUarh/HEJg6IJLmjOGniZvuY6', NULL, 1, NULL, '2024-11-03 03:57:03', '2024-11-03 03:57:03'),
(2, 'John Doe', 'jdoe@mcm.edu.ph', NULL, '$2y$12$ceiULp/dkuhZL5BhY1RfR.1qU6qcFO0hkGNUjWhPDEFnGnmQyl2cq', NULL, NULL, NULL, '2024-11-03 03:57:22', '2024-11-03 03:57:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_years`
--
ALTER TABLE `academic_years`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `address_person`
--
ALTER TABLE `address_person`
  ADD PRIMARY KEY (`id`),
  ADD KEY `address_person_person_id_foreign` (`person_id`),
  ADD KEY `address_person_address_id_foreign` (`address_id`);

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD KEY `applications_student_id_foreign` (`student_id`),
  ADD KEY `applications_employee_id_foreign` (`employee_id`),
  ADD KEY `applications_scholarship_id_foreign` (`scholarship_id`),
  ADD KEY `applications_term_id_foreign` (`term_id`);

--
-- Indexes for table `benefits`
--
ALTER TABLE `benefits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `benefits_scholarship_id_foreign` (`scholarship_id`);

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
-- Indexes for table `contact_nums`
--
ALTER TABLE `contact_nums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contact_nums_person_id_foreign` (`person_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employees_person_id_foreign` (`person_id`),
  ADD KEY `employees_job_title_id_foreign` (`job_title_id`),
  ADD KEY `employees_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `file_reqs`
--
ALTER TABLE `file_reqs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `file_reqs_scholarship_id_foreign` (`scholarship_id`),
  ADD KEY `file_reqs_file_id_foreign` (`file_id`);

--
-- Indexes for table `guardians`
--
ALTER TABLE `guardians`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guardians_person_id_foreign` (`person_id`);

--
-- Indexes for table `guardian_relations`
--
ALTER TABLE `guardian_relations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guardian_relations_guardian_id_foreign` (`guardian_id`),
  ADD KEY `guardian_relations_student_id_foreign` (`student_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_titles`
--
ALTER TABLE `job_titles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `people_email_unique` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `prev_schools`
--
ALTER TABLE `prev_schools`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prev_schools_address_id_foreign` (`address_id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `qualifications`
--
ALTER TABLE `qualifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `qualifications_scholarship_id_foreign` (`scholarship_id`);

--
-- Indexes for table `retentions`
--
ALTER TABLE `retentions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `retentions_scholarship_id_foreign` (`scholarship_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scholarships`
--
ALTER TABLE `scholarships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scholarship_statuses`
--
ALTER TABLE `scholarship_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `semesters`
--
ALTER TABLE `semesters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `siblings`
--
ALTER TABLE `siblings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `siblings_person_id_foreign` (`person_id`),
  ADD KEY `siblings_prev_school_id_foreign` (`prev_school_id`);

--
-- Indexes for table `sibling_relations`
--
ALTER TABLE `sibling_relations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sibling_relations_sibling_id_foreign` (`sibling_id`),
  ADD KEY `sibling_relations_student_id_foreign` (`student_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `students_person_id_foreign` (`person_id`),
  ADD KEY `students_prev_school_id_foreign` (`prev_school_id`),
  ADD KEY `students_user_id_foreign` (`user_id`),
  ADD KEY `students_program_id_foreign` (`program_id`);

--
-- Indexes for table `subtypes`
--
ALTER TABLE `subtypes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subtypes_scholarship_id_foreign` (`scholarship_id`);

--
-- Indexes for table `terms`
--
ALTER TABLE `terms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `terms_academic_year_id_foreign` (`academic_year_id`),
  ADD KEY `terms_semester_id_foreign` (`semester_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_scholarship_status_id_foreign` (`scholarship_status_id`),
  ADD KEY `users_role_id_foreign` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academic_years`
--
ALTER TABLE `academic_years`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `address_person`
--
ALTER TABLE `address_person`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `benefits`
--
ALTER TABLE `benefits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact_nums`
--
ALTER TABLE `contact_nums`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `file_reqs`
--
ALTER TABLE `file_reqs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guardians`
--
ALTER TABLE `guardians`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guardian_relations`
--
ALTER TABLE `guardian_relations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_titles`
--
ALTER TABLE `job_titles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `prev_schools`
--
ALTER TABLE `prev_schools`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `qualifications`
--
ALTER TABLE `qualifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `retentions`
--
ALTER TABLE `retentions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scholarships`
--
ALTER TABLE `scholarships`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `scholarship_statuses`
--
ALTER TABLE `scholarship_statuses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `semesters`
--
ALTER TABLE `semesters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `siblings`
--
ALTER TABLE `siblings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sibling_relations`
--
ALTER TABLE `sibling_relations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subtypes`
--
ALTER TABLE `subtypes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `terms`
--
ALTER TABLE `terms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address_person`
--
ALTER TABLE `address_person`
  ADD CONSTRAINT `address_person_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `address_person_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `applications_scholarship_id_foreign` FOREIGN KEY (`scholarship_id`) REFERENCES `scholarships` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `applications_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `applications_term_id_foreign` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `benefits`
--
ALTER TABLE `benefits`
  ADD CONSTRAINT `benefits_scholarship_id_foreign` FOREIGN KEY (`scholarship_id`) REFERENCES `scholarships` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `contact_nums`
--
ALTER TABLE `contact_nums`
  ADD CONSTRAINT `contact_nums_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_job_title_id_foreign` FOREIGN KEY (`job_title_id`) REFERENCES `job_titles` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `employees_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `employees_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `file_reqs`
--
ALTER TABLE `file_reqs`
  ADD CONSTRAINT `file_reqs_file_id_foreign` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `file_reqs_scholarship_id_foreign` FOREIGN KEY (`scholarship_id`) REFERENCES `scholarships` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `guardians`
--
ALTER TABLE `guardians`
  ADD CONSTRAINT `guardians_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `guardian_relations`
--
ALTER TABLE `guardian_relations`
  ADD CONSTRAINT `guardian_relations_guardian_id_foreign` FOREIGN KEY (`guardian_id`) REFERENCES `guardians` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `guardian_relations_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `prev_schools`
--
ALTER TABLE `prev_schools`
  ADD CONSTRAINT `prev_schools_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `qualifications`
--
ALTER TABLE `qualifications`
  ADD CONSTRAINT `qualifications_scholarship_id_foreign` FOREIGN KEY (`scholarship_id`) REFERENCES `scholarships` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `retentions`
--
ALTER TABLE `retentions`
  ADD CONSTRAINT `retentions_scholarship_id_foreign` FOREIGN KEY (`scholarship_id`) REFERENCES `scholarships` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `siblings`
--
ALTER TABLE `siblings`
  ADD CONSTRAINT `siblings_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `siblings_prev_school_id_foreign` FOREIGN KEY (`prev_school_id`) REFERENCES `prev_schools` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `sibling_relations`
--
ALTER TABLE `sibling_relations`
  ADD CONSTRAINT `sibling_relations_sibling_id_foreign` FOREIGN KEY (`sibling_id`) REFERENCES `siblings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sibling_relations_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `students_prev_school_id_foreign` FOREIGN KEY (`prev_school_id`) REFERENCES `prev_schools` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `students_program_id_foreign` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `students_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `subtypes`
--
ALTER TABLE `subtypes`
  ADD CONSTRAINT `subtypes_scholarship_id_foreign` FOREIGN KEY (`scholarship_id`) REFERENCES `scholarships` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `terms`
--
ALTER TABLE `terms`
  ADD CONSTRAINT `terms_academic_year_id_foreign` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `terms_semester_id_foreign` FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `users_scholarship_status_id_foreign` FOREIGN KEY (`scholarship_status_id`) REFERENCES `scholarship_statuses` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
