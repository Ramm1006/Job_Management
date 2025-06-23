"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const jobs_1 = __importDefault(require("./routes/jobs"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use(
  (0, cors_1.default)({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://job-management-cwnu.vercel.app/"
        : "http://localhost:3000",
  })
);
app.use(express_1.default.json());
// Use MongoDB Atlas URI in production
const MONGODB_URI =
  process.env.MONGODB_URI ||
"mongodb://Ramm:Ramm1234@ac-xyz-shard-00-00.mongodb.net:27017,ac-xyz-shard-00-01.mongodb.net:27017,ac-xyz-shard-00-02.mongodb.net:27017/job-management?ssl=true&replicaSet=atlas-xyz-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
app.use('/api/auth', auth_1.default);
app.use('/api/jobs', jobs_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || 'Something went wrong!' });
});
// For Vercel serverless deployment
exports.default = app;
// Only listen when running locally
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
