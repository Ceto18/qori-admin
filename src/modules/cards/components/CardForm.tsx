"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import Input from "@/shared/components/form/input/InputField";
import Select from "@/shared/components/form/Select";
import FileInput from "@/shared/components/form/input/FileInput";
import TextArea from "@/shared/components/form/input/TextArea";

import { CARD_TEMPLATES } from "../constants/cardTemplates";
import { Card, CardFormValues, CardStatus, CardTemplateKey } from "../types";
import CardPreview from "./CardPreview";

interface Props {
  initialData?: Card | null;
  loading?: boolean;
  onSubmit: (values: CardFormValues) => Promise<void>;
}

const initialForm: CardFormValues = {
  full_name: "",
  position: "",
  company: "",
  profession: "",
  email: "",
  phone: "",
  whatsapp: "",
  website: "",
  location: "",
  bio: "",
  slug: "",
  template_key: "classic",
  primary_color: "#2563eb",
  secondary_color: "#111827",
  status: "active",
  profile_image: null,
  banner_image: null,
};

export default function CardForm({
  initialData = null,
  loading = false,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<CardFormValues>(initialForm);
  const [profilePreview, setProfilePreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");

  useEffect(() => {
    if (!initialData) return;

    setForm({
      full_name: initialData.full_name ?? "",
      position: initialData.position ?? "",
      company: initialData.company ?? "",
      profession: initialData.profession ?? "",
      email: initialData.email ?? "",
      phone: initialData.phone ?? "",
      whatsapp: initialData.whatsapp ?? "",
      website: initialData.website ?? "",
      location: initialData.location ?? "",
      bio: initialData.bio ?? "",
      slug: initialData.slug ?? "",
      template_key: initialData.template_key ?? "classic",
      primary_color: initialData.primary_color ?? "#2563eb",
      secondary_color: initialData.secondary_color ?? "#111827",
      status: initialData.status ?? "active",
      profile_image: null,
      banner_image: null,
    });

    setProfilePreview(initialData.profile_image ?? "");
    setBannerPreview(initialData.banner_image ?? "");
  }, [initialData]);

  const updateField = <K extends keyof CardFormValues>(
    key: K,
    value: CardFormValues[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    updateField("profile_image", file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleBannerImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    updateField("banner_image", file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]"
    >
      <div className="space-y-6">
        <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Datos principales
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Nombre completo" required>
              <Input
                type="text"
                value={form.full_name}
                placeholder="Ej. Juan Pérez"
                onChange={(e) => updateField("full_name", e.target.value)}
              />
            </FormField>

            <FormField label="Cargo">
              <Input
                type="text"
                value={form.position}
                placeholder="Ej. Gerente Comercial"
                onChange={(e) => updateField("position", e.target.value)}
              />
            </FormField>

            <FormField label="Empresa">
              <Input
                type="text"
                value={form.company}
                placeholder="Ej. Myl Comunicaciones"
                onChange={(e) => updateField("company", e.target.value)}
              />
            </FormField>

            <FormField label="Profesión">
              <Input
                type="text"
                value={form.profession}
                placeholder="Ej. Ingeniero de Sistemas"
                onChange={(e) => updateField("profession", e.target.value)}
              />
            </FormField>

            <FormField label="Slug público">
              <Input
                type="text"
                value={form.slug}
                placeholder="ej. juan-perez"
                onChange={(e) => updateField("slug", e.target.value)}
              />
            </FormField>

            <FormField label="Estado">
              <Select
                placeholder="Seleccionar estado"
                defaultValue={form.status}
                options={[
                  { label: "Activo", value: "active" },
                  { label: "Inactivo", value: "inactive" },
                ]}
                onChange={(value) =>
                  updateField("status", value as CardStatus)
                }
              />
            </FormField>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Contacto
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Correo">
              <Input
                type="email"
                value={form.email}
                placeholder="correo@empresa.com"
                onChange={(e) => updateField("email", e.target.value)}
              />
            </FormField>

            <FormField label="Teléfono">
              <Input
                type="text"
                value={form.phone}
                placeholder="999 999 999"
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </FormField>

            <FormField label="WhatsApp">
              <Input
                type="text"
                value={form.whatsapp}
                placeholder="999 999 999"
                onChange={(e) => updateField("whatsapp", e.target.value)}
              />
            </FormField>

            <FormField label="Sitio web">
              <Input
                type="text"
                value={form.website}
                placeholder="https://empresa.com"
                onChange={(e) => updateField("website", e.target.value)}
              />
            </FormField>

            <div className="md:col-span-2">
              <FormField label="Ubicación">
                <Input
                  type="text"
                  value={form.location}
                  placeholder="Lima, Perú"
                  onChange={(e) => updateField("location", e.target.value)}
                />
              </FormField>
            </div>

            <div className="md:col-span-2">
              <FormField label="Descripción">
                <TextArea
                  rows={4}
                  value={form.bio}
                  placeholder="Breve presentación profesional..."
                  onChange={(value) => updateField("bio", value)}
                />
              </FormField>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Imágenes y colores
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Foto de perfil">
              <FileInput
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </FormField>

            <FormField label="Banner">
              <FileInput
                accept="image/*"
                onChange={handleBannerImageChange}
              />
            </FormField>

            <FormField label="Color principal">
              <Input
                type="color"
                value={form.primary_color}
                onChange={(e) => updateField("primary_color", e.target.value)}
              />
            </FormField>

            <FormField label="Color secundario">
              <Input
                type="color"
                value={form.secondary_color}
                onChange={(e) =>
                  updateField("secondary_color", e.target.value)
                }
              />
            </FormField>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]">
          <TemplateSelector
            selectedTemplateKey={form.template_key}
            onChange={(templateKey) => updateField("template_key", templateKey)}
          />
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Guardando..." : "Guardar tarjeta"}
          </button>
        </div>
      </div>

      <CardPreview
        data={form}
        profilePreview={profilePreview}
        bannerPreview={bannerPreview}
      />
    </form>
  );
}

function FormField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        {label}
        {required && <span className="ml-1 text-error-500">*</span>}
      </label>

      {children}
    </div>
  );
}

function TemplateSelector({
  selectedTemplateKey,
  onChange,
}: {
  selectedTemplateKey: CardTemplateKey;
  onChange: (value: CardTemplateKey) => void;
}) {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
        Plantilla
      </h2>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Selecciona el diseño que tendrá la tarjeta pública.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {CARD_TEMPLATES.map((template) => {
          const selected = selectedTemplateKey === template.key;

          return (
            <button
              key={template.key}
              type="button"
              onClick={() => onChange(template.key)}
              className={`relative rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-500/10"
                  : "border-gray-200 bg-white hover:border-brand-300 dark:border-white/[0.08] dark:bg-white/[0.03]"
              }`}
            >
              {selected && (
                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white">
                  <Check size={14} />
                </span>
              )}

              <div
                className="mb-3 h-20 rounded-lg border border-gray-100 dark:border-white/[0.06]"
                style={{
                  background:
                    template.key === "classic"
                      ? "linear-gradient(135deg, #2563eb, #1e293b)"
                      : template.key === "modern"
                      ? "linear-gradient(135deg, #7c3aed, #db2777)"
                      : template.key === "corporate"
                      ? "linear-gradient(135deg, #0f172a, #334155)"
                      : template.key === "minimal"
                      ? "linear-gradient(135deg, #f8fafc, #e5e7eb)"
                      : "linear-gradient(135deg, #f59e0b, #111827)",
                }}
              />

              <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                {template.name}
              </h3>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {template.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}