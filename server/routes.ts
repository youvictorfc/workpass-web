import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertUserProfileSchema, insertCredentialSchema, insertJobApplicationSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";

// Configure multer for file uploads
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPG, JPEG, and PNG files are allowed.'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // User profile routes
  app.get('/api/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getUserProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.post('/api/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profileData = insertUserProfileSchema.parse({ ...req.body, userId });
      
      const existingProfile = await storage.getUserProfile(userId);
      let profile;
      
      if (existingProfile) {
        profile = await storage.updateUserProfile(userId, profileData);
      } else {
        profile = await storage.createUserProfile(profileData);
      }
      
      // Log activity
      await storage.logActivity({
        userId,
        action: existingProfile ? 'update_profile' : 'create_profile',
        description: 'User profile updated',
      });
      
      res.json(profile);
    } catch (error) {
      console.error("Error saving profile:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid profile data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save profile" });
      }
    }
  });

  // Credential routes
  app.get('/api/credentials', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const credentials = await storage.getUserCredentials(userId);
      res.json(credentials);
    } catch (error) {
      console.error("Error fetching credentials:", error);
      res.status(500).json({ message: "Failed to fetch credentials" });
    }
  });

  app.post('/api/credentials', isAuthenticated, upload.single('file'), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      const credentialData = insertCredentialSchema.parse({
        ...req.body,
        userId,
        fileUrl: `/uploads/${req.file.filename}`,
        fileName: req.file.originalname,
        fileSize: req.file.size,
      });
      
      const credential = await storage.createCredential(credentialData);
      
      // Log activity
      await storage.logActivity({
        userId,
        action: 'upload_credential',
        description: `Uploaded ${credential.name}`,
        metadata: { credentialId: credential.id, type: credential.type },
      });
      
      res.json(credential);
    } catch (error) {
      console.error("Error uploading credential:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid credential data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to upload credential" });
      }
    }
  });

  app.put('/api/credentials/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const credentialId = parseInt(req.params.id);
      
      const updates = req.body;
      const credential = await storage.updateCredential(credentialId, updates);
      
      if (!credential) {
        return res.status(404).json({ message: "Credential not found" });
      }
      
      res.json(credential);
    } catch (error) {
      console.error("Error updating credential:", error);
      res.status(500).json({ message: "Failed to update credential" });
    }
  });

  app.delete('/api/credentials/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const credentialId = parseInt(req.params.id);
      
      const success = await storage.deleteCredential(credentialId, userId);
      
      if (!success) {
        return res.status(404).json({ message: "Credential not found" });
      }
      
      // Log activity
      await storage.logActivity({
        userId,
        action: 'delete_credential',
        description: 'Deleted credential',
        metadata: { credentialId },
      });
      
      res.json({ message: "Credential deleted successfully" });
    } catch (error) {
      console.error("Error deleting credential:", error);
      res.status(500).json({ message: "Failed to delete credential" });
    }
  });

  // Job routes
  app.get('/api/jobs', isAuthenticated, async (req: any, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const jobs = await storage.getJobs(limit);
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  app.get('/api/jobs/:id', isAuthenticated, async (req: any, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const job = await storage.getJob(jobId);
      
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      res.json(job);
    } catch (error) {
      console.error("Error fetching job:", error);
      res.status(500).json({ message: "Failed to fetch job" });
    }
  });

  // Job application routes
  app.get('/api/job-applications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const applications = await storage.getUserJobApplications(userId);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      res.status(500).json({ message: "Failed to fetch job applications" });
    }
  });

  app.post('/api/job-applications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const applicationData = insertJobApplicationSchema.parse({ ...req.body, userId });
      
      // Check if user already applied
      const existing = await storage.getJobApplication(userId, applicationData.jobId);
      if (existing) {
        return res.status(400).json({ message: "Already applied to this job" });
      }
      
      const application = await storage.createJobApplication(applicationData);
      
      // Log activity
      await storage.logActivity({
        userId,
        action: 'apply_job',
        description: 'Applied to job',
        metadata: { jobId: applicationData.jobId, applicationId: application.id },
      });
      
      res.json(application);
    } catch (error) {
      console.error("Error creating job application:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid application data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create job application" });
      }
    }
  });

  // Dashboard route
  app.get('/api/dashboard', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const dashboardData = await storage.getUserDashboardData(userId);
      res.json(dashboardData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // Activity routes
  app.get('/api/activity', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const activities = await storage.getUserActivity(userId, limit);
      res.json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  // OTP verification routes
  app.post('/api/send-otp', async (req, res) => {
    try {
      const { identifier, type } = req.body; // email or phone, type: 'email' or 'sms'
      
      if (!identifier || !type) {
        return res.status(400).json({ message: "Identifier and type are required" });
      }
      
      // Generate 6-digit OTP
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      
      await storage.createOtpVerification({
        identifier,
        code,
        type,
        expiresAt,
      });
      
      // In a real application, you would send the OTP via email/SMS here
      // For demo purposes, we'll just return success
      console.log(`OTP for ${identifier}: ${code}`); // Log for testing
      
      res.json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  });

  app.post('/api/verify-otp', async (req, res) => {
    try {
      const { identifier, code, type } = req.body;
      
      if (!identifier || !code || !type) {
        return res.status(400).json({ message: "Identifier, code, and type are required" });
      }
      
      const isValid = await storage.verifyOtp(identifier, code, type);
      
      if (!isValid) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }
      
      res.json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ message: "Failed to verify OTP" });
    }
  });

  // Serve uploaded files
  app.use('/uploads', express.static('uploads'));

  // Cleanup expired OTPs periodically
  setInterval(() => {
    storage.cleanupExpiredOtps().catch(console.error);
  }, 60 * 60 * 1000); // Every hour

  const httpServer = createServer(app);
  return httpServer;
}
