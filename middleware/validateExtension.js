const validateExtension = (req, res, next) => {
  try{
  const fileName = req.file.originalname;
  const extension = fileName.split(".").pop().toLowerCase();
  const allowedExtensions = [
    "mp3",
    "mp4",
    "wav",
    "m4a",
    "flac",
    "aac",
    "ogg",
    "wma",
    "mov"
  ];
  if (!allowedExtensions.includes(extension)) {
    throw {
      code: 400,
      message:
        "Invalid file extension. Allowed extensions are: " +
        allowedExtensions.join(", "),
    };
  }
    next();
  } catch (err){
    res.status(err.code).send(err.message); 
  };
};
module.exports = { validateExtension };
