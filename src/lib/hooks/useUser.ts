"use client";

import { gql } from "@apollo/client";

/**
 * User account management hook.
 *
 * Responsibilities:
 * - Update basic user profile details
 * - Change account password
 * - Request account deletion
 * - Manage user avatar
 *
 * Intended usage:
 * const {
 *   updateUser,
 *   accountRequestDelete,
 *   accountPasswordChange,
 *   userAvatarUpdate,
 *   userAvatarDelete
 * } = useUser()
 */
export function useUser() {
  /**
   * Updates user profile fields like first name and last name.
   *
   * Expected to call `accountUpdate` mutation.
   */
  const updateUser = () => {};

  /**
   * Sends an account deletion request for the authenticated user.
   *
   * Expected to call `accountRequestDeletion` mutation.
   */
  const accountRequestDelete = () => {};

  /**
   * Changes the current user's password.
   *
   * Requires old password and new password.
   * Expected to call `accountChangePassword` mutation.
   */
  const accountPasswordChange = () => {};

  /**
   * Updates the user's avatar image.
   *
   * Expected to call `userAvatarUpdate` mutation.
   */
  const userAvatarUpdate = () => {};

  /**
   * Removes the user's avatar.
   *
   * Expected to call `userAvatarDelete` mutation.
   */
  const userAvatarDelete = () => {};

  return {
    updateUser,
    accountRequestDelete,
    accountPasswordChange,
    userAvatarUpdate,
    userAvatarDelete,
  };
}
