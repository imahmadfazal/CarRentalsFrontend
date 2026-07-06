import { useEffect, useRef, useState } from "react";
import api from "../utils/api";
import { useCars } from "../context/CarsContext";
import AdminCarForm from "./AdminCarForm";
import "./AdminCarImagesPage.css";

const CATEGORIES = [
    { value: "sports", label: "Sports" },
    { value: "luxury", label: "Luxury" },
    { value: "suv", label: "SUV" },
];

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * AdminCarImagesPage
 * ---------------------
 * "Card Images" section — pick a category, see every car in it exactly
 * as it appears on the public fleet cards. "Replace Photo" is the fast
 * path for swapping just the thumbnail; "Edit Details" opens the same
 * full form used on the main Fleet page (name/price/specs/etc.) so
 * this page doubles as a category-scoped view of the whole catalog,
 * and "+ Add Car" creates a new one pre-set to the category being
 * viewed.
 */
export default function AdminCarImagesPage() {
    const { refetch } = useCars();
    const [category, setCategory] = useState("sports");
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [busyId, setBusyId] = useState(null);
    const [actionError, setActionError] = useState("");
    const [formMode, setFormMode] = useState(null); // null | "create" | car object being edited
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const fileInputRefs = useRef({});

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

    const visibleCars = cars.filter((car) => car.category === category);

    async function handleReplace(car, file) {
        if (!file || !file.type.startsWith("image/")) return;
        setBusyId(car.id);
        setActionError("");
        try {
            const dataUrl = await fileToDataUrl(file);
            const { data } = await api.put(`/cars/${car.id}`, { image: dataUrl });
            setCars((prev) => prev.map((c) => (c.id === car.id ? data.car : c)));
            refetch();
        } catch (err) {
            setActionError(err.response?.data?.message || "Couldn't update that photo.");
        } finally {
            setBusyId(null);
        }
    }

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

    return (
        <div className="admin-car-images">
            <div className="admin-page__header-row">
                <div>
                    <span className="admin-page__eyebrow">Catalog</span>
                    <h1 className="admin-page__heading">Card Images</h1>
                </div>
                <button type="button" className="admin-btn admin-btn--primary" onClick={openCreateForm}>
                    + Add Car
                </button>
            </div>

            <div className="admin-car-images__filters">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.value}
                        type="button"
                        className={`admin-bookings__filter ${category === cat.value ? "admin-bookings__filter--active" : ""}`}
                        onClick={() => setCategory(cat.value)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {actionError && <p className="admin-page__status admin-page__status--error">{actionError}</p>}
            {isLoading && <p className="admin-page__status">Loading&hellip;</p>}
            {!isLoading && loadError && <p className="admin-page__status admin-page__status--error">{loadError}</p>}

            {!isLoading && !loadError && (
                <div className="admin-car-images__grid">
                    {visibleCars.map((car) => {
                        const isBusy = busyId === car.id;
                        return (
                            <div className="admin-car-images__card" key={car.id}>
                                <div className="admin-car-images__image-wrap">
                                    <img src={car.image} alt={car.name} className="admin-car-images__image" />
                                    {isBusy && <div className="admin-car-images__overlay">Saving&hellip;</div>}
                                </div>
                                <div className="admin-car-images__body">
                                    <h3 className="admin-car-images__name">{car.name}</h3>
                                    <p className="admin-car-images__meta">{car.badge || car.category} &middot; ${car.price}/day</p>
                                    <input
                                        ref={(el) => { fileInputRefs.current[car.id] = el; }}
                                        type="file"
                                        accept="image/*"
                                        className="admin-car-images__file-input"
                                        onChange={(e) => handleReplace(car, e.target.files?.[0])}
                                    />
                                    <div className="admin-car-images__actions">
                                        <button
                                            type="button"
                                            className="admin-btn admin-btn--small"
                                            disabled={isBusy}
                                            onClick={() => fileInputRefs.current[car.id]?.click()}
                                        >
                                            Replace Photo
                                        </button>
                                        <button
                                            type="button"
                                            className="admin-btn admin-btn--small"
                                            disabled={isBusy}
                                            onClick={() => openEditForm(car)}
                                        >
                                            Edit Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {formMode && (
                <div className="admin-modal-overlay" onClick={closeForm}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <AdminCarForm
                            car={formMode === "create" ? null : formMode}
                            initialCategory={formMode === "create" ? category : undefined}
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
