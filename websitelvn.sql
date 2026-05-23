-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 23, 2026 lúc 02:19 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `websitelvn`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `cate` enum('home','service','training','news') NOT NULL DEFAULT 'news',
  `title_vi` varchar(500) NOT NULL,
  `title_en` varchar(500) DEFAULT NULL,
  `title_jp` varchar(500) DEFAULT NULL,
  `desc_vi` text DEFAULT NULL,
  `desc_en` text DEFAULT NULL,
  `desc_jp` text DEFAULT NULL,
  `content_vi` longtext DEFAULT NULL,
  `content_en` longtext DEFAULT NULL,
  `content_jp` longtext DEFAULT NULL,
  `thumbnail` text DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `status` enum('draft','published') DEFAULT 'draft',
  `publish_date` date DEFAULT NULL,
  `slug` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `articles`
--

INSERT INTO `articles` (`id`, `cate`, `title_vi`, `title_en`, `title_jp`, `desc_vi`, `desc_en`, `desc_jp`, `content_vi`, `content_en`, `content_jp`, `thumbnail`, `views`, `status`, `publish_date`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'service', 'Dịch vụ thành lập doanh nghiệp FDI', 'FDI Company Establishment Service', 'FDI会社設立サービス', 'Hỗ trợ tư vấn và thành lập doanh nghiệp FDI tại Việt Nam', 'Consulting and establishment support for FDI companies in Vietnam', 'ベトナムにおけるFDI会社設立支援', '<div><h1>Nội dung tiếng Việt</h1></div>', '<div><h1>English Content</h1></div>', '<div><h1>日本語コンテンツ</h1></div>', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&q=80&auto=format&fit=crop', 120, 'published', '2026-05-19', 'dich-vu-thanh-lap-doanh-nghiep-fdi', '2026-05-19 15:10:08', '2026-05-19 15:10:08'),
(18, '', 'viên aaaa', '', '', 'aaa', '', '', 'ARTICLES: [\n  {\n    id: 13,\n    cate: \'home\',\n    title_vi: \'vien\',\n    title_en: \'\',\n    title_jp: \'\',\n    desc_vi: \'sadasdasd\',\n    desc_en: \'\',\n    desc_jp: \'\',\n    content_vi: \'đâsdasd\',\n    content_en: \'\',\n    content_jp: \'\',\n    thumbnail: \'/uploads/1779381284169.jpg\',\n    views: 0,\n    status: \'published\',\n    publish_date: 2026-05-20T17:00:00.000Z,\n    slug: \'vien\',\n    created_at: 2026-05-21T16:34:44.000Z,\n    updated_at: 2026-05-21T16:36:27.000Z\n  }\n]', '', '', '/uploads/1779381726379.jpg', 0, 'published', '2026-05-21', 'vien-aaaa', '2026-05-21 16:42:06', '2026-05-21 16:42:06'),
(19, '', 'rỬUHKJFKAJSD', '', '', 'ĐÂSFAS', '', '', '  console.log(\"ARTICLES:\", rows);', '', '', '', 0, 'published', '2026-05-21', 'ruuhkjfkajsd', '2026-05-21 16:43:47', '2026-05-21 16:43:47'),
(20, '', 'âfffffffffffffwdgsd', '', '', '    console.log(\"ARTICLE BODY:\", req.body);\n', '', '', '    console.log(\"ARTICLE BODY:\", req.body);\n', '', '', '', 0, 'published', '2026-05-21', 'afffffffffffffwdgsd', '2026-05-21 16:45:21', '2026-05-21 16:45:21'),
(23, 'home', 'toi là vien', '', '', 'filterCate', '', '', 'filterCate', '', '', '', 0, 'published', '2026-05-21', 'toi-la-vien', '2026-05-21 16:51:42', '2026-05-21 16:51:42'),
(24, 'service', 'Về LE VIET NAM', '', '', 'LE VIET NAM tự hào là đơn vị tư vấn chiến lược hàng đầu, chuyên cung cấp các giải pháp toàn diện về tư vấn xúc tiến đầu tư và hỗ trợ thành lập doanh nghiệp trong nước cũng như quốc tế (FDI).\n\nVới đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi cam kết đồng hành cùng doanh nghiệp từ những bước đầu tiên, giải quyết mọi thủ tục pháp lý phức tạp và nâng cao năng lực nhân sự, giúp doanh nghiệp phát triển bền vững tại thị trường Việt Nam.', '', '', '<div class=\"bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200\"><div class=\"p-8 md:p-10 text-gray-900 space-y-6\"><h2 class=\"text-2xl font-bold text-orange-600 mb-4 border-b pb-2\">Câu Chuyện Của Chúng Tôi</h2><p class=\"leading-relaxed\"><strong>LE VIET NAM</strong> được thành lập với tâm huyết trở thành cầu nối vững chắc, đưa các nhà đầu tư quốc tế đến với thị trường Việt Nam đầy tiềm năng, đồng thời hỗ trợ các doanh nghiệp trong nước xây dựng nền móng pháp lý vững chắc.</p><p class=\"leading-relaxed\">Chúng tôi hiểu rằng, rào cản về thủ tục hành chính, pháp lý và sự khác biệt văn hóa luôn là những thách thức lớn đối với doanh nghiệp. Với đội ngũ chuyên gia, luật sư và cố vấn giàu kinh nghiệm, LE VIET NAM cam kết mang đến những giải pháp tư vấn toàn diện, chính xác và hiệu quả nhất.</p><div class=\"grid md:grid-cols-2 gap-8 mt-8\"><div class=\"bg-slate-50 p-6 rounded-xl border border-gray-100\"><h3 class=\"text-xl font-bold text-[#1e1b4b] mb-3 flex items-center gap-2\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-globe text-orange-500\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\"></path><path d=\"M2 12h20\"></path></svg> Tầm Nhìn</h3><p class=\"text-gray-700\">Trở thành đơn vị tư vấn chiến lược và cung cấp dịch vụ pháp lý hàng đầu tại Việt Nam, là điểm đến đầu tiên mà các nhà đầu tư quốc tế nghĩ tới khi quyết định thâm nhập thị trường Việt Nam.</p></div><div class=\"bg-slate-50 p-6 rounded-xl border border-gray-100\"><h3 class=\"text-xl font-bold text-[#1e1b4b] mb-3 flex items-center gap-2\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-circle-check-big text-orange-500\" aria-hidden=\"true\"><path d=\"M21.801 10A10 10 0 1 1 17 3.335\"></path><path d=\"m9 11 3 3L22 4\"></path></svg> Sứ Mệnh</h3><p class=\"text-gray-700\">Đơn giản hóa mọi thủ tục pháp lý phức tạp, tối ưu hóa thời gian và chi phí cho khách hàng. Nâng tầm năng lực nhân sự Việt thông qua các chương trình đào tạo chuẩn quốc tế.</p></div></div><h2 class=\"text-2xl font-bold text-orange-600 mb-4 border-b pb-2 mt-10\">Giá Trị Cốt Lõi</h2><div class=\"grid grid-cols-1 sm:grid-cols-3 gap-6\"><div class=\"text-center p-4\"><div class=\"bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 font-bold text-xl\">01</div><h4 class=\"font-bold text-indigo-900 mb-2\">Chuyên Nghiệp</h4><p class=\"text-sm text-gray-600\">Am hiểu luật pháp, xử lý hồ sơ nhanh chóng, chính xác.</p></div><div class=\"text-center p-4\"><div class=\"bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 font-bold text-xl\">02</div><h4 class=\"font-bold text-indigo-900 mb-2\">Tận Tâm</h4><p class=\"text-sm text-gray-600\">Luôn đặt lợi ích của khách hàng lên hàng đầu, đồng hành trọn đời.</p></div><div class=\"text-center p-4\"><div class=\"bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 font-bold text-xl\">03</div><h4 class=\"font-bold text-indigo-900 mb-2\">Bảo Mật</h4><p class=\"text-sm text-gray-600\">Cam kết bảo mật tuyệt đối mọi thông tin của doanh nghiệp và đối tác.</p></div></div></div></div>\n', '', '', '/uploads/1779464125563.jpg', 0, 'published', '2026-05-22', 've-le-viet-nam', '2026-05-22 15:35:25', '2026-05-22 15:35:25');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `service` varchar(255) NOT NULL,
  `note` text DEFAULT NULL,
  `contact_date` date DEFAULT NULL,
  `status` enum('new','contacted','completed') DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `phone`, `service`, `note`, `contact_date`, `status`, `created_at`) VALUES
(1, 'Nguyễn Văn A', '0901234567', 'Thành lập doanh nghiệp', 'Cần tư vấn mở công ty FDI', '2024-05-15', 'new', '2026-05-19 14:51:22'),
(2, 'John Doe', '+123456789', 'Visa', 'Need work permit renewal', '2024-05-14', 'contacted', '2026-05-19 14:51:22'),
(3, 'Tanaka Sato', '0987654321', 'Tư vấn xúc tiến đầu tư', '工場を設立したい', '2024-05-12', 'completed', '2026-05-19 14:51:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `general_settings`
--

CREATE TABLE `general_settings` (
  `id` int(11) NOT NULL,
  `logo` longtext DEFAULT NULL,
  `hotline` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `workingHours` varchar(255) DEFAULT NULL,
  `languages` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `general_settings`
--

INSERT INTO `general_settings` (`id`, `logo`, `hotline`, `email`, `workingHours`, `languages`, `created_at`) VALUES
(1, '', '0979951954', 'vienchelsea325@gmail.com', '', '{\"vi\":{\"companyName\":\"\",\"address\":\"\",\"footerContent\":\"\"},\"en\":{\"companyName\":\"\",\"address\":\"\",\"footerContent\":\"\"},\"ja\":{\"companyName\":\"\",\"address\":\"\",\"footerContent\":\"\"}}', '2026-05-22 05:38:25');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `home_banners`
--

CREATE TABLE `home_banners` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `home_banners`
--

INSERT INTO `home_banners` (`id`, `title`, `desc`, `img`) VALUES
(1, 'Đối Tác Tin Cậy Trong Xúc Tiến Đầu Tư & Pháp Lý', 'Giải pháp toàn diện về đầu tư, doanh nghiệp và thủ tục pháp lý cho người nước ngoài.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'),
(2, 'Hỗ Trợ Thành Lập Doanh Nghiệp Chuyên Nghiệp', 'Hỗ trợ trọn gói từ tư vấn đến khi nhận Giấy chứng nhận đầu tư và ĐKKD nhanh chóng.', 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1200'),
(3, 'Nâng Tầm Nhân Sự Với Đào Tạo Doanh Nghiệp', 'Khóa học Giao tiếp thấu cảm & Tạo ảnh hưởng giúp nâng cao hiệu suất làm việc.', '/uploads/1779437019107.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `languages_menu`
--

CREATE TABLE `languages_menu` (
  `id` int(11) NOT NULL,
  `lang_code` varchar(10) NOT NULL,
  `key` varchar(100) NOT NULL,
  `value` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `languages_menu`
--

INSERT INTO `languages_menu` (`id`, `lang_code`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'vi', 'home', 'Trang ', '2026-05-18 14:05:08', '2026-05-18 14:11:31'),
(2, 'vi', 'about', 'Giới thiệu', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(3, 'vi', 'services', 'Dịch vụ', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(4, 'vi', 'training', 'Đào tạo', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(5, 'vi', 'news', 'Tin tức', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(6, 'vi', 'contact', 'Liên hệ', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(7, 'vi', 'lang', 'VI', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(8, 'en', 'home', 'Home', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(9, 'en', 'about', 'About', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(10, 'en', 'services', 'Services', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(11, 'en', 'training', 'Training', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(12, 'en', 'news', 'News', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(13, 'en', 'contact', 'Contact', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(14, 'en', 'lang', 'EN', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(15, 'ja', 'home', 'ホーム', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(16, 'ja', 'about', '紹介', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(17, 'ja', 'services', 'サービス', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(18, 'ja', 'training', 'トレーニング', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(19, 'ja', 'news', 'ニュース', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(20, 'ja', 'contact', '連絡先', '2026-05-18 14:05:08', '2026-05-18 14:05:08'),
(21, 'ja', 'lang', 'JA', '2026-05-18 14:05:08', '2026-05-18 14:05:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `menu_items`
--

CREATE TABLE `menu_items` (
  `id` varchar(255) NOT NULL,
  `name` longtext DEFAULT NULL,
  `parent_id` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `menu_items`
--

INSERT INTO `menu_items` (`id`, `name`, `parent_id`, `sort_order`, `created_at`) VALUES
('1779418696725_0', '{\"vi\":\"Trang Chủ\",\"en\":\"hihi\",\"ja\":\"新メニュー\"}', NULL, 0, '2026-05-22 02:58:16'),
('1779418696729_1', '{\"vi\":\"Giới Thiệu\",\"en\":\"hahah\",\"ja\":\"新メニュー\"}', NULL, 1, '2026-05-22 02:58:16'),
('1779439780339_2', '{\"vi\":\"Dịch Vụ\",\"en\":\"New Menu\",\"ja\":\"新メニュー\"}', NULL, 2, '2026-05-22 08:49:40'),
('1779439780374_3', '{\"vi\":\"Đào Tạo\",\"en\":\"New Menu\",\"ja\":\"新メニュー\"}', NULL, 3, '2026-05-22 08:49:40'),
('1779439780377_4', '{\"vi\":\"Tin Tức\",\"en\":\"New Menu\",\"ja\":\"新メニュー\"}', NULL, 4, '2026-05-22 08:49:40'),
('1779439780380_5', '{\"vi\":\"Liên Hệ\",\"en\":\"New Menu\",\"ja\":\"新メニュー\"}', NULL, 5, '2026-05-22 08:49:40');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` varchar(20) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `img` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`id`, `title`, `date`, `excerpt`, `img`, `content`, `created_at`) VALUES
('news-1', 'Chính sách mới về cấp Work Permit cho chuyên gia nước ngoài 2024', '15/10/2023', 'Cập nhật những thay đổi quan trọng trong quy định cấp mới và gia hạn giấy phép lao động cho người nước ngoài tại Việt Nam...', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800', '<p><strong>Theo quy định mới nhất của Chính phủ...</strong></p>\r\n<p>Việc cấp giấy phép lao động cho chuyên gia, lao động kỹ thuật người nước ngoài đã có một số thay đổi nhằm tạo điều kiện thuận lợi hơn cho doanh nghiệp.</p>', '2026-05-17 09:04:50'),
('news-2', 'Những lưu ý quan trọng khi thành lập công ty 100% vốn FDI', '28/09/2023', 'Quy trình, thủ tục và các điều kiện bắt buộc nhà đầu tư nước ngoài cần nắm rõ trước khi quyết định rót vốn vào thị trường Việt Nam.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', '<p>Việt Nam tiếp tục là điểm đến hấp dẫn của dòng vốn FDI.</p>\r\n<p>Nhà đầu tư cần kiểm tra kỹ ngành nghề kinh doanh có điều kiện hay không.</p>', '2026-05-17 09:04:50'),
('news-3', 'Kỹ năng giao tiếp thấu cảm: Chìa khóa vàng trong quản trị nhân sự', '12/09/2023', 'Trong môi trường làm việc đa văn hóa và đa thế hệ, giao tiếp thấu cảm giúp gắn kết nhân viên và giảm thiểu xung đột hiệu quả.', 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800', '<p>Giao tiếp thấu cảm giúp xây dựng niềm tin và tăng hiệu quả làm việc.</p>', '2026-05-17 09:04:50'),
('news-4', 'Hướng dẫn chi tiết thủ tục cấp thẻ tạm trú cho nhà đầu tư FDI 2024', '05/11/2023', 'Để thuận lợi cho quá trình lưu trú và làm việc lâu dài tại Việt Nam, nhà đầu tư nước ngoài cần nắm rõ các điều kiện và quy trình xin cấp thẻ tạm trú.', 'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&q=80&w=800', '<p>Thẻ tạm trú giúp nhà đầu tư lưu trú dài hạn tại Việt Nam.</p>', '2026-05-17 09:04:50'),
('news-5', 'Những thay đổi quan trọng của Luật Doanh nghiệp tác động đến nhà đầu tư', '20/10/2023', 'Nhiều quy định mới liên quan đến quản trị doanh nghiệp, con dấu, và thủ tục đăng ký kinh doanh được kỳ vọng tạo môi trường thông thoáng hơn.', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800', '<p>Luật Doanh nghiệp mới tăng tính minh bạch và tự chủ cho doanh nghiệp.</p>', '2026-05-17 09:04:50'),
('news-6', 'Quy trình thành lập văn phòng đại diện thương nhân nước ngoài', '02/10/2023', 'Văn phòng đại diện là bước đệm an toàn để doanh nghiệp nước ngoài tìm hiểu và xúc tiến thương mại tại thị trường Việt Nam.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', '<p>VPĐD phù hợp cho doanh nghiệp muốn nghiên cứu thị trường Việt Nam.</p>', '2026-05-17 09:04:50'),
('news-7', 'Lưu ý khi xin visa điện tử (E-visa) cho chuyên gia vào Việt Nam', '18/09/2023', 'Visa điện tử mang lại sự tiện lợi lớn nhưng cũng có những hạn chế về thời gian lưu trú và số lần nhập cảnh.', 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&q=80&w=800', '<p>E-visa giúp chuyên gia nước ngoài nhập cảnh nhanh hơn.</p>', '2026-05-17 09:04:50'),
('news-8', 'Tầm quan trọng của văn hóa doanh nghiệp trong môi trường đa quốc gia', '05/09/2023', 'Sự thấu hiểu và tôn trọng đa dạng văn hóa là yếu tố cốt lõi giúp các công ty phát triển bền vững.', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800', '<p>Văn hóa doanh nghiệp giúp tăng khả năng gắn kết nhân viên.</p>', '2026-05-17 09:04:50'),
('news-9', 'Điều kiện để doanh nghiệp kinh doanh thương mại điện tử', '25/08/2023', 'Cập nhật các quy định pháp lý mới nhất đối với nhà đầu tư muốn thiết lập nền tảng bán lẻ trực tuyến tại Việt Nam.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800', '<p>TMĐT tại Việt Nam đang phát triển rất mạnh.</p>', '2026-05-17 09:04:50');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `services`
--

CREATE TABLE `services` (
  `id` varchar(100) NOT NULL,
  `title` varchar(500) NOT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `content` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `services`
--

INSERT INTO `services` (`id`, `title`, `icon`, `content`) VALUES
('service-gplhd', 'Giấy Phép Lao Động Cho Người Nước Ngoài (Work Permit)', 'FileText', '<p>Dịch vụ cấp mới, gia hạn và cấp lại giấy phép lao động.</p>\r\n<ul>\r\n<li>Xin công văn chấp thuận sử dụng lao động.</li>\r\n<li>Cấp mới giấy phép lao động.</li>\r\n<li>Cấp lại giấy phép lao động.</li>\r\n<li>Gia hạn giấy phép lao động.</li>\r\n</ul>'),
('service-thay-doi-dkkd', 'Hỗ Trợ Thay Đổi Nội Dung Đăng Ký Kinh Doanh', 'FileText', '<p>Hỗ trợ thay đổi nội dung đăng ký kinh doanh theo Luật Doanh nghiệp 2020.</p>\r\n<ul>\r\n<li>Thay đổi tên công ty.</li>\r\n<li>Thay đổi trụ sở chính.</li>\r\n<li>Thay đổi ngành nghề kinh doanh.</li>\r\n<li>Thay đổi vốn điều lệ.</li>\r\n<li>Thay đổi người đại diện pháp luật.</li>\r\n</ul>'),
('service-the-tam-tru', 'Dịch Vụ Thẻ Tạm Trú Cho Người Nước Ngoài', 'FileText', '<p>Dịch vụ cấp mới, gia hạn, cấp lại thẻ tạm trú.</p>\r\n<ul>\r\n<li>Tư vấn hồ sơ.</li>\r\n<li>Đại diện thực hiện thủ tục.</li>\r\n<li>Nộp hồ sơ tại cơ quan xuất nhập cảnh.</li>\r\n<li>Nhận kết quả và bàn giao tận nơi.</li>\r\n</ul>'),
('service-trong-nuoc', 'Dịch Vụ Tư Vấn Thành Lập Công Ty/ Doanh Nghiệp', 'Briefcase', '<p>Chúng tôi cung cấp giải pháp toàn diện giúp cá nhân và tổ chức khởi sự kinh doanh.</p>\r\n<ul>\r\n<li>Tư vấn đặt tên công ty.</li>\r\n<li>Tư vấn lựa chọn ngành nghề kinh doanh.</li>\r\n<li>Hỗ trợ thực hiện thủ tục đăng ký doanh nghiệp.</li>\r\n<li>Hỗ trợ thủ tục sau thành lập.</li>\r\n</ul>'),
('service-visa', 'Dịch Vụ Xin Visa Việt Nam Cho Người Nước Ngoài', 'Globe', '<p>Dịch vụ xin visa nhập cảnh cho người nước ngoài vào Việt Nam.</p>\r\n<ul>\r\n<li>Visa cho chuyên gia.</li>\r\n<li>Visa cho nhà đầu tư.</li>\r\n<li>Visa thăm thân.</li>\r\n<li>Visa du lịch.</li>\r\n</ul>'),
('service-xuc-tien', 'Hỗ Trợ Tư Vấn Xúc Tiến Đầu Tư & Thành Lập FDI', 'Globe', '<h3>I. Tư vấn chủ trương và chính sách đầu tư</h3>\r\n<ul>\r\n<li>Tư vấn các chủ trương, chính sách đầu tư theo pháp luật Việt Nam.</li>\r\n<li>Hỗ trợ nghiên cứu tính khả thi pháp lý của dự án đầu tư.</li>\r\n<li>Thẩm tra năng lực pháp lý của các đối tác tham gia đầu tư.</li>\r\n<li>Hỗ trợ nghiên cứu ưu đãi đầu tư áp dụng cho dự án.</li>\r\n</ul>\r\n<h3>II. Thành lập công ty 100% vốn đầu tư nước ngoài</h3>\r\n<p>Hỗ trợ trọn gói xin giấy phép đầu tư và thành lập công ty FDI.</p>');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sidebar_categories`
--

CREATE TABLE `sidebar_categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sidebar_categories`
--

INSERT INTO `sidebar_categories` (`id`, `category_name`, `created_at`) VALUES
(1, 'DỊCH VỤ', '2026-05-18 14:59:17'),
(2, 'ĐÀO TẠO', '2026-05-18 14:59:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sidebar_items`
--

CREATE TABLE `sidebar_items` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `item_key` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sidebar_items`
--

INSERT INTO `sidebar_items` (`id`, `category_id`, `title`, `item_key`, `created_at`) VALUES
(1, 1, 'Hỗ trợ tư vấn xúc tiến đầu tư', 'service-xuc-tien', '2026-05-18 14:59:17'),
(2, 1, 'Hỗ trợ thành lập doanh nghiệp', 'services', '2026-05-18 14:59:17'),
(3, 1, 'Giấy phép lao động - Visa - Thẻ tạm trú', 'services', '2026-05-18 14:59:17'),
(4, 2, 'Đào tạo kỹ năng giao tiếp tại nơi làm việc', 'training', '2026-05-18 14:59:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sidebar_subitems`
--

CREATE TABLE `sidebar_subitems` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `item_key` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sidebar_subitems`
--

INSERT INTO `sidebar_subitems` (`id`, `item_id`, `title`, `item_key`, `created_at`) VALUES
(1, 1, 'Tư vấn điều kiện ngành nghề', 'service-xuc-tien', '2026-05-18 14:59:17'),
(2, 1, 'Lựa chọn loại hình công ty', 'service-xuc-tien', '2026-05-18 14:59:17'),
(3, 1, 'Đăng ký địa điểm, trụ sở, vốn', 'service-xuc-tien', '2026-05-18 14:59:17'),
(4, 1, 'Hướng dẫn chuẩn bị hồ sơ', 'service-xuc-tien', '2026-05-18 14:59:17'),
(5, 1, 'Soạn thảo hồ sơ thành lập', 'service-xuc-tien', '2026-05-18 14:59:17'),
(6, 1, 'Đại diện làm thủ tục tại CQNN', 'service-xuc-tien', '2026-05-18 14:59:17'),
(7, 2, 'Dịch vụ tư vấn thành lập Công ty/Doanh nghiệp', 'service-trong-nuoc', '2026-05-18 14:59:17'),
(8, 2, 'Dịch vụ hỗ trợ thay đổi nội dung đăng ký kinh doanh', 'service-thay-doi-dkkd', '2026-05-18 14:59:17'),
(9, 3, 'Visa Việt Nam cho người nước ngoài', 'service-visa', '2026-05-18 14:59:17'),
(10, 3, 'Thẻ tạm trú cho người nước ngoài', 'service-the-tam-tru', '2026-05-18 14:59:17'),
(11, 3, 'Giấy phép lao động cho người nước ngoài làm việc tại Việt Nam', 'service-gplhd', '2026-05-18 14:59:17');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Chỉ mục cho bảng `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `general_settings`
--
ALTER TABLE `general_settings`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `home_banners`
--
ALTER TABLE `home_banners`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `languages_menu`
--
ALTER TABLE `languages_menu`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sidebar_categories`
--
ALTER TABLE `sidebar_categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sidebar_items`
--
ALTER TABLE `sidebar_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sidebar_category` (`category_id`);

--
-- Chỉ mục cho bảng `sidebar_subitems`
--
ALTER TABLE `sidebar_subitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sidebar_item` (`item_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `general_settings`
--
ALTER TABLE `general_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `languages_menu`
--
ALTER TABLE `languages_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `sidebar_categories`
--
ALTER TABLE `sidebar_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `sidebar_items`
--
ALTER TABLE `sidebar_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `sidebar_subitems`
--
ALTER TABLE `sidebar_subitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `sidebar_items`
--
ALTER TABLE `sidebar_items`
  ADD CONSTRAINT `fk_sidebar_category` FOREIGN KEY (`category_id`) REFERENCES `sidebar_categories` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `sidebar_subitems`
--
ALTER TABLE `sidebar_subitems`
  ADD CONSTRAINT `fk_sidebar_item` FOREIGN KEY (`item_id`) REFERENCES `sidebar_items` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
