import { Plus, Trash2 } from "lucide-react";

import Input from "@/shared/components/form/input/InputField";
import Select from "@/shared/components/form/Select";

import { CardNetwork, SocialNetwork } from "../../types";
import FormField from "./FormField";

type NetworkEditableKey =
    | "value"
    | "label"
    | "name"
    | "icon_url"
    | "red_social"
    | "red_social_uuid";

interface Props {
    networks: CardNetwork[];
    socialNetworks: SocialNetwork[];
    onAdd: () => void;
    onUpdate: (
        index: number,
        key: NetworkEditableKey,
        value: string | null | undefined
    ) => void;
    onRemove: (index: number) => void;
}

export default function NetworksSection({
    networks,
    socialNetworks,
    onAdd,
    onUpdate,
    onRemove,
}: Props) {
    const socialNetworkOptions = socialNetworks.map((network) => ({
        label: network.name,
        value: network.uuid,
    }));

    const findSocialNetworkValue = (network: CardNetwork) => {
        const directValue =
            network.red_social ||
            network.red_social_uuid ||
            network.type?.uuid ||
            "";

        if (
            directValue &&
            socialNetworks.some((social) => social.uuid === directValue)
        ) {
            return directValue;
        }

        if (network.name) {
            const byName = socialNetworks.find(
                (social) =>
                    social.name.toLowerCase() === network.name?.toLowerCase()
            );

            if (byName) return byName.uuid;
        }

        if (network.type?.name) {
            const byTypeName = socialNetworks.find(
                (social) =>
                    social.name.toLowerCase() ===
                    network.type?.name?.toLowerCase()
            );

            if (byTypeName) return byTypeName.uuid;
        }

        return "";
    };

    const handleNetworkChange = (index: number, value: string) => {
        const selectedNetwork = socialNetworks.find(
            (network) => network.uuid === value
        );

        onUpdate(index, "red_social", value);
        onUpdate(index, "red_social_uuid", value);
        onUpdate(index, "name", selectedNetwork?.name ?? "");
        onUpdate(index, "icon_url", selectedNetwork?.icon_url ?? null);
    };

    const getNetworkType = (network: CardNetwork) => {
        const selectedNetworkUuid = findSocialNetworkValue(network);

        const selectedNetwork = socialNetworks.find(
            (social) => social.uuid === selectedNetworkUuid
        );

        return selectedNetwork?.type ?? network.type?.type ?? "";
    };

    const getValuePlaceholder = (type?: string) => {
        if (type === "email") return "Ej. correo@demo.com";
        if (type === "phone") return "Ej. +51 999 999 999";
        if (type === "url") return "Ej. https://linkedin.com/in/usuario";

        return "Ej. correo, número o enlace";
    };

    return (
        <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
                        Redes sociales
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Agrega redes sociales o canales de contacto.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onAdd}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
                >
                    <Plus size={16} />
                    Agregar
                </button>
            </div>

            <div className="mt-5 space-y-4">
                {networks.map((network, index) => {
                    const selectedValue = findSocialNetworkValue(network);

                    return (
                        <div
                            key={network.uuid || index}
                            className="rounded-xl border border-gray-200 p-4 dark:border-white/[0.08]"
                        >
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                                    Red social {index + 1}
                                </h3>

                                <button
                                    type="button"
                                    onClick={() => onRemove(index)}
                                    disabled={networks.length === 1}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-error-300 hover:text-error-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.08] dark:text-gray-400"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <FormField label="Red social">
                                    <Select
                                        key={`${index}-${selectedValue}-${socialNetworks.length}`}
                                        placeholder="Seleccionar"
                                        defaultValue={selectedValue}
                                        options={socialNetworkOptions}
                                        onChange={(value) =>
                                            handleNetworkChange(index, value)
                                        }
                                    />
                                </FormField>

                                <FormField label="Valor">
                                    <Input
                                        type="text"
                                        value={network.value}
                                        placeholder={getValuePlaceholder(
                                            getNetworkType(network)
                                        )}
                                        onChange={(e) =>
                                            onUpdate(
                                                index,
                                                "value",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormField>

                                <FormField label="Etiqueta">
                                    <Input
                                        type="text"
                                        value={network.label}
                                        placeholder="Ej. personal, trabajo, empresa"
                                        onChange={(e) =>
                                            onUpdate(
                                                index,
                                                "label",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormField>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}