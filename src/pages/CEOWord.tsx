import React from 'react';
import { User, Quote } from 'lucide-react';

const CEOWord = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              A Word from Our CEO
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Leading the mission to create an inclusive society for all
            </p>
          </div>
        </div>
      </div>

      {/* CEO Message Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* CEO Photo */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block">
                <div className="w-80 h-80 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto lg:mx-0">
                  <User className="w-32 h-32 text-green-600" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-red-500 text-white p-4 rounded-full">
                  <Quote className="w-8 h-8" />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900">Alex Abassi</h3>
                <p className="text-green-600 font-semibold">Chief Executive Officer</p>
                <p className="text-gray-600 mt-2">Global Carers & Disability Cards</p>
              </div>
            </div>

            {/* CEO Message */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-500">
                <Quote className="w-8 h-8 text-green-500 mb-4" />
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  "Many people live with invisible disabilities conditions like chronic pain, mental health challenges, and neurological disorders that aren't immediately noticeable but significantly affect everyday life. Despite being hidden, these disabilities are just as impactful and deserving of support as any visible condition. Those who face these challenges often deal with ongoing physical, emotional, and mental strain while receiving little recognition or understanding in public settings, workplaces, or when accessing services."
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  "There is a growing need for an official card that acknowledges and validates these invisible disabilities. This type of identification can help ensure that individuals are treated with the same level of care, accommodation, and respect as those with visible impairments. It can also promote greater awareness and bridge the gap in support systems, encouraging a more inclusive and empathetic society."
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  "This is the driving force behind my commitment to launching the Disability and Carer Card initiative."
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  "In addition, we are proud to introduce the Customer Support Card, recognizing the often overlooked efforts of those working on the front lines of customer service. These individuals serve as the bridge between organisations and the public, managing complex situations with patience, empathy, and professionalism. They too deserve acknowledgment, respect, and the resources to thrive in their roles."
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  "This project is rooted in dignity, inclusion, and gratitude for the disabled, the carers, and the support workers who make everyday life more humane for us all."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to provide individuals with disabilities, as well as the carers who selflessly support them, with the recognition and services they deserve.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                This initiative aims to ensure that those with special needs receive the respect, assistance, and opportunities they need to thrive, and that carers are acknowledged for their vital role in this journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Commitment */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Leadership Commitment</h3>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                "As CEO, I am personally committed to ensuring that GCDC remains at the forefront of disability support 
                services and advocacy in the UAE. We continuously invest in technology, staff training, and strategic 
                partnerships to enhance the experience and expand the benefits available to our cardholders."
              </p>
              <p className="text-lg leading-relaxed">
                "Our dedicated team works tirelessly to identify new partnership opportunities, develop innovative support 
                services, and advocate for policy changes that benefit our community. We believe in transparency, 
                accountability, and measurable impact in all our endeavors."
              </p>
              <p className="text-lg leading-relaxed">
                "I invite you to join us in this vital mission. Whether you are seeking support for yourself or a loved one, 
                or you represent an organization that shares our values of inclusion and social responsibility, together we 
                can build a more accessible and inclusive UAE for all."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Us in Building an Inclusive Future
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Together, we can create a society where everyone has the opportunity to thrive and contribute
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Learn About Our Services
            </button>
            <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
              Apply for a Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CEOWord;