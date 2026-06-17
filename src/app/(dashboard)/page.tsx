import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | Qori ID",
  description: "Panel principal de Qori ID",
};

const availableCards = [
  {
    id: 1,
    title: "Tarjeta Personal",
    description: "Presenta tu información principal, contacto y redes sociales.",
    tag: "Básica",
    href: "/cards",
  },
  {
    id: 2,
    title: "Tarjeta Profesional",
    description: "Ideal para mostrar cargo, empresa, experiencia y enlaces.",
    tag: "Recomendada",
    href: "/cards",
  },
  {
    id: 3,
    title: "Tarjeta Empresarial",
    description: "Pensada para equipos, organizaciones y perfiles corporativos.",
    tag: "Empresa",
    href: "/cards",
  },
];

function LockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V7.5a4.5 4.5 0 00-9 0v3m-.75 0h10.5A1.75 1.75 0 0119 12.25v7A1.75 1.75 0 0117.25 21H6.75A1.75 1.75 0 015 19.25v-7a1.75 1.75 0 011.75-1.75z"
      />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg
      className="h-6 w-6 text-brand-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 7A2.25 2.25 0 016 4.75h12A2.25 2.25 0 0120.25 7v10A2.25 2.25 0 0118 19.25H6A2.25 2.25 0 013.75 17V7z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 9.5h5.5M7.5 13h9M7.5 16h6"
      />
    </svg>
  );
}

export default function Ecommerce() {
  const hasActiveMembership = false;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8">
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl" />
            <div className="absolute -bottom-20 left-20 h-48 w-48 rounded-full bg-brand-300/10 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                Qori ID
              </span>

              <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white/90 md:text-3xl">
                Centro de tarjetas digitales
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                Administra tus tarjetas digitales, revisa los diseños
                disponibles y activa tu membresía para empezar a usarlas.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {hasActiveMembership ? (
                  <Link
                    href="/cards"
                    className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600"
                  >
                    Ir a mis tarjetas
                  </Link>
                ) : (
                  <Link
                    href="/plans"
                    className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600"
                  >
                    Activar membresía
                  </Link>
                )}

                <Link
                  href="/plans"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                >
                  Ver planes
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <div
            className={`h-full rounded-2xl border p-6 ${hasActiveMembership
                ? "border-green-200 bg-green-50 dark:border-green-500/20 dark:bg-green-500/10"
                : "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10"
              }`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${hasActiveMembership
                  ? "bg-green-100 text-green-600 dark:bg-green-500/20"
                  : "bg-amber-100 text-amber-600 dark:bg-amber-500/20"
                }`}
            >
              {hasActiveMembership ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              ) : (
                <LockIcon className="h-6 w-6" />
              )}
            </div>

            <h2 className="mt-5 text-lg font-semibold text-gray-800 dark:text-white/90">
              {hasActiveMembership
                ? "Membresía activa"
                : "Membresía requerida"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {hasActiveMembership
                ? "Ya puedes crear, editar y usar tus tarjetas digitales sin restricciones."
                : "Para usar las tarjetas digitales debes activar una membresía. Puedes ver los diseños disponibles, pero estarán bloqueados hasta completar el pago."}
            </p>

            {!hasActiveMembership && (
              <Link
                href="/plans"
                className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900"
              >
                Desbloquear ahora
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              Cards disponibles
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Estos son los tipos de tarjeta que podrás usar con tu membresía.
            </p>
          </div>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {availableCards.length} diseños disponibles
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {availableCards.map((card) => (
            <div
              key={card.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/40"
            >
              {!hasActiveMembership && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/55 backdrop-blur-[1px] dark:bg-gray-950/50">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm dark:bg-gray-900 dark:text-gray-300">
                      <LockIcon className="h-6 w-6" />
                    </div>

                    <Link
                      href="/plans"
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
                    href={hasActiveMembership ? card.href : "/plans"}
                    className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                  >
                    {hasActiveMembership ? "Usar tarjeta" : "Ver membresías"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}