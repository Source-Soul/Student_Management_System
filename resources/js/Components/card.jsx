export function Card({ children, className = "" }) {
    return (
        <div className={`rounded-xl border bg-white shadow p-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "" }) {
    return <div className={`mb-2 font-bold ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
    return <h2 className={`text-lg ${className}`}>{children}</h2>;
}

export function CardContent({ children, className = "" }) {
    return <div className={`mt-2 ${className}`}>{children}</div>;
}

// Add this:
export function CardDescription({ children, className = "" }) {
    return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>;
}
