import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

import mongoose from 'mongoose';
import { Product } from './models/product.model.js';

const sampleProducts = [
  // --- Electronics ---
  {
    name: 'Noise Cancelling Headphones',
    price: 11999.00,
    description: 'Over-ear headphones with premium sound quality and long battery life.',
    category: 'Electronics',
    stock: 15,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: '4K Smart TV 55"',
    price: 62999.00,
    description: 'Stunning 4K resolution with built-in streaming apps.',
    category: 'Electronics',
    stock: 8,
    imageUrl: 'https://www.mobex.in/cdn/shop/files/81vWBSmtBfL._SL1500.jpg?v=1738214848&width=1214',
  },
  {
    name: 'Wireless Mechanical Keyboard',
    price: 5499.00,
    description: 'RGB backlit mechanical keyboard with tactile switches and multi-device pairing.',
    category: 'Electronics',
    stock: 40,
    imageUrl: 'https://viperpc.in/wp-content/uploads/2025/12/ROG-BLACK-3.webp',
  },
  {
    name: 'Logitech MX Master 3S',
    price: 8995.00,
    description: 'Precision wireless mouse with ultra-fast scrolling and ergonomic thumb support.',
    category: 'Electronics',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=3000&auto=format&fit=crop',
  },
  {
    name: 'Portable 1TB SSD',
    price: 9200.00,
    description: 'Ultra-fast external solid-state drive with USB-C connectivity and shock resistance.',
    category: 'Electronics',
    stock: 60,
    imageUrl: 'https://media.istockphoto.com/id/1350433347/photo/data-storage-protection-of-personal-information-concept-ssd-disk-inserted-into-the-notebook.jpg?s=612x612&w=0&k=20&c=MpKHTFUjYCG5AKKsBIrTatetUG1OO6F4DMuuEpuaQdQ=',
  },
  {
    name: 'Dual Monitor Arm Mount',
    price: 3850.00,
    description: 'Heavy-duty steel monitor mount with full motion rotation and cable management.',
    category: 'Electronics',
    stock: 15,
    imageUrl: 'https://m.media-amazon.com/images/I/61iCHzxR8aL.jpg',
  },
  {
    name: 'Pro Streaming Webcam 1080p',
    price: 4200.00,
    description: 'High-definition webcam with built-in ring light and dual noise-canceling mics.',
    category: 'Electronics',
    stock: 30,
    imageUrl: 'https://foreteconline.com/magento/uploads/2021/11/Logitech-webcam-pro-c922a.png',
  },
  {
    name: 'Noise Cancelling Earbuds',
    price: 14999.00,
    description: 'True wireless earbuds with industry-leading ANC and 30-hour battery life.',
    category: 'Electronics',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=3000&auto=format&fit=crop',
  },
  {
    name: 'Smart Fitness Watch',
    price: 18500.00,
    description: 'Advanced health tracking with built-in GPS, heart rate monitor, and sleep analysis.',
    category: 'Electronics',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=3000&auto=format&fit=crop',
  },
  {
    name: 'Gaming Console Pro',
    price: 49990.00,
    description: 'Next-gen gaming console with 4K output and high-speed SSD storage.',
    category: 'Electronics',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=3000&auto=format&fit=crop',
  },

  // --- Kitchen & Home ---
  {
    name: 'Electric Blender Pro',
    price: 4899.00,
    description: 'High-speed blender with multiple presets for smoothies and soups.',
    category: 'Kitchen Appliances',
    stock: 25,
    imageUrl: 'https://www.shutterstock.com/image-photo/advertising-testimonial-photo-bir-mutfak-600nw-2657398163.jpg',
  },
  {
    name: 'Air Fryer XXL',
    price: 12499.00,
    description: 'Digital air fryer with 7 presets and rapid air technology for healthy cooking.',
    category: 'Kitchen Appliances',
    stock: 22,
    imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/029/555/990/small/air-fryer-on-wooden-table-in-modern-kitchen-generative-ai-photo.jpg',
  },
  {
    name: 'Automatic Espresso Machine',
    price: 32500.00,
    description: 'Bean-to-cup coffee maker with integrated milk frother and touch controls.',
    category: 'Kitchen Appliances',
    stock: 8,
    imageUrl: 'https://www.shutterstock.com/image-photo/modern-coffee-machine-on-table-600nw-2431999503.jpg',
  },
  {
    name: 'Electric Gooseneck Kettle',
    price: 3999.00,
    description: 'Precision pour-over kettle with temperature control and stainless steel build.',
    category: 'Kitchen Appliances',
    stock: 35,
    imageUrl: 'https://brewinggadgets.in/cdn/shop/files/Brewista_Black_1L-1_400x.webp?v=1760356137',
  },
  {
    name: 'Cast Iron Dutch Oven',
    price: 5800.00,
    description: 'Enameled cast iron pot perfect for slow-cooking, braising, and baking.',
    category: 'Kitchen Appliances',
    stock: 12,
    imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/073/870/541/small/black-cast-iron-dutch-oven-cooking-pot-photo.jpeg',
  },
  {
    name: 'Professional Knife Set (5pc)',
    price: 8500.00,
    description: 'High-carbon stainless steel blades with an ergonomic wooden storage block.',
    category: 'Kitchen Appliances',
    stock: 15,
    imageUrl: 'https://st3.depositphotos.com/1004288/17932/i/450/depositphotos_179325036-stock-photo-set-of-kitchen-knives.jpg',
  },
  {
    name: 'Handheld Milk Frother',
    price: 899.00,
    description: 'Battery-operated frother for cafe-quality lattes and cappuccinos at home.',
    category: 'Kitchen Appliances',
    stock: 100,
    imageUrl: 'https://www.salton.com/cdn/shop/files/FR2147_GB_inset_06.jpg?v=1716386690&width=1080',
  },
  {
    name: 'Non-Stick Induction Cookware',
    price: 6499.00,
    description: 'Set of 3 pans with granite coating, compatible with all stove-tops.',
    category: 'Kitchen Appliances',
    stock: 20,
    imageUrl: 'https://www.teflon.com/en/-/media/images/teflon/pd/a-black-cookware-set-of-4-lidded-pots-and-2-frying-pans-1-4-2-6-1-2.jpg?rev=ac9ca6c1cad2458984ab604be2d576a1',
  },

  // --- Furniture & Office ---
  {
    name: 'Ergonomic Office Chair',
    price: 7499.00,
    description: 'Fully adjustable chair designed for all-day comfort and support.',
    category: 'Furniture',
    stock: 10,
    imageUrl: 'https://t4.ftcdn.net/jpg/17/25/43/15/360_F_1725431551_MWfLbmQREl7PRLbSvwlPIL49VvUOd0Yt.jpg',
  },
  {
    name: 'Standing Desk (Electric)',
    price: 24999.00,
    description: 'Height-adjustable desk with memory presets and a spacious wood-finish top.',
    category: 'Furniture',
    stock: 12,
    imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/060/097/795/small/sleek-black-adjustable-standing-desk-with-a-modern-design-perfect-for-any-workspace-photo.jpg',
  },
  {
    name: 'Aesthetic Table Lamp',
    price: 2200.00,
    description: 'Modern minimalist lamp with dimmable warm LED light for bedside or office.',
    category: 'Furniture',
    stock: 50,
    imageUrl: 'https://media.istockphoto.com/id/1081960478/photo/the-lamp-against-the-background-of-the-bed-night-time.jpg?s=612x612&w=0&k=20&c=RIHAetzUhHsqXkH1agpAyEAJZkw80MclD7yajKRrBCQ=',
  },
  {
    name: 'Ergonomic Footrest',
    price: 1599.00,
    description: 'Memory foam under-desk footrest to improve posture and blood circulation.',
    category: 'Furniture',
    stock: 40,
    imageUrl: 'https://media.istockphoto.com/id/622060684/photo/ottoman-footstool-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=a0ZAjy_wqdOUbKAR7mHS0NuhtavmU2nMOSLRH311lyg=',
  },
  {
    name: 'Modular Bookshelf',
    price: 8900.00,
    description: 'Wall-mounted 5-tier shelf with a sleek matte black industrial finish.',
    category: 'Furniture',
    stock: 10,
    imageUrl: 'https://www.shutterstock.com/image-vector/natural-wood-cabinet-mixed-size-600nw-2670700805.jpg',
  },
  {
    name: 'Linen Accent Chair',
    price: 11500.00,
    description: 'Comfortable reading chair with solid oak legs and breathable linen upholstery.',
    category: 'Furniture',
    stock: 6,
    imageUrl: 'https://sfycdn.speedsize.com/aa5d6cd7-da91-4546-92d9-893ea42dd7ff/www.nkuku.com/cdn/shop/files/Abe-Deconstructed-Linen-Armchair-Stone-nkuku_1200x1200.jpg?v=1732037040',
  },

  // --- Lifestyle & Decor ---
  {
    name: 'Scented Soy Candle Set',
    price: 1299.00,
    description: 'Pack of 3 therapeutic candles (Lavender, Sandalwood, and Sea Salt).',
    category: 'Home Decor',
    stock: 75,
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=3000&auto=format&fit=crop',
  },
  {
    name: 'Ceramic Planter with Stand',
    price: 2450.00,
    description: 'Large white ceramic pot with a mid-century modern wooden plant stand.',
    category: 'Home Decor',
    stock: 30,
    imageUrl: 'https://m.media-amazon.com/images/I/617zWi7XZwL._AC_UF894,1000_QL80_.jpg',
  },
  {
    name: 'Dumbbell Set (10kg Pair)',
    price: 3200.00,
    description: 'Neoprene coated hex dumbbells for home strength training and cardio.',
    category: 'Fitness',
    stock: 20,
    imageUrl: 'https://m.media-amazon.com/images/I/61NgCwrFqrL._AC_UF894,1000_QL80_.jpg',
  },
  {
    name: 'Yoga Mat (Eco-Friendly)',
    price: 1899.00,
    description: 'Non-slip TPE yoga mat with alignment lines and a carrying strap.',
    category: 'Fitness',
    stock: 55,
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=3000&auto=format&fit=crop',
  },
  {
    name: 'Electric Essential Oil Diffuser',
    price: 2999.00,
    description: 'Ultrasonic cool mist humidifier with 7 color-changing LED lights.',
    category: 'Home Decor',
    stock: 45,
    imageUrl: 'https://media.istockphoto.com/id/1385065522/photo/aroma-oil-diffuser-on-table.jpg?s=612x612&w=0&k=20&c=BGpKtDQ1vCKgZ5Tn8nANMfnrNUlxEV-jjPobOIR6VZM=',
  },
  {
    name: 'Leather Travel Duffel Bag',
    price: 5200.00,
    description: 'Premium vegan leather weekend bag with dedicated shoe compartment.',
    category: 'Fashion',
    stock: 15,
    imageUrl: 'https://media.istockphoto.com/id/1257455876/photo/duffel-bag-travel-case-leather-holdall-valise-fashion-modern.jpg?s=612x612&w=0&k=20&c=0FQIIJE5jvJKrIkV16PIdfmwi4SFz-yHwwI9_Crpwx4=',
  },
  {
    name: 'Polarized Sunglasses',
    price: 1450.00,
    description: 'Classic aviator style with UV400 protection and lightweight frame.',
    category: 'Fashion',
    stock: 80,
    imageUrl: 'https://media.istockphoto.com/id/478586832/photo/prescription-sunglasses-with-black-rubber-frames.jpg?s=612x612&w=0&k=20&c=J_1ga9xZ-8UbRIs12wVGxRyjs2Pieil_6JUTD1145Lo=',
  },
  {
    name: 'Minimalist Wristwatch',
    price: 3999.00,
    description: 'Slim analog watch with a stainless steel mesh strap and quartz movement.',
    category: 'Fashion',
    stock: 25,
    imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/070/437/244/small/minimalist-silver-watch-with-mesh-strap-modern-timepiece-stock-photo.jpg',
  },
  {
    name: 'Canvas Laptop Backpack',
    price: 2750.00,
    description: 'Water-resistant backpack with anti-theft pocket and USB charging port.',
    category: 'Fashion',
    stock: 40,
    imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/072/428/377/small/stylish-gray-backpack-with-leather-accents-a-laptop-and-coffee-cup-creating-a-modern-workspace-ambiance-photo.jpeg',
  },
  {
    name: 'Memory Foam Pillow',
    price: 1950.00,
    description: 'Contoured cervical pillow for neck support and better sleep quality.',
    category: 'Home Decor',
    stock: 60,
    imageUrl: 'https://media.istockphoto.com/id/803138268/photo/latex-pillow-on-bed-in-sunshine.jpg?s=612x612&w=0&k=20&c=s_Mwt8fOu79l_hAK7Bs9Q3zrkZsrEPiOb0QvjHe8vhE=',
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log('Database connection successful for seeding.');

    // 1. CLEAR EXISTING DATA
    await Product.deleteMany({});
    console.log('Existing products cleared.');

    // 2. INSERT SAMPLE DATA
    await Product.insertMany(sampleProducts);
    console.log('Database seeded successfully with products!');
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  } finally {
    // 3. CLOSE CONNECTION
    await mongoose.connection.close();
  }
};

seedDB();
// To run this script, open terminal in backend and use the command: node src/seed.js
