import Link from "next/link";

import { DashboardCard } from "../types";
import { CardIcon, LockIcon } from "./icons/DashboardIcons";

type Props = {
  card: DashboardCard;
  hasActiveMembership: boolean;
};

const membershipHref = "/membership";

export default function AvailableCardItem({ card, hasActiveMembership }: Props) {
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

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            {card.tag}
          </span>
        </div>

        <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 dark:border-gray-800 dark:from-gray-900 dark:to-gray-950">
          <div className="h-3 w-24 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="mt-4 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="mt-2 h-2 w-3/4 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="h-9 rounded-lg bg-gray-200 dark:bg-gray-800" />
            <div className="h-9 rounded-lg bg-gray-200 dark:bg-gray-800" />
            <div className="h-9 rounded-lg bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>

        <h3 className="mt-5 text-base font-semibold text-gray-800 dark:text-white/90">
          {card.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          {card.description}
        </p>

        <div className="mt-5">
          <Link
            href={hasActiveMembership ? card.href : membershipHref}
            className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
          >
            {hasActiveMembership ? "Usar tarjeta" : "Ver membresías"}
          </Link>
        </div>
      </div>
    </div>
  );
}