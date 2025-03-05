
import { 
  GitBranch, 
  BrainCircuit, 
  PencilRuler, 
  Globe, 
  Github
} from "lucide-react";

const features = [
  {
    title: "GitHub Integration",
    description: "Connect to any GitHub repository and pull commit history with a few clicks",
    icon: Github,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "AI-Powered Transformation",
    description: "Convert technical commits into clear, user-friendly changelog entries automatically",
    icon: BrainCircuit,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Developer Control",
    description: "Edit, categorize, and reorganize changelog entries before publishing",
    icon: PencilRuler,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Public Changelog",
    description: "Share your beautifully formatted changelog with users on a professional website",
    icon: Globe,
    color: "bg-green-100 text-green-600",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Effortless Changelog Generation</h2>
          <p className="text-gray-500 text-lg">
            Our AI-powered platform transforms your repository activity into professional, user-friendly changelog entries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
            >
              <div className={`${feature.color} rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
