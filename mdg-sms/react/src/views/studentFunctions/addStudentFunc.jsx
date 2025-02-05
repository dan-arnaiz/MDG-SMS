import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./formSchema"; // Import the schema
import axiosClient from "../../axios-client.js";

export default function AddStudentFunc() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Hook Form with Zod Validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // Function to Submit Form Data
  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    // Format data according to API expectations
    const formattedData = {
      first_name: data.firstName,
      middle_name: data.middleName || "",
      last_name: data.lastName,
      suffix: data.suffix || "",
      dob: data.dateOfBirth,
      email: data.email,
      personal_email: data.personalEmail || "",
      mobile_num: data.mobileNum || "",
      program_id: data.program,
      scholarship_id: data.scholarship || null,
      scholarship_status_id: data.scholarshipStatus,
      address: {
        house_block_unit_no: data.houseBlockUnitNo || "",
        street: data.street || "",
        barangay: data.barangay || "",
        city: data.city || "",
        municipality: data.municipality || "",
        zip_code: data.zipCode || "",
      },
    };

    try {
      const response = await axiosClient.post("/students", formattedData);
      setSuccessMessage("Student added successfully!");
      reset(); // Reset form after submission
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("firstName")} placeholder="First Name" />
        {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

        <input {...register("middleName")} placeholder="Middle Name (Optional)" />

        <input {...register("lastName")} placeholder="Last Name" />
        {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

        <input {...register("dateOfBirth")} placeholder="Date of Birth" type="date" />
        {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}

        <input {...register("email")} placeholder="Email Address" type="email" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input {...register("program")} placeholder="Program" />
        {errors.program && <p className="text-red-500">{errors.program.message}</p>}

        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
