import Input from "@/shared/components/form/input/InputField";
import FileInput from "@/shared/components/form/input/FileInput";

import { CardFormValues } from "../../types";
import FormField from "./FormField";

interface Props {
    form: CardFormValues;
    updateField: <K extends keyof CardFormValues>(
        key: K,
        value: CardFormValues[K]
    ) => void;
    onProfileImageChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    onBannerImageChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

export default function MediaColorsSection({
    form,
    updateField,
    onProfileImageChange,
    onBannerImageChange,
}: Props) {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]">
            <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Imágenes y colores
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField label="Foto de perfil">
                    <FileInput
                        accept="image/*"
                        onChange={onProfileImageChange}
                    />
                </FormField>

                <FormField label="Banner">
                    <FileInput
                        accept="image/*"
                        onChange={onBannerImageChange}
                    />
                </FormField>

                <FormField label="Color principal">
                    <Input
                        type="color"
                        value={form.primary_color}
                        onChange={(e) =>
                            updateField("primary_color", e.target.value)
                        }
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
    );
}