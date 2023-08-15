const multer = require('multer');
const { Router } = require('express');
const imagesController = require('../controllers/images');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const imagesRouter = Router();

imagesRouter.get("/", imagesController.index);
imagesRouter.post("/", upload.single('image'), imagesController.create);
imagesRouter.get("/:id", imagesController.show);
imagesRouter.patch("/:id", upload.single('image'), imagesController.update);
imagesRouter.delete("/:id", imagesController.destroy);

module.exports = imagesRouter;