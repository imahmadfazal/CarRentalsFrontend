import { useEffect, useState } from "react";
import api from "../utils/api";
import { useCars } from "../context/CarsContext";
import AdminCarForm from "./AdminCarForm";
import "./AdminCarsPage.css";

/**
 * AdminCarsPage
 * ---------------
 * Full fleet CRUD — the piece that makes "fleet management" real
 * rather than cosmetic: add/edit/delete cars against the actual Car
 * collection the public site now reads from (see CarsContext). Calls
 * refetch() on the shared cars context after every mutation so the
 * public pages pick up the change without a manual reload.
 */
export default function AdminCarsPage() {
    const { refetch } = useCars();
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [formMode, setFormMode] = useState(null); // null | "create" | car object being edited
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [actionError, setActionError] = useState("");
    const [busyId, setBusyId] = useState(null);

    function loadCars() {
        setIsLoading(true);
        api
            .get("/cars/admin/all")
            .then(({ data }) => setCars(data.cars || []))
            .catch(() => setLoadError("Couldn't load the fleet."))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        loadCars();
    }, []);

    function openCreateForm() {
        setFormError("");
        setFormMode("create");
    }

    function openEditForm(car) {
        setFormError("");
        setFormMode(car);
    }

    function closeForm() {
        setFormMode(null);
        setFormError("");
    }

    async function handleFormSubmit(values) {
        setIsSubmitting(true);
        setFormError("");
        try {
            if (formMode === "create") {
                await api.post("/cars", values);
            } else {
                const { id, ...updatable } = values;
                await api.put(`/cars/${formMode.id}`, updatable);
            }
            loadCars();
            refetch();
            closeForm();
        } catch (err) {
            setFormError(err.response?.data?.message || "Couldn't save that car.");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleToggleActive(car) {
        setBusyId(car.id);
        setActionError("");
        try {
            await api.put(`/cars/${car.id}`, { isActive: !car.isActive });
            loadCars();
            refetch();
        } catch (err) {
            setActionError(err.response?.data?.message || "Couldn't update that car.");
        } finally {
            setBusyId(null);
        }
    }

    async function handleDelete(car) {
        if (!window.confirm(`Delete ${car.name}? This can't be undone.`)) return;
        setBusyId(car.id);
        setActionError("");
        try {
            await api.delete(`/cars/${car.id}`);
            loadCars();
            refetch();
        } catch (err) {
            setActionError(err.response?.data?.message || "Couldn't delete that car.");
        } finally {
            setBusyId(null);
        }
    }

    return (
        <div className="admin-cars">
            <div className="admin-page__header-row">
                <div>
                    <span className="admin-page__eyebrow">Catalog</span>
                    <h1 className="admin-page__heading">Fleet</h1>
                </div>
                <button type="button" className="admin-btn admin-btn--primary" onClick={openCreateForm}>
                    + Add Car
                </button>
            </div>

            {actionError && <p className="admin-page__status admin-page__status--error">{actionError}</p>}
            {isLoading && <p className="admin-page__status">Loading&hellip;</p>}
            {!isLoading && loadError && <p className="admin-page__status admin-page__status--error">{loadError}</p>}

            {!isLoading && !loadError && (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price/Day</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car) => {
                                const isBusy = busyId === car.id;
                                return (
                                    <tr key={car.id}>
                                        <td><img src={car.image} alt={car.name} className="admin-cars__thumb" /></td>
                                        <td>{car.name}</td>
                                        <td className="admin-cars__category">{car.category}</td>
                                        <td>${car.price}</td>
                                        <td>
                                            <span className={`admin-status-pill admin-status-pill--${car.isActive ? "active" : "inactive"}`}>
                                                {car.isActive ? "Active" : "Hidden"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="admin-table__actions">
                                                <button type="button" className="admin-btn admin-btn--small" disabled={isBusy} onClick={() => openEditForm(car)}>
                                                    Edit
                                                </button>
                                                <button type="button" className="admin-btn admin-btn--small" disabled={isBusy} onClick={() => handleToggleActive(car)}>
                                                    {car.isActive ? "Hide" : "Unhide"}
                                                </button>
                                                <button type="button" className="admin-btn admin-btn--danger admin-btn--small" disabled={isBusy} onClick={() => handleDelete(car)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {formMode && (
                <div className="admin-modal-overlay" onClick={closeForm}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <AdminCarForm
                            car={formMode === "create" ? null : formMode}
                            onSubmit={handleFormSubmit}
                            onCancel={closeForm}
                            isSubmitting={isSubmitting}
                            formError={formError}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
