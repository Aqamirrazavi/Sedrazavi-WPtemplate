/**
 * SedRazavi P0 Security Middleware — Client Access Control & REST API Metadata Policy
 *
 * Implements Stage 1 (P0 Security) fail-closed access control and metadata filtering
 * aligned 1:1 with the WordPress PHP security layer:
 * - wordpress-theme/inc/wp-rest-auth.php
 * - sedrazavi-companion/includes/class-legal-matter-portal.php
 * - sedrazavi-companion/includes/class-frontend-cockpit.php
 *
 * Framework-agnostic + Express-compatible (browser-safe ES module, zero Node built-ins).
 */

import type { NextFunction, Request, Response } from 'express';

export const ALLOWED_CASE_POST_TYPES = [
  'sedrazavi_case',
  'case',
  'arbitration_case',
  'sedrazavi_dashboard',
] as const;

export type AllowedCasePostType = (typeof ALLOWED_CASE_POST_TYPES)[number];

export const ALLOWED_COCKPIT_CPT_TYPES = [
  'post',
  'portfolio',
  'services',
  'case_study',
] as const;

export type AllowedCockpitCptType = (typeof ALLOWED_COCKPIT_CPT_TYPES)[number];

export const ALLOWED_COCKPIT_META_KEYS = [
  '_sr_portfolio_client',
  '_sr_portfolio_url',
  '_sr_portfolio_metric_val',
  '_sr_portfolio_metric_label',
  '_sr_service_price',
  '_sr_service_delivery_time',
] as const;

export type AllowedCockpitMetaKey = (typeof ALLOWED_COCKPIT_META_KEYS)[number];

export const ALLOWED_ECOSYSTEM_PLUGIN_SLUGS = [
  'sedrazavi-designer-core',
  'elementor-addon-suite',
  'sedrazavi-addons',
  'sedrazavi-companion',
] as const;

export const PRIVILEGED_CAPABILITIES = [
  'manage_options',
  'edit_users',
  'delete_users',
  'create_users',
  'promote_users',
] as const;

export interface SecurityActor {
  userId: number;
  username: string;
  roles: string[];
  capabilities: string[];
  assignedCaseIds: string[];
  isAuthenticated: boolean;
}

export interface CaseDossierRecord {
  id: string;
  caseNumber: string;
  postType: string;
  postStatus: 'publish' | 'private' | 'draft' | string;
  postAuthorId: number;
  clientUserId: number;
  clientName?: string;
  clientPhone?: string;
  subject: string;
  status: string;
  progress: number;
  metadata?: Record<string, unknown>;
}

export interface AccessDecision {
  allowed: boolean;
  status: 200 | 401 | 403 | 404;
  code: string;
  message: string;
}

export interface AuthenticatedRequest extends Request {
  securityActor?: SecurityActor;
  validatedMetadata?: Record<string, string>;
}

/**
 * Constant-time string comparison to prevent timing side-channel leaks.
 */
export function timingSafeEqualStrings(expected: string, actual: string): boolean {
  if (typeof expected !== 'string' || typeof actual !== 'string') {
    return false;
  }
  const maxLen = Math.max(expected.length, actual.length);
  let mismatch = expected.length === actual.length ? 0 : 1;
  for (let i = 0; i < maxLen; i += 1) {
    const charA = i < expected.length ? expected.charCodeAt(i) : 0;
    const charB = i < actual.length ? actual.charCodeAt(i) : 0;
    mismatch |= charA ^ charB;
  }
  return mismatch === 0;
}

/**
 * Normalize Persian/Arabic numerals to ASCII digits and strip non-dial characters.
 */
export function normalizeDigits(input: string): string {
  const persian = '۰۱۲۳۴۵۶۷۸۹';
  const arabic = '٠١٢٣٤٥٦٧٨٩';
  let normalized = String(input ?? '');
  for (let i = 0; i < 10; i += 1) {
    normalized = normalized.replaceAll(persian[i], String(i)).replaceAll(arabic[i], String(i));
  }
  return normalized.trim();
}

/**
 * Reject spoofable headers (e.g. x-sedrazavi-user-role) and resolve actor strictly
 * from server-verified session/context state. Fails closed if unauthenticated.
 */
export function isStaffActor(actor: SecurityActor | undefined): boolean {
  if (!actor || !actor.isAuthenticated || actor.userId <= 0) {
    return false;
  }
  return (
    actor.capabilities.includes('manage_options') ||
    actor.capabilities.includes('edit_posts') ||
    actor.roles.includes('administrator')
  );
}

/**
 * Check per-object ownership and allowed CPT boundary for client case dossiers (Anti-IDOR).
 */
export function evaluateCaseAccess(
  actor: SecurityActor | undefined,
  dossier: CaseDossierRecord | null | undefined,
  requestedCaseId?: string
): AccessDecision {
  if (!actor || !actor.isAuthenticated || actor.userId <= 0) {
    return {
      allowed: false,
      status: 401,
      code: 'rest_forbidden',
      message: 'احراز هویت معتبر برای دسترسی به پرونده‌های محرمانه الزامی است.',
    };
  }

  if (!dossier) {
    return {
      allowed: false,
      status: 404,
      code: 'rest_case_not_found',
      message: 'پرونده‌ای با این مشخصات در پایگاه داده یافت نشد.',
    };
  }

  if (!(ALLOWED_CASE_POST_TYPES as readonly string[]).includes(dossier.postType)) {
    return {
      allowed: false,
      status: 403,
      code: 'rest_case_forbidden',
      message: 'دسترسی به این نوع پست در مسیر پرونده‌ها مجاز نیست.',
    };
  }

  if (isStaffActor(actor)) {
    return {
      allowed: true,
      status: 200,
      code: 'ok',
      message: 'Authorized staff access.',
    };
  }

  const isDirectAuthor = dossier.postAuthorId === actor.userId;
  const isAssignedClientUser = dossier.clientUserId === actor.userId;
  const matchesAssignedList =
    Array.isArray(actor.assignedCaseIds) &&
    actor.assignedCaseIds.some(
      (assigned) =>
        assigned !== '' &&
        (timingSafeEqualStrings(assigned, dossier.id) ||
          (dossier.caseNumber !== '' && timingSafeEqualStrings(assigned, dossier.caseNumber)) ||
          (requestedCaseId ? timingSafeEqualStrings(assigned, requestedCaseId) : false))
    );

  if (!isDirectAuthor && !isAssignedClientUser && !matchesAssignedList) {
    return {
      allowed: false,
      status: 403,
      code: 'rest_case_forbidden',
      message: 'دسترسی غیرمجاز: این پرونده متعلق به حساب کاربری شما نمی‌باشد.',
    };
  }

  return {
    allowed: true,
    status: 200,
    code: 'ok',
    message: 'Authorized client owner access.',
  };
}

/**
 * Redact confidential metadata fields (e.g., phone number) for non-staff viewers.
 */
export function redactCaseMetadataForActor(
  actor: SecurityActor,
  dossier: CaseDossierRecord
): CaseDossierRecord {
  const staff = isStaffActor(actor);
  return {
    ...dossier,
    clientPhone: staff ? dossier.clientPhone ?? '' : '***',
  };
}

/**
 * Validate CPT slug against strict REST metadata policy allowlist.
 */
export function isAllowedCockpitCpt(postType: string): postType is AllowedCockpitCptType {
  return (ALLOWED_COCKPIT_CPT_TYPES as readonly string[]).includes(postType);
}

/**
 * Filter and sanitize submitted post metadata strictly against the allowlist.
 */
export function filterAllowedMetadata(
  rawMeta: Record<string, unknown> | undefined
): { sanitized: Record<string, string>; rejectedKeys: string[] } {
  const sanitized: Record<string, string> = {};
  const rejectedKeys: string[] = [];

  if (!rawMeta || typeof rawMeta !== 'object') {
    return { sanitized, rejectedKeys };
  }

  for (const [key, value] of Object.entries(rawMeta)) {
    const cleanKey = String(key).trim().toLowerCase();
    if (!(ALLOWED_COCKPIT_META_KEYS as readonly string[]).includes(cleanKey)) {
      rejectedKeys.push(key);
      continue;
    }

    const stringVal = String(value ?? '').trim();
    if (cleanKey === '_sr_portfolio_url') {
      try {
        const parsed = new URL(stringVal);
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
          sanitized[cleanKey] = parsed.toString();
        } else {
          rejectedKeys.push(key);
        }
      } catch {
        if (stringVal === '') {
          sanitized[cleanKey] = '';
        } else {
          rejectedKeys.push(key);
        }
      }
    } else {
      // Strip HTML/control characters from scalar metadata values
      sanitized[cleanKey] = stringVal.replace(/[<>]/g, '');
    }
  }

  return { sanitized, rejectedKeys };
}

/**
 * Prevent privilege escalation when creating or promoting user roles via REST/AJAX.
 */
export function isRoleAssignmentAllowed(
  actor: SecurityActor | undefined,
  targetRole: string,
  roleCapabilitiesMap: Record<string, string[]>
): boolean {
  if (!actor || !actor.isAuthenticated) {
    return false;
  }
  const roleCaps = roleCapabilitiesMap[targetRole];
  if (!roleCaps) {
    return false;
  }
  const actorIsSuperAdmin = actor.capabilities.includes('manage_options');
  if (actorIsSuperAdmin) {
    return true;
  }
  return !roleCaps.some((cap) => (PRIVILEGED_CAPABILITIES as readonly string[]).includes(cap));
}

/**
 * Escape spreadsheet formula prefixes (=, +, -, @, tab) to prevent CSV injection.
 */
export function sanitizeCsvCell(value: unknown): string {
  const str = String(value ?? '').replace(/\r\n|\r|\n/g, ' ');
  if (str !== '' && /^[=+\-@\t]/.test(str.trimStart())) {
    return `'${str}`;
  }
  return str;
}

/**
 * Express Middleware: Require an authenticated server-verified security actor (fail closed).
 * Explicitly ignores untrusted role override headers such as `x-sedrazavi-user-role`.
 */
export function requireAuthenticatedActor(
  actorResolver: (req: Request) => Promise<SecurityActor | null> | SecurityActor | null
) {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const actor = await actorResolver(req);
      if (!actor || !actor.isAuthenticated || actor.userId <= 0) {
        res.status(401).json({
          success: false,
          code: 'rest_not_logged_in',
          message: 'احراز هویت الزامی است. لطفاً ابتدا وارد حساب کاربری خود شوید.',
        });
        return;
      }
      req.securityActor = actor;
      next();
    } catch {
      res.status(401).json({
        success: false,
        code: 'rest_auth_error',
        message: 'خطا در بررسی نشست کاربری.',
      });
    }
  };
}

/**
 * Express Middleware: Enforce strict per-object ownership for case dossier REST routes.
 */
export function requireCaseAccessOwnership(
  caseResolver: (caseId: string) => Promise<CaseDossierRecord | null> | CaseDossierRecord | null
) {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const rawCaseId = String(req.params?.caseId ?? req.query?.case_id ?? req.query?.id ?? '').trim();
    if (!rawCaseId) {
      res.status(400).json({
        success: false,
        code: 'rest_missing_case_id',
        message: 'شناسه پرونده الزامی است.',
      });
      return;
    }

    const dossier = await caseResolver(rawCaseId);
    const decision = evaluateCaseAccess(req.securityActor, dossier, rawCaseId);
    if (!decision.allowed) {
      res.status(decision.status).json({
        success: false,
        code: decision.code,
        message: decision.message,
      });
      return;
    }

    next();
  };
}

/**
 * Express Middleware: Enforce strict REST CPT type and Metabox metadata allowlisting.
 */
export function enforceRestMetadataPolicy() {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const postType = typeof body.post_type === 'string' ? body.post_type.trim() : 'post';

    if (!isAllowedCockpitCpt(postType)) {
      res.status(403).json({
        success: false,
        code: 'rest_cpt_forbidden',
        message: 'نوع پست انتخاب‌شده در این مسیر REST مجاز نیست.',
      });
      return;
    }

    const rawMeta =
      body.meta && typeof body.meta === 'object' && !Array.isArray(body.meta)
        ? (body.meta as Record<string, unknown>)
        : undefined;

    const { sanitized } = filterAllowedMetadata(rawMeta);
    req.validatedMetadata = sanitized;
    next();
  };
}
