"use client";
import React, { useState } from "react";
import { addNewAdmin } from "../../../lib/admin/api/auth/auth";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import { useToastContext } from "../../utils/providers/ToastProvider";
import TextInput from "../../components/Atoms/input/TextInput";

const AddNewAdminForm: React.FC = () => {
  const { showToast } = useToastContext();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { first_name, last_name, email } = formData;

    try {
      const response = await addNewAdmin(first_name, last_name, email);
      if (response.success) {
        showToast(response.message, "success", 5);
        // Clear input fields
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
        });
      }
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      showToast(errorMessage, "danger", 5);
    }
  };

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit}>
      <TextInput
        id={"first_name"}
        label={"First Name"}
        handleChange={handleChange}
        placeholder="First Name"
        value={formData.first_name}
        required
      />

      <TextInput
        id={"last_name"}
        label={"Last Name"}
        handleChange={handleChange}
        placeholder="Last Name"
        value={formData.last_name}
        required
      />

      <TextInput
        id={"email"}
        label={"Email"}
        handleChange={handleChange}
        placeholder="Email"
        value={formData.email}
        required
      />

      <div className="pt-5">
        <PrimaryButton type="submit">Add New Admin</PrimaryButton>
      </div>
    </form>
  );
};

export default AddNewAdminForm;
