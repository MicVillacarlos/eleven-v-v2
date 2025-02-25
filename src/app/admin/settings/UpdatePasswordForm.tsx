"use client";
import React, { useReducer, useState } from "react";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import PasswordInput from "../../components/Atoms/input/PasswordInput";
import { updatePassword } from "../../../lib/admin/api/auth/auth";
import { useToastContext } from "../../utils/providers/ToastProvider";

interface State {
  showOldPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  oldPasswordError: string;
  newPasswordError: string;
  confirmPasswordError: string;
}

interface Action {
  type:
    | "TOGGLE_PASSWORD_OLD"
    | "TOGGLE_PASSWORD_NEW"
    | "TOGGLE_PASSWORD_CONFIRM"
    | "OLD_PASSWORD_ERROR"
    | "NEW_PASSWORD_ERROR"
    | "CONFIRM_PASSWORD_ERROR";
  payload?: string; // Add payload for error messages
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_PASSWORD_OLD":
      return { ...state, showOldPassword: !state.showOldPassword };
    case "TOGGLE_PASSWORD_NEW":
      return { ...state, showNewPassword: !state.showNewPassword };
    case "TOGGLE_PASSWORD_CONFIRM":
      return { ...state, showConfirmPassword: !state.showConfirmPassword };
    case "OLD_PASSWORD_ERROR":
      return { ...state, oldPasswordError: action.payload || "" };
    case "NEW_PASSWORD_ERROR":
      return { ...state, newPasswordError: action.payload || "" };
    case "CONFIRM_PASSWORD_ERROR":
      return { ...state, confirmPasswordError: action.payload || "" };
    default:
      return state;
  }
};

const UpdatePasswordForm: React.FC = () => {
  const { showToast } = useToastContext();
  const [state, dispatch] = useReducer(reducer, {
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
    oldPasswordError: "",
    newPasswordError: "",
    confirmPasswordError: "",
  });
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (e.target.id === "old_password") {
      dispatch({ type: "OLD_PASSWORD_ERROR", payload: "" });
    }
    if (e.target.id === "new_password") {
      dispatch({ type: "NEW_PASSWORD_ERROR", payload: "" });
    }
    if (e.target.id === "confirm_password") {
      dispatch({ type: "CONFIRM_PASSWORD_ERROR", payload: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { old_password, new_password, confirm_password } = formData;
    let hasError = false;

    if (!old_password) {
      dispatch({
        type: "OLD_PASSWORD_ERROR",
        payload: "Old Password is required.",
      });
      hasError = true;
    }

    if (!new_password) {
      dispatch({
        type: "NEW_PASSWORD_ERROR",
        payload: "New Password is required.",
      });
      hasError = true;
    }

    if (!confirm_password) {
      dispatch({
        type: "CONFIRM_PASSWORD_ERROR",
        payload: "Confirm Password is required.",
      });
      hasError = true;
    }

    if (new_password && confirm_password && new_password !== confirm_password) {
      dispatch({
        type: "CONFIRM_PASSWORD_ERROR",
        payload: "Passwords do not match.",
      });
      hasError = true;
    }

    if (!hasError) {
      const response = await updatePassword(
        new_password,
        confirm_password,
        old_password
      );
      if (response.success) {
        showToast("Password successfully updated.", "success");
        // Clear input fields
        setFormData({
          old_password: "",
          new_password: "",
          confirm_password: "",
        });
        // Clear error messages
        dispatch({ type: "OLD_PASSWORD_ERROR", payload: "" });
        dispatch({ type: "NEW_PASSWORD_ERROR", payload: "" });
        dispatch({ type: "CONFIRM_PASSWORD_ERROR", payload: "" });
      } else {
        showToast(response.message, "danger");
        dispatch({ type: "CONFIRM_PASSWORD_ERROR", payload: response.message });
      }
    }
  };

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit}>
      <PasswordInput
        id={"old_password"}
        label={"Old Password"}
        isShowPassword={state.showOldPassword}
        handleChange={handleChange}
        onClickShowPassword={() => dispatch({ type: "TOGGLE_PASSWORD_OLD" })}
        errorMessage={state.oldPasswordError}
        value={formData.old_password}
      />

      <PasswordInput
        id={"new_password"}
        label={"New Password"}
        isShowPassword={state.showNewPassword}
        handleChange={handleChange}
        onClickShowPassword={() => dispatch({ type: "TOGGLE_PASSWORD_NEW" })}
        errorMessage={state.newPasswordError}
        value={formData.new_password}
      />

      <PasswordInput
        id={"confirm_password"}
        label={"Confirm Password"}
        isShowPassword={state.showConfirmPassword}
        handleChange={handleChange}
        onClickShowPassword={() =>
          dispatch({ type: "TOGGLE_PASSWORD_CONFIRM" })
        }
        errorMessage={state.confirmPasswordError}
        value={formData.confirm_password}
      />
      <div className="pt-5">
        <PrimaryButton type="submit">Update Password</PrimaryButton>
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
