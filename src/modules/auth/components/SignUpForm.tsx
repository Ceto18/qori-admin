"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Input from "@/shared/components/form/input/InputField";
import Label from "@/shared/components/form/Label";
import Button from "@/shared/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/shared/icons";

import toast from "react-hot-toast";

import { registerRequest } from "../services/authService";
import { locationService } from "../services/locationService";

import type {
    Country,
    LocationItem,
} from "../types/locationTypes";

export default function SignUpForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [typeDocument, setTypeDocument] = useState("DNI");
    const [document, setDocument] = useState("");
    const [countryCode, setCountryCode] = useState("+51");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [countryId, setCountryId] = useState<number | null>(null);
    const [departmentId, setDepartmentId] = useState<number | null>(null);
    const [provinceId, setProvinceId] = useState<number | null>(null);
    const [districtId, setDistrictId] = useState<number | null>(null);

    const [countries, setCountries] = useState<Country[]>([]);
    const [departments, setDepartments] = useState<LocationItem[]>([]);
    const [provinces, setProvinces] = useState<LocationItem[]>([]);
    const [districts, setDistricts] = useState<LocationItem[]>([]);

    const [loadingCountries, setLoadingCountries] = useState(false);
    const [loadingDepartments, setLoadingDepartments] = useState(false);
    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [loading, setLoading] = useState(false);

    const loadDepartments = async (
        selectedCountryId: number
    ) => {
        try {
            setLoadingDepartments(true);

            const response =
                await locationService.getDepartments(
                    selectedCountryId
                );

            setDepartments(response.data ?? []);
        } catch (error: any) {
            console.error(
                "Error departments:",
                error?.response?.data ?? error
            );

            setDepartments([]);
        } finally {
            setLoadingDepartments(false);
        }
    };

    const loadProvinces = async (
        selectedDepartmentId: number
    ) => {
        try {
            setLoadingProvinces(true);

            const response =
                await locationService.getProvinces(
                    selectedDepartmentId
                );

            setProvinces(response.data ?? []);
        } catch (error: any) {
            console.error(
                "Error provinces:",
                error?.response?.data ?? error
            );

            setProvinces([]);
        } finally {
            setLoadingProvinces(false);
        }
    };

    const loadDistricts = async (
        selectedProvinceId: number
    ) => {
        try {
            setLoadingDistricts(true);

            const response =
                await locationService.getDistricts(
                    selectedProvinceId
                );

            setDistricts(response.data ?? []);
        } catch (error: any) {
            console.error(
                "Error districts:",
                error?.response?.data ?? error
            );

            setDistricts([]);
        } finally {
            setLoadingDistricts(false);
        }
    };

    useEffect(() => {
        const loadCountries = async () => {
            try {
                setLoadingCountries(true);

                const response =
                    await locationService.getCountries();

                setCountries(response.data ?? []);

                const peru = response.data?.find(
                    (item) => item.code === "PE"
                );

                if (peru) {
                    setCountryId(peru.id);

                    await loadDepartments(peru.id);
                }
            } catch (error: any) {
                console.error(
                    "Error countries:",
                    error?.response?.data ?? error
                );

                toast.error(
                    "No se pudieron cargar los países."
                );
            } finally {
                setLoadingCountries(false);
            }
        };

        loadCountries();
    }, []);

    const handleCountryChange = async (
        value: string
    ) => {
        const id = Number(value);

        setCountryId(id || null);

        setDepartmentId(null);
        setProvinceId(null);
        setDistrictId(null);

        setDepartments([]);
        setProvinces([]);
        setDistricts([]);

        if (!id) return;

        await loadDepartments(id);
    };

    const handleDepartmentChange = async (
        value: string
    ) => {
        const id = Number(value);

        setDepartmentId(id || null);

        setProvinceId(null);
        setDistrictId(null);

        setProvinces([]);
        setDistricts([]);

        if (!id) return;

        await loadProvinces(id);
    };

    const handleProvinceChange = async (
        value: string
    ) => {
        const id = Number(value);

        setProvinceId(id || null);

        setDistrictId(null);
        setDistricts([]);

        if (!id) return;

        await loadDistricts(id);
    };

    const handleDistrictChange = (
        value: string
    ) => {
        const id = Number(value);

        setDistrictId(id || null);
    };

    const handleRegister = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (loading) return;

        if (
            !name.trim() ||
            !lastName.trim() ||
            !typeDocument.trim() ||
            !document.trim() ||
            !countryCode.trim() ||
            !phone.trim() ||
            !address.trim() ||
            !countryId ||
            !departmentId ||
            !provinceId ||
            !districtId ||
            !email.trim() ||
            !password.trim() ||
            !passwordConfirmation.trim()
        ) {
            toast.error(
                "Todos los campos son obligatorios"
            );

            return;
        }

        if (
            password !== passwordConfirmation
        ) {
            toast.error(
                "Las contraseñas no coinciden"
            );

            return;
        }

        setLoading(true);

        const toastId =
            toast.loading("Creando cuenta...");

        try {
            const response =
                await registerRequest({
                    email,
                    password,
                    password_confirmation:
                        passwordConfirmation,

                    name,
                    last_name: lastName,
                    type_document: typeDocument,
                    document,
                    country_code: countryCode,
                    phone,
                    address,

                    country_id: countryId,
                    department_id: departmentId,
                    province_id: provinceId,
                    district_id: districtId,
                });

            toast.success(
                response?.message ??
                "Cuenta creada correctamente",
                {
                    id: toastId,
                }
            );

            router.replace("/signin");
        } catch (error: any) {
            console.error(error);

            const responseData =
                error?.response?.data;

            let errorMessage =
                responseData?.message ??
                "Error al registrarse";

            if (responseData?.errors) {
                const firstErrorKey =
                    Object.keys(
                        responseData.errors
                    )[0];

                const firstError =
                    responseData.errors[
                    firstErrorKey
                    ];

                if (
                    Array.isArray(firstError) &&
                    firstError.length > 0
                ) {
                    errorMessage =
                        firstError[0];
                }
            }

            toast.error(errorMessage, {
                id: toastId,
            });
        } finally {
            setLoading(false);
        }
    };

    const selectClassName =
        "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs outline-none focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90";

    return (
        <div className="flex w-full flex-1 flex-col overflow-y-auto no-scrollbar lg:w-1/2">
            <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Crear cuenta
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Crea una cuenta ingresando tus datos personales
                        </p>
                    </div>

                    <form onSubmit={handleRegister}>
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <Label>
                                        Nombre{" "}
                                        <span className="text-error-500">*</span>
                                    </Label>

                                    <Input
                                        type="text"
                                        placeholder="Ingresa tu nombre"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <Label>
                                        Apellido{" "}
                                        <span className="text-error-500">*</span>
                                    </Label>

                                    <Input
                                        type="text"
                                        placeholder="Ingresa tu apellido"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <Label>
                                        Tipo de documento{" "}
                                        <span className="text-error-500">*</span>
                                    </Label>

                                    <select
                                        value={typeDocument}
                                        onChange={(e) =>
                                            setTypeDocument(
                                                e.target.value
                                            )
                                        }
                                        className={
                                            selectClassName
                                        }
                                    >
                                        <option value="DNI">
                                            DNI
                                        </option>

                                        <option value="CE">
                                            Carnet de extranjería
                                        </option>

                                        <option value="PASAPORTE">
                                            Pasaporte
                                        </option>

                                        <option value="RUC">
                                            RUC
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <Label>
                                        Número de documento{" "}
                                        <span className="text-error-500">*</span>
                                    </Label>

                                    <Input
                                        type="text"
                                        placeholder="Ej: 12345678"
                                        value={document}
                                        onChange={(e) =>
                                            setDocument(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[120px_1fr]">
                                <div>
                                    <Label>
                                        Código{" "}
                                        <span className="text-error-500">*</span>
                                    </Label>

                                    <Input
                                        type="text"
                                        placeholder="+51"
                                        value={countryCode}
                                        onChange={(e) =>
                                            setCountryCode(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <Label>
                                        Teléfono{" "}
                                        <span className="text-error-500">*</span>
                                    </Label>

                                    <Input
                                        type="text"
                                        placeholder="Ej: 909090909"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>
                                    Dirección{" "}
                                    <span className="text-error-500">*</span>
                                </Label>

                                <Input
                                    type="text"
                                    placeholder="Ej: Av. Las Lomas 123"
                                    value={address}
                                    onChange={(e) =>
                                        setAddress(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <Label>
                                        País{" "}
                                        <span className="text-error-500">*</span>
                                    </Label>

                                    <select
                                        value={countryId ?? ""}
                                        onChange={(e) =>
                                            handleCountryChange(
                                                e.target.value
                                            )
                                        }
                                        disabled={
                                            loadingCountries
                                        }
                                        className={
                                            selectClassName
                                        }
                                    >
                                        <option value="">
                                            {loadingCountries
                                                ? "Cargando..."
                                                : "Selecciona un país"}
                                        </option>

                                        {countries.map(
                                            (item) => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <Label>
                                        Departamento{" "}
                                        <span className="text-error-500">*</span>
                                    </Label>

                                    <select
                                        value={
                                            departmentId ?? ""
                                        }
                                        onChange={(e) =>
                                            handleDepartmentChange(
                                                e.target.value
                                            )
                                        }
                                        disabled={
                                            !countryId ||
                                            loadingDepartments
                                        }
                                        className={
                                            selectClassName
                                        }
                                    >
                                        <option value="">
                                            {!countryId
                                                ? "Selecciona primero un país"
                                                : loadingDepartments
                                                    ? "Cargando..."
                                                    : "Selecciona un departamento"}
                                        </option>

                                        {departments.map(
                                            (item) => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <Label>
                                        Provincia{" "}
                                        <span className="text-error-500">*</span>
                                    </Label>

                                    <select
                                        value={
                                            provinceId ?? ""
                                        }
                                        onChange={(e) =>
                                            handleProvinceChange(
                                                e.target.value
                                            )
                                        }
                                        disabled={
                                            !departmentId ||
                                            loadingProvinces
                                        }
                                        className={
                                            selectClassName
                                        }
                                    >
                                        <option value="">
                                            {!departmentId
                                                ? "Selecciona primero un departamento"
                                                : loadingProvinces
                                                    ? "Cargando..."
                                                    : "Selecciona una provincia"}
                                        </option>

                                        {provinces.map(
                                            (item) => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <Label>
                                        Distrito{" "}
                                        <span className="text-error-500">*</span>
                                    </Label>

                                    <select
                                        value={
                                            districtId ?? ""
                                        }
                                        onChange={(e) =>
                                            handleDistrictChange(
                                                e.target.value
                                            )
                                        }
                                        disabled={
                                            !provinceId ||
                                            loadingDistricts
                                        }
                                        className={
                                            selectClassName
                                        }
                                    >
                                        <option value="">
                                            {!provinceId
                                                ? "Selecciona primero una provincia"
                                                : loadingDistricts
                                                    ? "Cargando..."
                                                    : "Selecciona un distrito"}
                                        </option>

                                        {districts.map(
                                            (item) => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <Label>
                                    Correo electrónico{" "}
                                    <span className="text-error-500">*</span>
                                </Label>

                                <Input
                                    type="email"
                                    placeholder="ejemplo@correo.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <Label>
                                    Contraseña{" "}
                                    <span className="text-error-500">*</span>
                                </Label>

                                <div className="relative">
                                    <Input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Ingresa tu contraseña"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                        ) : (
                                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <Label>
                                    Confirmar contraseña{" "}
                                    <span className="text-error-500">*</span>
                                </Label>

                                <div className="relative">
                                    <Input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirma tu contraseña"
                                        value={
                                            passwordConfirmation
                                        }
                                        onChange={(e) =>
                                            setPasswordConfirmation(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                        ) : (
                                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full items-center justify-center rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {loading
                                        ? "Creando cuenta..."
                                        : "Crear cuenta"}
                                </Button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-5">
                        <p className="text-center text-sm text-gray-700 dark:text-gray-400 sm:text-start">
                            ¿Ya tienes una cuenta?{" "}

                            <Link
                                href="/signin"
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