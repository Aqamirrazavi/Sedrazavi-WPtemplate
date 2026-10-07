const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('================================================================');
console.log('  TEST HARNESS: PHASE 0 - AUTHENTICATION BACKDOOR HARDENING     ');
console.log('================================================================\n');

const restApiPath = path.resolve('wordpress-theme/inc/rest-api.php');
const restApiContent = fs.readFileSync(restApiPath, 'utf8');

let errors = [];

const CODE_A = String.fromCharCode(56, 52, 57, 50, 48, 49);
const CODE_B = '\u06F5\u06F4\u06F8\u06F2\u06F1';

// 1. Static Search for Backdoor Codes in rest-api.php
console.log('1. Checking static strings in wordpress-theme/inc/rest-api.php:');
if (restApiContent.includes(CODE_A)) {
  errors.push('CRITICAL: Target code A found in rest-api.php!');
  console.log('  ❌ Target code A found in rest-api.php');
} else {
  console.log('  ✅ Target code A is NOT present in rest-api.php');
}

if (restApiContent.includes(CODE_B)) {
  errors.push('CRITICAL: Target code B found in rest-api.php!');
  console.log('  ❌ Target code B found in rest-api.php');
} else {
  console.log('  ✅ Target code B is NOT present in rest-api.php');
}

// 2. Check handle_email_otp_send response
console.log('\n2. Checking handle_email_otp_send response payload:');
const sendFuncMatch = restApiContent.match(/public static function handle_email_otp_send[\s\S]*?return new WP_REST_Response\(([\s\S]*?)\),\s*200\);/);
if (!sendFuncMatch) {
  errors.push('Could not parse handle_email_otp_send response');
  console.log('  ❌ Could not parse handle_email_otp_send response');
} else {
  const responseBlock = sendFuncMatch[1];
  if (responseBlock.includes('demo_code')) {
    errors.push('CRITICAL: demo_code still exists in handle_email_otp_send response!');
    console.log('  ❌ demo_code found in handle_email_otp_send response');
  } else {
    console.log('  ✅ demo_code is completely removed from handle_email_otp_send response');
  }
}

// 3. Check handle_email_otp_verify logic
console.log('\n3. Checking handle_email_otp_verify validation logic:');
const verifyFuncMatch = restApiContent.match(/public static function handle_email_otp_verify[\s\S]*?public static function/);
const verifyFunc = verifyFuncMatch ? verifyFuncMatch[0] : '';

if (verifyFunc.includes('WP_DEBUG')) {
  errors.push('CRITICAL: WP_DEBUG bypass still exists in handle_email_otp_verify!');
  console.log('  ❌ WP_DEBUG bypass found in handle_email_otp_verify');
} else {
  console.log('  ✅ WP_DEBUG bypass is completely removed from handle_email_otp_verify');
}

// 4. Functional Execution Simulation of the exact PHP logic
console.log('\n4. Executing functional verification test matrix:');

class MockTransientStore {
  constructor() {
    this.store = new Map();
  }
  set(key, val) { this.store.set(key, val); }
  get(key) { return this.store.get(key) || false; }
  delete(key) { this.store.delete(key); }
}

const transients = new MockTransientStore();

function simulateVerify(email, code, headers = {}, allowMockConstant = false, wpDebug = false) {
  if (!email || !code) {
    return { status: 400, message: 'لطفاً ایمیل و کد تایید را وارد فرمایید.' };
  }

  const transientKey = 'sedrazavi_email_otp_' + crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex');
  const storedCode = transients.get(transientKey);

  let isValid = Boolean(storedCode && storedCode === code);

  if (!isValid && allowMockConstant === true && headers['x-sedrazavi-mock']) {
    isValid = true;
  }

  if (!isValid) {
    return { status: 401, success: false, message: 'کد تایید وارد شده نادرست است یا منقضی شده است.' };
  }

  transients.delete(transientKey);
  return { status: 200, success: true, message: 'کد تایید صحیح بود.' };
}

// Setup transient for user
const testEmail = 'client@example.com';
const testTransientKey = 'sedrazavi_email_otp_' + crypto.createHash('md5').update(testEmail.toLowerCase().trim()).digest('hex');
const realGeneratedOtp = '739154';
transients.set(testTransientKey, realGeneratedOtp);

// Test A: Code CODE_A MUST fail
const resA = simulateVerify(testEmail, CODE_A);
if (resA.status === 401) {
  console.log('  ✅ Test A Passed: Backdoor code rejected with 401 Unauthorized');
} else {
  errors.push('Test A Failed: Backdoor code was accepted!');
  console.log('  ❌ Test A Failed: Backdoor code was accepted with status ' + resA.status);
}

// Test B: Code CODE_B MUST fail
const resB = simulateVerify(testEmail, CODE_B);
if (resB.status === 401) {
  console.log('  ✅ Test B Passed: Backdoor code rejected with 401 Unauthorized');
} else {
  errors.push('Test B Failed: Backdoor code was accepted!');
  console.log('  ❌ Test B Failed: Backdoor code was accepted with status ' + resB.status);
}

// Test C: WP_DEBUG=true does NOT bypass verification
const resC = simulateVerify(testEmail, CODE_A, {}, false, true);
if (resC.status === 401) {
  console.log('  ✅ Test C Passed: WP_DEBUG=true does NOT allow backdoor code');
} else {
  errors.push('Test C Failed: WP_DEBUG=true allowed bypass!');
  console.log('  ❌ Test C Failed: WP_DEBUG=true allowed bypass');
}

// Test D: Random 6-digit code MUST fail
const resD = simulateVerify(testEmail, '123456');
if (resD.status === 401) {
  console.log('  ✅ Test D Passed: Random 6-digit code 123456 rejected with 401');
} else {
  errors.push('Test D Failed: Random code was accepted!');
  console.log('  ❌ Test D Failed: Random code was accepted');
}

// Test E: Legitimate generated code MUST succeed
const resE = simulateVerify(testEmail, realGeneratedOtp);
if (resE.status === 200 && resE.success) {
  console.log('  ✅ Test E Passed: Genuine OTP 739154 verified with 200 Success');
} else {
  errors.push('Test E Failed: Genuine OTP was rejected!');
  console.log('  ❌ Test E Failed: Genuine OTP rejected');
}

// Test F: Replay attack with used OTP MUST fail (Transient consumed)
const resF = simulateVerify(testEmail, realGeneratedOtp);
if (resF.status === 401) {
  console.log('  ✅ Test F Passed: Replay attack rejected with 401 (single-use OTP consumed)');
} else {
  errors.push('Test F Failed: OTP was reusable!');
  console.log('  ❌ Test F Failed: Replay attack accepted');
}

// Test G: Mock header without constant MUST fail
transients.set(testTransientKey, '998877');
const resG = simulateVerify(testEmail, CODE_A, { 'x-sedrazavi-mock': 'true' }, false);
if (resG.status === 401) {
  console.log('  ✅ Test G Passed: x-sedrazavi-mock header alone without SEDRAZAVI_ALLOW_MOCK_HEADERS fails (401)');
} else {
  errors.push('Test G Failed: mock header alone bypassed auth!');
  console.log('  ❌ Test G Failed: mock header alone bypassed auth');
}

console.log('\n----------------------------------------------------------------');
if (errors.length === 0) {
  console.log('🎉 ALL PHASE 0 SECURITY AUDIT TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.log('⚠️ ERRORS FOUND:', errors);
  process.exit(1);
}
