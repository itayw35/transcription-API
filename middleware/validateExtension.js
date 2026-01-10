const validateExtension = (fileName) => {
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
  ];
  if (!allowedExtensions.includes(extension)) {
    throw {
      code: 400,
      message:
        "Invalid file extension. Allowed extensions are: " +
        allowedExtensions.join(", "),
    };
  }
  return (req, res, next) => {
    next();
  };
};
module.exports = { validateExtension };
