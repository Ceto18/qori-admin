"use client";

import { useEffect, useRef, useState } from "react";

import Input from "@/shared/components/form/input/InputField";
import Label from "@/shared/components/form/Label";

import {
  DiscountCode,
  DiscountCodeFormValues,
  DiscountCodePayload,
  DiscountCodeType,
} from "../../types";

interface Props {
  initialData?: DiscountCode | null;
  loading?: boolean;
  onSubmit: (payload: DiscountCodePayload) => Promise<void> | void;
  onCancel?: () => void;
}

const initialFormState: DiscountCodeFormValues = {
  name: "",
  code: "",
  type: "percentage",
  value: "",
  max_uses: "",
  starts_at: "",
  expires_at: "",
};

export default function DiscountCodeForm({
  initialData,
  loading = false,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<DiscountCodeFormValues>(initialFormState);

  useEffect(() => {
    if (!initialData) return;

    setForm({
      name: initialData.name ?? "",
      code: initialData.code ?? "",
      type: initialData.type ?? "percentage",
      value: String(initialData.value ?? ""),
      max_uses:
        initialData.max_uses === null || initialData.max_uses === undefined
          ? ""
          : String(initialData.max_uses),
      starts_at: toDateTimeLocalValue(initialData.starts_at),
      expires_at: toDateTimeLocalValue(initialData.expires_at),
    });
  }, [initialData]);

  const handleChange = (
    key: keyof DiscountCodeFormValues,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const buildPayload = (): DiscountCodePayload => {
    return {
      name: form.name,
      code: form.code,
      type: form.type,
      value: Number(form.value),
      max_uses: form.max_uses ? Number(form.max_uses) : null,
      starts_at: form.starts_at ? new Date(form.starts_at).toISOString() : null,
      expires_at: form.expires_at
        ? new Date(form.expires_at).toISOString()
        : null,
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmit(buildPayload());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <Label>Nombre</Label>
          <Input
            type="text"
            value={form.name}
            placeholder="Ej. Código Principal"
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div>
          <Label>Código</Label>
          <Input
            type="text"
            value={form.code}
            placeholder="Ej. ABCD123"
            onChange={(e) =>
              handleChange("code", e.target.value.toUpperCase())
            }
          />
        </div>

        <div>
          <Label>Tipo de descuento</Label>
          <select
            value={form.type}
            onChange={(e) =>
              handleChange("type", e.target.value as DiscountCodeType)
            }
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            <option value="percentage">Porcentaje</option>
            <option value="fixed">Monto fijo</option>
          </select>
        </div>

        <div>
          <Label>Valor</Label>
          <Input
            type="number"
            value={form.value}
            placeholder="Ej. 25"
            onChange={(e) => handleChange("value", e.target.value)}
          />
        </div>

        <div>
          <Label>Máximo de usos</Label>
          <Input
            type="number"
            value={form.max_uses}
            placeholder="Vacío = ilimitado"
            onChange={(e) => handleChange("max_uses", e.target.value)}
          />
        </div>

        <div>
          <Label>Fecha de inicio</Label>
          <DateTimeInput
            value={form.starts_at}
            onChange={(value) => handleChange("starts_at", value)}
          />
        </div>

        <div>
          <Label>Fecha de expiración</Label>
          <DateTimeInput
            value={form.expires_at}
            onChange={(value) => handleChange("expires_at", value)}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.1] dark:text-gray-300 dark:hover:bg-white/[0.05]"
          >
            Cancelar
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}

function DateTimeInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => {
    inputRef.current?.showPicker?.();
  };

  return (
    <input
      ref={inputRef}
      type="datetime-local"
      value={value}
      onClick={openPicker}
      onFocus={openPicker}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full cursor-pointer rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
    />
  );
}

function toDateTimeLocalValue(value: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
}