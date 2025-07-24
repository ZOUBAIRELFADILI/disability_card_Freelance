import React from 'react';
import { 
  ClipboardCheck, 
  Users, 
  Wrench, 
  Car, 
  Home, 
  Briefcase,
  CheckCircle,
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: ClipboardCheck,
      title: "Disability Assessment",
      description: "Comprehensive evaluations conducted by certified healthcare professionals to determine eligibility for disability services and develop personalized support plans.",
      features: [
        "Medical and functional assessments",
        "Cognitive and psychological evaluations",
        "Mobility and accessibility assessments",
        "Support needs analysis",
        "Eligibility determination",
        "Personalized care planning"
      ],
      process: [
        "Initial consultation and referral",
        "Comprehensive assessment appointment",
        "Report preparation and review",
        "Support plan development",
        "Service coordination"
      ]
    },
    {
      icon: Users,
      title: "Personal Support Services",
      description: "Dedicated support workers who assist individuals with daily activities, community participation, and achieving personal goals while maintaining dignity and independence.",
      features: [
        "Personal care assistance",
        "Community access support",
        "Social and recreational activities",
        "Skill development programs",
        "Behavioral support",
        "24/7 emergency support"
      ],
      process: [
        "Support needs assessment",
        "Support worker matching",
        "Service plan development",
        "Regular monitoring and reviews",
        "Ongoing support coordination"
      ]
    },
    {
      icon: Wrench,
      title: "Equipment & Assistive Technology",
      description: "Provision of high-quality assistive devices and technology solutions designed to enhance independence, communication, and quality of life.",
      features: [
        "Mobility aids and wheelchairs",
        "Communication devices",
        "Daily living aids",
        "Computer access technology",
        "Environmental control systems",
        "Maintenance and repair services"
      ],
      process: [
        "Equipment assessment",
        "Product selection and fitting",
        "Training and orientation",
        "Delivery and installation",
        "Ongoing maintenance support"
      ]
    },
    {
      icon: Car,
      title: "Transport Services",
      description: "Accessible transportation solutions ensuring safe and comfortable travel for medical appointments, community activities, and daily needs.",
      features: [
        "Wheelchair accessible vehicles",
        "Medical appointment transport",
        "Community access trips",
        "Shopping and errands",
        "Social and recreational outings",
        "Emergency transport services"
      ],
      process: [
        "Transport needs assessment",
        "Service booking and scheduling",
        "Vehicle assignment",
        "Safe transport provision",
        "Service feedback and improvement"
      ]
    },
    {
      icon: Home,
      title: "Home Modifications",
      description: "Professional home adaptation services to create safe, accessible, and comfortable living environments that promote independence and safety.",
      features: [
        "Ramp and stair lift installation",
        "Bathroom modifications",
        "Kitchen adaptations",
        "Door and window modifications",
        "Lighting and electrical upgrades",
        "Safety equipment installation"
      ],
      process: [
        "Home assessment visit",
        "Modification recommendations",
        "Quote and approval process",
        "Professional installation",
        "Quality assurance check"
      ]
    },
    {
      icon: Briefcase,
      title: "Employment Support",
      description: "Comprehensive employment services helping individuals with disabilities find, maintain, and excel in meaningful employment opportunities.",
      features: [
        "Career counseling and planning",
        "Job search assistance",
        "Skills training and development",
        "Workplace accommodations",
        "Employer liaison services",
        "Ongoing employment support"
      ],
      process: [
        "Career assessment",
        "Skills development planning",
        "Job matching and placement",
        "Workplace support setup",
        "Long-term follow-up"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Comprehensive Services
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            We provide a full spectrum of disability services designed to promote independence, 
            dignity, and quality of life for individuals and families across the UAE.
          </p>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center mb-6">
                      <div className="bg-emerald-100 p-4 rounded-xl mr-4">
                        <IconComponent className="w-10 h-10 text-emerald-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                    </div>
                    
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Offer:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Process */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Process:</h3>
                      <div className="space-y-2">
                        {service.process.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-center">
                            <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                              {stepIndex + 1}
                            </div>
                            <span className="text-gray-700">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      to="/apply"
                      className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Apply for This Service
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>

                  {/* Image */}
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
                      <div className="aspect-square bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-32 h-32 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Access Our Services?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Our team is here to help you determine which services are right for you. 
            Contact us today for a free consultation and assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply"
              className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;