const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
