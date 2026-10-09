"use client";

import { useEffect, useRef, useState } from "react";

import Input from "@/shared/components/form/input/InputField";
import Label from "@/shared/components/form/Label";

import { useAffiliateStore } from "@/modules/affiliates/store/useAffiliateStore";

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
  user_id: "",
  active: true,
};

export default function DiscountCodeForm({
  initialData,
  loading = false,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<DiscountCodeFormValues>(initialFormState);

  const {
    affiliateOptions,
    loadingOptions,
    fetchAffiliateOptions,
  } = useAffiliateStore();

  useEffect(() => {
    fetchAffiliateOptions({
      page: 1,
      perPage: 100,
      search: "",
    });
  }, [fetchAffiliateOptions]);

  useEffect(() => {
    if (!initialData) {
      setForm(initialFormState);
      return;
    }

    setForm({
      name: initialData.name ?? "",
      code: initialData.code ?? "",
      type: initialData.type ?? "percentage",
      value: String(initialData.value ?? ""),
      max_uses:
        initialData.max_uses === null ||
          initialData.max_uses === undefined
          ? ""
          : String(initialData.max_uses),
      starts_at: toDateInputValue(initialData.starts_at),
      expires_at: toDateInputValue(initialData.expires_at),
      user_id:
        initialData.user_id === null ||
          initialData.user_id === undefined
          ? ""
          : String(initialData.user_id),
      active: initialData.active ?? true,
    });
  }, [initialData]);

  const handleChange = (
    key: keyof DiscountCodeFormValues,
    value: string | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const buildPayload = (): DiscountCodePayload => ({
    name: form.name.trim(),
    code: form.code.trim().toUpperCase(),
    type: form.type,
    value: Number(form.value),
    max_uses: form.max_uses
      ? Number(form.max_uses)
      : null,
    starts_at: form.starts_at
      ? `${form.starts_at} 00:00:00`
      : null,
    expires_at: form.expires_at
      ? `${form.expires_at} 23:59:59`
      : null,
    user_id: form.user_id
      ? Number(form.user_id)
      : null,
    active: form.active,
  });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) return;

    await onSubmit(buildPayload());
  };

  const selectClassName =
    "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90";

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
            onChange={(e) =>
              handleChange("name", e.target.value)
            }
          />
        </div>

        <div>
          <Label>Código</Label>
          <Input
            type="text"
            value={form.code}
            placeholder="Ej. ABCD123"
            onChange={(e) =>
              handleChange(
                "code",
                e.target.value.toUpperCase()
              )
            }
          />
        </div>

        <div>
          <Label>Afiliado</Label>
          <select
            value={form.user_id}
            onChange={(e) =>
              handleChange(
                "user_id",
                e.target.value
              )
            }
            disabled={loadingOptions}
            className={selectClassName}
          >
            <option value="">
              {loadingOptions
                ? "Cargando afiliados..."
                : "Sin afiliado"}
            </option>

            {affiliateOptions.map((affiliate) => (
              <option
                key={affiliate.uuid}
                value={affiliate.id}
              >
                {affiliate.full_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Tipo de descuento</Label>
          <select
            value={form.type}
            onChange={(e) =>
              handleChange(
                "type",
                e.target.value as DiscountCodeType
              )
            }
            className={selectClassName}
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
            onChange={(e) =>
              handleChange("value", e.target.value)
            }
          />
        </div>

        <div>
          <Label>Máximo de usos</Label>
          <Input
            type="number"
            value={form.max_uses}
            placeholder="Vacío = ilimitado"
            onChange={(e) =>
              handleChange("max_uses", e.target.value)
            }
          />
        </div>

        <div>
          <Label>Fecha de inicio</Label>
          <DateInput
            value={form.starts_at}
            onChange={(value) =>
              handleChange("starts_at", value)
            }
          />
        </div>

        <div>
          <Label>Fecha de expiración</Label>
          <DateInput
            value={form.expires_at}
            onChange={(value) =>
              handleChange("expires_at", value)
            }
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
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}

function DateInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    const input = inputRef.current;

    if (!input) return;

    try {
      input.showPicker?.();
    } catch {
      input.focus();
    }
  };

  return (
    <input
      ref={inputRef}
      type="date"
      value={value}
      onClick={handleClick}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="h-11 w-full cursor-pointer rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
    />
  );
}

function toDateInputValue(value: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}