
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Features />
        
        <section className="py-24 relative overflow-hidden">
          <AnimatedBackground />
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold">Ready to improve your changelog experience?</h2>
              <p className="text-gray-500 text-lg">
                Transform technical commit messages into user-friendly changelogs with our AI-powered platform.
              </p>
              <div className="pt-4">
                <Link to="/dashboard">
                  <Button size="lg" className="px-8">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold">ChangeLogger</h3>
              <p className="text-gray-500 mt-1">AI-powered changelog generator</p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-8">
              <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
              <Link to="/changelog" className="text-gray-600 hover:text-primary transition-colors">Changelog</Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors">Dashboard</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ChangeLogger. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
