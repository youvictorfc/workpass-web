import {
  users,
  userProfiles,
  credentials,
  jobs,
  jobApplications,
  userActivity,
  otpVerifications,
  type User,
  type UpsertUser,
  type UserProfile,
  type InsertUserProfile,
  type Credential,
  type InsertCredential,
  type Job,
  type InsertJob,
  type JobApplication,
  type InsertJobApplication,
  type UserActivity,
  type InsertUserActivity,
  type OtpVerification,
  type InsertOtpVerification,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // User profile operations
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: string, updates: Partial<InsertUserProfile>): Promise<UserProfile | undefined>;
  
  // Credential operations
  getUserCredentials(userId: string): Promise<Credential[]>;
  createCredential(credential: InsertCredential): Promise<Credential>;
  updateCredential(id: number, updates: Partial<InsertCredential>): Promise<Credential | undefined>;
  deleteCredential(id: number, userId: string): Promise<boolean>;
  getExpiringCredentials(userId: string, days: number): Promise<Credential[]>;
  
  // Job operations
  getJobs(limit?: number): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  
  // Job application operations
  getUserJobApplications(userId: string): Promise<(JobApplication & { job: Job })[]>;
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  getJobApplication(userId: string, jobId: number): Promise<JobApplication | undefined>;
  
  // Activity operations
  getUserActivity(userId: string, limit?: number): Promise<UserActivity[]>;
  logActivity(activity: InsertUserActivity): Promise<UserActivity>;
  
  // OTP operations
  createOtpVerification(otp: InsertOtpVerification): Promise<OtpVerification>;
  verifyOtp(identifier: string, code: string, type: string): Promise<boolean>;
  cleanupExpiredOtps(): Promise<void>;
  
  // Dashboard data
  getUserDashboardData(userId: string): Promise<{
    user: User;
    profile: UserProfile | undefined;
    credentials: Credential[];
    expiringCredentials: Credential[];
    recentActivity: UserActivity[];
    jobApplications: (JobApplication & { job: Job })[];
    workReadinessScore: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // User profile operations
  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));
    return profile;
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const [newProfile] = await db
      .insert(userProfiles)
      .values(profile)
      .returning();
    return newProfile;
  }

  async updateUserProfile(userId: string, updates: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const [updatedProfile] = await db
      .update(userProfiles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userProfiles.userId, userId))
      .returning();
    return updatedProfile;
  }

  // Credential operations
  async getUserCredentials(userId: string): Promise<Credential[]> {
    return db
      .select()
      .from(credentials)
      .where(and(eq(credentials.userId, userId), eq(credentials.isActive, true)))
      .orderBy(desc(credentials.createdAt));
  }

  async createCredential(credential: InsertCredential): Promise<Credential> {
    const [newCredential] = await db
      .insert(credentials)
      .values(credential)
      .returning();
    return newCredential;
  }

  async updateCredential(id: number, updates: Partial<InsertCredential>): Promise<Credential | undefined> {
    const [updatedCredential] = await db
      .update(credentials)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(credentials.id, id))
      .returning();
    return updatedCredential;
  }

  async deleteCredential(id: number, userId: string): Promise<boolean> {
    const result = await db
      .update(credentials)
      .set({ isActive: false, updatedAt: new Date() })
      .where(and(eq(credentials.id, id), eq(credentials.userId, userId)));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getExpiringCredentials(userId: string, days: number): Promise<Credential[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    
    return db
      .select()
      .from(credentials)
      .where(
        and(
          eq(credentials.userId, userId),
          eq(credentials.isActive, true),
          lte(credentials.expiryDate, futureDate.toISOString().split('T')[0])
        )
      )
      .orderBy(credentials.expiryDate);
  }

  // Job operations
  async getJobs(limit = 50): Promise<Job[]> {
    return db
      .select()
      .from(jobs)
      .where(eq(jobs.isActive, true))
      .orderBy(desc(jobs.createdAt))
      .limit(limit);
  }

  async getJob(id: number): Promise<Job | undefined> {
    const [job] = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, id));
    return job;
  }

  async createJob(job: InsertJob): Promise<Job> {
    const [newJob] = await db
      .insert(jobs)
      .values(job)
      .returning();
    return newJob;
  }

  // Job application operations
  async getUserJobApplications(userId: string): Promise<(JobApplication & { job: Job })[]> {
    return db
      .select({
        id: jobApplications.id,
        userId: jobApplications.userId,
        jobId: jobApplications.jobId,
        status: jobApplications.status,
        matchScore: jobApplications.matchScore,
        appliedAt: jobApplications.appliedAt,
        updatedAt: jobApplications.updatedAt,
        job: jobs,
      })
      .from(jobApplications)
      .innerJoin(jobs, eq(jobApplications.jobId, jobs.id))
      .where(eq(jobApplications.userId, userId))
      .orderBy(desc(jobApplications.appliedAt));
  }

  async createJobApplication(application: InsertJobApplication): Promise<JobApplication> {
    const [newApplication] = await db
      .insert(jobApplications)
      .values(application)
      .returning();
    return newApplication;
  }

  async getJobApplication(userId: string, jobId: number): Promise<JobApplication | undefined> {
    const [application] = await db
      .select()
      .from(jobApplications)
      .where(and(eq(jobApplications.userId, userId), eq(jobApplications.jobId, jobId)));
    return application;
  }

  // Activity operations
  async getUserActivity(userId: string, limit = 20): Promise<UserActivity[]> {
    return db
      .select()
      .from(userActivity)
      .where(eq(userActivity.userId, userId))
      .orderBy(desc(userActivity.createdAt))
      .limit(limit);
  }

  async logActivity(activity: InsertUserActivity): Promise<UserActivity> {
    const [newActivity] = await db
      .insert(userActivity)
      .values(activity)
      .returning();
    return newActivity;
  }

  // OTP operations
  async createOtpVerification(otp: InsertOtpVerification): Promise<OtpVerification> {
    const [newOtp] = await db
      .insert(otpVerifications)
      .values(otp)
      .returning();
    return newOtp;
  }

  async verifyOtp(identifier: string, code: string, type: string): Promise<boolean> {
    const [otp] = await db
      .select()
      .from(otpVerifications)
      .where(
        and(
          eq(otpVerifications.identifier, identifier),
          eq(otpVerifications.code, code),
          eq(otpVerifications.type, type),
          eq(otpVerifications.isUsed, false),
          gte(otpVerifications.expiresAt, new Date())
        )
      );

    if (otp) {
      await db
        .update(otpVerifications)
        .set({ isUsed: true })
        .where(eq(otpVerifications.id, otp.id));
      return true;
    }
    return false;
  }

  async cleanupExpiredOtps(): Promise<void> {
    await db
      .delete(otpVerifications)
      .where(lte(otpVerifications.expiresAt, new Date()));
  }

  // Dashboard data
  async getUserDashboardData(userId: string): Promise<{
    user: User;
    profile: UserProfile | undefined;
    credentials: Credential[];
    expiringCredentials: Credential[];
    recentActivity: UserActivity[];
    jobApplications: (JobApplication & { job: Job })[];
    workReadinessScore: number;
  }> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const [
      profile,
      credentials,
      expiringCredentials,
      recentActivity,
      jobApplications,
    ] = await Promise.all([
      this.getUserProfile(userId),
      this.getUserCredentials(userId),
      this.getExpiringCredentials(userId, 60),
      this.getUserActivity(userId, 10),
      this.getUserJobApplications(userId),
    ]);

    // Calculate work readiness score based on credentials
    const workReadinessScore = this.calculateWorkReadinessScore(credentials);

    return {
      user,
      profile,
      credentials,
      expiringCredentials,
      recentActivity,
      jobApplications,
      workReadinessScore,
    };
  }

  private calculateWorkReadinessScore(credentials: Credential[]): number {
    if (credentials.length === 0) return 0;

    const requiredTypes = ['white_card', 'first_aid'];
    const bonusTypes = ['trade_certificate', 'license'];
    
    let score = 0;
    let maxScore = 100;
    
    // Required credentials (60% of score)
    requiredTypes.forEach(type => {
      const hasValid = credentials.some(cred => 
        cred.type === type && 
        cred.verificationStatus === 'verified' &&
        (!cred.expiryDate || new Date(cred.expiryDate) > new Date())
      );
      if (hasValid) score += 30;
    });
    
    // Bonus credentials (40% of score)
    const validBonusCount = credentials.filter(cred =>
      bonusTypes.includes(cred.type || '') &&
      cred.verificationStatus === 'verified' &&
      (!cred.expiryDate || new Date(cred.expiryDate) > new Date())
    ).length;
    
    score += Math.min(validBonusCount * 10, 40);
    
    return Math.min(Math.round(score), 100);
  }
}

export const storage = new DatabaseStorage();
