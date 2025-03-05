
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background blobs/gradients */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 mb-4 text-sm font-medium tracking-wider text-primary bg-primary/10 rounded-full">
                AI-Powered Changelog Generator
              </span>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-balance">
                Transform Commits into 
                <span className="bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent"> Beautiful Changelogs</span>
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Generate elegant, user-friendly changelogs from your GitHub repository with AI assistance. 
                No more tedious manual documentation.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/dashboard">
                <Button className="group px-6 h-12 transition-all">
                  Try it now
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/changelog">
                <Button variant="outline" className="h-12 bg-white/60 backdrop-blur-sm transition-all hover:bg-white/70">
                  View Sample Changelog
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[450px]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-white/20 shadow-xl overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/50 to-transparent backdrop-blur-md"></div>
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/50 to-transparent backdrop-blur-md"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="w-full h-full rounded-xl glass border border-white/40 shadow-lg p-6 overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs font-medium text-gray-500">ChangeLogger</div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="h-5 w-20 bg-blue-200/80 rounded-full"></div>
                        <div className="ml-2 h-5 w-16 bg-blue-100/80 rounded-full"></div>
                      </div>
                      <div className="h-4 w-full bg-gray-100/80 rounded-full"></div>
                      <div className="h-4 w-[90%] bg-gray-100/80 rounded-full"></div>
                    </div>
                    <div className="pt-2 space-y-2">
                      <div className="h-5 w-28 bg-green-200/80 rounded-full"></div>
                      <div className="h-4 w-full bg-gray-100/80 rounded-full"></div>
                      <div className="h-4 w-[75%] bg-gray-100/80 rounded-full"></div>
                    </div>
                    <div className="pt-2 space-y-2">
                      <div className="h-5 w-24 bg-amber-200/80 rounded-full"></div>
                      <div className="h-4 w-full bg-gray-100/80 rounded-full"></div>
                      <div className="h-4 w-[85%] bg-gray-100/80 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
