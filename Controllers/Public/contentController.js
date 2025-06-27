const CompanyContent = require('../../Models/contentModel');
const catchAsync = require('../../Utils/catchAsync');

const getContent = catchAsync(async (req, res) => {
  const { type } = req.params;
  const content = await CompanyContent.findOne({ type });

  if (!content) {
    return res.status(404).json({ message: 'Content not found' });
  }

  res.status(200).json({ data: content });
});

module.exports = {getContent}