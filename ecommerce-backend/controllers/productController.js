// // // controllers/productController.js
// // const Product = require('../models/Product');

// // // Fetch all products (for the dashboard)
// // exports.getProducts = async (req, res) => {
// //   try {
// //     const products = await Product.find({});
// //     res.status(200).json(products);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching products', error: error.message });
// //   }
// // };

// // // Create a product (Admin only later, open for now to test)
// // exports.createProduct = async (req, res) => {
// //   try {
// //     const newProduct = new Product(req.body);
// //     const savedProduct = await newProduct.save();
// //     res.status(201).json(savedProduct);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error creating product', error: error.message });
// //   }
// // };

// // const Product = require('../models/Product');

// // exports.getProducts = async (req, res) => {
// //   try {
// //     const products = await Product.find({});
// //     res.status(200).json(products);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching products', error: error.message });
// //   }
// // };

// // // 🚀 UPGRADED: Handle Files + Gadget Specs
// // exports.createProduct = async (req, res) => {
// //   try {
// //     let { name, description, price, discountPrice, category, stock } = req.body;
    
// //     // Because we are using FormData, Arrays come in as JSON strings. We must parse them.
// //     let specs = req.body.specs ? JSON.parse(req.body.specs) : [];
// //     let features = req.body.features ? JSON.parse(req.body.features) : [];
// //     let imageUrls = req.body.imageUrls ? JSON.parse(req.body.imageUrls) : []; // Web URLs

// //     // Check for PC Uploads (Files)
// //     if (req.files) {
// //       if (req.files.images) {
// //         // Map the uploaded files to our local server URL
// //         const uploadedImages = req.files.images.map(file => `http://localhost:5000/uploads/${file.filename}`);
// //         imageUrls = [...imageUrls, ...uploadedImages]; // Combine Web URLs with PC Uploads
// //       }
// //       if (req.files.banners) {
// //         const uploadedBanners = req.files.banners.map(file => `http://localhost:5000/uploads/${file.filename}`);
// //         req.body.banners = uploadedBanners;
// //       }
// //     }

// //     const newProduct = new Product({
// //       name, description, price, discountPrice, category, stock,
// //       specs, features, images: imageUrls, banners: req.body.banners || []
// //     });

// //     const savedProduct = await newProduct.save();
// //     res.status(201).json(savedProduct);
// //   } catch (error) {
// //     console.error("Product Creation Error:", error);
// //     res.status(500).json({ message: 'Error creating product', error: error.message });
// //   }
// // };

// // // Fetch a single product by ID
// // exports.getProductById = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (product) {
// //       res.status(200).json(product);
// //     } else {
// //       res.status(404).json({ message: 'Product not found' });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching product', error: error.message });
// //   }
// // };

// // // Update Product (Edit Price, Stock, Name, etc.)
// // exports.updateProduct = async (req, res) => {
// //   try {
// //     const productId = req.params.id;
// //     const existingProduct = await Product.findById(productId);
// //     if (!existingProduct) return res.status(404).json({ message: "Product not found" });

// //     // 1. Process Text Fields
// //     let updateData = { ...req.body };

// //     // 2. Parse Complex JSON Arrays from FormData
// //     if (req.body.specs) updateData.specs = JSON.parse(req.body.specs);
// //     if (req.body.features) updateData.features = JSON.parse(req.body.features);
    
// //     // 3. Handle Images: Start with the images the admin chose to KEEP
// //     let finalImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
    
// //     // 4. Handle Banners: Start with existing banners
// //     updateData.banners = existingProduct.banners;

// //     // 5. Check for NEW uploaded files (from PC)
// //     if (req.files) {
// //       if (req.files.images) {
// //         // Process new local image uploads
// //         const uploadedImages = req.files.images.map(file => `http://localhost:5000/uploads/${file.filename}`);
// //         finalImages = [...finalImages, ...uploadedImages]; // Merge kept images with new ones
// //       }
// //       if (req.files.banners) {
// //         // Process new banner uploads
// //         updateData.banners = req.files.banners.map(file => `http://localhost:5000/uploads/${file.filename}`);
// //       }
// //     }

// //     // Assign the merged images array
// //     updateData.images = finalImages;

// //     // 6. Perform the DB Update
// //     const updatedProduct = await Product.findByIdAndUpdate(
// //       productId,
// //       { $set: updateData },
// //       { new: true, runValidators: true } // Return new doc and run schema validation
// //     );

// //     res.status(200).json(updatedProduct);
// //   } catch (error) {
// //     console.error("Advanced Update Error:", error);
// //     res.status(500).json({ message: 'Server error updating product', error: error.message });
// //   }
// // };

// // // Delete Product
// // exports.deleteProduct = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (!product) {
// //       return res.status(404).json({ message: 'Product not found' });
// //     }
// //     await Product.findByIdAndDelete(req.params.id);
// //     res.status(200).json({ message: 'Product deleted successfully' });
// //   } catch (error) {
// //     console.error("Delete Error:", error);
// //     res.status(500).json({ message: 'Error deleting product', error: error.message });
// //   }
// // };



// // const Product = require('../models/Product');

// // exports.getProducts = async (req, res) => {
// //   try {
// //     const products = await Product.find({});
// //     res.status(200).json(products);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching products', error: error.message });
// //   }
// // };

// // // 🚀 UPGRADED: Handle Files + Gadget Specs + Brand & Best Seller
// // exports.createProduct = async (req, res) => {
// //   try {
// //     // 🚀 ADDED: Extract brand and isBestSeller
// //     let { name, description, price, discountPrice, category, stock, brand, isBestSeller } = req.body;
    
// //     // Because we are using FormData, Arrays come in as JSON strings. We must parse them.
// //     let specs = req.body.specs ? JSON.parse(req.body.specs) : [];
// //     let features = req.body.features ? JSON.parse(req.body.features) : [];
// //     let imageUrls = req.body.imageUrls ? JSON.parse(req.body.imageUrls) : []; // Web URLs

// //     // 🚀 ADDED: Convert string 'true'/'false' from FormData to actual boolean
// //     const isBestSellerBool = isBestSeller === 'true';

// //     // Check for PC Uploads (Files)
// //     if (req.files) {
// //       if (req.files.images) {
// //         // Map the uploaded files to our local server URL
// //         const uploadedImages = req.files.images.map(file => `http://localhost:5000/uploads/${file.filename}`);
// //         imageUrls = [...imageUrls, ...uploadedImages]; // Combine Web URLs with PC Uploads
// //       }
// //       if (req.files.banners) {
// //         const uploadedBanners = req.files.banners.map(file => `http://localhost:5000/uploads/${file.filename}`);
// //         req.body.banners = uploadedBanners;
// //       }
// //     }

// //     const newProduct = new Product({
// //       name, description, price, discountPrice, category, stock, 
// //       brand, isBestSeller: isBestSellerBool, // 🚀 Saved here
// //       specs, features, images: imageUrls, banners: req.body.banners || []
// //     });

// //     const savedProduct = await newProduct.save();
// //     res.status(201).json(savedProduct);
// //   } catch (error) {
// //     console.error("Product Creation Error:", error);
// //     res.status(500).json({ message: 'Error creating product', error: error.message });
// //   }
// // };

// // // Fetch a single product by ID
// // exports.getProductById = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (product) {
// //       res.status(200).json(product);
// //     } else {
// //       res.status(404).json({ message: 'Product not found' });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching product', error: error.message });
// //   }
// // };

// // // Update Product (Edit Price, Stock, Name, etc.)
// // exports.updateProduct = async (req, res) => {
// //   try {
// //     const productId = req.params.id;
// //     const existingProduct = await Product.findById(productId);
// //     if (!existingProduct) return res.status(404).json({ message: "Product not found" });

// //     // 1. Process Text Fields (This automatically captures `brand` from req.body)
// //     let updateData = { ...req.body };

// //     // 🚀 ADDED: Parse boolean for isBestSeller (FormData sends it as string)
// //     if (req.body.isBestSeller !== undefined) {
// //       updateData.isBestSeller = req.body.isBestSeller === 'true';
// //     }

// //     // 2. Parse Complex JSON Arrays from FormData
// //     if (req.body.specs) updateData.specs = JSON.parse(req.body.specs);
// //     if (req.body.features) updateData.features = JSON.parse(req.body.features);
    
// //     // 3. Handle Images: Start with the images the admin chose to KEEP
// //     let finalImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
    
// //     // 4. Handle Banners: Start with existing banners
// //     updateData.banners = existingProduct.banners;

// //     // 5. Check for NEW uploaded files (from PC)
// //     if (req.files) {
// //       if (req.files.images) {
// //         // Process new local image uploads
// //         const uploadedImages = req.files.images.map(file => `http://localhost:5000/uploads/${file.filename}`);
// //         finalImages = [...finalImages, ...uploadedImages]; // Merge kept images with new ones
// //       }
// //       if (req.files.banners) {
// //         // Process new banner uploads
// //         updateData.banners = req.files.banners.map(file => `http://localhost:5000/uploads/${file.filename}`);
// //       }
// //     }

// //     // Assign the merged images array
// //     updateData.images = finalImages;

// //     // 6. Perform the DB Update
// //     const updatedProduct = await Product.findByIdAndUpdate(
// //       productId,
// //       { $set: updateData },
// //       { new: true, runValidators: true } // Return new doc and run schema validation
// //     );

// //     res.status(200).json(updatedProduct);
// //   } catch (error) {
// //     console.error("Advanced Update Error:", error);
// //     res.status(500).json({ message: 'Server error updating product', error: error.message });
// //   }
// // };

// // // Delete Product
// // exports.deleteProduct = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (!product) {
// //       return res.status(404).json({ message: 'Product not found' });
// //     }
// //     await Product.findByIdAndDelete(req.params.id);
// //     res.status(200).json({ message: 'Product deleted successfully' });
// //   } catch (error) {
// //     console.error("Delete Error:", error);
// //     res.status(500).json({ message: 'Error deleting product', error: error.message });
// //   }
// // };


// const Product = require('../models/Product');

// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching products', error: error.message });
//   }
// };

// // 🚀 UPGRADED: Handle Files + Specs + Brand + Best Seller + SEO
// exports.createProduct = async (req, res) => {
//   try {
//     // 🚀 ADDED SEO FIELDS TO EXTRACTION
//     let { 
//       name, description, price, discountPrice, category, 
//       stock, brand, isBestSeller, seoTitle, seoDescription, seoKeywords 
//     } = req.body;
    
//     let specs = req.body.specs ? JSON.parse(req.body.specs) : [];
//     let features = req.body.features ? JSON.parse(req.body.features) : [];
//     let imageUrls = req.body.imageUrls ? JSON.parse(req.body.imageUrls) : [];

//     const isBestSellerBool = isBestSeller === 'true';

//     if (req.files) {
//       if (req.files.images) {
//         const uploadedImages = req.files.images.map(file => `http://localhost:5000/uploads/${file.filename}`);
//         imageUrls = [...imageUrls, ...uploadedImages];
//       }
//       if (req.files.banners) {
//         req.body.banners = req.files.banners.map(file => `http://localhost:5000/uploads/${file.filename}`);
//       }
//     }

//     const newProduct = new Product({
//       name, 
//       description, 
//       price, 
//       discountPrice, 
//       category, 
//       stock, 
//       brand, 
//       isBestSeller: isBestSellerBool,
//       specs, 
//       features, 
//       images: imageUrls, 
//       banners: req.body.banners || [],
//       // 🚀 SAVE SEO DATA (with fallbacks)
//       seoTitle: seoTitle || name,
//       seoDescription: seoDescription || description.substring(0, 160),
//       seoKeywords: seoKeywords || ""
//     });

//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.error("Product Creation Error:", error);
//     res.status(500).json({ message: 'Error creating product', error: error.message });
//   }
// };

// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.status(200).json(product);
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching product', error: error.message });
//   }
// };

// // 🚀 UPGRADED UPDATE: Now handles SEO updates
// exports.updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const existingProduct = await Product.findById(productId);
//     if (!existingProduct) return res.status(404).json({ message: "Product not found" });

//     let updateData = { ...req.body };

//     if (req.body.isBestSeller !== undefined) {
//       updateData.isBestSeller = req.body.isBestSeller === 'true';
//     }

//     if (req.body.specs) updateData.specs = JSON.parse(req.body.specs);
//     if (req.body.features) updateData.features = JSON.parse(req.body.features);
    
//     let finalImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
//     updateData.banners = existingProduct.banners;

//     if (req.files) {
//       if (req.files.images) {
//         const uploadedImages = req.files.images.map(file => `http://localhost:5000/uploads/${file.filename}`);
//         finalImages = [...finalImages, ...uploadedImages];
//       }
//       if (req.files.banners) {
//         updateData.banners = req.files.banners.map(file => `http://localhost:5000/uploads/${file.filename}`);
//       }
//     }

//     updateData.images = finalImages;

//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     );

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     console.error("Advanced Update Error:", error);
//     res.status(500).json({ message: 'Server error updating product', error: error.message });
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     console.error("Delete Error:", error);
//     res.status(500).json({ message: 'Error deleting product', error: error.message });
//   }
// };


// // controllers/productController.js
// const Product = require('../models/Product');

// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching products', error: error.message });
//   }
// };

// exports.createProduct = async (req, res) => {
//   try {
//     let { 
//       name, description, price, discountPrice, category, 
//       stock, brand, isBestSeller, seoTitle, seoDescription, seoKeywords 
//     } = req.body;
    
//     let specs = req.body.specs ? JSON.parse(req.body.specs) : [];
//     let features = req.body.features ? JSON.parse(req.body.features) : [];
//     let variants = req.body.variants ? JSON.parse(req.body.variants) : []; // 🚀 PARSE VARIANTS
//     let imageUrls = req.body.imageUrls ? JSON.parse(req.body.imageUrls) : [];

//     const isBestSellerBool = isBestSeller === 'true';

//     if (req.files) {
//       if (req.files.images) {
//         const uploadedImages = req.files.images.map(file => `http://localhost:5000/uploads/${file.filename}`);
//         imageUrls = [...imageUrls, ...uploadedImages];
//       }
//       if (req.files.banners) {
//         req.body.banners = req.files.banners.map(file => `http://localhost:5000/uploads/${file.filename}`);
//       }
//     }

//     const newProduct = new Product({
//       name, description, price, discountPrice, category, stock, brand, isBestSeller: isBestSellerBool,
//       specs, features, variants, images: imageUrls, banners: req.body.banners || [], // 🚀 SAVE VARIANTS
//       seoTitle: seoTitle || name,
//       seoDescription: seoDescription || description.substring(0, 160),
//       seoKeywords: seoKeywords || ""
//     });

//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.error("Product Creation Error:", error);
//     res.status(500).json({ message: 'Error creating product', error: error.message });
//   }
// };

// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.status(200).json(product);
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching product', error: error.message });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const existingProduct = await Product.findById(productId);
//     if (!existingProduct) return res.status(404).json({ message: "Product not found" });

//     let updateData = { ...req.body };

//     if (req.body.isBestSeller !== undefined) {
//       updateData.isBestSeller = req.body.isBestSeller === 'true';
//     }

//     if (req.body.specs) updateData.specs = JSON.parse(req.body.specs);
//     if (req.body.features) updateData.features = JSON.parse(req.body.features);
//     if (req.body.variants) updateData.variants = JSON.parse(req.body.variants); // 🚀 UPDATE VARIANTS
    
//     let finalImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
//     updateData.banners = existingProduct.banners;

//     if (req.files) {
//       if (req.files.images) {
//         const uploadedImages = req.files.images.map(file => `http://localhost:5000/uploads/${file.filename}`);
//         finalImages = [...finalImages, ...uploadedImages];
//       }
//       if (req.files.banners) {
//         updateData.banners = req.files.banners.map(file => `http://localhost:5000/uploads/${file.filename}`);
//       }
//     }

//     updateData.images = finalImages;

//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     );

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     console.error("Advanced Update Error:", error);
//     res.status(500).json({ message: 'Server error updating product', error: error.message });
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     console.error("Delete Error:", error);
//     res.status(500).json({ message: 'Error deleting product', error: error.message });
//   }
// };

// // controllers/productController.js
// const Product = require('../models/Product');

// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching products', error: error.message });
//   }
// };

// exports.createProduct = async (req, res) => {
//   try {
//     let { 
//       name, description, price, discountPrice, category, 
//       stock, brand, isBestSeller, seoTitle, seoDescription, seoKeywords,
//       returnPolicy, warrantyPolicy // 🚀 EXTRACTION
//     } = req.body;
    
//     let specs = req.body.specs ? JSON.parse(req.body.specs) : [];
//     let features = req.body.features ? JSON.parse(req.body.features) : [];
//     let variants = req.body.variants ? JSON.parse(req.body.variants) : [];
//     let imageUrls = req.body.imageUrls ? JSON.parse(req.body.imageUrls) : [];

//     const isBestSellerBool = isBestSeller === 'true';

//     if (req.files) {
//       if (req.files.images) {
//         const uploadedImages = req.files.images.map(file => `http://localhost:5000/uploads/${file.filename}`);
//         imageUrls = [...imageUrls, ...uploadedImages];
//       }
//       if (req.files.banners) {
//         req.body.banners = req.files.banners.map(file => `http://localhost:5000/uploads/${file.filename}`);
//       }
//     }

//     const newProduct = new Product({
//       name, description, price, discountPrice, category, stock, brand, isBestSeller: isBestSellerBool,
//       specs, features, variants, images: imageUrls, banners: req.body.banners || [],
//       seoTitle: seoTitle || name,
//       seoDescription: seoDescription || description.substring(0, 160),
//       seoKeywords: seoKeywords || "",
//       returnPolicy: returnPolicy || '7 Days Replacement', // 🚀 SAVE
//       warrantyPolicy: warrantyPolicy || '1 Year Warranty' // 🚀 SAVE
//     });

//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.error("Product Creation Error:", error);
//     res.status(500).json({ message: 'Error creating product', error: error.message });
//   }
// };

// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.status(200).json(product);
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching product', error: error.message });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const existingProduct = await Product.findById(productId);
//     if (!existingProduct) return res.status(404).json({ message: "Product not found" });

//     let updateData = { ...req.body };

//     if (req.body.isBestSeller !== undefined) {
//       updateData.isBestSeller = req.body.isBestSeller === 'true';
//     }

//     if (req.body.specs) updateData.specs = JSON.parse(req.body.specs);
//     if (req.body.features) updateData.features = JSON.parse(req.body.features);
//     if (req.body.variants) updateData.variants = JSON.parse(req.body.variants); 
    
//     let finalImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
//     updateData.banners = existingProduct.banners;

//     if (req.files) {
//       if (req.files.images) {
//         const uploadedImages = req.files.images.map(file => `http://localhost:5000/uploads/${file.filename}`);
//         finalImages = [...finalImages, ...uploadedImages];
//       }
//       if (req.files.banners) {
//         updateData.banners = req.files.banners.map(file => `http://localhost:5000/uploads/${file.filename}`);
//       }
//     }

//     updateData.images = finalImages;

//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     );

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     console.error("Advanced Update Error:", error);
//     res.status(500).json({ message: 'Server error updating product', error: error.message });
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     console.error("Delete Error:", error);
//     res.status(500).json({ message: 'Error deleting product', error: error.message });
//   }
// };


// const Product = require('../models/Product');

// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching products', error: error.message });
//   }
// };

// exports.createProduct = async (req, res) => {
//   try {
//     let { 
//       name, description, price, discountPrice, category, 
//       stock, brand, isBestSeller, seoTitle, seoDescription, seoKeywords,
//       returnPolicy, warrantyPolicy
//     } = req.body;
    
//     let specs = req.body.specs ? JSON.parse(req.body.specs) : [];
//     let features = req.body.features ? JSON.parse(req.body.features) : [];
//     let variants = req.body.variants ? JSON.parse(req.body.variants) : [];
//     let imageUrls = [];
//     let bannerUrls = [];

//     const isBestSellerBool = isBestSeller === 'true';

//     // 🚀 FIXED: Handle files separately from body strings
//     if (req.files) {
//       if (req.files.images) {
//         imageUrls = req.files.images.map(file => `uploads/${file.filename}`);
//       }
//       if (req.files.banners) {
//         bannerUrls = req.files.banners.map(file => `uploads/${file.filename}`);
//       }
//     }

//     const newProduct = new Product({
//       name, description, price, discountPrice, category, stock, brand, isBestSeller: isBestSellerBool,
//       specs, features, variants, 
//       images: imageUrls, 
//       banners: bannerUrls,
//       seoTitle: seoTitle || name,
//       seoDescription: seoDescription || (description ? description.substring(0, 160) : ""),
//       seoKeywords: seoKeywords || "",
//       returnPolicy: returnPolicy || '7 Days Replacement',
//       warrantyPolicy: warrantyPolicy || '1 Year Warranty'
//     });

//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating product', error: error.message });
//   }
// };

// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.status(200).json(product);
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching product', error: error.message });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const existingProduct = await Product.findById(productId);
//     if (!existingProduct) return res.status(404).json({ message: "Product not found" });

//     let updateData = { ...req.body };
    
//     if (req.body.isBestSeller !== undefined) updateData.isBestSeller = req.body.isBestSeller === 'true';
//     if (req.body.specs) updateData.specs = JSON.parse(req.body.specs);
//     if (req.body.features) updateData.features = JSON.parse(req.body.features);
//     if (req.body.variants) updateData.variants = JSON.parse(req.body.variants); 
    
//     // Manage Images (Strip localhost if present)
//     let finalImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
//     finalImages = finalImages.map(img => img.replace('http://localhost:5000/', ''));

//     // Manage Banners (Start with existing ones)
//     let finalBanners = existingProduct.banners || [];

//     if (req.files) {
//       if (req.files.images && req.files.images.length > 0) {
//         const uploadedImages = req.files.images.map(file => `uploads/${file.filename}`);
//         finalImages = [...finalImages, ...uploadedImages];
//       }
//       if (req.files.banners && req.files.banners.length > 0) {
//         // 🚀 NEW: Replace banners only if new files are provided
//         finalBanners = req.files.banners.map(file => `uploads/${file.filename}`);
//       }
//     }

//     updateData.images = finalImages;
//     updateData.banners = finalBanners;

//     // Safety: prevent over-writing reviews during product edit
//     delete updateData.reviews;
//     delete updateData.ratings;
//     delete updateData.numOfReviews;

//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId, 
//       { $set: updateData }, 
//       { new: true, runValidators: true }
//     );
    
//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     console.error("Update Error:", error.message);
//     res.status(500).json({ message: 'Server error updating product', error: error.message });
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting product', error: error.message });
//   }
// };

// // ... [Review System Logic remains the same] ...

// // ==========================================
// // 🚀 NEW: REVIEW SYSTEM LOGIC
// // ==========================================

// // User submits a review (Pending Approval)
// exports.createProductReview = async (req, res) => {
//   try {
//     const { rating, comment, userId, userName } = req.body;
//     const product = await Product.findById(req.params.id);

//     if (product) {
//       const review = {
//         user: userId,
//         name: userName,
//         rating: Number(rating),
//         comment,
//         isApproved: false // Admin must approve
//       };

//       product.reviews.push(review);
//       await product.save();
//       res.status(201).json({ message: 'Review submitted. Waiting for admin approval.' });
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error submitting review', error: error.message });
//   }
// };

// // Admin gets all unapproved reviews across all products
// exports.getPendingReviews = async (req, res) => {
//   try {
//     const products = await Product.find({ "reviews.isApproved": false });
//     let pendingReviews = [];
    
//     products.forEach(product => {
//       product.reviews.forEach(review => {
//         if (!review.isApproved) {
//           pendingReviews.push({ productId: product._id, productName: product.name, review });
//         }
//       });
//     });

//     res.status(200).json(pendingReviews);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching pending reviews' });
//   }
// };

// // Admin Approves or Rejects a review
// exports.updateReviewStatus = async (req, res) => {
//   try {
//     const { productId, reviewId, status } = req.body; 
//     const product = await Product.findById(productId);

//     if (product) {
//       if (status === 'rejected') {
//         product.reviews = product.reviews.filter(r => r._id.toString() !== reviewId);
//       } else if (status === 'approved') {
//         const review = product.reviews.find(r => r._id.toString() === reviewId);
//         if (review) review.isApproved = true;
        
//         // Recalculate average ratings dynamically based ONLY on approved reviews
//         const approvedReviews = product.reviews.filter(r => r.isApproved);
//         product.numOfReviews = approvedReviews.length;
//         if (approvedReviews.length > 0) {
//           product.ratings = approvedReviews.reduce((acc, item) => item.rating + acc, 0) / approvedReviews.length;
//         } else {
//           product.ratings = 0;
//         }
//       }

//       await product.save();
//       res.status(200).json({ message: `Review ${status} successfully` });
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating review' });
//   }
// };


// // controllers/productController.js
// const Product = require('../models/Product');

// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching products', error: error.message });
//   }
// };

// exports.createProduct = async (req, res) => {
//   try {
//     let { 
//       name, description, price, discountPrice, category, 
//       stock, brand, isBestSeller, seoTitle, seoDescription, seoKeywords,
//       returnPolicy, warrantyPolicy, isCancellable, cancellationWindowHours
//     } = req.body;
    
//     let specs = req.body.specs ? JSON.parse(req.body.specs) : [];
//     let features = req.body.features ? JSON.parse(req.body.features) : [];
//     let variants = req.body.variants ? JSON.parse(req.body.variants) : [];
//     let imageUrls = [];
//     let bannerUrls = [];

//     const isBestSellerBool = isBestSeller === 'true';

//     // 🚀 FIXED: Grab the Cloudinary URL (file.path) instead of prepending 'uploads/'
//     if (req.files) {
//       if (req.files.images) {
//         imageUrls = req.files.images.map(file => file.path);
//       }
//       if (req.files.banners) {
//         bannerUrls = req.files.banners.map(file => file.path);
//       }
//     }

//     const newProduct = new Product({
//       name, description, price, discountPrice, category, stock, brand, isBestSeller: isBestSellerBool,
//       specs, features, variants, 
//       images: imageUrls, 
//       banners: bannerUrls,
//       seoTitle: seoTitle || name,
//       seoDescription: seoDescription || (description ? description.substring(0, 160) : ""),
//       seoKeywords: seoKeywords || "",
//       returnPolicy: returnPolicy || '7 Days Replacement',
//       warrantyPolicy: warrantyPolicy || '1 Year Warranty',
//       isCancellable: isCancellable !== 'false', // defaults to true unless explicitly false
//       cancellationWindowHours: cancellationWindowHours || 24
//     });

//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating product', error: error.message });
//   }
// };

// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.status(200).json(product);
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching product', error: error.message });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const existingProduct = await Product.findById(productId);
//     if (!existingProduct) return res.status(404).json({ message: "Product not found" });

//     let updateData = { ...req.body };
    
//     if (req.body.isBestSeller !== undefined) updateData.isBestSeller = req.body.isBestSeller === 'true';
//     if (req.body.isCancellable !== undefined) updateData.isCancellable = req.body.isCancellable === 'true';
//     if (req.body.specs) updateData.specs = JSON.parse(req.body.specs);
//     if (req.body.features) updateData.features = JSON.parse(req.body.features);
//     if (req.body.variants) updateData.variants = JSON.parse(req.body.variants); 
    
//     // Manage Images (Keep existing Cloudinary URLs intact)
//     let finalImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];

//     // Manage Banners (Start with existing ones)
//     let finalBanners = req.body.existingBanners ? JSON.parse(req.body.existingBanners) : (existingProduct.banners || []);

//     // 🚀 FIXED: Grab the Cloudinary URL (file.path) for new uploads during edits
//     if (req.files) {
//       if (req.files.images && req.files.images.length > 0) {
//         const uploadedImages = req.files.images.map(file => file.path);
//         finalImages = [...finalImages, ...uploadedImages];
//       }
//       if (req.files.banners && req.files.banners.length > 0) {
//         // Replace banners if new ones are uploaded
//         finalBanners = req.files.banners.map(file => file.path);
//       }
//     }

//     updateData.images = finalImages;
//     updateData.banners = finalBanners;

//     // Safety: prevent over-writing reviews during product edit
//     delete updateData.reviews;
//     delete updateData.ratings;
//     delete updateData.numOfReviews;

//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId, 
//       { $set: updateData }, 
//       { new: true, runValidators: true }
//     );
    
//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     console.error("Update Error:", error.message);
//     res.status(500).json({ message: 'Server error updating product', error: error.message });
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting product', error: error.message });
//   }
// };

// // ==========================================
// // 🚀 REVIEW SYSTEM LOGIC
// // ==========================================

// // User submits a review (Pending Approval)
// exports.createProductReview = async (req, res) => {
//   try {
//     const { rating, comment, userId, userName } = req.body;
//     const product = await Product.findById(req.params.id);

//     if (product) {
//       const review = {
//         user: userId,
//         name: userName,
//         rating: Number(rating),
//         comment,
//         isApproved: false // Admin must approve
//       };

//       product.reviews.push(review);
//       await product.save();
//       res.status(201).json({ message: 'Review submitted. Waiting for admin approval.' });
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error submitting review', error: error.message });
//   }
// };

// // Admin gets all unapproved reviews across all products
// exports.getPendingReviews = async (req, res) => {
//   try {
//     const products = await Product.find({ "reviews.isApproved": false });
//     let pendingReviews = [];
    
//     products.forEach(product => {
//       product.reviews.forEach(review => {
//         if (!review.isApproved) {
//           pendingReviews.push({ productId: product._id, productName: product.name, review });
//         }
//       });
//     });

//     res.status(200).json(pendingReviews);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching pending reviews' });
//   }
// };

// // Admin Approves or Rejects a review
// exports.updateReviewStatus = async (req, res) => {
//   try {
//     const { productId, reviewId, status } = req.body; 
//     const product = await Product.findById(productId);

//     if (product) {
//       if (status === 'rejected') {
//         product.reviews = product.reviews.filter(r => r._id.toString() !== reviewId);
//       } else if (status === 'approved') {
//         const review = product.reviews.find(r => r._id.toString() === reviewId);
//         if (review) review.isApproved = true;
        
//         // Recalculate average ratings dynamically based ONLY on approved reviews
//         const approvedReviews = product.reviews.filter(r => r.isApproved);
//         product.numOfReviews = approvedReviews.length;
//         if (approvedReviews.length > 0) {
//           product.ratings = approvedReviews.reduce((acc, item) => item.rating + acc, 0) / approvedReviews.length;
//         } else {
//           product.ratings = 0;
//         }
//       }

//       await product.save();
//       res.status(200).json({ message: `Review ${status} successfully` });
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating review' });
//   }
// };



// controllers/productController.js
const Product = require('../models/Product');
const User = require('../models/User'); // 🚀 NEW: Needed for wallet payouts
const WalletTransaction = require('../models/WalletTransaction'); // 🚀 NEW: Needed for wallet history
const { createNotification } = require('./notificationController'); // 🚀 NEW: Send them an alert!

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    let { 
      name, description, price, discountPrice, category, 
      stock, brand, isBestSeller, seoTitle, seoDescription, seoKeywords,
      returnPolicy, warrantyPolicy, isCancellable, cancellationWindowHours,
      affiliateCommission, reviewCommission
    } = req.body;
    
    let specs = req.body.specs ? JSON.parse(req.body.specs) : [];
    let features = req.body.features ? JSON.parse(req.body.features) : [];
    let variants = req.body.variants ? JSON.parse(req.body.variants) : [];
    let imageUrls = [];
    let bannerUrls = [];

    const isBestSellerBool = isBestSeller === 'true';

    // Grab the Cloudinary URL (file.path)
    if (req.files) {
      if (req.files.images) imageUrls = req.files.images.map(file => file.path);
      if (req.files.banners) bannerUrls = req.files.banners.map(file => file.path);
    }

    const newProduct = new Product({
      name, description, price, discountPrice, category, stock, brand, isBestSeller: isBestSellerBool,
      specs, features, variants, images: imageUrls, banners: bannerUrls,
      seoTitle: seoTitle || name,
      seoDescription: seoDescription || (description ? description.substring(0, 160) : ""),
      seoKeywords: seoKeywords || "",
      returnPolicy: returnPolicy || '7 Days Replacement',
      warrantyPolicy: warrantyPolicy || '1 Year Warranty',
      isCancellable: isCancellable !== 'false', 
      cancellationWindowHours: cancellationWindowHours || 24,
      affiliateCommission: affiliateCommission ? Number(affiliateCommission) : 0,
      reviewCommission: reviewCommission ? Number(reviewCommission) : 0
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.status(200).json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) return res.status(404).json({ message: "Product not found" });

    let updateData = { ...req.body };
    
    if (req.body.isBestSeller !== undefined) updateData.isBestSeller = req.body.isBestSeller === 'true';
    if (req.body.isCancellable !== undefined) updateData.isCancellable = req.body.isCancellable === 'true';
    if (req.body.affiliateCommission !== undefined) updateData.affiliateCommission = Number(req.body.affiliateCommission);
    if (req.body.reviewCommission !== undefined) updateData.reviewCommission = Number(req.body.reviewCommission); 

    if (req.body.specs) updateData.specs = JSON.parse(req.body.specs);
    if (req.body.features) updateData.features = JSON.parse(req.body.features);
    if (req.body.variants) updateData.variants = JSON.parse(req.body.variants); 
    
    let finalImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
    let finalBanners = req.body.existingBanners ? JSON.parse(req.body.existingBanners) : (existingProduct.banners || []);

    if (req.files) {
      if (req.files.images && req.files.images.length > 0) {
        const uploadedImages = req.files.images.map(file => file.path);
        finalImages = [...finalImages, ...uploadedImages];
      }
      if (req.files.banners && req.files.banners.length > 0) {
        finalBanners = req.files.banners.map(file => file.path);
      }
    }

    updateData.images = finalImages;
    updateData.banners = finalBanners;

    delete updateData.reviews;
    delete updateData.ratings;
    delete updateData.numOfReviews;

    const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: updateData }, { new: true, runValidators: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating product', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// ==========================================
// 🚀 REVIEW SYSTEM LOGIC
// ==========================================

// User submits a review (Pending Approval)
exports.createProductReview = async (req, res) => {
  try {
    const { rating, comment, userId, userName } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const review = {
        user: userId,
        name: userName,
        rating: Number(rating),
        comment,
        isApproved: false // Admin must approve
      };

      product.reviews.push(review);
      await product.save();
      res.status(201).json({ message: 'Review submitted. Waiting for admin approval.' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error submitting review', error: error.message });
  }
};

// Admin gets all unapproved reviews across all products
exports.getPendingReviews = async (req, res) => {
  try {
    const products = await Product.find({ "reviews.isApproved": false });
    let pendingReviews = [];
    
    products.forEach(product => {
      product.reviews.forEach(review => {
        if (!review.isApproved) {
          pendingReviews.push({ productId: product._id, productName: product.name, review });
        }
      });
    });

    res.status(200).json(pendingReviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending reviews' });
  }
};

// Admin Approves or Rejects a review
exports.updateReviewStatus = async (req, res) => {
  try {
    const { productId, reviewId, status } = req.body; 
    const product = await Product.findById(productId);

    if (product) {
      if (status === 'rejected') {
        product.reviews = product.reviews.filter(r => r._id.toString() !== reviewId);
      } else if (status === 'approved') {
        const review = product.reviews.find(r => r._id.toString() === reviewId);
        
        // 🚀 ONLY PROCEED IF THE REVIEW HASN'T BEEN APPROVED YET
        if (review && !review.isApproved) {
          review.isApproved = true;
          
          // ==========================================
          // 🚀 REVIEW PAYOUT LOGIC
          // ==========================================
          if (product.reviewCommission && product.reviewCommission > 0) {
            try {
              const reviewer = await User.findById(review.user);
              if (reviewer) {
                // 1. Add money to wallet
                reviewer.wallet.availableBalance += product.reviewCommission;
                reviewer.wallet.totalEarnings += product.reviewCommission;
                await reviewer.save();

                // 2. Create Transaction History
                await WalletTransaction.create({ 
                  userId: reviewer._id, 
                  amount: product.reviewCommission, 
                  type: 'credit', 
                  source: 'review_reward', 
                  status: 'completed'
                });

                // 3. Send Notification
                await createNotification(
                  reviewer._id, 
                  "Review Approved! 📝", 
                  `Your review for ${product.name} was approved. ₹${product.reviewCommission} has been added to your wallet!`, 
                  "success", 
                  "/wallet"
                );
              }
            } catch (err) {
              console.error("Review Reward Error:", err);
            }
          }
          // ==========================================
        }
        
        // Recalculate average ratings dynamically based ONLY on approved reviews
        const approvedReviews = product.reviews.filter(r => r.isApproved);
        product.numOfReviews = approvedReviews.length;
        if (approvedReviews.length > 0) {
          product.ratings = approvedReviews.reduce((acc, item) => item.rating + acc, 0) / approvedReviews.length;
        } else {
          product.ratings = 0;
        }
      }

      await product.save();
      res.status(200).json({ message: `Review ${status} successfully` });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating review' });
  }
};