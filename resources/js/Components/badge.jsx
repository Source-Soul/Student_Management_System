export function Badge({ children, className = "" }) {
    return (
        <span
            className={`inline-block px-2 py-1 text-xs rounded bg-gray-200 text-gray-800 ${className}`}
        >
            {children}
        </span>
    );
}
