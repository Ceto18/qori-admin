"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";

import Input from "@/shared/components/form/input/InputField";
import FileInput from "@/shared/components/form/input/FileInput";
import { Organization } from "../types";

type OrganizationFormValues = {
    name: string;
    description: string;
    address: string;
    country: string;
    city: string;
    phone: string;
    website: string;
    logo: File | null;
};

interface Props {
    initialData?: Organization | null;
    loading?: boolean;
    onSubmit: (formData: FormData) => Promise<void>;
    onCancel?: () => void;
}

export default function OrganizationForm({
    initialData = null,
    loading = false,
    onSubmit,
    onCancel,
}: Props) {
    const isEditMode = Boolean(initialData);

    const [form, setForm] = useState<OrganizationFormValues>({
        name: "",
        description: "",
        address: "",
        country: "",
        city: "",
        phone: "",
        website: "",
        logo: null,
    });

    useEffect(() => {
        console.log("INITIAL DATA FORM:", initialData);

        if (initialData) {
            setForm({
                name: initialData.name ?? "",
                description: initialData.description ?? "",
                address: initialData.address ?? "",
                country: initialData.country ?? "",
                city: initialData.city ?? "",
                phone: initialData.phone ?? "",
                website: initialData.website ?? "",
                logo: null,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            description: e.target.value,
        }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;

        setForm((prev) => ({
            ...prev,
            logo: file,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("address", form.address);
        formData.append("country", form.country);
        formData.append("city", form.city);

        if (form.phone) {
            formData.append("phone", form.phone);
        }

        if (form.website) {
            formData.append("website", form.website);
        }

        if (form.logo) {
            formData.append("logo", form.logo);
        }

        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03] sm:p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        {isEditMode ? "Editar organización" : "Crear organización"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {isEditMode
                            ? "Actualiza los datos principales de la organización."
                            : "Completa los datos principales de la organización."}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Nombre <span className="text-error-500">*</span>
                        </label>

                        <Input
                            name="name"
                            placeholder="Constructura de las Casas"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            País <span className="text-error-500">*</span>
                        </label>

                        <Input
                            name="country"
                            placeholder="Perú"
                            value={form.country}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Ciudad <span className="text-error-500">*</span>
                        </label>

                        <Input
                            name="city"
                            placeholder="Lima"
                            value={form.city}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Teléfono
                        </label>

                        <Input
                            name="phone"
                            placeholder="951236478"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Dirección <span className="text-error-500">*</span>
                        </label>

                        <Input
                            name="address"
                            placeholder="Urb. Las Lomas Mz A Lt 2"
                            value={form.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Sitio web
                        </label>

                        <Input
                            name="website"
                            placeholder="http://demo.com"
                            value={form.website}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Descripción <span className="text-error-500">*</span>
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleDescriptionChange}
                            placeholder="Construyendo casas"
                            rows={4}
                            className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Logo
                        </label>

                        <FileInput
                            name="logo"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={handleLogoChange}
                        />

                        {form.logo && (
                            <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                                Archivo seleccionado: {form.logo.name}
                            </p>
                        )}

                        {!form.logo && initialData?.logo_url && (
                            <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                                Logo actual: {initialData.logo_url}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={17} className="animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save size={17} />
                                {isEditMode ? "Actualizar organización" : "Guardar organización"}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}