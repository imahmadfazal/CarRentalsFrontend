import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import "./AdminUsersPage.css";

/**
 * AdminUsersPage
 * ----------------
 * Every registered account, searchable, with the ability to promote a
 * customer to admin or demote an admin back to customer. The endpoint
 * itself blocks an admin from demoting their own account (checked
 * again here client-side just to disable the control, not as the real
 * safeguard — the backend is the actual enforcement).
 */
export default function AdminUsersPage() {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [search, setSearch] = useState("");
    const [updatingId, setUpdatingId] = useState(null);
    const [actionError, setActionError] = useState("");

    useEffect(() => {
        api
            .get("/auth/users")
            .then(({ data }) => setUsers(data.users || []))
            .catch(() => setLoadError("Couldn't load users."))
            .finally(() => setIsLoading(false));
    }, []);

    const visibleUsers = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return users;
        return users.filter(
            (u) => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)
        );
    }, [users, search]);

    async function handleRoleToggle(user) {
        const nextRole = user.role === "admin" ? "customer" : "admin";
        setUpdatingId(user.id);
        setActionError("");
        try {
            const { data } = await api.patch(`/auth/users/${user.id}/role`, { role: nextRole });
            setUsers((prev) => prev.map((u) => (u.id === user.id ? data.user : u)));
        } catch (err) {
            setActionError(err.response?.data?.message || "Couldn't update that user's role.");
        } finally {
            setUpdatingId(null);
        }
    }

    return (
        <div className="admin-users">
            <div className="admin-page__header-row">
                <div>
                    <span className="admin-page__eyebrow">Accounts</span>
                    <h1 className="admin-page__heading">Users</h1>
                </div>

                <input
                    type="text"
                    className="admin-users__search"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {actionError && <p className="admin-page__status admin-page__status--error">{actionError}</p>}
            {isLoading && <p className="admin-page__status">Loading&hellip;</p>}
            {!isLoading && loadError && <p className="admin-page__status admin-page__status--error">{loadError}</p>}
            {!isLoading && !loadError && visibleUsers.length === 0 && (
                <p className="admin-page__status">No users match your search.</p>
            )}

            {!isLoading && !loadError && visibleUsers.length > 0 && (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleUsers.map((u) => {
                                const isSelf = u.id === currentUser?.id;
                                const isUpdating = updatingId === u.id;
                                return (
                                    <tr key={u.id}>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.phone || "—"}</td>
                                        <td><span className={`admin-status-pill admin-status-pill--${u.role}`}>{u.role}</span></td>
                                        <td>
                                            <button
                                                type="button"
                                                className="admin-btn admin-btn--small"
                                                disabled={isUpdating || (isSelf && u.role === "admin")}
                                                title={isSelf && u.role === "admin" ? "You can't remove your own admin access." : undefined}
                                                onClick={() => handleRoleToggle(u)}
                                            >
                                                {u.role === "admin" ? "Demote to Customer" : "Promote to Admin"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
