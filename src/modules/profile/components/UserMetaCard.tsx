"use client";

import { useEffect, useState } from "react";

import { PencilIcon } from "@/shared/icons";
import { useModal } from "@/shared/hooks/useModal";

import Input from "@/shared/components/form/input/InputField";
import Label from "@/shared/components/form/Label";
import Button from "@/shared/components/ui/button/Button";
import { Modal } from "@/shared/components/ui/modal/index";

import { useProfileStore } from "../store/useProfileStore";

type ProfileForm = {
    name: string;
    last_name: string;
    phone: string;
};

export default function UserMetaCard() {
    const { isOpen, openModal, closeModal } = useModal();

    const {
        profile,
        updatingProfile,
        profileError,
        updateProfile,
        clearProfileError,
    } = useProfileStore();

    const [form, setForm] = useState<ProfileForm>({
        name: "",
        last_name: "",
        phone: "",
    });

    useEffect(() => {
        if (!profile) return;

        setForm({
            name: profile.profile.name ?? "",
            last_name: profile.profile.last_name ?? "",
            phone: profile.profile.phone ?? "",
        });
    }, [profile]);

    const resetForm = () => {
        if (!profile) return;

        setForm({
            name: profile.profile.name ?? "",
            last_name: profile.profile.last_name ?? "",
            phone: profile.profile.phone ?? "",
        });
    };

    const handleOpenModal = () => {
        if (!profile) return;

        clearProfileError();
        resetForm();
        openModal();
    };

    const handleCloseModal = () => {
        if (updatingProfile) return;

        clearProfileError();
        resetForm();
        closeModal();
    };

    const handleChange = (
        field: keyof ProfileForm,
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        if (!profile || updatingProfile) return;

        clearProfileError();

        const payload = {
            name: form.name.trim(),
            last_name: form.last_name.trim(),
            phone: form.phone.trim(),

            address: profile.profile.address ?? "",

            department_id:
                profile.profile.department?.id ?? 0,

            province_id:
                profile.profile.province?.id ?? 0,

            district_id:
                profile.profile.district?.id ?? 0,
        };

        console.log(
            "Actualizando perfil:",
            payload
        );

        const success =
            await updateProfile(payload);

        console.log(
            "Resultado actualización:",
            success
        );

        if (success) {
            closeModal();
        }
    };

    if (!profile) {
        return null;
    }

    const { profile: userProfile } = profile;

    const fullName =
        `${userProfile.name ?? ""} ${userProfile.last_name ?? ""}`.trim();

    return (
        <>
            {/* ====================================================== */}
            {/* CARD PERFIL */}
            {/* ====================================================== */}

            <div className="mb-6 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
                <div className="flex flex-col gap-5 sm:flex-row xl:gap-10">
                    <div className="flex-1">
                        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h4 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90">
                                    {fullName || "Usuario"}
                                </h4>

                                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span>{profile.email}</span>

                                    <span className="hidden sm:inline">
                                        •
                                    </span>

                                    <span>
                                        {getRoleLabel(
                                            profile.role
                                        )}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleOpenModal}
                                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
                            >
                                <PencilIcon className="size-5" />

                                Editar
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
                            <ProfileItem
                                label="Nombres"
                                value={userProfile.name}
                            />

                            <ProfileItem
                                label="Apellidos"
                                value={userProfile.last_name}
                            />

                            <ProfileItem
                                label="Correo electrónico"
                                value={profile.email}
                            />

                            <ProfileItem
                                label="Teléfono"
                                value={`${userProfile.country_code ?? ""} ${userProfile.phone ?? ""
                                    }`.trim()}
                            />

                            <ProfileItem
                                label="Tipo de documento"
                                value={userProfile.type_document}
                            />

                            <ProfileItem
                                label="Número de documento"
                                value={userProfile.document}
                            />

                            <ProfileItem
                                label="Rol"
                                value={getRoleLabel(
                                    profile.role
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ====================================================== */}
            {/* MODAL EDITAR PERFIL */}
            {/* ====================================================== */}

            <Modal
                isOpen={isOpen}
                onClose={handleCloseModal}
                className="m-4 max-w-[700px]"
            >
                <div className="relative no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
                    <div className="px-2 pe-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Editar información personal
                        </h4>

                        <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
                            Actualiza tus datos personales.
                        </p>
                    </div>

                    <form
                        className="flex flex-col"
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                    >
                        <div className="custom-scrollbar max-h-[450px] overflow-y-auto px-2 pb-3">
                            <div>
                                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                                    Información personal
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div>
                                        <Label>Nombres</Label>

                                        <Input
                                            type="text"
                                            value={form.name}
                                            onChange={(event) =>
                                                handleChange(
                                                    "name",
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>Apellidos</Label>

                                        <Input
                                            type="text"
                                            value={form.last_name}
                                            onChange={(event) =>
                                                handleChange(
                                                    "last_name",
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>Teléfono</Label>

                                        <Input
                                            type="text"
                                            value={form.phone}
                                            onChange={(event) =>
                                                handleChange(
                                                    "phone",
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-7">
                                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                                    Información de la cuenta
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div>
                                        <Label>
                                            Correo electrónico
                                        </Label>

                                        <Input
                                            type="text"
                                            value={profile.email}
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Documento
                                        </Label>

                                        <Input
                                            type="text"
                                            value={`${userProfile.type_document} - ${userProfile.document}`}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>

                            {profileError && (
                                <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-500/20 dark:bg-red-500/10">
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                        {profileError}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCloseModal}
                                disabled={updatingProfile}
                            >
                                Cancelar
                            </Button>

                            <Button
                                size="sm"
                                onClick={handleSave}
                                disabled={
                                    updatingProfile ||
                                    !form.name.trim() ||
                                    !form.last_name.trim() ||
                                    !form.phone.trim()
                                }
                            >
                                {updatingProfile
                                    ? "Guardando..."
                                    : "Guardar cambios"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}

function ProfileItem({
    label,
    value,
}: {
    label: string;
    value?: string | number | null;
}) {
    return (
        <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                {label}
            </p>

            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {value ?? "-"}
            </p>
        </div>
    );
}

function getRoleLabel(
    role:
        | "user"
        | "affiliate"
        | "admin"
        | "superadmin"
) {
    switch (role) {
        case "affiliate":
            return "Afiliado";

        case "admin":
            return "Administrador";

        case "superadmin":
            return "Superadministrador";

        default:
            return "Usuario";
    }
}