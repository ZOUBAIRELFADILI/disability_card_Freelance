import { AlertTriangle, Eye, FileText, Lock, Shield } from 'lucide-react';

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
            This privacy policy sets out how <strong>National Disability Aid Cards</strong> uses and protects any information that you give <strong>NDAid’s</strong> when you use this website.
            <strong>National Disability Aid Cards</strong> is committed to ensure that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.
            To safeguard your personal data, all electronic storage and transmission of personal data is secured with appropriate security technologies.
            If you are only browsing this website, we do not capture data that allows us to identify you individually.

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
                1. Data Collected from Applicant and Sponsor Forms
              </h3>
              
              <div className="space-y-6">
                <div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                  When you complete the Applicant Information or Sponsor Newsletter Sign-Up forms, we may collect the following personal data:
                  </p>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li>• Full name</li>
                    <li>• Contact details, including email address</li>
                    <li>• Additional information relevant to your application or newsletter subscription</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mb-4">
                  This information is collected solely for the purpose of processing your application or managing your subscription preferences.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 text-green-500 mr-3" />
                2.What We Do with the Information We Gather
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                  We are committed to ensure that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• To process applications and manage participation in relevant Service</li>
                    <li>• To send periodic newsletters or updates to sponsors and subscribers</li>
                    <li>• To improve our services, website content, and user experience</li>
                    <li>• To contact you for administrative or informational purposes related to your inquiry or submission</li>
                    <li>• To maintain internal records for compliance, auditing, and reporting</li>
                    <li>• To personalize content and communication based on your preferences</li>
                    <li>•	To ensure security and prevent fraud or misuse of our services</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mb-4">
                  We are committed to ensuring that your information is secure. Appropriate physical, electronic, and managerial procedures are in place to safeguard and protect the information we collect online.
                  </p>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 text-green-500 mr-3" />
                3. Data Security and Protection
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                We are committed to ensure that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
                  </p>
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
                4. How we use cookies
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <p>A cookie is a small file which asks permission to be placed on your computer’s hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</p>
                <p>We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>
                <p>Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</p>
                <p>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">5. Links to other websites</h3>
              
              <div className="space-y-4 text-gray-700">
                <p>Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.</p>
              </div>
            </div>

            {/* Data Retention */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">6. Controlling your personal information</h3>
              
              <div className="space-y-4 text-gray-700">
                <p>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so.</p>
                <p>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at support@ndaid.help</p>
                <p>If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorrect.</p>
              </div>
            </div>


            {/* Contact Information */}
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-2xl p-8 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Our Privacy Team</h3>
              <p className="text-gray-700 mb-4">
                For any privacy-related questions, concerns, or to exercise your rights, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Privacy Officer:</strong> support@ndaid.help</p>
                <p><strong>Phone:</strong> +971 4 XXX XXXX (Privacy Hotline)</p>
                <p><strong>Address:</strong> Privacy Department,  NDAid, Dubai, UAE</p>
                <p><strong>Response Time:</strong> We will respond to privacy requests within 30 days</p>
                <p><strong>Emergency Contact:</strong> Available 24/7 for urgent privacy concerns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;