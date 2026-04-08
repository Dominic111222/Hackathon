const express = require('express');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', dataRoutes);


if (require.main === module) {
  app.listen(5000, () =>
    console.log('Backend running on http://localhost:5000')
  );
}

// ✅ IMPORTANT: EXPORT app for testing
module.exports = app;