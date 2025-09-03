// resources/js/Components/alert.jsx
export function Alert({ children, className = "", ...props }) {
    return (
        <div
            className={`p-4 mb-4 border-l-4 border-red-500 bg-red-50 text-red-700 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function AlertDescription({ children, className = "", ...props }) {
    return (
        <p className={`text-sm ${className}`} {...props}>
            {children}
        </p>
    );
}
