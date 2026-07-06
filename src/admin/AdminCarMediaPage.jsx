import { useEffect, useState } from "react";
import api from "../utils/api";
import { useCars } from "../context/CarsContext";
import "./AdminCarMediaPage.css";

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
 * AdminCarMediaPage
 * --------------------
 * "Media Gallery" section — pick a category, pick a car, and manage
 * everything that shows on that car's public detail page: the video
 * and the full photo gallery (distinct from the single card thumbnail
 * managed on the Card Images page). Video is a pasted /public path
 * rather than an upload (see Car model comment — no object storage
 * service exists yet, and video files are routinely too large for
 * MongoDB); gallery photos upload directly as base64, same as the
 * card image.
 */
export default function AdminCarMediaPage() {
    const { refetch } = useCars();
    const [category, setCategory] = useState("sports");
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [selectedCar, setSelectedCar] = useState(null);
    const [videoValue, setVideoValue] = useState("");
    const [galleryValue, setGalleryValue] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [saveNotice, setSaveNotice] = useState("");

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

    function openCar(car) {
        setSelectedCar(car);
        setVideoValue(car.video || "");
        setGalleryValue(car.galleryImages || []);
        setSaveError("");
        setSaveNotice("");
    }

    function closeCar() {
        setSelectedCar(null);
    }

    async function handleAddImages(fileList) {
        const files = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
        if (files.length === 0) return;
        const dataUrls = await Promise.all(files.map(fileToDataUrl));
        setGalleryValue((prev) => [...prev, ...dataUrls]);
    }

    function handleRemoveImage(index) {
        setGalleryValue((prev) => prev.filter((_, i) => i !== index));
    }

    async function handleSave() {
        setIsSaving(true);
        setSaveError("");
        setSaveNotice("");
        try {
            const { data } = await api.put(`/cars/${selectedCar.id}`, {
                video: videoValue,
                galleryImages: galleryValue,
            });
            setCars((prev) => prev.map((c) => (c.id === selectedCar.id ? data.car : c)));
            setSelectedCar(data.car);
            setSaveNotice("Saved.");
            refetch();
        } catch (err) {
            setSaveError(err.response?.data?.message || "Couldn't save this car's media.");
        } finally {
            setIsSaving(false);
        }
    }

    if (selectedCar) {
        return (
            <div className="admin-car-media">
                <button type="button" className="admin-btn admin-btn--small admin-car-media__back" onClick={closeCar}>
                    &larr; Back to {CATEGORIES.find((c) => c.value === category)?.label} list
                </button>

                <div className="admin-car-media__header">
                    <img src={selectedCar.image} alt={selectedCar.name} className="admin-car-media__thumb" />
                    <div>
                        <span className="admin-page__eyebrow">{selectedCar.category} &middot; {selectedCar.name}</span>
                        <h1 className="admin-page__heading admin-car-media__heading">Media Gallery</h1>
                    </div>
                </div>

                <div className="admin-car-media__field">
                    <label htmlFor="mediaVideoPath" className="admin-car-form__label">
                        Video path
                    </label>
                    <input
                        id="mediaVideoPath"
                        type="text"
                        className="admin-car-media__video-input"
                        placeholder="/videos/sports category videos/porsche-911-gt3.mp4"
                        value={videoValue}
                        onChange={(e) => setVideoValue(e.target.value)}
                    />
                    <p className="admin-car-media__hint">
                        Place the video file in the project's /public folder, then paste its path here.
                    </p>
                </div>

                <div className="admin-car-media__field">
                    <span className="admin-car-form__label">Gallery photos ({galleryValue.length})</span>
                    <div className="admin-car-media__gallery">
                        {galleryValue.map((src, index) => (
                            <div className="admin-car-media__gallery-item" key={index}>
                                <img src={src} alt={`Gallery ${index + 1}`} />
                                <button
                                    type="button"
                                    className="admin-car-media__remove"
                                    onClick={() => handleRemoveImage(index)}
                                    aria-label={`Remove photo ${index + 1}`}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}

                        <label className="admin-car-media__add">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="admin-car-images__file-input"
                                onChange={(e) => handleAddImages(e.target.files)}
                            />
                            + Add
                        </label>
                    </div>
                </div>

                {saveError && <p className="admin-page__status admin-page__status--error">{saveError}</p>}
                {saveNotice && <p className="admin-page__status">{saveNotice}</p>}

                <button type="button" className="admin-btn admin-btn--primary" disabled={isSaving} onClick={handleSave}>
                    {isSaving ? "Saving..." : "Save Media"}
                </button>
            </div>
        );
    }

    return (
        <div className="admin-car-media">
            <span className="admin-page__eyebrow">Catalog</span>
            <h1 className="admin-page__heading">Media Gallery</h1>

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

            {isLoading && <p className="admin-page__status">Loading&hellip;</p>}
            {!isLoading && loadError && <p className="admin-page__status admin-page__status--error">{loadError}</p>}

            {!isLoading && !loadError && (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Video Set</th>
                                <th>Gallery Photos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleCars.map((car) => (
                                <tr key={car.id} className="admin-bookings__row" onClick={() => openCar(car)}>
                                    <td><img src={car.image} alt={car.name} className="admin-cars__thumb" /></td>
                                    <td>{car.name}</td>
                                    <td>{car.video ? "Yes" : "No"}</td>
                                    <td>{(car.galleryImages || []).length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
