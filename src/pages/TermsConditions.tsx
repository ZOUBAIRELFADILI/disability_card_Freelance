import React from 'react';
import { FileText, Shield, AlertCircle, CheckCircle, Eye, Lock, AlertTriangle } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FileText className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Please read these terms and conditions carefully before using our services
            </p>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Terms and Conditions</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Global Carers and Disability Cards (GCDC)'s relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The term 'Global Carers and Disability Cards (GCDC) or 'us' or 'we' refers to the owner of the website whose registered for Global Carers and Disability Cards (GCDC). The term 'you' refers to the user or viewer of our website.
            </p>
          </div>

          <div className="space-y-8">
            {/* Terms of Use */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-6 h-6 text-green-500 mr-3" />
                Terms of Use
              </h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-gray-700 mb-4">The use of this website is subject to the following terms of use:</p>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li>• The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li>
                    <li>• Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                    <li>• Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</li>
                    <li>• This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
                    <li>• Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</li>
                    <li>• From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</li>
                    <li>• Use of this website and these terms are governed by the international law of privacy protection and copyright.</li>
                    <li>• If you wish to use any material on our website in any other way, including for commercial purposes, please write to our Digital Content Manager by email to support@gcdc.help</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Viruses and Harmful Material */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 text-green-500 mr-3" />
                We are not responsible for viruses and other harmful material
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <p>We don't guarantee that our website, its servers, downloadable files and emails are free from viruses or other harmful components.</p>
                  <p>By breaching this provision, you would commit a criminal offence under the Computer Misuse Act 1990. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use our website will cease immediately.</p>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 text-green-500 mr-3" />
                You must keep your account details safe
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <p>Keep your community username and password secure at all times and to contact us by emailing support@gcdc.help</p>
                  <p>We have the right to disable any user identification code or password, whether chosen by you or allocated by us, at any time, if in our reasonable opinion you have failed to comply with any of the provisions of these terms of use.</p>
                </div>
              </div>
            </div>

            {/* Posting Guidelines */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 text-green-500 mr-3" />
                Posting on our website
              </h3>
              
              <div className="space-y-6 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">You agree to:</h4>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li>• only post material that complies with international digital law and any other applicable law or regulation;</li>
                    <li>• ensure that contributions are accurate (where they state facts) and be genuinely held (where they state opinions); and</li>
                    <li>• accept full responsibility for any material you post. You will be responsible for any loss or damage we suffer as a result of your breach of these Terms of use.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">You agree not to:</h4>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li>• interfere with anybody else's use of our website;</li>
                    <li>• use any other user's identity or a false identity to log into our website or misrepresent your identity of affiliation with any person in any way;</li>
                    <li>• post threatening or abusive material or invade another's privacy or cause annoyance, inconvenience or needless anxiety;</li>
                    <li>• post any material in breach of any legal duty owed to a third party, such as a contractual duty or a duty of confidence;</li>
                    <li>• post inaccurate, deceptive, defamatory, abusive, offensive, pornographic, racist, sexist, violent, obscene, discriminatory, threatening, hateful or otherwise inappropriate or illegal material, or to post material which will constitute a criminal offence or give rise to civil liability;</li>
                    <li>• post medical advice, or accept medical advice posted;</li>
                    <li>• advertise or offer to sell goods or services for any commercial purpose, make requests for money without the express written permission of Global Carers and Disabilities cards company.</li>
                    <li>• transmit, or procure the sending of any unsolicited or unauthorised advertising or promotional material or any other form of solicitation; or</li>
                    <li>• post, make available or otherwise advocate any material protected by copyright, trade mark, confidentiality or other proprietary right without the express permission of the owner of the copyright, trade mark, confidential information or any other proprietary right.</li>
                  </ul>
                </div>

                <div>
                  <p>You acknowledge that you will be solely liable for any costs and damages resulting from any infringement.</p>
                </div>
              </div>
            </div>

            {/* Privacy and Visibility */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-6 h-6 text-green-500 mr-3" />
                Privacy and Content Visibility
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">You acknowledge that:</h4>
                  <ul className="space-y-2 ml-4">
                    <li>• Material posted on our website is not private and can be viewed by everybody who visits.</li>
                    <li>• Messages between users on our website can be read by admins at any time.</li>
                    <li>• Other users may be able to identify who has posted material</li>
                  </ul>
                </div>

                <div>
                  <p><strong>Please note:</strong> if information is shared that indicates children or adults at risk have been abused or exploited or are at risk of abuse or exploitation then we have a duty of care to act and pass on that information to relevant authorities.</p>
                </div>
              </div>
            </div>

            {/* Content Licensing */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 text-green-500 mr-3" />
                Content Licensing and Rights
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">When posting material on our website, you confirm that:</h4>
                  <ul className="space-y-2 ml-4">
                    <li>• you are the sole author of that material and it is your own original work, or otherwise that you have a licence to post it;</li>
                    <li>• you are granting us a worldwide, irrevocable, royalty-free licence for commercial or non-commercial purposes to display the material in all and any media in its original format or edited, altered or combined with other works;</li>
                    <li>• you are not entitled to make any claim for payment, editorial control, use or any works derived from it;</li>
                    <li>• that these permissions may not be withdrawn and shall last forever, binding on you, your successors and assignees; and</li>
                    <li>• you are granting to all other users of GCDC's website the right to access such material and to view, store and reproduce the material for personal use and to enforce these Terms of use against you if you breach them.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Website Usage */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 text-green-500 mr-3" />
                Our website is not for commercial or business use
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <p>Please note that we only provide our site for domestic and private use. You agree not to use our site for any commercial or business purposes, and we have no liability to you for any loss of profit, loss of business, business interruption, or loss of business opportunity.</p>
              </div>
            </div>

            {/* Breach of Terms */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 text-green-500 mr-3" />
                Breach of these Terms of Use
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <p>We may determine, in our discretion, whether there has been a breach of these Terms of use.</p>
                <p>When a breach of this policy has occurred, we may take such action as we deem appropriate. We may:</p>
                
                <ul className="space-y-2 ml-4">
                  <li>• immediately, temporarily or permanently withdraw your right to use our website;</li>
                  <li>• immediately, temporarily or permanently remove or edit your posts or material you uploaded to our website;</li>
                  <li>• give you a warning; undertake legal proceedings against you for reimbursement of all losses and costs on an indemnity basis - including, but not limited to, reasonable administrative and legal costs - resulting from the breach</li>
                </ul>
              </div>
            </div>

            {/* Feedback and Complaints */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 text-green-500 mr-3" />
                Feedback and complaints
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <p>We welcome your comments about our website. If you find anything incorrect, not working or want to say anything else, please email to support@gcdc.help</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-2xl p-8 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
              <p className="text-gray-700 mb-4">
                If you have any questions about these terms and conditions, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> support@gcdc.help</p>
                <p><strong>Phone:</strong> +971 4 XXX XXXX</p>
                <p><strong>Address:</strong> Dubai, United Arab Emirates</p>
                <p><strong>Website:</strong> www.gcdc.ae</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center text-gray-500 text-sm">
              <p>Last updated: January 2025</p>
              <p>Version 3.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;