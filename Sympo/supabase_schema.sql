-- ============================================================================
-- FREQUENZA '26 Symposium Registration System — Supabase Database Schema
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================================

-- 1. Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id TEXT UNIQUE NOT NULL,

    -- Participant Details
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    college TEXT NOT NULL,
    department TEXT NOT NULL,
    year TEXT NOT NULL CHECK (year IN ('1', '2', '3', '4')),

    -- Event Selection
    tech_event TEXT NOT NULL CHECK (tech_event IN ('Tech Quest', 'PPT Presentation', 'Code Debugging', 'Circuit Debugging')),
    code_language TEXT DEFAULT '' CHECK (code_language IN ('', 'C', 'Python')),
    non_tech_event TEXT DEFAULT '' CHECK (non_tech_event IN ('', 'Truth vs Trick', 'IPL Auction', 'Hint Drop', 'Connection')),

    -- IPL Auction Fields
    ipl_team_name TEXT DEFAULT '',
    ipl_captain_name TEXT DEFAULT '',

    -- Food Preference
    food_preference TEXT NOT NULL CHECK (food_preference IN ('Veg', 'Non-Veg', 'Vegan')),

    -- Payment Details
    transaction_id TEXT UNIQUE NOT NULL,
    payment_proof_path TEXT NOT NULL,
    payment_proof_original_name TEXT,

    -- Admin Verification Status
    payment_status TEXT NOT NULL DEFAULT 'PENDING_VERIFICATION' CHECK (payment_status IN ('PENDING_VERIFICATION', 'VERIFIED', 'REJECTED')),
    verified_at TIMESTAMPTZ,
    verified_by TEXT,
    rejected_reason TEXT,

    -- Timestamps
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create Indexes for faster querying & filtering
CREATE INDEX IF NOT EXISTS idx_registrations_transaction_id ON public.registrations(transaction_id);
CREATE INDEX IF NOT EXISTS idx_registrations_registration_id ON public.registrations(registration_id);
CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON public.registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_registrations_submitted_at ON public.registrations(submitted_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 5. Policies for public insert & admin access (service_role overrides RLS automatically)
-- Allow public users to submit registrations
CREATE POLICY "Allow public registration insert" 
ON public.registrations 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow public users to check existing transaction IDs (for duplicate checking)
CREATE POLICY "Allow public transaction_id check" 
ON public.registrations 
FOR SELECT 
TO public 
USING (true);

-- Allow service_role / authenticated users full access for admin dashboard
CREATE POLICY "Allow service_role full access" 
ON public.registrations 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);
