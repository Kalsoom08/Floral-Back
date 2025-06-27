const CompanyContent = require('../../Models/contentModel');

const catchAsync = require('../../Utils/catchAsync');

const upsertContent = catchAsync(async (req, res) => {
  const { type, content } = req.body;

  const updated = await CompanyContent.findOneAndUpdate(
    { type },
    { content },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(200).json({
    message: 'Content saved successfully',
    data: updated
  });
});




module.exports = { upsertContent};

