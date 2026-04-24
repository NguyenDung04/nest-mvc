/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedSampleData1714000001000 implements MigrationInterface {
  name = 'SeedSampleData1714000001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const passwordHash = await bcrypt.hash('123456', 10);

    await queryRunner.query(
      `
      INSERT INTO \`users\`
        (\`email\`, \`username\`, \`password_hash\`, \`role\`, \`is_active\`)
      VALUES
        (?, ?, ?, 'admin', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 1),
        (?, ?, ?, 'user', 0)
      `,
      [
        'admin1@example.com',
        'admin1',
        passwordHash,

        'user1@example.com',
        'user1',
        passwordHash,

        'user2@example.com',
        'user2',
        passwordHash,

        'user3@example.com',
        'user3',
        passwordHash,

        'user4@example.com',
        'user4',
        passwordHash,

        'user5@example.com',
        'user5',
        passwordHash,

        'user6@example.com',
        'user6',
        passwordHash,

        'user7@example.com',
        'user7',
        passwordHash,

        'user8@example.com',
        'user8',
        passwordHash,

        'user9@example.com',
        'user9',
        passwordHash,

        'user10@example.com',
        'user10',
        passwordHash,

        'user11@example.com',
        'user11',
        passwordHash,

        'user12@example.com',
        'user12',
        passwordHash,

        'user13@example.com',
        'user13',
        passwordHash,

        'user14@example.com',
        'user14',
        passwordHash,

        'user15@example.com',
        'user15',
        passwordHash,

        'user16@example.com',
        'user16',
        passwordHash,

        'user17@example.com',
        'user17',
        passwordHash,

        'user18@example.com',
        'user18',
        passwordHash,

        'locked_user@example.com',
        'locked_user',
        passwordHash,
      ],
    );

    await queryRunner.query(`
      INSERT INTO \`categories\`
        (\`name\`, \`slug\`, \`description\`, \`is_active\`)
      VALUES
        ('Điện thoại', 'dien-thoai', 'Danh mục điện thoại thông minh và phụ kiện liên quan', 1),
        ('Laptop', 'laptop', 'Danh mục máy tính xách tay phục vụ học tập và làm việc', 1),
        ('Máy tính bảng', 'may-tinh-bang', 'Danh mục máy tính bảng nhiều kích thước', 1),
        ('Tai nghe', 'tai-nghe', 'Danh mục tai nghe có dây, không dây và chống ồn', 1),
        ('Đồng hồ thông minh', 'dong-ho-thong-minh', 'Danh mục thiết bị đeo thông minh', 1),
        ('Phụ kiện điện thoại', 'phu-kien-dien-thoai', 'Danh mục ốp lưng, cáp sạc và kính cường lực', 1),
        ('Màn hình máy tính', 'man-hinh-may-tinh', 'Danh mục màn hình phục vụ học tập, làm việc và chơi game', 1),
        ('Bàn phím', 'ban-phim', 'Danh mục bàn phím văn phòng và bàn phím cơ', 1),
        ('Chuột máy tính', 'chuot-may-tinh', 'Danh mục chuột văn phòng và chuột gaming', 1),
        ('Loa', 'loa', 'Danh mục loa bluetooth, loa máy tính và loa di động', 1),
        ('Máy ảnh', 'may-anh', 'Danh mục máy ảnh kỹ thuật số và phụ kiện chụp ảnh', 1),
        ('Thiết bị mạng', 'thiet-bi-mang', 'Danh mục router, modem và thiết bị mở rộng sóng', 1),
        ('Ổ cứng', 'o-cung', 'Danh mục ổ cứng HDD, SSD và thiết bị lưu trữ', 1),
        ('RAM', 'ram', 'Danh mục bộ nhớ RAM cho máy tính và laptop', 1),
        ('Card màn hình', 'card-man-hinh', 'Danh mục card đồ họa phục vụ thiết kế và chơi game', 1),
        ('Máy in', 'may-in', 'Danh mục máy in văn phòng và gia đình', 1),
        ('Thiết bị văn phòng', 'thiet-bi-van-phong', 'Danh mục thiết bị hỗ trợ công việc văn phòng', 1),
        ('Camera an ninh', 'camera-an-ninh', 'Danh mục camera giám sát trong nhà và ngoài trời', 1),
        ('Pin sạc dự phòng', 'pin-sac-du-phong', 'Danh mục pin sạc dự phòng dung lượng cao', 1),
        ('Danh mục tạm ngưng', 'danh-muc-tam-ngung', 'Danh mục mẫu đang tạm ngưng hoạt động', 0)
    `);

    await queryRunner.query(`
      INSERT INTO \`products\`
        (
          \`name\`,
          \`slug\`,
          \`description\`,
          \`image\`,
          \`price\`,
          \`stock_quantity\`,
          \`is_active\`,
          \`category_id\`
        )
      VALUES
        (
          'iPhone 15',
          'iphone-15',
          'Điện thoại Apple iPhone 15 chính hãng',
          'https://fdn.gsmarena.com/imgroot/reviews/23/apple-iphone-15/lifestyle/-1200w5/gsmarena_001.jpg',
          22990000.00,
          50,
          1,
          1
        ),
        (
          'Samsung Galaxy S24',
          'samsung-galaxy-s24',
          'Điện thoại Samsung Galaxy S24 hiệu năng cao',
          'https://fdn.gsmarena.com/imgroot/reviews/24/samsung-galaxy-s24/lifestyle/-1200w5/gsmarena_001.jpg',
          20990000.00,
          45,
          1,
          1
        ),
        (
          'MacBook Air M2',
          'macbook-air-m2',
          'Laptop Apple MacBook Air M2 mỏng nhẹ',
          'https://fdn.gsmarena.com/imgroot/news/22/06/apple-macbook-air-m2/-1200/gsmarena_001.jpg',
          25990000.00,
          30,
          1,
          2
        ),
        (
          'Dell XPS 13',
          'dell-xps-13',
          'Laptop Dell XPS 13 cao cấp dành cho văn phòng',
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
          29990000.00,
          20,
          1,
          2
        ),
        (
          'iPad Air 5',
          'ipad-air-5',
          'Máy tính bảng iPad Air 5 hỗ trợ học tập và giải trí',
          'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
          15990000.00,
          35,
          1,
          3
        ),
        (
          'Samsung Galaxy Tab S9',
          'samsung-galaxy-tab-s9',
          'Máy tính bảng Samsung Galaxy Tab S9 màn hình sắc nét',
          'https://images.unsplash.com/photo-1561154464-82e9adf32764',
          18990000.00,
          25,
          1,
          3
        ),
        (
          'Sony WH-1000XM5',
          'sony-wh-1000xm5',
          'Tai nghe chống ồn Sony WH-1000XM5',
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
          8990000.00,
          40,
          1,
          4
        ),
        (
          'AirPods Pro 2',
          'airpods-pro-2',
          'Tai nghe Apple AirPods Pro thế hệ 2',
          'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1',
          5990000.00,
          60,
          1,
          4
        ),
        (
          'Apple Watch Series 9',
          'apple-watch-series-9',
          'Đồng hồ thông minh Apple Watch Series 9',
          'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d',
          9990000.00,
          28,
          1,
          5
        ),
        (
          'Samsung Galaxy Watch 6',
          'samsung-galaxy-watch-6',
          'Đồng hồ thông minh Samsung Galaxy Watch 6',
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
          6990000.00,
          32,
          1,
          5
        ),
        (
          'Cáp sạc Type-C 60W',
          'cap-sac-type-c-60w',
          'Cáp sạc nhanh Type-C công suất 60W',
          'https://images.unsplash.com/photo-1583863788434-e58a36330cf0',
          199000.00,
          200,
          1,
          6
        ),
        (
          'Ốp lưng iPhone 15',
          'op-lung-iphone-15',
          'Ốp lưng bảo vệ dành cho iPhone 15',
          'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6',
          159000.00,
          150,
          1,
          6
        ),
        (
          'Màn hình LG UltraWide 29 inch',
          'man-hinh-lg-ultrawide-29-inch',
          'Màn hình LG UltraWide 29 inch phù hợp làm việc đa nhiệm',
          'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
          5990000.00,
          18,
          1,
          7
        ),
        (
          'Bàn phím cơ Keychron K2',
          'ban-phim-co-keychron-k2',
          'Bàn phím cơ không dây Keychron K2 nhỏ gọn',
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
          2290000.00,
          45,
          1,
          8
        ),
        (
          'Chuột Logitech MX Master 3S',
          'chuot-logitech-mx-master-3s',
          'Chuột không dây Logitech MX Master 3S cho dân văn phòng',
          'https://images.unsplash.com/photo-1527814050087-3793815479db',
          2490000.00,
          55,
          1,
          9
        ),
        (
          'Loa Bluetooth JBL Flip 6',
          'loa-bluetooth-jbl-flip-6',
          'Loa Bluetooth JBL Flip 6 chống nước',
          'https://images.unsplash.com/photo-1545454675-3531b543be5d',
          2890000.00,
          38,
          1,
          10
        ),
        (
          'Router WiFi TP-Link AX3000',
          'router-wifi-tp-link-ax3000',
          'Router WiFi 6 TP-Link AX3000 tốc độ cao',
          'https://images.unsplash.com/photo-1606904825846-647eb07f5be2',
          1890000.00,
          70,
          1,
          12
        ),
        (
          'SSD Samsung 980 1TB',
          'ssd-samsung-980-1tb',
          'Ổ cứng SSD Samsung 980 dung lượng 1TB',
          'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b',
          1690000.00,
          90,
          1,
          13
        ),
        (
          'Camera an ninh Xiaomi C400',
          'camera-an-ninh-xiaomi-c400',
          'Camera an ninh Xiaomi C400 độ phân giải cao',
          'https://images.unsplash.com/photo-1558002038-1055907df827',
          1290000.00,
          65,
          1,
          18
        ),
        (
          'Pin sạc dự phòng Anker 20000mAh',
          'pin-sac-du-phong-anker-20000mah',
          'Pin sạc dự phòng Anker dung lượng 20000mAh',
          'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5',
          1190000.00,
          80,
          0,
          19
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM \`products\`
      WHERE \`slug\` IN (
        'iphone-15',
        'samsung-galaxy-s24',
        'macbook-air-m2',
        'dell-xps-13',
        'ipad-air-5',
        'samsung-galaxy-tab-s9',
        'sony-wh-1000xm5',
        'airpods-pro-2',
        'apple-watch-series-9',
        'samsung-galaxy-watch-6',
        'cap-sac-type-c-60w',
        'op-lung-iphone-15',
        'man-hinh-lg-ultrawide-29-inch',
        'ban-phim-co-keychron-k2',
        'chuot-logitech-mx-master-3s',
        'loa-bluetooth-jbl-flip-6',
        'router-wifi-tp-link-ax3000',
        'ssd-samsung-980-1tb',
        'camera-an-ninh-xiaomi-c400',
        'pin-sac-du-phong-anker-20000mah'
      )
    `);

    await queryRunner.query(`
      DELETE FROM \`categories\`
      WHERE \`slug\` IN (
        'dien-thoai',
        'laptop',
        'may-tinh-bang',
        'tai-nghe',
        'dong-ho-thong-minh',
        'phu-kien-dien-thoai',
        'man-hinh-may-tinh',
        'ban-phim',
        'chuot-may-tinh',
        'loa',
        'may-anh',
        'thiet-bi-mang',
        'o-cung',
        'ram',
        'card-man-hinh',
        'may-in',
        'thiet-bi-van-phong',
        'camera-an-ninh',
        'pin-sac-du-phong',
        'danh-muc-tam-ngung'
      )
    `);

    await queryRunner.query(`
      DELETE FROM \`users\`
      WHERE \`email\` IN (
        'admin1@example.com',
        'user1@example.com',
        'user2@example.com',
        'user3@example.com',
        'user4@example.com',
        'user5@example.com',
        'user6@example.com',
        'user7@example.com',
        'user8@example.com',
        'user9@example.com',
        'user10@example.com',
        'user11@example.com',
        'user12@example.com',
        'user13@example.com',
        'user14@example.com',
        'user15@example.com',
        'user16@example.com',
        'user17@example.com',
        'user18@example.com',
        'locked_user@example.com'
      )
    `);
  }
}
