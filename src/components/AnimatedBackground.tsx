
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      <div className="absolute bottom-24 right-20 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
    </div>
  );
};

export default AnimatedBackground;
