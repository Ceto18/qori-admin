// src/modules/dashboard/components/AvailableCardItem.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { Card } from "@/modules/cards/types";
import { useCardStore } from "@/modules/cards/store/useCardStore";
import { CardIcon, LockIcon } from "./icons/DashboardIcons";

type Props = {
  card: Card;
  organizationUuid: string;
  hasActiveMembership: boolean;
};

const membershipHref = "/membership";

export default function AvailableCardItem({
  card,
  organizationUuid,
  hasActiveMembership,
}: Props) {
  const [openingCard, setOpeningCard] = useState(false);
  const [openingQr, setOpeningQr] = useState(false);

  const getCardUrl = useCardStore((state) => state.getCardUrl);
  const getCardQr = useCardStore((state) => state.getCardQr);

  const fullName =
    card.full_name ||
    `${card.first_name ?? ""} ${card.last_name ?? ""}`.trim() ||
    "Sin nombre";

  const handleOpenCard = async () => {
    if (!hasActiveMembership) return;

    try {
      setOpeningCard(true);

      const url = await getCardUrl(organizationUuid, card.uuid);

      if (!url) return;

      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setOpeningCard(false);
    }
  };

  const handleOpenQr = async () => {
    if (!hasActiveMembership) return;

    try {
      setOpeningQr(true);

      const qrUrl = await getCardQr(organizationUuid, card.uuid);

      if (!qrUrl) return;

      window.open(qrUrl, "_blank", "noopener,noreferrer");
    } finally {
      setOpeningQr(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/40">
      {!hasActiveMembership && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/55 backdrop-blur-[1px] dark:bg-gray-950/50">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm dark:bg-gray-900 dark:text-gray-300">
              <LockIcon className="h-6 w-6" />
            </div>

            <Link
              href={membershipHref}
              className="mt-3 rounded-lg bg-brand-500 px-4 py-2 text-xs font-medium text-white hover:bg-brand-600"
            >
              Activar para usar
            </Link>
          </div>
        </div>
      )}

      <div className={!hasActiveMembership ? "blur-[1px]" : ""}>
        <div className="mb-5 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10">
            <CardIcon />
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              card.active
                ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            {card.active ? "Activa" : "Inactiva"}
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
          <div className="relative h-28 bg-gray-100 dark:bg-gray-800">
            {card.photo_banner_url ? (
              <Image
                src={card.photo_banner_url}
                alt={`Banner de ${fullName}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-400">
                Sin banner
              </div>
            )}
          </div>

          <div className="relative px-4 pb-4">
            <div className="-mt-8 mb-3">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-gray-100 dark:border-gray-950 dark:bg-gray-800">
                {card.photo_perfil_url ? (
                  <Image
                    src={card.photo_perfil_url}
                    alt={fullName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-gray-500">
                    {fullName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-2 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        </div>

        <h3 className="mt-5 text-base font-semibold text-gray-800 dark:text-white/90">
          {fullName}
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          {card.position ?? "Sin cargo"}
          {card.institution ? ` · ${card.institution}` : ""}
        </p>

        {/* {card.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            {card.description}
          </p>
        )} */}

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {hasActiveMembership ? (
            <>
              <button
                type="button"
                onClick={handleOpenCard}
                disabled={openingCard || !organizationUuid}
                className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
              >
                {openingCard ? "Abriendo..." : "Ver tarjeta"}
              </button>

              <button
                type="button"
                onClick={handleOpenQr}
                disabled={openingQr || !organizationUuid}
                className="inline-flex w-full items-center justify-center rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {openingQr ? "Abriendo..." : "Ver QR"}
              </button>
            </>
          ) : (
            <Link
              href={membershipHref}
              className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03] sm:col-span-2"
            >
              Ver membresías
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}