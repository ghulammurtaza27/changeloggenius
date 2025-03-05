
const LoadingSpinner = ({ size = "md", color = "primary" }: { size?: "sm" | "md" | "lg", color?: "primary" | "white" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };

  const colorClasses = {
    primary: "border-primary/30 border-t-primary",
    white: "border-white/30 border-t-white",
  };

  return (
    <div 
      className={`inline-block ${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin-slow`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
