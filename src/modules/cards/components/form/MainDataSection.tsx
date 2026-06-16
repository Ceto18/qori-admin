import Input from "@/shared/components/form/input/InputField";
import TextArea from "@/shared/components/form/input/TextArea";

import { CardFormValues } from "../../types";
import FormField from "./FormField";

interface Props {
    form: CardFormValues;
    updateField: <K extends keyof CardFormValues>(
        key: K,
        value: CardFormValues[K]
    ) => void;
}

export default function MainDataSection({ form, updateField }: Props) {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]">
            <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Datos principales
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField label="Nombre" required>
                    <Input
                        type="text"
                        value={form.first_name}
                        placeholder="Ej. Juan"
                        onChange={(e) =>
                            updateField("first_name", e.target.value)
                        }
                    />
                </FormField>

                <FormField label="Apellido" required>
                    <Input
                        type="text"
                        value={form.last_name}
                        placeholder="Ej. Rodríguez"
                        onChange={(e) =>
                            updateField("last_name", e.target.value)
                        }
                    />
                </FormField>

                <FormField label="Cargo">
                    <Input
                        type="text"
                        value={form.position}
                        placeholder="Ej. Gerente Comercial"
                        onChange={(e) =>
                            updateField("position", e.target.value)
                        }
                    />
                </FormField>

                <FormField label="Institución / Empresa">
                    <Input
                        type="text"
                        value={form.institution}
                        placeholder="Ej. Myl Comunicaciones"
                        onChange={(e) =>
                            updateField("institution", e.target.value)
                        }
                    />
                </FormField>

                <FormField label="Profesión">
                    <Input
                        type="text"
                        value={form.position}
                        placeholder="Ej. Ingeniero de Sistemas"
                        onChange={(e) =>
                            updateField("profession", e.target.value)
                        }
                    />
                </FormField>

                <FormField label="Ubicación">
                    <Input
                        type="text"
                        value={form.ubication}
                        placeholder="Lima, Perú"
                        onChange={(e) =>
                            updateField("ubication", e.target.value)
                        }
                    />
                </FormField>

                <div className="md:col-span-2">
                    <FormField label="Descripción">
                        <TextArea
                            rows={4}
                            value={form.description}
                            placeholder="Breve presentación profesional..."
                            onChange={(value) =>
                                updateField("description", value)
                            }
                        />
                    </FormField>
                </div>
            </div>
        </section>
    );
}