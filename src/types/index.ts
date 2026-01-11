/**
 * Common Type Definitions
 * 
 * Shared types used throughout the application.
 */

// ============================================
// Utility Types
// ============================================

/**
 * Make all properties of T optional and nullable.
 */
export type Nullable<T> = { [K in keyof T]: T[K] | null };

// Note: Awaited<T> is now a built-in TypeScript type (4.5+), no need to define it here

/**
 * Create a type that requires at least one of the keys.
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

// ============================================
// Component Props Types
// ============================================

/**
 * Common props for components that accept className.
 */
export interface ClassNameProps {
  className?: string;
}

/**
 * Common props for components with children.
 */
export interface ChildrenProps {
  children: React.ReactNode;
}

/**
 * Combined common props.
 */
export interface CommonProps extends ClassNameProps {
  children?: React.ReactNode;
}

// ============================================
// Animation Types
// ============================================

/**
 * Animation state for components.
 */
export type AnimationState = "idle" | "entering" | "entered" | "exiting" | "exited";

/**
 * Animation direction.
 */
export type AnimationDirection = "up" | "down" | "left" | "right";

// ============================================
// UI Types
// ============================================

/**
 * Button variant types.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";

/**
 * Button size types.
 */
export type ButtonSize = "sm" | "md" | "lg" | "xl";

/**
 * Common icon sizes.
 */
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

// ============================================
// API Types
// ============================================

/**
 * Generic API response wrapper.
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Pagination parameters.
 */
export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

/**
 * Paginated response wrapper.
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ============================================
// Form Types
// ============================================

/**
 * Generic form field state.
 */
export interface FormFieldState<T = string> {
  value: T;
  error?: string;
  touched: boolean;
  dirty: boolean;
}

/**
 * Form submission state.
 */
export type FormStatus = "idle" | "submitting" | "success" | "error";
