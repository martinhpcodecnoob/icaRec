"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";

import RegistrationInfo from "./RegistrationInfo";
import SexCheckBoxes from "./SexCheckBoxes";
import FullNameInput from "./FullNameInput";
import DocumentSection from "./DocumentSection";
import PhoneSection from "./PhoneSection";
import EmailInput from "./EmailInput";
import PasswordSection from "./PasswordSection";
import PasswordRules from "./PasswordRules";
import RegistrationButton from "./RegistrationButton";
import ErrorScreen from "../ErrorScreen";

import { validationSchema } from "../../../utils/utils";
import { registerUser } from "../../../utils/apiBackend";

import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    handleSubmit(onSubmit)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const {
      sex,
      fullName,
      documentNumber,
      phoneNumber,
      phoneCode,
      email,
      password,
    } = data;
    const fullPhoneNumber = `+${phoneCode} ${phoneNumber}`;
    try {
      const registerUserResponse = await registerUser(
        fullName,
        fullPhoneNumber,
        documentNumber,
        email,
        password,
        sex
      );
      if (registerUserResponse.status === 200) {
        const signInResponse = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        });
        if (signInResponse.status === 200) {
          toast.success(
            "Registro exitoso, redirigiéndote a la página principal",
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              onClose: () => {
                router.push("/");
              },
            }
          );
        }
      } else if (registerUserResponse.status === 409) {
        toast.error("El correo electrónico ya está registrado.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } else {
        throw new Error(registerUserResponse.error);
      }
    } catch (error) {
      console.error("Error en la solicitud registerUser:", error);
      //Podria hacer que la pantallad error reciba un string de props para poder mostrar un mejor manejo de errores
      return <ErrorScreen />;
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <ToastContainer />
      <form
        className="flex flex-col justify-center items-center sm:w-1/2 md:w-1/4 m-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <button
          className="absolute left-4 top-4 p-4 font-semibold text-[#100e80]"
          onClick={() => {
            router.push("/");
          }}
        >
          Atras
        </button>
        <RegistrationInfo title={"Regístrate"} />
        <SexCheckBoxes
          control={control}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
        <FullNameInput control={control} errors={errors} />
        <DocumentSection
          control={control}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
        <PhoneSection
          control={control}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
        <EmailInput control={control} errors={errors} />
        <PasswordSection control={control} errors={errors} />
        <PasswordRules />
        <RegistrationButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default RegisterForm;
