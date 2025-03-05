import Navbar from "@/components/Navbar";
import ChangelogViewer from "@/components/ChangelogViewer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Changelog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-24">
        <div className="relative pt-12">
          <AnimatedBackground />
          <div className="container mx-auto px-4">
            <ChangelogViewer />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-50 py-8 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ChangeLogger. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Changelog;
