"use client";

import { useEffect, useState } from "react";

import { PencilIcon } from "@/shared/icons";
import { useModal } from "@/shared/hooks/useModal";

import Input from "@/shared/components/form/input/InputField";
import Label from "@/shared/components/form/Label";
import Button from "@/shared/components/ui/button/Button";
import { Modal } from "@/shared/components/ui/modal/index";

import { locationService } from "@/modules/auth/services/locationService";
import { useProfileStore } from "../store/useProfileStore";

type AddressForm = {
  address: string;
  department_id: number;
  province_id: number;
  district_id: number;
};

type LocationOption = {
  id: number;
  name: string;
};

export default function UserAddressCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const {
    profile,
    updatingProfile,
    profileError,
    updateProfile,
    clearProfileError,
  } = useProfileStore();

  const [form, setForm] = useState<AddressForm>({
    address: "",
    department_id: 0,
    province_id: 0,
    district_id: 0,
  });

  const [departments, setDepartments] =
    useState<LocationOption[]>([]);

  const [provinces, setProvinces] =
    useState<LocationOption[]>([]);

  const [districts, setDistricts] =
    useState<LocationOption[]>([]);

  const [loadingDepartments, setLoadingDepartments] =
    useState(false);

  const [loadingProvinces, setLoadingProvinces] =
    useState(false);

  const [loadingDistricts, setLoadingDistricts] =
    useState(false);

  useEffect(() => {
    if (!profile) return;

    setForm({
      address: profile.profile.address ?? "",
      department_id:
        profile.profile.department?.id ?? 0,
      province_id:
        profile.profile.province?.id ?? 0,
      district_id:
        profile.profile.district?.id ?? 0,
    });
  }, [profile]);

  const resetForm = () => {
    if (!profile) return;

    setForm({
      address: profile.profile.address ?? "",
      department_id:
        profile.profile.department?.id ?? 0,
      province_id:
        profile.profile.province?.id ?? 0,
      district_id:
        profile.profile.district?.id ?? 0,
    });
  };

  const loadDepartments = async (
    countryId: number
  ) => {
    if (!countryId) {
      setDepartments([]);
      return;
    }

    try {
      setLoadingDepartments(true);

      const response =
        await locationService.getDepartments(
          countryId
        );

      setDepartments(response.data ?? []);
    } catch (error) {
      console.error(
        "Error cargando departamentos:",
        error
      );

      setDepartments([]);
    } finally {
      setLoadingDepartments(false);
    }
  };

  const loadProvinces = async (
    departmentId: number
  ) => {
    if (!departmentId) {
      setProvinces([]);
      return;
    }

    try {
      setLoadingProvinces(true);

      const response =
        await locationService.getProvinces(
          departmentId
        );

      setProvinces(response.data ?? []);
    } catch (error) {
      console.error(
        "Error cargando provincias:",
        error
      );

      setProvinces([]);
    } finally {
      setLoadingProvinces(false);
    }
  };

  const loadDistricts = async (
    provinceId: number
  ) => {
    if (!provinceId) {
      setDistricts([]);
      return;
    }

    try {
      setLoadingDistricts(true);

      const response =
        await locationService.getDistricts(
          provinceId
        );

      setDistricts(response.data ?? []);
    } catch (error) {
      console.error(
        "Error cargando distritos:",
        error
      );

      setDistricts([]);
    } finally {
      setLoadingDistricts(false);
    }
  };

  const handleOpenModal = async () => {
    if (!profile) return;

    clearProfileError();
    resetForm();

    const countryId =
      profile.profile.country?.id ?? 0;

    const departmentId =
      profile.profile.department?.id ?? 0;

    const provinceId =
      profile.profile.province?.id ?? 0;

    openModal();

    if (countryId) {
      await loadDepartments(countryId);
    }

    if (departmentId) {
      await loadProvinces(departmentId);
    }

    if (provinceId) {
      await loadDistricts(provinceId);
    }
  };

  const handleCloseModal = () => {
    if (updatingProfile) return;

    clearProfileError();
    resetForm();
    closeModal();
  };

  const handleAddressChange = (
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      address: value,
    }));
  };

  const handleDepartmentChange = async (
    value: number
  ) => {
    setForm((prev) => ({
      ...prev,
      department_id: value,
      province_id: 0,
      district_id: 0,
    }));

    setProvinces([]);
    setDistricts([]);

    if (value) {
      await loadProvinces(value);
    }
  };

  const handleProvinceChange = async (
    value: number
  ) => {
    setForm((prev) => ({
      ...prev,
      province_id: value,
      district_id: 0,
    }));

    setDistricts([]);

    if (value) {
      await loadDistricts(value);
    }
  };

  const handleDistrictChange = (
    value: number
  ) => {
    setForm((prev) => ({
      ...prev,
      district_id: value,
    }));
  };

  const handleSave = async () => {
    if (!profile || updatingProfile) return;

    clearProfileError();

    const payload = {
      name: profile.profile.name,
      last_name: profile.profile.last_name,
      phone: profile.profile.phone,

      address: form.address.trim(),
      department_id: form.department_id,
      province_id: form.province_id,
      district_id: form.district_id,
    };

    console.log(
      "Actualizando dirección:",
      payload
    );

    const success =
      await updateProfile(payload);

    console.log(
      "Resultado actualización:",
      success
    );

    if (success) {
      closeModal();
    }
  };

  if (!profile) {
    return null;
  }

  const userProfile = profile.profile;

  return (
    <>
      <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
        <div className="flex flex-col gap-6 sm:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <h4 className="mb-4 text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
              Dirección y ubicación
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Dirección
                </p>

                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userProfile.address || "-"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  País
                </p>

                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userProfile.country?.name ?? "-"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Departamento
                </p>

                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userProfile.department?.name ?? "-"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Provincia
                </p>

                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userProfile.province?.name ?? "-"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Distrito
                </p>

                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userProfile.district?.name ?? "-"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleOpenModal}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
            >
              <PencilIcon className="size-5" />

              Editar
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        className="m-4 max-w-[700px]"
      >
        <div className="relative no-scrollbar w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
          <div className="px-2 pe-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Editar dirección
            </h4>

            <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
              Actualiza tu dirección y ubicación.
            </p>
          </div>

          <form
            className="flex flex-col"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="custom-scrollbar overflow-y-auto px-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <Label>Dirección</Label>

                  <Input
                    type="text"
                    value={form.address}
                    onChange={(event) =>
                      handleAddressChange(
                        event.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <Label>Departamento</Label>

                  <select
                    value={form.department_id}
                    onChange={(event) =>
                      handleDepartmentChange(
                        Number(
                          event.target.value
                        )
                      )
                    }
                    disabled={loadingDepartments}
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  >
                    <option value={0}>
                      {loadingDepartments
                        ? "Cargando..."
                        : "Seleccione departamento"}
                    </option>

                    {departments.map(
                      (department) => (
                        <option
                          key={department.id}
                          value={department.id}
                        >
                          {department.name}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <Label>Provincia</Label>

                  <select
                    value={form.province_id}
                    onChange={(event) =>
                      handleProvinceChange(
                        Number(
                          event.target.value
                        )
                      )
                    }
                    disabled={
                      !form.department_id ||
                      loadingProvinces
                    }
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  >
                    <option value={0}>
                      {loadingProvinces
                        ? "Cargando..."
                        : "Seleccione provincia"}
                    </option>

                    {provinces.map(
                      (province) => (
                        <option
                          key={province.id}
                          value={province.id}
                        >
                          {province.name}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <Label>Distrito</Label>

                  <select
                    value={form.district_id}
                    onChange={(event) =>
                      handleDistrictChange(
                        Number(
                          event.target.value
                        )
                      )
                    }
                    disabled={
                      !form.province_id ||
                      loadingDistricts
                    }
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  >
                    <option value={0}>
                      {loadingDistricts
                        ? "Cargando..."
                        : "Seleccione distrito"}
                    </option>

                    {districts.map(
                      (district) => (
                        <option
                          key={district.id}
                          value={district.id}
                        >
                          {district.name}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <Label>País</Label>

                  <Input
                    type="text"
                    value={
                      userProfile.country?.name ?? ""
                    }
                    disabled
                  />
                </div>
              </div>

              {profileError && (
                <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-500/20 dark:bg-red-500/10">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {profileError}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCloseModal}
                disabled={updatingProfile}
              >
                Cancelar
              </Button>

              <Button
                size="sm"
                onClick={handleSave}
                disabled={
                  updatingProfile ||
                  !form.address.trim() ||
                  form.department_id <= 0 ||
                  form.province_id <= 0 ||
                  form.district_id <= 0
                }
              >
                {updatingProfile
                  ? "Guardando..."
                  : "Guardar cambios"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}