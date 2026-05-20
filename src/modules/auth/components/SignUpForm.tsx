"use client";
import Checkbox from "@/shared/components/form/input/Checkbox";
import Input from "@/shared/components/form/input/InputField";
import Label from "@/shared/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/shared/icons";
import Link from "next/link";
import React, { useState } from "react";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto no-scrollbar lg:w-1/2">
      {/* BACK */}
      {/* <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Volver al inicio
        </Link>
      </div> */}

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          {/* HEADER */}
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Crear cuenta
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Crea una cuenta ingresando tus datos
            </p>
          </div>

          <form>
            <div className="space-y-5">
              {/* NOMBRE Y APELLIDO */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label>
                    Nombre <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Ingresa tu nombre"
                  />
                </div>

                <div>
                  <Label>
                    Apellido <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Ingresa tu apellido"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <Label>
                  Correo electrónico <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <Label>
                  Contraseña <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Ingresa tu contraseña"
                    type={showPassword ? "text" : "password"}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>

              {/* CHECKBOX */}
              <div className="flex items-center gap-3">
                <Checkbox
                  className="w-5 h-5"
                  checked={isChecked}
                  onChange={setIsChecked}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Al crear una cuenta aceptas nuestros{" "}
                  <span className="text-gray-800 dark:text-white/90">
                    Términos y condiciones
                  </span>{" "}
                  y la{" "}
                  <span className="text-gray-800 dark:text-white">
                    Política de privacidad
                  </span>
                </p>
              </div>

              {/* BOTÓN */}
              <div>
                <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                  Crear cuenta
                </button>
              </div>
            </div>
          </form>

          {/* FOOTER */}
          <div className="mt-5">
            <p className="text-sm text-center text-gray-700 dark:text-gray-400 sm:text-start">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}