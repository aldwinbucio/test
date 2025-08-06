import React, { useState } from 'react';

const initialInvestigator = {
  protocolCode: '',
  protocolTitle: '',
  clearancePeriod: '',
  researcherName: '',
  researcherEmail: '',
  researcherTelephone: '',
  researcherMobile: '',
  studySite: '',
  siteEmail: '',
  siteTelephone: '',
  siteMobile: '',
  reportSubmissionDate: '',
  natureOfReport: '',
  deviationDescription: '',
  correctiveAction: '',
  assessmentSeverity: '',
  deviationDate: '',
  reportedBy: '',
  reportDate: '',
  piSignature: '',
};

const initialRecReview = {
  referralType: [],
  q1: '',
  q2: '',
  recommendedActions: [],
  moreInfo: '',
  furtherAction: '',
  primaryReviewer: { date: '', signature: '', name: '' },
  secretariatStaff: { date: '', signature: '', name: '' },
  recChair: { date: '', signature: '', name: '' },
};

const referralOptions = [
  'Full Board Review by REC',
  'Expedited Review by REC Chair',
];

const recommendedActionsOptions = [
  'Uphold original approval with no further action',
  'Request more information',
  'Recommend further action',
];

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-10">
    <div className="px-8 py-4 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
      <h2 className="text-xl font-semibold text-blue-900 tracking-tight">{title}</h2>
    </div>
    <div className="p-8">{children}</div>
  </div>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1">{children}</label>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={`block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-gray-800 ${props.className || ''}`}
  />
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea
    {...props}
    className={`block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-gray-800 ${props.className || ''}`}
  />
);

const ErrorMsg: React.FC<{ msg?: string }> = ({ msg }) =>
  msg ? <span className="text-xs text-red-500">{msg}</span> : null;

const DeviationReportForm = () => {
  const [investigator, setInvestigator] = useState(initialInvestigator);
  const [recReview, setRecReview] = useState(initialRecReview);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Validation helpers
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!investigator.protocolCode) newErrors.protocolCode = 'Required';
    if (!investigator.protocolTitle) newErrors.protocolTitle = 'Required';
    if (!investigator.clearancePeriod) newErrors.clearancePeriod = 'Required';
    if (!investigator.researcherName) newErrors.researcherName = 'Required';
    if (!investigator.researcherEmail || !/\S+@\S+\.\S+/.test(investigator.researcherEmail)) newErrors.researcherEmail = 'Valid email required';
    if (!investigator.researcherTelephone) newErrors.researcherTelephone = 'Required';
    if (!investigator.researcherMobile) newErrors.researcherMobile = 'Required';
    if (!investigator.studySite) newErrors.studySite = 'Required';
    if (!investigator.siteEmail || !/\S+@\S+\.\S+/.test(investigator.siteEmail)) newErrors.siteEmail = 'Valid email required';
    if (!investigator.siteTelephone) newErrors.siteTelephone = 'Required';
    if (!investigator.siteMobile) newErrors.siteMobile = 'Required';
    if (!investigator.reportSubmissionDate) newErrors.reportSubmissionDate = 'Required';
    if (!investigator.natureOfReport) newErrors.natureOfReport = 'Required';
    if (!investigator.deviationDescription) newErrors.deviationDescription = 'Required';
    
    if (!investigator.assessmentSeverity) newErrors.assessmentSeverity = 'Required';
    if (!investigator.deviationDate) newErrors.deviationDate = 'Required';
    if (!investigator.reportedBy) newErrors.reportedBy = 'Required';
    if (!investigator.reportDate) newErrors.reportDate = 'Required';
    if (!investigator.piSignature) newErrors.piSignature = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input handlers
  const handleInvestigatorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInvestigator({ ...investigator, [e.target.name]: e.target.value });
  };

  const handleRecReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRecReview({ ...recReview, [e.target.name]: e.target.value });
  };

  const handleReferralType = (option: string) => {
    setRecReview((prev) => ({
      ...prev,
      referralType: prev.referralType.includes(option)
        ? prev.referralType.filter((o: string) => o !== option)
        : [...prev.referralType, option],
    }));
  };

  const handleRecommendedActions = (option: string) => {
    setRecReview((prev) => ({
      ...prev,
      recommendedActions: prev.recommendedActions.includes(option)
        ? prev.recommendedActions.filter((o: string) => o !== option)
        : [...prev.recommendedActions, option],
    }));
  };

  const handleReviewerChange = (role: 'primaryReviewer' | 'secretariatStaff' | 'recChair', field: string, value: string) => {
    setRecReview((prev) => ({
      ...prev,
      [role]: { ...prev[role], [field]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    // TODO: Replace with real submission logic (API, email, etc.)
    alert('Deviation report submitted!');
  };

  
  return (
  <form className="max-w-5xl mx-auto p-6 md:p-10 bg-gray-50 min-h-screen" onSubmit={handleSubmit}>

    <div className="flex justify-center mb-8">
      <img
        src="https://lh5.googleusercontent.com/70wFfDIl5hsR6WL9mOH8inWiKbK17KA2pLyr1nwcRGRMZbj8ma9MUDTyKXw8gF47y_naDG8cTs42Jv63y5AjtHbKJjCgoCM-3HROEQnAnvPtpxVV2yoa8Rw4JPA88RHdD2a29zyBaA=w16383" 
        alt="Institution Logo"
        className="h-35 w-auto object-contain"
      />
    </div>
    <h1 className="text-3xl font-bold text-black mb-8 text-center tracking-tight">
      Ethics Study Protocol Non-Compliance Report
    </h1>
    <SectionCard title={<span className="text-black">A. Principal Investigator Section</span>}>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <Label>Protocol Code *</Label>
            <Input name="protocolCode" value={investigator.protocolCode} onChange={handleInvestigatorChange} />
            <ErrorMsg msg={errors.protocolCode} />
          </div>
          <div>
            <Label>Study Protocol Title *</Label>
            <Input name="protocolTitle" value={investigator.protocolTitle} onChange={handleInvestigatorChange} />
            <ErrorMsg msg={errors.protocolTitle} />
          </div>
          <div>
            <Label>Ethical Clearance Effectivity Period *</Label>
            <Input name="clearancePeriod" value={investigator.clearancePeriod} onChange={handleInvestigatorChange} placeholder="e.g. 01/01/2024 - 31/12/2024" />
            <ErrorMsg msg={errors.clearancePeriod} />
          </div>
          <div>
            <Label>Researcher Name *</Label>
            <Input name="researcherName" value={investigator.researcherName} onChange={handleInvestigatorChange} />
            <ErrorMsg msg={errors.researcherName} />
          </div>
          <div>
            <Label>Researcher Email *</Label>
            <Input name="researcherEmail" type="email" value={investigator.researcherEmail} onChange={handleInvestigatorChange} />
            <ErrorMsg msg={errors.researcherEmail} />
          </div>
          <div>
            <Label>Researcher Telephone *</Label>
            <Input name="researcherTelephone" value={investigator.researcherTelephone} onChange={handleInvestigatorChange} />
            <ErrorMsg msg={errors.researcherTelephone} />
          </div>
          <div>
            <Label>Researcher Mobile *</Label>
            <Input name="researcherMobile" value={investigator.researcherMobile} onChange={handleInvestigatorChange} />
            <ErrorMsg msg={errors.researcherMobile} />
          </div>
          <div>
            <Label>Study Site *</Label>
            <Input name="studySite" value={investigator.studySite} onChange={handleInvestigatorChange} />
            <ErrorMsg msg={errors.studySite} />
          </div>

          <div>
            <Label>Report Submission Date *</Label>
            <Input name="reportSubmissionDate" type="date" value={investigator.reportSubmissionDate} onChange={handleInvestigatorChange} />
            <ErrorMsg msg={errors.reportSubmissionDate} />
          </div>
          <div>
            <Label>Nature of Report *</Label>
            <select
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-gray-800"
              name="natureOfReport"
              value={investigator.natureOfReport}
              onChange={handleInvestigatorChange}
            >
              <option value="">Select...</option>
              <option value="Minor Protocol Deviation">Minor Protocol Deviation</option>
              <option value="Major Protocol Deviation or Violation">Major Protocol Deviation or Violation</option>
            </select>
            <ErrorMsg msg={errors.natureOfReport} />
          </div>
          <div className="md:col-span-2">
            <Label>Description of Reported Deviation/Violation *</Label>
            <Textarea name="deviationDescription" value={investigator.deviationDescription} onChange={handleInvestigatorChange} rows={3} />
            <ErrorMsg msg={errors.deviationDescription} />
          </div>
          <div className="md:col-span-2">
            <Label>Description of Investigator Corrective Action </Label>
            <Textarea name="correctiveAction" value={investigator.correctiveAction} onChange={handleInvestigatorChange} rows={3} />
            <ErrorMsg msg={errors.correctiveAction} />
          </div>
          <div>
            <Label>Investigator Assessment of Severity *</Label>
            <div className="flex gap-6 mt-2">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-blue-600"
                  name="assessmentSeverity"
                  value="Major"
                  checked={investigator.assessmentSeverity === 'Major'}
                  onChange={handleInvestigatorChange}
                />
                <span>Major</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-blue-600"
                  name="assessmentSeverity"
                  value="Minor"
                  checked={investigator.assessmentSeverity === 'Minor'}
                  onChange={handleInvestigatorChange}
                />
                <span>Minor</span>
              </label>
            </div>
            <ErrorMsg msg={errors.assessmentSeverity} />
          </div>
          <div>
            <Label>Date of Deviation/Violation *</Label>
            <Input name="deviationDate" type="date" value={investigator.deviationDate} onChange={handleInvestigatorChange} />
            <ErrorMsg msg={errors.deviationDate} />
          </div>
          <div>
            <Label>Reported By *</Label>
            <Input name="reportedBy" value={investigator.reportedBy} onChange={handleInvestigatorChange} />
            <ErrorMsg msg={errors.reportedBy} />
          </div>
          <div>
            <Label>Date of Report *</Label>
            <Input name="reportDate" type="date" value={investigator.reportDate} onChange={handleInvestigatorChange} />
            <ErrorMsg msg={errors.reportDate} />
          </div>
          <div className="md:col-span-2">
            <Label>Signature of Principal Investigator *</Label>
            <Input name="piSignature" value={investigator.piSignature} onChange={handleInvestigatorChange} placeholder="Type name or upload e-signature" />
            <ErrorMsg msg={errors.piSignature} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="B. REC Members Section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <Label>Referral Type</Label>
            {referralOptions.map(option => (
              <div key={option} className="mb-2">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-blue-600"
                    checked={recReview.referralType.includes(option)}
                    onChange={() => handleReferralType(option)}
                  />
                  <span>{option}</span>
                </label>
              </div>
            ))}
          </div>
          <div>
            <Label>Will the change in methodology pose more risks to the participants?</Label>
            <div className="flex gap-6 mt-2">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-blue-600"
                  name="q1"
                  value="Yes"
                  checked={recReview.q1 === 'Yes'}
                  onChange={handleRecReviewChange}
                />
                <span>Yes</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-blue-600"
                  name="q1"
                  value="No"
                  checked={recReview.q1 === 'No'}
                  onChange={handleRecReviewChange}
                />
                <span>No</span>
              </label>
            </div>
          </div>
          <div>
            <Label>Is the corrective action appropriate?</Label>
            <div className="flex gap-6 mt-2">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-blue-600"
                  name="q2"
                  value="Yes"
                  checked={recReview.q2 === 'Yes'}
                  onChange={handleRecReviewChange}
                />
                <span>Yes</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-blue-600"
                  name="q2"
                  value="No"
                  checked={recReview.q2 === 'No'}
                  onChange={handleRecReviewChange}
                />
                <span>No</span>
              </label>
            </div>
          </div>
          <div>
            <Label>Recommended Action</Label>
            {recommendedActionsOptions.map(option => (
              <div key={option} className="mb-2">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-blue-600"
                    checked={recReview.recommendedActions.includes(option)}
                    onChange={() => handleRecommendedActions(option)}
                  />
                  <span>{option}</span>
                </label>
                {option === 'Request more information' && recReview.recommendedActions.includes(option) && (
                  <Input
                    name="moreInfo"
                    placeholder="Please specify details"
                    value={recReview.moreInfo}
                    onChange={handleRecReviewChange}
                    className="mt-2"
                  />
                )}
                {option === 'Recommend further action' && recReview.recommendedActions.includes(option) && (
                  <Input
                    name="furtherAction"
                    placeholder="Please specify details"
                    value={recReview.furtherAction}
                    onChange={handleRecReviewChange}
                    className="mt-2"
                  />
                )}
              </div>
            ))}
          </div>
          {/* Reviewer Signatures */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {(['primaryReviewer', 'secretariatStaff', 'recChair'] as const).map(role => (
              <div key={role} className="border border-gray-200 rounded-xl p-6 bg-gray-50 shadow-sm">
                <div className="font-semibold mb-2 text-blue-800">
                  {role === 'primaryReviewer' && 'Primary Reviewer'}
                  {role === 'secretariatStaff' && 'Secretariat Staff'}
                  {role === 'recChair' && 'REC Chair'}
                </div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={recReview[role].date}
                  onChange={e => handleReviewerChange(role, 'date', e.target.value)}
                  className="mb-2"
                />
                <Label>Signature</Label>
                <Input
                  placeholder="Type name or upload e-signature"
                  value={recReview[role].signature}
                  onChange={e => handleReviewerChange(role, 'signature', e.target.value)}
                  className="mb-2"
                />
                <Label>Name and Title</Label>
                <Input
                  placeholder="Name and Title"
                  value={recReview[role].name}
                  onChange={e => handleReviewerChange(role, 'name', e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
        >
          Submit Report
        </button>
      </div>
      {submitted && (
        <div className="mt-8 text-green-600 font-semibold text-center text-lg animate-fade-in">
          Report submitted successfully!
        </div>
      )}
    </form>
  );
};

export default DeviationReportForm;