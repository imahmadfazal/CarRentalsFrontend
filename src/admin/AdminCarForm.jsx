import { useEffect, useRef, useState } from "react";
import SearchInput from "../assets/SearchCarForm/Searchinput";
import SearchSelect from "../assets/SearchCarForm/Searchselect";
import "./AdminCarForm.css";

const CATEGORIES = [
    { value: "sports", label: "Sports" },
    { value: "luxury", label: "Luxury" },
    { value: "suv", label: "SUV" },
];
const TRANSMISSIONS = ["Automatic", "Manual"];
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];

const EMPTY_VALUES = {
    id: "", name: "", badge: "", description: "", transmission: "",
    fuel: "", category: "", seats: "", price: "", image: "", quantity: "1",
};


function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * AdminCarForm
 * --------------
 * Add/edit form for a fleet car, shown inside AdminCarsPage's modal
 * overlay. `car` (if provided) prefills the form for editing and locks
 * the id field, since ids double as the public site's routing slug and
 * booking-lookup key — changing one after the fact would break any
 * existing bookings' car snapshot linkage by id.
 */
export default function AdminCarForm({ car, initialCategory, onSubmit, onCancel, isSubmitting, formError }) {
    const [values, setValues] = useState(EMPTY_VALUES);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (car) {
            setValues({
                id: car.id, name: car.name, badge: car.badge || "", description: car.description || "",
                transmission: car.transmission, fuel: car.fuel, category: car.category,
                seats: String(car.seats), price: String(car.price), image: car.image,
                quantity: String(car.quantity ?? 1),
            });
        } else {
            setValues({ ...EMPTY_VALUES, category: initialCategory || "" });
        }
        setErrors({});
    }, [car, initialCategory]);

    function handleChange(field, value) {
        setValues((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    async function handleImageFile(fileList) {
        const file = fileList?.[0];
        if (!file || !file.type.startsWith("image/")) return;
        const dataUrl = await fileToDataUrl(file);
        handleChange("image", dataUrl);
    }

    function validate() {
        const next = {};
        if (!car && !values.id.trim()) next.id = "A unique id (slug) is required, e.g. \"tesla-model-s\".";
        if (!values.name.trim()) next.name = "Name is required.";
        if (!values.category) next.category = "Select a category.";
        if (!values.transmission) next.transmission = "Select a transmission.";
        if (!values.fuel) next.fuel = "Select a fuel type.";
        if (!values.seats || Number.isNaN(Number(values.seats))) next.seats = "Enter a valid seat count.";
        if (!values.price || Number.isNaN(Number(values.price))) next.price = "Enter a valid daily price.";
        if (!values.image) next.image = "Upload a photo.";
        if (!values.quantity || Number.isNaN(Number(values.quantity)) || Number(values.quantity) < 1) {
            next.quantity = "Enter how many units of this car you have (at least 1).";
        }
        return next;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        onSubmit({
            ...values,
            seats: Number(values.seats),
            price: Number(values.price),
            quantity: Number(values.quantity),
        });
    }

    return (
        <form className="admin-car-form" onSubmit={handleSubmit}>
            <h2 className="admin-car-form__title">{car ? "Edit Car" : "Add a New Car"}</h2>

            <div className="admin-car-form__row">
                <SearchInput
                    id="adminCarId"
                    label="Id (slug)"
                    placeholder="tesla-model-s"
                    value={values.id}
                    onChange={(v) => handleChange("id", v)}
                    error={errors.id}
                    required
                />
                <SearchInput
                    id="adminCarName"
                    label="Name"
                    placeholder="Tesla Model S"
                    value={values.name}
                    onChange={(v) => handleChange("name", v)}
                    error={errors.name}
                    required
                />
            </div>

            {car && <p className="admin-car-form__hint">The id can&rsquo;t be changed after creation.</p>}

            <div className="admin-car-form__row">
                <SearchInput
                    id="adminCarBadge"
                    label="Badge"
                    placeholder="Flagship"
                    value={values.badge}
                    onChange={(v) => handleChange("badge", v)}
                />
                <SearchSelect
                    id="adminCarCategory"
                    label="Category"
                    value={values.category}
                    onChange={(v) => handleChange("category", v)}
                    options={CATEGORIES}
                    placeholder="Select category"
                    error={errors.category}
                    required
                />
            </div>

            <div className="admin-car-form__row">
                <SearchSelect
                    id="adminCarTransmission"
                    label="Transmission"
                    value={values.transmission}
                    onChange={(v) => handleChange("transmission", v)}
                    options={TRANSMISSIONS}
                    placeholder="Select transmission"
                    error={errors.transmission}
                    required
                />
                <SearchSelect
                    id="adminCarFuel"
                    label="Fuel Type"
                    value={values.fuel}
                    onChange={(v) => handleChange("fuel", v)}
                    options={FUEL_TYPES}
                    placeholder="Select fuel type"
                    error={errors.fuel}
                    required
                />
            </div>

            <div className="admin-car-form__row">
                <SearchInput
                    id="adminCarSeats"
                    label="Seats"
                    type="number"
                    placeholder="4"
                    value={values.seats}
                    onChange={(v) => handleChange("seats", v)}
                    error={errors.seats}
                    required
                />
                <SearchInput
                    id="adminCarPrice"
                    label="Price Per Day (USD)"
                    type="number"
                    placeholder="249"
                    value={values.price}
                    onChange={(v) => handleChange("price", v)}
                    error={errors.price}
                    required
                />
            </div>

            <SearchInput
                id="adminCarQuantity"
                label="Quantity (units in the fleet)"
                type="number"
                placeholder="1"
                value={values.quantity}
                onChange={(v) => handleChange("quantity", v)}
                error={errors.quantity}
                required
            />

            <div className="admin-car-form__field">
                <label htmlFor="adminCarDescription" className="admin-car-form__label">Description</label>
                <textarea
                    id="adminCarDescription"
                    className="admin-car-form__textarea"
                    rows={3}
                    value={values.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Short one-line description shown on the fleet cards."
                />
            </div>

            <div className="admin-car-form__field">
                <span className="admin-car-form__label">Photo</span>
                <div
                    className={`admin-car-form__dropzone ${errors.image ? "admin-car-form__dropzone--error" : ""}`}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="admin-car-form__file-input"
                        onChange={(e) => handleImageFile(e.target.files)}
                    />
                    {values.image ? (
                        <img src={values.image} alt="Car preview" className="admin-car-form__preview" />
                    ) : (
                        <span className="admin-car-form__dropzone-text">Click to upload a photo</span>
                    )}
                </div>
                {errors.image && <p className="admin-car-form__error">{errors.image}</p>}
            </div>

            {formError && <p className="admin-car-form__error">{formError}</p>}

            <div className="admin-car-form__actions">
                <button type="button" className="admin-btn" onClick={onCancel} disabled={isSubmitting}>
                    Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn--primary" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : car ? "Save Changes" : "Add Car"}
                </button>
            </div>
        </form>
    );
}
