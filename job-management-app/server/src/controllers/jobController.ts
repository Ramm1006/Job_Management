import { Request, Response } from 'express';
import Job from '../models/Job';
import { JobCreateInput } from '../types';

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { query, type, location } = req.query;
    let searchQuery: any = {};

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

    const jobs = await Job.find(searchQuery).sort({ postedDate: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('Error in getJobs:', error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

export const getJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid job ID format' });
    }

    const job = await Job.findById(id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    console.error('Error in getJob:', error);
    res.status(500).json({ 
      message: 'Error fetching job',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const createJob = async (req: Request, res: Response) => {
  try {
    const jobData: JobCreateInput = req.body;
    const newJob = new Job(jobData);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job' });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid job ID format' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(updatedJob);
  } catch (error) {
    console.error('Error in updateJob:', error);
    res.status(500).json({ message: 'Error updating job' });
  }
};