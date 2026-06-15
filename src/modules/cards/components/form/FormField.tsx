import type { ReactNode } from "react";

interface Props {
    label: string;
    required?: boolean;
    children: ReactNode;
}

export default function FormField({
    label,
    required = false,
    children,
}: Props) {
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