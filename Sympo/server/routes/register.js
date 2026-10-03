const express = require('express');
const router = express.Router();
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const supabase = require('../config/supabase');

// ─── Validation rules ──────────────────────────────────────────────────────
const registerValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2–100 characters.'),
  body('email').isEmail().normalizeEmail().withMessage('Enter a valid email address.'),
  body('phone').matches(/^[6-9][0-9]{9}$/).withMessage('Enter a valid 10-digit Indian mobile number.'),
  body('college').trim().isLength({ min: 2, max: 200 }).withMessage('College name is required.'),
  body('department').trim().isLength({ min: 2, max: 100 }).withMessage('Department is required.'),
  body('year').isIn(['1', '2', '3', '4']).withMessage('Select a valid year of study.'),
  body('techEvent')
    .isIn(['Tech Quest', 'PPT Presentation', 'Code Debugging', 'Circuit Debugging'])
    .withMessage('Select a valid technical event.'),
  body('nonTechEvent')
    .optional({ checkFalsy: true })
    .isIn(['', 'Truth vs Trick', 'IPL Auction', 'Hint Drop', 'Connection'])
    .withMessage('Select a valid non-technical event.'),
  body('foodPreference')
    .isIn(['Veg', 'Non-Veg', 'Vegan'])
    .withMessage('Select a valid food preference.'),
  body('transactionId')
    .trim()
    .matches(/^[A-Za-z0-9]{8,30}$/)
    .withMessage('Enter a valid UPI transaction/reference ID (8–30 alphanumeric characters).'),
];

// ─── GET /api/register ─────────────────────────────────────────────────────
router.get('/', (req, res) => {
  return res.json({
    ok: true,
    message: "FREQUENZA '26 Registration API service is active. Send a POST request with multipart/form-data to register."
  });
});

// ─── POST /api/register ────────────────────────────────────────────────────
router.post('/', registerValidation, async (req, res) => {
  // 1. Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    return res.status(400).json({ ok: false, errors: errors.array() });
  }

  // 2. Require payment proof file
  if (!req.file) {
    return res.status(400).json({ ok: false, error: 'Payment proof file is required.' });
  }

  // 3. Destructure inputs
  const {
    name, email, phone, college, department, year,
    techEvent, codeLanguage = '', nonTechEvent = '',
    iplTeamName = '', iplCaptainName = '',
    foodPreference, transactionId,
  } = req.body;

  // Code Debugging language check
  if (techEvent === 'Code Debugging' && codeLanguage) {
    if (!['C', 'Python'].includes(codeLanguage.trim())) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({ ok: false, error: 'Select a valid programming language (C or Python).' });
    }
  }

  // IPL Auction team check
  if (nonTechEvent === 'IPL Auction') {
    if (!iplTeamName.trim() || iplTeamName.trim().length < 2) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({ ok: false, error: 'IPL Auction requires a Team Name (min 2 characters).' });
    }
    if (!iplCaptainName.trim() || iplCaptainName.trim().length < 2) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({ ok: false, error: 'IPL Auction requires a Captain Name (min 2 characters).' });
    }
  }

  try {
    // 4. Duplicate transaction ID check in Supabase
    const { data: existing, error: checkError } = await supabase
      .from('registrations')
      .select('id')
      .eq('transaction_id', transactionId.trim())
      .maybeSingle();

    if (checkError) {
      console.error('Supabase check error:', checkError);
    }

    if (existing) {
      fs.unlink(req.file.path, () => {});
      return res.status(409).json({
        ok: false,
        error: 'This Transaction ID has already been registered. If this is an error, contact the coordinators.'
      });
    }

    // 5. Generate registration ID
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const registrationId = `FREQ26-${Date.now().toString(36).toUpperCase()}-${randomPart}`;

    // 6. Insert into Supabase
    const { data: inserted, error: insertError } = await supabase
      .from('registrations')
      .insert([{
        registration_id: registrationId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        college: college.trim(),
        department: department.trim(),
        year,
        tech_event: techEvent,
        code_language: codeLanguage.trim(),
        non_tech_event: nonTechEvent || '',
        ipl_team_name: iplTeamName.trim(),
        ipl_captain_name: iplCaptainName.trim(),
        food_preference: foodPreference,
        transaction_id: transactionId.trim(),
        payment_proof_path: req.file.path,
        payment_proof_original_name: req.file.originalname,
      }])
      .select()
      .single();

    if (insertError) {
      fs.unlink(req.file.path, () => {});
      if (insertError.code === '23505') { // Postgres Unique Violation
        return res.status(409).json({ ok: false, error: 'This Transaction ID or Registration ID has already been registered.' });
      }
      console.error('Supabase insert error:', insertError);
      return res.status(500).json({ ok: false, error: 'Database error. Please try again later.' });
    }

    return res.status(201).json({
      ok: true,
      registrationId,
      message: 'Registration submitted successfully. Your payment is pending verification.',
    });
  } catch (err) {
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    console.error('Registration handler error:', err);
    return res.status(500).json({ ok: false, error: 'Server error. Please try again later.' });
  }
});

module.exports = router;
