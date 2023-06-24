const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 5000;
const path = require('path');
const dataFilePath = path.join(__dirname, 'data.json');