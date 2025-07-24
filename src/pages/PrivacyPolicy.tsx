import React from 'react';
import { Shield, Lock, Eye, FileText, AlertTriangle } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Your privacy is our priority. Learn how we collect, use, and protect your personal information.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Overview */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Privacy Commitment</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Global Carers & Disability Cards (GCDC) is committed to protecting your privacy and ensuring the security 
              of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you use our services and apply for our disability cards.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Last Updated:</strong> January 2025 | <strong>Effective Date:</strong> January 1, 2025
            </p>
          </div>

          <div className="space-y-8">
            {/* Information We Collect */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-6 h-6 text-green-500 mr-3" />
                1. Information We Collect
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h4>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li>• Full name, date of birth, and contact details</li>
                    <li>• Emirates ID number and passport information</li>
                    <li>• Address and residential information</li>
                    <li>• Emergency contact details</li>
                    <li>• Photograph for card production and identification</li>
                    <li>• Employment and educational information (when relevant)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Medical Information (Disabilities Card)</h4>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li>• Medical reports and professional diagnoses</li>
                    <li>• Disability type, severity, and functional impact</li>
                    <li>• Healthcare provider information and recommendations</li>
                    <li>• Treatment history and ongoing medical needs</li>
                    <li>• Assistive technology and equipment requirements</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Caregiving Information (Carers Card)</h4>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li>• Relationship to person being cared for</li>
                    <li>• Caregiving responsibilities and duration</li>
                    <li>• Supporting documentation and references</li>
                    <li>• Training and certification records</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Support Needs (Customer Support Card)</h4>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li>• Type and level of support required</li>
                    <li>• Current challenges and assistance needs</li>
                    <li>• Professional assessments and recommendations</li>
                    <li>• Support service preferences and requirements</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Technical Information</h4>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li>• Website usage data and analytics</li>
                    <li>• IP address and device information</li>
                    <li>• Application and system access logs</li>
                    <li>• Communication preferences and history</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 text-green-500 mr-3" />
                2. How We Use Your Information
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Primary Uses:</h4>
                  <ul className="space-y-2 ml-4">
                    <li>• Processing card applications and renewals</li>
                    <li>• Verifying eligibility and identity</li>
                    <li>• Producing and issuing cards with security features</li>
                    <li>• Providing customer support and assistance services</li>
                    <li>• Facilitating partner benefits and discounts</li>
                    <li>• Coordinating support services and referrals</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Secondary Uses:</h4>
                  <ul className="space-y-2 ml-4">
                    <li>• Improving our services and user experience</li>
                    <li>• Conducting research and analytics (anonymized data)</li>
                    <li>• Communicating service updates and important notices</li>
                    <li>• Compliance with legal and regulatory requirements</li>
                    <li>• Developing new services and partnerships</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 text-green-500 mr-3" />
                3. Information Sharing and Disclosure
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">We may share your information with:</h4>
                  <ul className="space-y-2 ml-4">
                    <li>• <strong>Partner Organizations:</strong> Limited information necessary to verify eligibility and provide benefits</li>
                    <li>• <strong>Healthcare Providers:</strong> When required for medical verification (with explicit consent)</li>
                    <li>• <strong>Government Agencies:</strong> As required by UAE law, regulation, or court order</li>
                    <li>• <strong>Service Providers:</strong> Third-party vendors who assist in our operations under strict confidentiality agreements</li>
                    <li>• <strong>Emergency Contacts:</strong> In case of emergencies or when necessary for cardholder safety</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-800 mb-2">We will NEVER:</h4>
                  <ul className="space-y-1 text-red-700 ml-4">
                    <li>• Sell your personal information to third parties for commercial purposes</li>
                    <li>• Share medical information without explicit consent (except as legally required)</li>
                    <li>• Use your information for unauthorized marketing or promotional activities</li>
                    <li>• Disclose sensitive information to unauthorized parties</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 text-green-500 mr-3" />
                4. Data Security and Protection
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <p>We implement comprehensive security measures to protect your information:</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technical Safeguards:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• SSL encryption for all data transmission</li>
                      <li>• Secure database storage with advanced encryption</li>
                      <li>• Regular security audits and vulnerability assessments</li>
                      <li>• Multi-factor authentication systems</li>
                      <li>• Firewall protection and intrusion detection</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Administrative Safeguards:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Limited access on strict need-to-know basis</li>
                      <li>• Comprehensive staff training on privacy protection</li>
                      <li>• Confidentiality agreements with all personnel</li>
                      <li>• Regular privacy compliance reviews and audits</li>
                      <li>• Incident response and breach notification procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">5. Your Privacy Rights</h3>
              
              <div className="space-y-4 text-gray-700">
                <p>Under UAE data protection laws and our commitment to transparency, you have the right to:</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Access:</strong> Request copies of your personal information we hold</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Correction:</strong> Request correction of inaccurate or incomplete information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Deletion:</strong> Request deletion of your information (subject to legal requirements)</span>
                    </li>
                  </ul>
                  
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Portability:</strong> Request transfer of your data in a structured format</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Objection:</strong> Object to certain processing activities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Complaint:</strong> File complaints with relevant data protection authorities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">6. Data Retention</h3>
              
              <div className="space-y-4 text-gray-700">
                <p>We retain your information for the following periods:</p>
                
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Active cardholders:</strong> Throughout the validity period of your card plus 1 year</li>
                  <li>• <strong>Expired cards:</strong> 7 years after expiration for legal compliance and audit purposes</li>
                  <li>• <strong>Medical records:</strong> As required by UAE healthcare regulations (minimum 10 years)</li>
                  <li>• <strong>Application records:</strong> 5 years after application decision for appeals and verification</li>
                  <li>• <strong>Website and communication data:</strong> As specified in our cookie policy (typically 2 years)</li>
                  <li>• <strong>Financial records:</strong> 7 years as required by UAE financial regulations</li>
                </ul>
              </div>
            </div>

            {/* Cookies and Tracking */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">7. Cookies and Online Tracking</h3>
              
              <div className="space-y-4 text-gray-700">
                <p>Our website uses cookies and similar technologies to:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Improve website functionality and user experience</li>
                  <li>• Remember your preferences and settings</li>
                  <li>• Analyze website traffic and usage patterns</li>
                  <li>• Provide personalized content and services</li>
                  <li>• Ensure website security and prevent fraud</li>
                </ul>
                <p>You can control cookie settings through your browser preferences. However, disabling certain cookies may affect website functionality.</p>
              </div>
            </div>

            {/* International Transfers */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">8. International Data Transfers</h3>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  Your personal information is primarily stored and processed within the UAE. In limited circumstances, 
                  we may transfer data internationally for:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Technical support and system maintenance</li>
                  <li>• International partner verification (with your consent)</li>
                  <li>• Legal compliance in cross-border situations</li>
                </ul>
                <p>
                  All international transfers are conducted with appropriate safeguards and in compliance with UAE data protection laws.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-2xl p-8 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Our Privacy Team</h3>
              <p className="text-gray-700 mb-4">
                For any privacy-related questions, concerns, or to exercise your rights, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Privacy Officer:</strong> support@gcdc.help</p>
                <p><strong>Phone:</strong> +971 4 XXX XXXX (Privacy Hotline)</p>
                <p><strong>Address:</strong> Privacy Department, GCDC, Dubai, UAE</p>
                <p><strong>Response Time:</strong> We will respond to privacy requests within 30 days</p>
                <p><strong>Emergency Contact:</strong> Available 24/7 for urgent privacy concerns</p>
              </div>
            </div>

            {/* Updates to Policy */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">9. Updates to This Policy</h3>
              <div className="text-gray-700 space-y-4">
                <p>
                  We may update this Privacy Policy periodically to reflect changes in our practices, technology, 
                  legal requirements, or other factors. We will notify you of significant changes through:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Email notifications to registered users</li>
                  <li>• Prominent notices on our website</li>
                  <li>• SMS alerts for important changes affecting your rights</li>
                  <li>• Direct mail for substantial policy modifications</li>
                </ul>
                <p>
                  Continued use of our services after policy updates constitutes acceptance of the revised terms. 
                  If you disagree with changes, please contact us to discuss your options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;