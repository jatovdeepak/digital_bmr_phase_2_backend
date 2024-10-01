const express = require('express');
const cors = require('cors');
const convertRoutes = require('./routes/convert');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/api', convertRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
