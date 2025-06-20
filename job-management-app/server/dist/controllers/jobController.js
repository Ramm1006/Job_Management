"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJob = exports.createJob = exports.getJob = exports.getJobs = void 0;
const Job_1 = __importDefault(require("../models/Job"));
const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, type, location } = req.query;
        let searchQuery = {};
        if (query) {
            searchQuery.$or = [
                { title: { $regex: query, $options: 'i' } },
                { company: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ];
        }
        if (type) {
            searchQuery.type = type;
        }
        if (location) {
            searchQuery.location = { $regex: location, $options: 'i' };
        }
        const jobs = yield Job_1.default.find(searchQuery).sort({ postedDate: -1 });
        res.json(jobs);
    }
    catch (error) {
        console.error('Error in getJobs:', error);
        res.status(500).json({ message: 'Error fetching jobs' });
    }
});
exports.getJobs = getJobs;
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid job ID format' });
        }
        const job = yield Job_1.default.findById(id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    }
    catch (error) {
        console.error('Error in getJob:', error);
        res.status(500).json({
            message: 'Error fetching job',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getJob = getJob;
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobData = req.body;
        const newJob = new Job_1.default(jobData);
        yield newJob.save();
        res.status(201).json(newJob);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating job' });
    }
});
exports.createJob = createJob;
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid job ID format' });
        }
        const updatedJob = yield Job_1.default.findByIdAndUpdate(id, Object.assign({}, req.body), { new: true });
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(updatedJob);
    }
    catch (error) {
        console.error('Error in updateJob:', error);
        res.status(500).json({ message: 'Error updating job' });
    }
});
exports.updateJob = updateJob;
