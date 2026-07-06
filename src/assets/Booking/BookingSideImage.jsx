import "./BookingSideImage.css";

/**
 * BookingSideImage
 * ------------------
 * Editorial image card that sits below the price summary in the
 * sticky right column, filling what would otherwise be dead space
 * once the left-hand form grows taller than the summary card.
 */
export default function BookingSideImage() {
    return (
        <div className="booking-side-image">
            <img
                src="/collections/sideimage/download (6).jpg"
                alt="A RideHarbor vehicle on a scenic coastal road"
                className="booking-side-image__img"
            />
            <div className="booking-side-image__overlay">
                <span className="booking-side-image__eyebrow">RideHarbor Promise</span>
                <h3 className="booking-side-image__title">White-Glove Delivery</h3>
                <p className="booking-side-image__desc">
                    Your vehicle arrives detailed, fueled, and ready &mdash; wherever you need it.
                </p>
            </div>
        </div>
    );
}
