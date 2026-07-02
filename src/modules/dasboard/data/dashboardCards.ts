import { DashboardCard } from "../types";

export const availableCards: DashboardCard[] = [
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